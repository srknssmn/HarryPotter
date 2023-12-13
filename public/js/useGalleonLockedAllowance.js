import { GALLEONTOKEN_ADDRESS, LOCK_ADDRESS } from "/constants/address.js";
import { ERC20 } from "/constants/abi.js";
import {verifyNetwork} from "/js/verifyNetwork.js"; 

// ROCKET TOKEN'da approve işlemi ile; Lock kontratında ROCKET Token kullanma izni veriyoruz. 
export const approve = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    await verifyNetwork();

    // Approve iznini vermek için signer değerini kullanıyoruz.
    const _contract = await new ethers.Contract(GALLEONTOKEN_ADDRESS, ERC20, signer);
    // Max. token kullanım izni veriyoruz!
    const txn = await _contract.approve(LOCK_ADDRESS, ethers.constants.MaxUint256);
    await txn.wait(); // Transaction'ın tamamlanmasını bekletiyoruz!
}

// Verilen izni view yapmak için fonksiyon:
export const getAllowance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(GALLEONTOKEN_ADDRESS, ERC20, provider);
    const result = await _contract.allowance(signer.getAddress(), LOCK_ADDRESS);
    return result;
}