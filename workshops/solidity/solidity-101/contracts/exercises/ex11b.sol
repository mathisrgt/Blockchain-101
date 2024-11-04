// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 11: Finding a hidden exercise
In this exercise, you need to:
- Read the documentation of another contract to understand its structure
- Extract contract ABI
- Use the ABI to extract the contract content and find the missing contract
- Call the contract function
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) Documentation of the Kelsen framework on https://github.com/97network/Kelsen/blob/master/docs/01_standardOrgan.md

*/
contract Ex11b is ExerciseTemplate {
    uint public secretValue;

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {
        secretValue = 31020;
    }

    function setSecretValue(uint _newSecretValue) public onlyTeachers {
        secretValue = _newSecretValue;
    }
}
