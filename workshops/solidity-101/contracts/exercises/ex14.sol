// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";
import "./IEx14Solution.sol";

/*
Exercise 14: Completing all the workshop in a single transaction!
In this exercise you should:
- Implement a contract that complies with interface IEx14Solution
- Call the appropriate function here to trigger collecting points

Note: this contract only check if at least one of the exercises was validated
*/

contract Ex14 is ExerciseTemplate {
    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    function askForPoints() public {
        // Checking that solution has no token yet
        uint256 initialBalance = TDERC20.balanceOf(msg.sender);
        require(initialBalance == 0, "Solution should start with 0 points");

        // Calling the solution so that it solves the workshop
        IEx14Solution callerSolution = IEx14Solution(msg.sender);
        callerSolution.completeWorkshop();

        // Checking that at least 1 exercise was validated
        uint256 finalBalance = TDERC20.balanceOf(msg.sender);
        uint256 decimals = TDERC20.decimals();
        require(
            finalBalance >= 10 ** decimals * 2,
            "Solution should end with at least than 2 points"
        );

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
