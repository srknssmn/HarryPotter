import { LOCK_ADDRESS } from "/constants/address.js";
import { LOCK_ABI } from "/constants/abi.js";
import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";

document.querySelector("#unstakeButton").addEventListener('click' , unStakeFunc)

async function unStakeFunc() {
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
        const contractB = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

        const unStakeCooldown = await contract?.unstakeDeadline(signer.getAddress());
        const blocktime = await contractB.blockTime();

        if ((unStakeCooldown > blocktime)) {
            await window.alert("Wait Unstake Cooldown!")
        } else {
            const txn = await contract.withdrawAllTokens();
            await txn.wait();
            await console.log("success")
            await location.reload();
        }
    } else {
        connectWalletfunc();
    }
}