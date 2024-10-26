const hre = require("hardhat");

async function main(){

    const entry_point_instance = await hre.ethers.deployContract("EntryPoint"); //from the account abstraction node module
    await entry_point_instance.waitForDeployment();
    console.log(`Entry point contract is deployed to ${entry_point_instance.target}`);

    const account_factory = await hre.ethers.deployContract("AccountFactory"); //from the account abstraction node module
    await account_factory.waitForDeployment();
    console.log(`Account Factory needed for initCode is deployed to ${account_factory.target}`);
    
    const simple_paymaster = await hre.ethers.deployContract("Paymaster"); //from the account abstraction node module
    await simple_paymaster.waitForDeployment();
    console.log(`A simple Paymaster is deployed to ${simple_paymaster.target}`);
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});