import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userGoldTokens = document.querySelector('#userGoldTokens');


export const checkGalleonReward = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const galleonReward = await contract?.playerReward(signer.getAddress());
    const galleonRewardValue = await galleonReward / Math.pow(10, 18)
    userGoldTokens.innerHTML = await galleonRewardValue;

};