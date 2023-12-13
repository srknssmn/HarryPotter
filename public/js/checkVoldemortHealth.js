import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let voldemortHealthID = document.querySelector('#voldemortHealthID')
let voldemortHealthP = document.querySelector('#voldemortHealthP')

export const voldemortHealth = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    
    const totalVoldemortHealth = await contract.voldemortTeam();
    const totalVoldemortHealthAmount = await ethers.utils.formatEther(totalVoldemortHealth)
    let totalVoldemortHealthAmount1 = await totalVoldemortHealthAmount * 1000000000000000;
    let totalVoldemortHealthAmount2 = await totalVoldemortHealthAmount1 * 1000;
    let totalVoldemortHealthAmount3 = await Math.round(totalVoldemortHealthAmount2)
    voldemortHealthID.innerHTML = await totalVoldemortHealthAmount3
    let amount = await (10000000 - totalVoldemortHealthAmount3) / 10000000 * 100
    voldemortHealthP.style.width = `${amount}%`;
};