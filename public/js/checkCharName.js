import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userChar = document.querySelector('#userChar');

export const checkCharName = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const charLocation = await contract?.charLocation(signer.getAddress()); 
    const character = await contract?.chars(charLocation);
    userChar.innerHTML = await character.character;
};