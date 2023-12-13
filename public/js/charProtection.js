import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userProtection = document.querySelector('#userProtection');

export const checkProtection = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const charProtection = await contract?.playerProtection(signer.getAddress());
    // const charPowerAmount = await ethers.utils.formatEther(charPower) * Math.pow(10, 18)
    userProtection.innerHTML = charProtection;
};