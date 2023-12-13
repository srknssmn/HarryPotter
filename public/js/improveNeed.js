import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let improveNeed = document.querySelector('#improveNeed');

export const improveNeedFunc = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const improveCount = await contract?.playerImproveCount(signer.getAddress());
    const improveNeedValue = await (improveCount * 100) + 500
    await console.log(improveNeedValue)
    improveNeed.innerHTML = await improveNeedValue;
};