//A script that tests if your code is deployed or not:
const hre = require("hardhat");

async function main(){

    const [signer0] = await hre.ethers.getSigners();
    const signature =  signer0.signMessage(hre.ethers.getBytes(hre.ethers.id("wee")));

    console.log(signature);

    const Test = await hre.ethers.getContractFactory("Test");
    const test = await Test.deploy(signature);

    console.log("address0", await signer0.getAddress());

}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});