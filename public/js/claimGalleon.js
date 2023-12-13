import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";

document.querySelector("#claimGalleonTokens").addEventListener('click' , claimGoldsFunc)

async function claimGoldsFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
        const galleonReward = await contract?.playerReward(signer.getAddress());

        if (!(galleonReward > 0)) {
            await window.alert("No $GALLEON REWARD!")
        } else {
            const txn = await contract.claimGalleon();
            await txn.wait();
            await console.log("success")
            await location.reload();
        }

    } else {
        connectWalletfunc();
    }

}