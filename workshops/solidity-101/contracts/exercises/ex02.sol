// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 2: Sending ETH to a public address
In this exercise, you need to:
- Send ETH to a public address (this contract's)
- Your points are credited by the contract
*/
/*
What you need to know to complete this exercise

A) What was included in the previous exercises
B) The function () is designed to receive transactions that include nothing but funds. If not specified, the contract can not receive this kind of transactions.
https://solidity.readthedocs.io/en/v0.4.25/contracts.html#fallback-function
C) The require() function is used to specify conditions that must be met for the contract to execute.
https://solidity.readthedocs.io/en/develop/control-structures.html?highlight=require(
D) The 'msg' object holds information regarding the account sending the transaction:
- msg.sender is the public address of the sender
- msg.value is the ETH value sent with this transaction 
https://solidity.readthedocs.io/en/develop/miscellaneous.html#index-4
*/
contract Ex02 is ExerciseTemplate {
    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    fallback() external payable {
        require(msg.value != 0);

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }

    receive() external payable {
        require(msg.value != 0);

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
