import {verifyNetwork} from "/js/verifyNetwork.js";
document.querySelector("#connectWallet").addEventListener('click' , connectWalletfunc)

async function connectWalletfunc() {

    if (!window.ethereum) {
        window.alert("Install Metamask")
        if(confirm("Metamask Download")) document.location = 'https://metamask.io/download/';
    }

    // Sepolia Network Verifying
    const tenID = await '0x1BB';
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
    
    if (chainId === tenID){
        console.log("Bravo!, you are on the correct network")

        let walletAddress;
        // get the wallet address from metamask
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []).then((accounts) => {
            walletAddress = accounts[0];
        })
        await console.log(walletAddress)
        const signer = await provider.getSigner();
        await location.reload();
        
    } else {
  
        console.log("oulalal, switch to the correct network");
        
        try {
        
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: tenID}],
            });
            console.log("You have succefully switched to Obscuro Testnet")

            let walletAddress;
            // get the wallet address from metamask
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []).then((accounts) => {
                walletAddress = accounts[0];
            })
            await console.log(walletAddress)
            const signer = await provider.getSigner();
            await location.reload();
        
        } catch (switchError) {
            
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                window.alert("Connect at https://testnet.obscu.ro/")
                if(confirm("for Ten Gateway")) {
                    document.location = 'https://testnet.obscu.ro/';
                } else {
                    return;
                }
            }
        }
    }    
}

export {
    connectWalletfunc
}