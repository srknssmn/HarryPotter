import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";

const charSelectButton = document.querySelector('#charSelectButton');
charSelectButton.addEventListener('click', createCharFunc)

async function createCharFunc(event) {
    event.preventDefault()
    console.log("deneme")
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

        let nickname = await document.querySelector("#nickname").value
        let teamSelectCheck = await document.querySelector('#teamSelectCheck')
        let team;
        let char = await document.querySelector("#charSelect").value;
        if (teamSelectCheck.value == "potterTeam") {
            team = await "Potter";
        } else if(teamSelectCheck.value == "voldemortTeam") { 
            team = await "Voldemort";
        }
        const txn = await contract.setChar(nickname , team , char);
        await txn.wait();
        await console.log("success")
        await location.reload();
    } else {
        connectWalletfunc();
    }

}