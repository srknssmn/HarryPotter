import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";
import {checkHitCooldown} from "/js/checkHitCooldown.js";

document.querySelector("#attackHarryButton").addEventListener('click' , hitFunc)
document.querySelector("#attackVoldemortButton").addEventListener('click' , hitFunc)

let modalButtonOpen = document.querySelector('#modalButtonOpen')
let modalButtonClose = document.querySelector('#modalButtonClose')

let hitAudio = document.querySelector('#hitAudio')

function playAudio(audio) {
    return new Promise(res=>{
        audio.play()
        audio.onended = res
      }) 
}

async function hitFunc(event) {
    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();

        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

        await checkHitCooldown();
        const txn = await contract.hit();
        modalButtonOpen.click();
        await playAudio(hitAudio)
        await txn.wait();
        await modalButtonClose.click();
        await console.log("success")
        await location.reload();
    } else {
        connectWalletfunc();
    }

}