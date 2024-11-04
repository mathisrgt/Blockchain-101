// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "../exerciseTemplate.sol";

/*
Exercise 9: Visualizing code through Github history of commits
In this exercise, you need to:
- Use Github to explore this contract's code history of revision
- Find the last visible version of the contract code
- Use a function 
- Your points are credited by the contract
*/

/*
What you need to know to complete this exercise
A) What was included in the previous exercises
B) The history of contract modification is visible on https://github.com/l-henri/solidity-101
C) Only using the ABI of this contract puts you at risk of not getting the points you deserve

*/

contract Ex09 is ExerciseTemplate {
    constructor(ERC20TD _TDERC20) ExerciseTemplate(_TDERC20) {}

    event aLazyStudent(address _lazyStudent);

    // Find the code elsewhere
    function collectYourPoints(uint _aValueToInput) public {
        require(_aValueToInput == 982738);
        emit aLazyStudent(msg.sender);
        // Validating exercice WITHOUT crediting points. Be careful, calling this function will NOT credit points to you!
        validateExercise(msg.sender);
    }

    function collectYourPointsAgain(uint _aValueToInput) public {
        require(_aValueToInput == 972738);
        // Validating exercice, getting points
        creditStudent(2, msg.sender);
        validateExercise(msg.sender);
    }
}
