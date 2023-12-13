import { GALLEONTOKEN_ADDRESS } from "/constants/address.js";
import { ERC20 } from "/constants/abi.js";
import {verifyNetwork} from "/js/verifyNetwork.js"; 

let stakeValue = document.querySelector('#stakeValue')

document.querySelector('#userTokenBalance').addEventListener('click', tokenBalanceFunc)

async function tokenBalanceFunc() {
    await verifyNetwork();
    
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();    

    const _contract = await new ethers.Contract(GALLEONTOKEN_ADDRESS, ERC20, signer);

    const balance = await _contract.balanceOf(signer.getAddress())
    const galleonBalance = await ethers.utils.formatEther(balance)
    stakeValue.value = await galleonBalance;
}