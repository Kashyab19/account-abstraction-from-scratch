// Add this at the beginning of your app.js
if (typeof ethers === 'undefined') {
    console.error("Ethers library is not loaded. Please check your internet connection and try again.");
    alert("Failed to load necessary libraries. Please refresh the page and try again.");
}

const ENTRY_POINT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ACCOUNT_FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

let provider, signer, entryPoint, accountFactory, account;

async function connectWallet() {
    console.log("Connecting wallet...");
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const address = await signer.getAddress();
            document.getElementById('wallet-address').textContent = address;
            console.log("Wallet connected:", address);
            await updateBalance();
            await setupContracts();
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert("Failed to connect wallet. See console for details.");
        }
    } else {
        console.error("Ethereum provider not found");
        alert("Please install MetaMask or use a Web3-enabled browser!");
    }
}

async function updateBalance() {
    console.log("Updating balance...");
    if (signer) {
        try {
            const balance = await signer.getBalance();
            document.getElementById('wallet-balance').textContent = `${ethers.utils.formatEther(balance)} ETH`;
            console.log("Balance updated");
        } catch (error) {
            console.error("Failed to update balance:", error);
        }
    } else {
        console.error("Signer not available for balance update");
    }
}

async function setupContracts() {
    console.log("Setting up contracts...");
    try {
        const EntryPoint = await fetch('./artifacts/contracts/EntryPoint.sol/EntryPoint.json').then(res => res.json());
        entryPoint = new ethers.Contract(ENTRY_POINT_ADDRESS, EntryPoint.abi, signer);

        const AccountFactory = await fetch('./artifacts/contracts/Account.sol/AccountFactory.json').then(res => res.json());
        accountFactory = new ethers.Contract(ACCOUNT_FACTORY_ADDRESS, AccountFactory.abi, signer);

        console.log("Contracts set up successfully");
    } catch (error) {
        console.error("Failed to set up contracts:", error);
        alert("Failed to set up contracts. See console for details.");
    }
}

async function createAccount() {
    console.log("Creating account...");
    if (!accountFactory || !signer) {
        console.error("AccountFactory or signer not available");
        alert("Please connect your wallet first!");
        return;
    }
    try {
        const userAddress = await signer.getAddress();
        console.log("Creating account for address:", userAddress);
        const tx = await accountFactory.createAccount(userAddress);
        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        console.log("Transaction confirmed");
        alert("ERC-4337 Account created successfully!");
        const accountAddress = await accountFactory.getAddress(userAddress);
        const Account = await fetch('./artifacts/contracts/Account.sol/Account.json').then(res => res.json());
        account = new ethers.Contract(accountAddress, Account.abi, signer);
    } catch (error) {
        console.error("Failed to create account:", error);
        alert("Failed to create account. See console for details.");
    }
}

async function incrementCounter() {
    if (!entryPoint || !account) {
        alert("Please connect your wallet and create an ERC-4337 account first!");
        return;
    }
    try {
        const userOp = {
            sender: account.address,
            nonce: await entryPoint.getNonce(account.address, 0),
            initCode: "0x",
            callData: account.interface.encodeFunctionData("increment"),
            callGasLimit: 200000,
            verificationGasLimit: 200000,
            preVerificationGas: 50000,
            maxFeePerGas: ethers.utils.parseUnits("10", "gwei"),
            maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
            paymasterAndData: PAYMASTER_ADDRESS,
            signature: "0x"
        };

        const userOpHash = await entryPoint.getUserOpHash(userOp);
        const signature = await signer.signMessage(ethers.utils.arrayify(userOpHash));
        userOp.signature = signature;

        const tx = await entryPoint.handleOps([userOp], await signer.getAddress());
        await tx.wait();
        alert("Counter incremented successfully!");
        updateCounterValue();
    } catch (error) {
        console.error("Failed to increment counter:", error);
        alert("Failed to increment counter. See console for details.");
    }
}

async function updateCounterValue() {
    if (account) {
        const counterValue = await account.count();
        document.getElementById('counter-value').textContent = counterValue.toString();
    }
}

async function transfer() {
    const to = document.getElementById('transfer-to').value;
    const amount = document.getElementById('transfer-amount').value;
    
    if (!ethers.utils.isAddress(to)) {
        alert("Invalid recipient address");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount");
        return;
    }

    // Implement the transfer logic here
    // This will involve creating a userOp for the transfer and sending it through the EntryPoint
    alert("Transfer functionality not yet implemented");
}

document.getElementById('connect-wallet').addEventListener('click', connectWallet);
document.getElementById('create-account').addEventListener('click', createAccount);
document.getElementById('increment-counter').addEventListener('click', incrementCounter);
document.getElementById('transfer').addEventListener('click', transfer);

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded");
    await connectWallet();
});

// Listen for network changes
if (window.ethereum) {
    window.ethereum.on('chainChanged', async (chainId) => {
        console.log("Network changed to:", chainId);
        await connectWallet();
    });
}
