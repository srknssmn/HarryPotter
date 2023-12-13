import {checkChar} from "/js/checkChar.js";
import {checkTeam} from "/js/checkTeam.js";
import {voldemortHealth} from "/js/checkVoldemortHealth.js";
import {potterHealth} from "/js/checkPotterHealths.js";
import {checkCharName} from "/js/checkCharName.js";
import {checkPower} from "/js/charPower.js";
import {checkCooldown} from "/js/charCooldown.js";
import {checkProtection} from "/js/charProtection.js";
import {checkUserXP} from "/js/charXP.js";
import {checkUserHitPoint} from "/js/charHitPoint.js";
import {checkUserProPoint} from "/js/charProtectionPoint.js";
import {checkUserBools} from "/js/checkBools.js";
import {checkGalleonReward} from "/js/checkGalleonReward.js";
import {improveNeedFunc} from "/js/improveNeed.js";
import {usersArray} from "/js/usersArray.js";

import {userGalleonBalance} from "/js/userGalleonBalance.js";
import {userxGalleonBalance} from "/js/userxGalleonBalance.js";
import {userStakedGalleon} from "/js/userStakedGalleon.js";
import {userStakedGalleonValue} from "/js/userStakedGalleonValue.js";
import {userEarnedxGalleon} from "/js/userEarnedxGalleon.js";
import {userxGalleonClaimValue} from "/js/userxGalleonClaimValue.js";

window.onload = (event) => {
    isConnected();
};

let connectWalletButton = document.querySelector('#connectWallet')
let connectSection = document.querySelector('#connectSection')
let chooseTeamSection = document.querySelector('#chooseTeamSection')
let statusScreen = document.querySelector('#statusScreen')
let teamProgressPotter = document.querySelector('#teamProgressPotter')
let teamProgressVoldemort = document.querySelector('#teamProgressVoldemort')

let modal3ButtonOpen = document.querySelector('#modal3ButtonOpen')

async function isConnected() {
    const accounts = await ethereum.request({method: 'eth_accounts'});       
    if (accounts.length) {
        await console.log(`You're connected to: ${accounts[0]}`);
        let userWallet = await accounts[0]
        connectWalletButton.disabled = await true;
        let first = await userWallet.slice(0, 5)
        let last = await userWallet.slice(-5)
        connectWalletButton.innerHTML = await first + "..." + last
        connectSection.hidden = await true;
        await checkChar();
        let userNickname = await document.querySelector('#userNickname').innerHTML
        if (userNickname.length > 0) {
            teamProgressPotter.hidden = await false;
            teamProgressVoldemort.hidden = await false;
            chooseTeamSection.hidden = await true;
            statusScreen.hidden = await false;
            voldemortHealth();
            potterHealth();
            checkTeam();
            checkCharName();
            checkPower();
            checkCooldown();
            checkProtection();
            checkUserXP();
            checkUserHitPoint();
            checkUserProPoint();
            checkUserBools();
            checkGalleonReward();
            improveNeedFunc();
            usersArray();
            userGalleonBalance();
            userxGalleonBalance();
            userStakedGalleon();
            userStakedGalleonValue();
            userEarnedxGalleon();
            userxGalleonClaimValue();
        } else {
            chooseTeamSection.hidden = await false;
        }

    } else {
        console.log("Metamask is not connected");
        connectSection.hidden = await false;
        statusScreen.hidden = await true;
        await modal3ButtonOpen.click();
    }
}