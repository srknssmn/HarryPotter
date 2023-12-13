import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";
import {checkProCooldown} from "/js/checkProCooldown.js";

document.querySelector("#healthHarryButton").addEventListener('click' , protectionFunc)
document.querySelector("#healthVoldemortButton").addEventListener('click' , protectionFunc)

let modalHealthButtonOpen = document.querySelector('#modalHealthButtonOpen')
let modalHealthButtonClose = document.querySelector('#modalHealthButtonClose')

let healthAudio = document.querySelector('#healthAudio')

function playAudio(audio) {
    return new Promise(res=>{
        audio.play()
        audio.onended = res
      }) 
}

async function protectionFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

        await checkProCooldown();
        const txn = await contract.protect();
        modalHealthButtonOpen.click();
        await playAudio(healthAudio)
        await txn.wait();
        await modalHealthButtonClose.click();
        await console.log("success")
        await location.reload();
    } else {
        connectWalletfunc();
    }

}