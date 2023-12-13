import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userPower = document.querySelector('#userPower');

export const checkPower = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const charPower = await contract?.playerPower(signer.getAddress());
    userPower.innerHTML = charPower;
};