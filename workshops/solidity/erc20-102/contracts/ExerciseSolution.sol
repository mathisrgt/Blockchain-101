// SPDX-License-Identifier: MIT

pragma solidity >=0.8.24;

import "./ERC20Claimable.sol";
import "./ERC20ExerciseSolution.sol";

contract ExerciseSolution {
    using SafeERC20 for IERC20;

    mapping(address => uint256) public claimedTokens;
    IERC20 public immutable claimableERC20;
    ExerciseSolutionERC20 public immutable depositAddressERC20;

    constructor(address _claimableERC20) {
        claimableERC20 = IERC20(_claimableERC20);
        depositAddressERC20 = new ExerciseSolutionERC20(
            "ExerciseSolutionToken",
            "EST",
            0,
            address(this)
        );
    }

    function claimTokensOnBehalf() external {
        uint256 initialBalance = claimableERC20.balanceOf(address(this));

        (bool success, bytes memory data) = address(claimableERC20).call(
            abi.encodeWithSignature("claimTokens()")
        );

        require(success, "Token claim failed");

        uint256 claimedAmount = claimableERC20.balanceOf(address(this)) -
            initialBalance;

        require(claimedAmount > 0, "No tokens were claimed");

        claimedTokens[msg.sender] += claimedAmount;
    }

    function tokensInCustody(address user) external view returns (uint256) {
        return claimedTokens[user];
    }

    function withdrawTokens(uint256 amountToWithdraw) external returns (bool) {
        require(
            amountToWithdraw > 0,
            "The requested amount to withdraw must be greater than zero"
        );

        uint256 availableAmount = claimedTokens[msg.sender];
        require(
            availableAmount >= amountToWithdraw,
            "Insufficient token balance"
        );

        uint256 contractBalance = claimableERC20.balanceOf(address(this));

        require(
            contractBalance >= amountToWithdraw,
            "Insufficient contract balance"
        );

        claimedTokens[msg.sender] -= amountToWithdraw;

        claimableERC20.safeTransfer(msg.sender, amountToWithdraw);

        return true;
    }

    function depositTokens(uint256 amountToDeposit) external returns (bool) {
        require(
            claimableERC20.balanceOf(msg.sender) >= amountToDeposit,
            "Not enough funds."
        );

        require(
            claimableERC20.allowance(msg.sender, address(this)) >=
                amountToDeposit,
            "Not enough allowance."
        );

        bool success = claimableERC20.transferFrom(
            msg.sender,
            address(this),
            amountToDeposit
        );
        require(success, "Token transfer failed.");

        claimedTokens[msg.sender] += amountToDeposit;

        return true;
    }

    function getERC20DepositAddress() external view returns (address) {
        return address(depositAddressERC20);
    }
}
