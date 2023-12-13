import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {approve, getAllowance} from "/js/useGalleonAllowance.js";

document.querySelector("#improveChar").addEventListener('click' , improveCharFunc)

async function improveCharFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {

        await approve();

        const result = await getAllowance();
        console.log(result)
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

        const txn = await contract.improveChar();
        await txn.wait();
        await console.log("success")
        await location.reload();
    } else {
        connectWalletfunc();
    }

}