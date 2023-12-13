import { LOCK_ADDRESS } from "/constants/address.js";
import { LOCK_ABI } from "/constants/abi.js";

let xgalleonClaimValue = document.querySelector('#xgalleonClaimValue');

export const userxGalleonClaimValue = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
    const balance = await contract?.xgalleonAmount(signer.getAddress());
    const userClaimValue = await ethers.utils.formatEther(balance)
    xgalleonClaimValue.value = await userClaimValue;
};