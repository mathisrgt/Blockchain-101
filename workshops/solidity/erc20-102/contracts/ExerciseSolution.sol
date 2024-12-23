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

        depositAddressERC20.mint(msg.sender, claimedAmount); // for ex9

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

        require(
            depositAddressERC20.balanceOf(msg.sender) >= amountToWithdraw,
            "Insufficient ExerciseSolutionERC20 token balance for burn"
        );

        // bool transferSuccess = depositAddressERC20.transferFrom(
        //     msg.sender,
        //     address(this),
        //     amountToWithdraw
        // );
        // require(transferSuccess, "ExerciseSolutionERC20 transfer failed");

        // depositAddressERC20.burn(address(this), amountToWithdraw); // for ex9
        depositAddressERC20.burn(msg.sender, amountToWithdraw);

        claimedTokens[msg.sender] -= amountToWithdraw; // for ex3

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

        depositAddressERC20.mint(msg.sender, amountToDeposit); // for ex8

        require(success, "Token transfer failed.");

        claimedTokens[msg.sender] += amountToDeposit; // for ex6

        return true;
    }

    function getERC20DepositAddress() external view returns (address) {
        return address(depositAddressERC20);
    }
}
