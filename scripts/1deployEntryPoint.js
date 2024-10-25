const hre = require("hardhat");

async function main(){
    const entry_point_instance = await hre.ethers.deployContract("EntryPoint"); //from the account abstraction node module

    await entry_point_instance.waitForDeployment();

    console.log(`Entry point contract is deployed to ${entry_point_instance.target}`);
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});