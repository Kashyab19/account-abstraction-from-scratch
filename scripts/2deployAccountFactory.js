const hre = require("hardhat");

async function main(){
    const account_factory = await hre.ethers.deployContract("AccountFactory"); //from the account abstraction node module

    await account_factory.waitForDeployment();

    console.log(`Account Factory needed for initCode is deployed to ${account_factory.target}`);
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});