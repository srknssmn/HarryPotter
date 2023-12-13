import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let potterHealthID = document.querySelector('#potterHealthID')
let potterHealthP = document.querySelector('#potterHealthP')

export const potterHealth = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    
    const totalPotterHealth = await contract.potterTeam();
    const totalPotterHealthAmount = await ethers.utils.formatEther(totalPotterHealth)
    let totalPotterHealthAmount1 = await totalPotterHealthAmount * 1000000000000000;
    let totalPotterHealthAmount2 = await totalPotterHealthAmount1 * 1000;
    let totalPotterHealthAmount3 = await Math.round(totalPotterHealthAmount2)
    potterHealthID.innerHTML = await totalPotterHealthAmount3
    let amount = await (10000000 - totalPotterHealthAmount3) / 10000000 * 100
    potterHealthP.style.width = `${amount}%`;
};