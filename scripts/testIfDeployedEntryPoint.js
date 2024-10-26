//A script that tests if your code is deployed or not:
const hre = require("hardhat");

async function main(){
    const EP_LOCAL_DEPLOYED_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const AF_LOCAL_DEPLOYED_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const SMART_ACCOUNT_DEPLOYED_ADDRESS = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";
    const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


    const smart_account = await hre.ethers.getContractAt("Account", SMART_ACCOUNT_DEPLOYED_ADDRESS);
    const count_state = await smart_account.increment();

    console.log(count_state);    
}

main().catch(e => {
    console.error(e);
    process.exitCode = 1;
});