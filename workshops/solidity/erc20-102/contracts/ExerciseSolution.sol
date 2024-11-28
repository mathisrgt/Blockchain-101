// SPDX-License-Identifier: MIT

pragma solidity >=0.8.24;

import "./ERC20Claimable.sol";

contract ExerciseSolution {
    using SafeERC20 for IERC20;

    mapping(address => uint256) public claimedTokens;
    IERC20 public immutable claimableERC20;

    constructor(address _claimableERC20) {
        claimableERC20 = IERC20(_claimableERC20);
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

    function withdrawTokens(uint256 amountToWithdraw) external {
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
    }
}