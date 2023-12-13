import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

export const checkHitCooldown = async () => {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

    const hitCooldown = await contract?.cooldown(signer.getAddress());
    const blocktime = await contract.blockTime();

    if (hitCooldown > blocktime) {
        await window.alert("Wait or Break Cooldown!")
        await console.log("DENEME")
    }
}