import { HP_ADDRESS } from "/constants/address.js";
import { HP_ABI } from "/constants/abi.js";

let top10PlayersDiv = document.querySelector('#top10Players')

export const usersArray = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(HP_ADDRESS, HP_ABI, signer);
    
    const userArray = await contract.showCharsArray();
    let newUserArray = await [...userArray]
    let sortedUserArray = await newUserArray.sort((a, b) => ethers.utils.formatEther(b.playerhit) - ethers.utils.formatEther(a.playerhit));

    for (let i = 0 ; i < sortedUserArray.length ; i++ ) {
        if (i < 10) {
            const listItem = document.createElement("li");
            const div =  document.createElement("div");
            div.classList.add("d-flex" , "flex-row")
            listItem.appendChild(div);
            const kicker = document.createElement("p");
            const space2 = document.createElement("p");
            space2.innerHTML = "&nbsp = &nbsp"
            const team = document.createElement("p");
            const point = document.createElement("p");
            const kickerCount = document.createElement("p");
            div.appendChild(kicker);
            div.appendChild(team)
            div.appendChild(space2);
            div.appendChild(kickerCount);
            div.appendChild(point);
            kicker.innerHTML = sortedUserArray[i].playername;
            team.innerHTML = "&nbsp (TEAM &nbsp" + sortedUserArray[i].team + ")"
            point.innerHTML = "&nbsp (Total Hit Points)"
            kickerCount.innerHTML = sortedUserArray[i].playerhit
            top10PlayersDiv.appendChild(listItem);
        }
    }
};