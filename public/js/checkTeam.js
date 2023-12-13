import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userTeam = document.querySelector('#userTeam');
let healthHarryButton = document.querySelector('#healthHarryButton');
let attackHarryButton = document.querySelector('#attackHarryButton');
let healthVoldemortButton = document.querySelector('#healthVoldemortButton');
let attackVoldemortButton = document.querySelector('#attackVoldemortButton');
let exampleModalLabelAct = document.querySelector('#exampleModalLabelAct');
let healthModalLabelAct = document.querySelector('#healthModalLabelAct');

export const checkTeam = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    
    const charTeam = await contract?.playerTeam(signer.getAddress());
    userTeam.innerHTML = await charTeam;
    console.log(charTeam)
    if (charTeam == "Voldemort") {
        attackHarryButton.hidden = await false;
        healthVoldemortButton.hidden = await false;
        attackVoldemortButton.hidden = await true;
        healthHarryButton.hidden = await true;
        exampleModalLabelAct.innerHTML = "H. Potter"
        healthModalLabelAct.innerHTML = "Lord Voldemort"
    } else if(charTeam == "Potter") {
        attackVoldemortButton.hidden = await false;
        healthHarryButton.hidden = await false;
        attackHarryButton.hidden = await true;
        healthVoldemortButton.hidden = await true;
        exampleModalLabelAct.innerHTML = "Lord Voldemort"
        healthModalLabelAct.innerHTML = "H. Potter"
    }
};