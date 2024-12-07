import { ethers, run } from "hardhat";

async function main() {
  // Deploying ERC20 TD Token
  console.log("Deploying ERC20 TD Token...");
  const ERC20_102 = await ethers.getContractFactory("ERC20_102");
  const tdToken = await ERC20_102.deploy("ERC20-102", "ERC20-102", BigInt("0x108b2a2c28029094000000"));

  await tdToken.waitForDeployment();
  console.log(`TDToken deployed at: ${(tdToken as any).target}`);

  // Deploying ERC20 Claimable Token
  console.log("Deploying Claimable Token...");
  const ERC20Claimable = await ethers.getContractFactory("ERC20Claimable");
  const claimableToken = await ERC20Claimable.deploy("ClaimableToken", "CLTK", BigInt("0x108b2a2c28029094000000"));

  await claimableToken.waitForDeployment();
  console.log(`ClaimableToken deployed at: ${(claimableToken as any).target}`);

  // Deploying Evaluator Contract
  console.log("Deploying Evaluator...");
  const Evaluator = await ethers.getContractFactory("Evaluator");
  const evaluator = await Evaluator.deploy((tdToken as any).target, (claimableToken as any).target);

  await evaluator.waitForDeployment();
  console.log(`Evaluator deployed at: ${(evaluator as any).target}`);

  // Setting Permissions for the Evaluator
  console.log("Setting Permissions for Evaluator");
  await tdToken.setTeacher((evaluator as any).target, true);

  // Verify ERC-20 TD Token contract
  try {
    console.log("Verifying ERC-20 TD Token contract...");
    await run("verify:verify", {
      address: await tdToken.getAddress(),
      constructorArguments: ["ERC20-102", "ERC20-102", BigInt("0x108b2a2c28029094000000")],
    });
    console.log("ERC-20 TD Token contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }

  // Verify ERC20 Claimable Token contract
  try {
    console.log("Verifying ERC20 Claimable Token contract...");
    await run("verify:verify", {
      address: await claimableToken.getAddress(),
      constructorArguments: ["ClaimableToken", "CLTK", BigInt("0x108b2a2c28029094000000")],
    });
    console.log("ERC20 Claimable Token contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }

  // Verify Evaluator contract
  try {
    console.log("Verifying Evaluator contract...");
    await run("verify:verify", {
      address: await evaluator.getAddress(),
      constructorArguments: [(tdToken as any).target, (claimableToken as any).target],
    });
    console.log("Evaluator contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
