// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";

//Paymaster is a smart contract who is willing to pay for the sender/user's gas
contract Paymaster is IPaymaster{
    // /**
    //  * payment validation: check if paymaster agrees to pay.
    //  * Must verify sender is the entryPoint.
    //  * Revert to reject this request.
    //  * Note that bundlers will reject this method if it changes the state, unless the paymaster is trusted (whitelisted)
    //  * The paymaster pre-pays using its deposit, and receive back a refund after the postOp method returns.
    //  * @param userOp the user operation
    //  * @param userOpHash hash of the user's request data.
    //  * @param maxCost the maximum cost of this transaction (based on maximum gas and gas price from userOp)
    //  * @return context value to send to a postOp
    //  *      zero length to signify postOp is not required.
    //  * @return validationData signature and time-range of this operation, encoded the same as the return value of validateUserOperation
    //  *      <20-byte> sigAuthorizer - 0 for valid signature, 1 to mark signature failure,
    //  *         otherwise, an address of an "authorizer" contract.
    //  *      <6-byte> validUntil - last timestamp this operation is valid. 0 for "indefinite"
    //  *      <6-byte> validAfter - first timestamp this operation is valid
    //  *      Note that the validation code cannot use block.timestamp (or block.number) directly.
    //  */

    //made it to pure for simplifying purpose
    function validatePaymasterUserOp(UserOperation calldata, bytes32, uint256) pure external returns (bytes memory context, uint256 validationData){

        //this won't happen in a production environment
        context = new bytes(0);
        validationData = 0; 
    }

    /**
     * post-operation handler.
     * Must verify sender is the entryPoint
     * @param mode enum with the following options:
     *      opSucceeded - user operation succeeded. 
     *      opReverted  - user op reverted. still has to pay for gas.
     *      postOpReverted - user op succeeded, but caused postOp (in mode=opSucceeded) to revert.
     *                       Now this is the 2nd call, after user's op was deliberately reverted.
     * @param context - the context value returned by validatePaymasterUserOp
     * @param actualGasCost - actual gas used so far (without this postOp call).
     */
    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external{
        
    }
}