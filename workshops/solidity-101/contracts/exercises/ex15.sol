// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciceTemplate.sol";
import "./Iex14Solution.sol";

/*
Exercice 15: Completing all the workshop in a single transaction!
In this exercice you should:
- Implement a contract that complies with interface Iex14Solution
- Call the appropriate function here to trigger collecting points

Note: this contract only check if all 13 previous exercices were validated in the same transaction
*/

contract ex15 is exerciceTemplate {
    constructor(ERC20TD _TDERC20) exerciceTemplate(_TDERC20) {}

    function askForPoints() public {
        // Checking that solution has no token yet
        uint256 initialBalance = TDERC20.balanceOf(msg.sender);
        require(initialBalance == 0, "Solution should start with 0 points");

        // Calling the solution so that it solves the workshop
        Iex14Solution callerSolution = Iex14Solution(msg.sender);
        callerSolution.completeWorkshop();

        // Checking that at least 10 exercices where validated
        uint256 finalBalance = TDERC20.balanceOf(msg.sender);
        uint256 decimals = TDERC20.decimals();
        require(
            finalBalance >= 10 ** decimals * 26,
            "Solution should end with at least than 26 points"
        );

        // Validating exercice
        creditStudent(2, msg.sender);
        validateExercice(msg.sender);
    }
}