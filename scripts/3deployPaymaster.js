const hre = require("hardhat");

async function main(){
    const simple_paymaster = await hre.ethers.deployContract("Paymaster"); //from the account abstraction node module

    await simple_paymaster.waitForDeployment();

    console.log(`A simple Paymaster is deployed to ${simple_paymaster.target}`);
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});