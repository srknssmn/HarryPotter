import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userNickname = document.querySelector('#userNickname');

export const checkChar = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const charName = await contract?.playerName(signer.getAddress());
    userNickname.innerHTML = await charName;
};