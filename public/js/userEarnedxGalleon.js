import { LOCK_ADDRESS } from "/constants/address.js";
import { LOCK_ABI } from "/constants/abi.js";

let totalEarnedxGalleon = document.querySelector('#totalEarnedxGalleon');

export const userEarnedxGalleon = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
    const balance = await contract?.totalRewardxGalleon(signer.getAddress());
    const userTotalEarned = await ethers.utils.formatEther(balance)
    totalEarnedxGalleon.innerHTML = await userTotalEarned;
};