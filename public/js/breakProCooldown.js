import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";

document.querySelector("#breakProCooldown").addEventListener('click' , breakProCooldownFunc)

async function breakProCooldownFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

        const playerXP = await contract?.playerXP(signer.getAddress());

        if (playerXP < 5) {
            await window.alert("insufficient xp!")
        } else {
            const txn = await contract.breakHitCooldown();
            await txn.wait();
            await console.log("success")
            await location.reload();
        }
    } else {
        connectWalletfunc();
    }

}