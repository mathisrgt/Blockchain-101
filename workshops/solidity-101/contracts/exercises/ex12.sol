// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 12: Finding a hidden exercise
In this exercise, you need to:
- Explore the block explorer to find the address of a this exercise contract (you can start your journey from the erc20 address)
- Find Ex12 address
- Claim points
*/
contract Ex12 is ExerciseTemplate {
    uint public aValueToInput;

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {
        aValueToInput == 0;
    }

    function askForPoints(uint _valueToInput, uint _newValue) public {
        require(_valueToInput == aValueToInput);
        aValueToInput = _newValue;

        // Validating exercise
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
