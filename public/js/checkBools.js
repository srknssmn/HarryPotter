import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let userSpecialPower = document.querySelector('#userSpecialPower');
let userWeapon = document.querySelector('#userWeapon');
let userArmor = document.querySelector('#userArmor');

export const checkUserBools = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    const playerSpell = await contract?.playerSpell(signer.getAddress());
    const playerArmor = await contract?.playerArmor(signer.getAddress());
    const playerSpecialPower = await contract?.playerSpecialPower(signer.getAddress());
    userSpecialPower.innerHTML = await playerSpecialPower;
    userWeapon.innerHTML = await playerSpell;
    userArmor.innerHTML = await playerArmor;
};