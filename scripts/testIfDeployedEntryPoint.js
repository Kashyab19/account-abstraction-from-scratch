//A script that tests if your code is deployed or not:
const hre = require("hardhat");

async function main(){
    const EP_LOCAL_DEPLOYED_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const AF_LOCAL_DEPLOYED_ADDRESS = "0x95401dc811bb5740090279Ba06cfA8fcF6113778";
    const SMART_ACCOUNT_DEPLOYED_ADDRESS = "0x3fA4E6e03Fbd434A577387924aF39efd3b4b50F2";
const PM_ADDRESS = "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f";

    const code = await hre.ethers.provider.getCode(EP_LOCAL_DEPLOYED_ADDRESS)

    const smart_account = await hre.ethers.getContractAt("Account", SMART_ACCOUNT_DEPLOYED_ADDRESS);
    const count_state = await smart_account.increment();

    console.log(count_state.value);

    console.log("Account's Balance", await hre.ethers.provider.getBalance(AF_LOCAL_DEPLOYED_ADDRESS));

    const ep = await hre.ethers.getContractAt("EntryPoint", EP_LOCAL_DEPLOYED_ADDRESS);
    console.log("EP's Account's Balance", await ep.balanceOf(AF_LOCAL_DEPLOYED_ADDRESS));


    console.log("PM's Balance", await ep.balanceOf(PM_ADDRESS));

    //console.log(`Entry point contract is successfully deployed to ${code}`); //gives the ABI code
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});