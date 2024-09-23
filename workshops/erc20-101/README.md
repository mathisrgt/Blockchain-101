Here is a revised and improved version of the README:

# Solidity-101

## Introduction

Welcome to Solidity-101, an automated workshop designed to introduce you to Solidity and smart contracts. This workshop is perfect for developers who are new to both Solidity and blockchain technology.

## Workshop Overview

This workshop consists of two main components:
- An ERC20 token with the ticker `TD-SOL-101`, which is used to track your progress in the form of points.
- A series of 15 exercises that will mint and distribute `TD-SOL-101` tokens as you complete them.

Your goal is to earn as many `TD-SOL-101` points as possible. Please note:
- You will need testnet Ether to participate. Search for "Sepolia testnet faucet" on Google to acquire some.
- The `transfer` function of the `TD-SOL-101` token has been disabled. This is to ensure you complete the workshop with a single wallet address.

## How to Get Started

### Workshop Structure

The instructions for each exercise are embedded within the respective exercise contract located in the [contracts/exercises](contracts/exercices) directory. Each exercise inherits from the [ExerciseTemplate](contracts/exerciceTemplate.sol), which contains shared logic for validating student work and distributing points.

The exercises are deployed on the Sepolia testnet, and you can interact with them through:
- [MyCrypto](https://mycrypto.com/contracts/interact) using the provided contract ABIs from the [build/contracts](build/contracts) folder.
- [Starton](https://app.starton.com/auth/login?redirect_to=https://app.starton.com/projects) using the provided contract ABIs from the [build/contracts](build/contracts) folder.
- Alternatively, you can use Etherscan to interact with the contracts.
- If you know how to use web3 libraries, whatever the language, you can use them to interact with the contracts.

### Earning Points

To earn points, you must execute code within each smart contract to trigger the function call:
```solidity
creditStudent(n, msg.sender);
```
This function will credit you with `n` points. You can infer the expected actions by carefully reviewing the code in each exercise contract.

## Exercise Contract Addresses

Below is a table of the exercises, their corresponding smart contracts, and links to interact with them on Etherscan:

| Topic                        | Contract Code                                         | Contract on Etherscan                                                                                     |
|------------------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Points Counter ERC20          | [Points counter ERC20](contracts/TDERC20.sol)        | [Link](https://sepolia.etherscan.io/address/0x491421D72FE3Ce027307dA0205A2f7Ca3115F0cb)                     |
| Calling a Function            | [Ex01](contracts/exercices/ex01.sol)                 | [Link](https://sepolia.etherscan.io/address/0x9DC488038175076Ab6A645682A9148D63D5841d4)                     |
| Payable Function              | [Ex02](contracts/exercices/ex02.sol)                 | [Link](https://sepolia.etherscan.io/address/0x9119605dAFEFb09dfc620E9DA7dfD6Ec62A4c442)                     |
| Requires                      | [Ex03](contracts/exercices/ex03.sol)                 | [Link](https://sepolia.etherscan.io/address/0x452f85840E684d90a7AEa284F0d12FEe469F469a)                     |
| Storage Variables             | [Ex04](contracts/exercices/ex04.sol)                 | [Link](https://sepolia.etherscan.io/address/0xC24143b12c83Aaec0FB90fe90f219623bc048c0E)                     |
| Mappings                      | [Ex05](contracts/exercices/ex05.sol)                 | [Link](https://sepolia.etherscan.io/address/0xa85809209a62B63DFC31cDcd64D9916d6BD282Ea)                     |
| Variable Visibility           | [Ex06](contracts/exercices/ex06.sol)                 | [Link](https://sepolia.etherscan.io/address/0xB60D22a999C28F72F458a05B2d0bcFdACa8C0ECE)                     |
| Events                        | [Ex07](contracts/exercices/ex07.sol)                 | [Link](https://sepolia.etherscan.io/address/0x99f784B753A0564C99c1D33C027E4306767e186e)                     |
| Structures                    | [Ex08](contracts/exercices/ex08.sol)                 | [Link](https://sepolia.etherscan.io/address/0x762BcEC18b99A687b05FA4db69a8D80D1E9fa2E5)                     |
| Code History                  | [Ex09](contracts/exercices/ex09.sol)                 | [Link](https://sepolia.etherscan.io/address/0xF3a5182fCd6b44D2519A987290277FDe38F452fc)                     |
| Past Transactions             | [Ex10](contracts/exercices/ex10.sol)                 | [Link](https://sepolia.etherscan.io/address/0xA4Ee30cB5730a8e6609a532E6111E774bC206200)                     |
| Composability                 | [Ex11](contracts/exercices/ex11.sol)                 | [Link](https://sepolia.etherscan.io/address/0x98c0415C1ABf4C4e08a6FeB1CaC95b9CEA4673F0)                     |
| Blockchain Forensics          | [Ex12](contracts/exercices/ex12.sol)                 | Undisclosed                                                                                                |
| Deploy Your Own Contract       | [Ex14](contracts/exercices/ex14.sol)                 | [Link](https://sepolia.etherscan.io/address/0x6Df72d38CC7D5A181aa2A026e89d8D95a8576619)                     |
| All in One!                   | [Ex15](contracts/exercices/ex15.sol)                 | [Link](https://sepolia.etherscan.io/address/0xeB5580Dc9c8bd981DE70B518Cc2d614E2CE7BDE4)                     |

Good luck, and happy coding!