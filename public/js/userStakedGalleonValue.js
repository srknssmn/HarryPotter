import { LOCK_ADDRESS } from "/constants/address.js";
import { LOCK_ABI } from "/constants/abi.js";

let userStakedGalleon = document.querySelector('#userStakedGalleon');

export const userStakedGalleonValue = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
    const balance = await contract?.lockers(signer.getAddress());
    const stakedBalance = await ethers.utils.formatEther(balance)
    userStakedGalleon.value = await stakedBalance;
};