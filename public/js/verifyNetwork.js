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
                console.log("This network is not available in your metamask, please add it")

                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                        { chainId: '0x1BB', 
                        chainName:'Obscuro Testnet',
                        rpcUrls:['https://testnet.obscu.ro/v1/?token=4ec0effbaf46bd5f76642e18aedea4638f1c26f2'],
                        blockExplorerUrls: ['https://testnet.tenscan.com'],
                        nativeCurrency: {
                        symbol:'ETH', // 2-6 characters long
                    decimals: 18
                    }
                        
                        }],
                    });
                    } catch (addError) {
                        // handle "add" error
                        console.log(addError);
                    }
            }
        }
    }
};