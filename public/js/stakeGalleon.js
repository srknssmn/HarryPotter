import { LOCK_ADDRESS } from "/constants/address.js";
import { LOCK_ABI } from "/constants/abi.js";
import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";
import {connectWalletfunc} from "/js/connectWallet.js";
import {approve, getAllowance} from "/js/useGalleonLockedAllowance.js";

document.querySelector("#stakeButton").addEventListener('click' , locktokenfunc)

async function locktokenfunc(event) {

    event.preventDefault()
    
    // get the wallet address from metamask
    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length) {

        await approve();

        const result = await getAllowance();
        console.log(result)
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(LOCK_ADDRESS, LOCK_ABI, signer);
        const contractB = await new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
        const blocktime = await contractB.blockTime();
        const stakeCooldown = await contract?.stakeDeadline(signer.getAddress());
        const currentStake = await contract?.lockers(signer.getAddress()); 
        let tokenvalueDom = document.querySelector("#stakeValue")
        let tokenvalue = String(tokenvalueDom.value)
        const _value = ethers.utils.parseEther(tokenvalue)
        let locktimeDom = document.querySelector("#locktime")
        const _time = String(locktimeDom.value)
        console.log(_time)

        if ((stakeCooldown > blocktime)) {
            await window.alert("Wait Stake Cooldown!")
        } else {
            if (currentStake > 0) {
                await window.alert("You ve got a Stake! First unlock")
            } else {
                const txn = await contract.lockTokens(_value, _time);
                await txn.wait();
                await console.log("success")
                await location.reload();
            }
        }
    } else {
        connectWalletfunc();
    }
}