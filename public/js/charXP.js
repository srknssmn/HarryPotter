import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userXP = document.querySelector('#userXP');

export const checkUserXP = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const charXP = await contract?.playerXP(signer.getAddress());
    // const charPowerAmount = await ethers.utils.formatEther(charPower) * Math.pow(10, 18)
    userXP.innerHTML = charXP;
};