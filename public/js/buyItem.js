import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {verifyNetwork} from "/js/verifyNetwork.js";
import {approve, getAllowance} from "/js/usexGalleonAllowance.js";

async function buyItemFunc(itemNo) {
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {

        await verifyNetwork();
        await approve();

        const result = await getAllowance();
        console.log(result)
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
        const txn = await contract.buyItem(itemNo);
        await txn.wait();
        await console.log("success")
        await location.reload();
    } else {
        connectWalletfunc();
    }
}

const buttonSelects = document.querySelectorAll('.buySelect');

buttonSelects.forEach(button => {
    button.addEventListener('click', () => {

      if((button.getAttribute('id') == "swordButton")) {
        buyItemFunc("a");
      } else if ((button.getAttribute('id') == "wandButton")) {
        buyItemFunc("b");
      }
    });
});