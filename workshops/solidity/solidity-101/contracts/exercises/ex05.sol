// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 5: Asking another student for help 
In this exercise, you need to:
- Use this contract's functions in order to declare one of your colleague address as your helper
- Ask this colleague to send a transaction to the contract
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) "Solidity mappings are a type that has some similarities to hash tables. Solidity mappings are used to structure value types for smart contracts." https://www.bitdegree.org/learn/solidity-mappings/
https://solidity.readthedocs.io/en/develop/types.html?highlight=mapping

*/
contract Ex05 is ExerciseTemplate {
    mapping(address => address) public helpersRegister;

    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    function declareHelper(address _helperAddress) public {
        require(_helperAddress != msg.sender);
        helpersRegister[msg.sender] = _helperAddress;
    }

    function helpColleague(address _helpedColleague) public {
        require(hasCompletedExercise[_helpedColleague] != true);
        require(helpersRegister[_helpedColleague] == msg.sender);

        // Validating exercise
        creditStudent(2, _helpedColleague);
        validateExercise(_helpedColleague);
    }
}
