// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise: Compute a number using inline assembly
In this exercise, you need to:
- Compute the value of `_valueToCompute` using inline assembly
- The computed value must match `aValueToCompare`
*/

contract ExInlineAssembly is ExerciseTemplate {
    uint256 public constant aValueToCompare = 30;

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {
    }

    function computeAndSubmit(uint _valueToCompute) public {
        uint computedValue;

        assembly {
            computedValue := add(add(mul(_valueToCompute, 2), 4), 192)
        }

        require(computedValue == aValueToCompare, "Computed value does not match the expected result");

        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
