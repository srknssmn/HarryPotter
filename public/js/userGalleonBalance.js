import { GALLEONTOKEN_ADDRESS } from "/constants/address.js";
import { ERC20 } from "/constants/abi.js";
import {verifyNetwork} from "/js/verifyNetwork.js"; 

let ownedGalleon = document.querySelector('#ownedGalleon')

export const userGalleonBalance = async () => {
    await verifyNetwork();
    
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();    

    const _contract = await new ethers.Contract(GALLEONTOKEN_ADDRESS, ERC20, signer);

    const balance = await _contract.balanceOf(signer.getAddress())
    const galleonBalance = await ethers.utils.formatEther(balance)
    await console.log(galleonBalance)
    ownedGalleon.innerHTML = await galleonBalance;
}