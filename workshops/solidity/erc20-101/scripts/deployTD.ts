// Deploying the TD somewhere
// To verify it on Etherscan:
// npx hardhat verify --network <network> <address> <constructor arg 1> <constructor arg 2>
import { ethers, run } from "hardhat";

async function main() {
  // Deploying contracts
  const ERC20_101 = await ethers.getContractFactory("ERC20_101");
  const Evaluator = await ethers.getContractFactory("Evaluator");
  const totalSupply = ethers.toBigInt("951268184000000000000000000");
  const erc20 = await ERC20_101.deploy("pg5ur3ya", "pg5ur3ya", totalSupply);

  await erc20.waitForDeployment();

  const evaluator = await Evaluator.deploy(erc20.target);

  await evaluator.waitForDeployment();

  console.log(
    `ERC20_101 deployed at ${erc20.target}`
  );

  console.log(
    `Evaluator deployed at ${evaluator.target}`
  );
  // Setting the teacher
  await erc20.setTeacher(evaluator.target, true)

  // Setting random values
  const randomSupplies = []
  const randomTickers = []
  for (let i = 0; i < 20; i++) {
    randomSupplies.push(Math.floor(Math.random() * 1000000000))
    randomTickers.push(Math.random().toString(36).substring(5))
  }

  console.log(randomTickers)
  console.log(randomSupplies)
  await evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);

  // Verify contract
  try {
    console.log("Verifying contract...");
    await run("verify:verify", {
      address: await erc20.getAddress(),
      constructorArguments: ["pg5ur3ya", "pg5ur3ya", totalSupply],
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
