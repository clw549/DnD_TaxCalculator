
characterSubmit = document.getElementById('submitButton').addEventListener("click", saveCharacter);

const formName = document.getElementById('c_name');
const formGold = document.getElementById('gold');
const formSilver = document.getElementById('silver');
const formCopper = document.getElementById('copper');
const formTax = document.getElementById("tax_rate");
const formMarried = document.getElementById("married");
const response = document.getElementById("response");
const tax_div = document.getElementById("tax_div");

function saveCharacter() {
  characterName = formName.value;
  gold = Number(formGold.value);
  silver = Number(formSilver.value);
  copper = Number(formCopper.value);
  married = formMarried.value;
  tax_rate = Number(formTax.value);


  moneyValue = Number((gold*100) + (silver *10) + (copper));

  document.cookie = "name=" + characterName;
  document.cookie = "value=" + moneyValue.toString();
  document.cookie = "married=" + married;
  document.cookie = "tax_rate=" + tax_rate.toString();

  [copper_tax, silver_tax, gold_tax] = calculateTax(moneyValue, tax_rate, married);

  loadCharacter(); 
}

function loadCharacter() {
  characterName = getCookie("name");
  coin_value = Number(getCookie("value"));
  tax_rate = Number(getCookie("tax_rate"));
  married = getCookie("married");

  [copper, silver, gold] = valueToCoin(coin_value);

  [copper_tax, silver_tax, gold_tax] = calculateTax(coin_value, tax_rate, married);
  displayTax(copper_tax, silver_tax, gold_tax);


  displayCharacter(characterName, gold, silver, copper, married);
}
loadCharacter()

function getCookie(cookie_name) {
  cookies = document.cookie;
  split_cookies = cookies.split(';');
  for(let index = 0; index < split_cookies.length; index++) {
    cookie = split_cookies[index];

    while(cookie[0] == ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(cookie_name) == 0) {
      return cookie.substring(cookie_name.length+1, cookie.length)
    }
  }
  return ""
}

function valueToCoin(coin_value)
{
  copper = coin_value % 10;
  silver = ((coin_value - copper)%100)/10;
  gold = (coin_value - copper - silver *10)/100;

  coins = [copper, silver, gold];
  return coins;
}

function calculateTax(value, tax_percent, married) 
{
  if (married == "m" || married == "married") 
  {
    tax_percent = tax_percent / 2;
  }
  tax = Math.round(value * tax_percent)
  console.log(tax);
  copper_tax = tax%10;
  silver_tax = ((tax-copper_tax)%100)/10;
  gold_tax = (tax-copper_tax-silver_tax*10)/100;
  tax = [copper_tax, silver_tax, gold_tax];
  return tax;
}

function displayCharacter(character_name, gold, silver, copper, married)
{
  response.innerText = "Name: " + character_name + "\nGold: " + gold + 
                      "\nSilver: " + silver + "\nCopper: " + copper + 
                      "\nMarried: " + married;
}

function displayTax(copper_tax, silver_tax, gold_tax) 
{
  tax_div.innerText = "Tax to pay: \nCopper: " + copper_tax + "\nSilver: " 
                    + silver_tax + "\nGold: " + gold_tax;
}