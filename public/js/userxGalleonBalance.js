import { XGALLEONTOKEN_ADDRESS } from "/constants/address.js";
import { ERC20 } from "/constants/abi.js";
import {verifyNetwork} from "/js/verifyNetwork.js"; 

let ownedxGalleon = document.querySelector('#ownedxGalleon')

export const userxGalleonBalance = async () => {
    await verifyNetwork();
    
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();    

    const _contract = await new ethers.Contract(XGALLEONTOKEN_ADDRESS, ERC20, signer);

    const balance = await _contract.balanceOf(signer.getAddress())
    const xgalleonBalance = await ethers.utils.formatEther(balance)
    await console.log(xgalleonBalance)
    ownedxGalleon.innerHTML = await xgalleonBalance;
}