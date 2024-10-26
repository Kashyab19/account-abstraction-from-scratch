// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

contract Test{
    constructor(bytes memory sign){
        address recoveredAddress = ECDSA.recover(ECDSA.toEthSignedMessageHash(keccak256(
            "wee"
        )), sign);
        console.log(recoveredAddress);
    }
}

contract Account is IAccount{
    uint256 public count;
    address public owner;
    
    constructor(address _owner){
        owner = _owner;
    }

    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256) external view  returns (uint256 validationData){
        address recoveredAddress = ECDSA.recover(ECDSA.toEthSignedMessageHash(userOpHash), userOp.signature);
        console.log(recoveredAddress);
        return owner == recoveredAddress ? 0 : 1;
    }

    function increment() external{
        count++;
    }
}

contract AccountFactory {
    function createAccount(address owner) external returns (address){
        Account acc = new Account(owner);
        return address(acc);
    }
}