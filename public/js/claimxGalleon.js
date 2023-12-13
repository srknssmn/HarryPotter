import { LOCK_ADDRESS } from "/constants/address.js";
import { LOCK_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";

document.querySelector("#claimxGalleonButton").addEventListener('click' , claimGalleonFunc)

async function claimGalleonFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
        const xgalleonAmount = await contract?.xgalleonAmount(signer.getAddress());

        if (!(xgalleonAmount > 0)) {
            await window.alert("No $GALLEON REWARD!")
        } else {
            const txn = await contract.claimxGalleon();
            await txn.wait();
            await console.log("success")
            await location.reload();
        }

    } else {
        connectWalletfunc();
    }

}