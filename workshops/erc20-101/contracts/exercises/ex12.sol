// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciceTemplate.sol";

/*
Exercice 12: Finding a hidden exercice
In this exercice, you need to:
- Explore the block explorer to find the address of a this exercise contract (you can start your journey from the erc20 address)
- Find ex12 address
- Claim points
*/
contract ex12 is exerciceTemplate {
    uint public aValueToInput;

    constructor(ERC20TD _TDERC20) exerciceTemplate(_TDERC20) {
        aValueToInput == 0;
    }

    function askForPoints(uint _valueToInput, uint _newValue) public {
        require(_valueToInput == aValueToInput);
        aValueToInput = _newValue;

        // Validating exercice
        creditStudent(2, msg.sender);
        validateExercice(msg.sender);
    }
}
