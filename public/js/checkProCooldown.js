import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

export const checkProCooldown = async () => {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);

    const proCooldown = await contract?.cooldownProtection(signer.getAddress());
    const blocktime = await contract.blockTime();

    if (proCooldown > blocktime) {
        await window.alert("Wait or Break Cooldown!")
    }
}