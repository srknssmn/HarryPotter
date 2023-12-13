export const verifyNetwork = async () => {

    // Sepolia Network Verifying
    const tenID = await '0x1BB';
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
    
    if (chainId === tenID){
        console.log("Bravo!, you are on the correct network")
        
    } else {
  
        console.log("oulalal, switch to the correct network");
        
        try {
        
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: tenID}],
            });
            console.log("You have succefully switched to Obscuro Testnet")
        
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
};