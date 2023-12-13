import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userTotalProtection = document.querySelector('#userTotalProtection');

export const checkUserProPoint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const charLocation = await contract?.charLocation(signer.getAddress()); 
    const character = await contract?.chars(charLocation);
    userTotalProtection.innerHTML = await character.playerProtect;
};