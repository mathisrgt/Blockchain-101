// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 3: Using a simple public contract function
In this exercise, you need to:
- Use this contract's claimPoints() function
- Understand the require() keyword and send the correct value to pass the requirement
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) Understanding requires https://docs.soliditylang.org/en/v0.6.0/control-structures.html#id4
*/
contract Ex03 is ExerciseTemplate {
    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    function claimPoints(uint _studentUint) public {
        require(_studentUint == 180618, "Value is incorrect");

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
