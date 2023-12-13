const buttonSelects = document.querySelectorAll('.buttonSelect');
let chooseHeroPotter = document.querySelector('#chooseHeroPotter')
let chooseHeroVoldemort = document.querySelector('#chooseHeroVoldemort')
let teamSelectCheck = document.querySelector('#teamSelectCheck')
let charSelectSection = document.querySelector('#charSelectSection')

let HPSELECT = document.querySelector('#HPSELECT')
let RWSELECT = document.querySelector('#RWSELECT')
let HGSELECT = document.querySelector('#HGSELECT')
let LVSELECT = document.querySelector('#LVSELECT')
let BLSELECT = document.querySelector('#BLSELECT')
let LMSELECT = document.querySelector('#LMSELECT')

buttonSelects.forEach(button => {
    button.addEventListener('click', () => {
      buttonSelects.forEach(button => button.classList.remove('active'));
      button.classList.add('active');
      if(button.classList.contains('active') && (button.getAttribute('id') == "potterTeam")) {
        teamSelectCheck.value = "potterTeam"
        console.log(teamSelectCheck.value)
        charSelectSection.hidden = false;
        chooseHeroPotter.hidden = false;
        chooseHeroVoldemort.hidden = true;
        HPSELECT.hidden = false;
        RWSELECT.hidden = false;
        HGSELECT.hidden = false;
        LVSELECT.hidden = true;
        BLSELECT.hidden = true;
        LMSELECT.hidden = true;
      } else if (button.classList.contains('active') && (button.getAttribute('id') == "voldemortTeam")) {
        teamSelectCheck.value = "voldemortTeam"
        console.log(teamSelectCheck.value)
        charSelectSection.hidden = false;
        chooseHeroVoldemort.hidden = false;
        chooseHeroPotter.hidden = true;
        LVSELECT.hidden = false;
        BLSELECT.hidden = false;
        LMSELECT.hidden = false;
        HPSELECT.hidden = true;
        RWSELECT.hidden = true;
        HGSELECT.hidden = true;
      }
    });
});