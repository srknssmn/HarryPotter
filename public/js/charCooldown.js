import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userCooldown = document.querySelector('#userCooldown');
let protectionCooldown = document.querySelector('#protectionCooldown');

export const checkCooldown = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const hitCooldown = await contract?.playerHitCooldown(signer.getAddress());
    const protectionCooldownValue = await contract?.playerProCooldown(signer.getAddress());
    userCooldown.innerHTML = await hitCooldown;
    protectionCooldown.innerHTML = await protectionCooldownValue;
};