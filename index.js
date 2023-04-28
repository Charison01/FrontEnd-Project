//Variables used
const menu = document.getElementById("drinks");
const cocktailMenu = document.getElementById("cocktailMenu");
let drinkData = [];
let drinkID = 1;

//variable hlding the api
const apiURL = "http://localhost:3000/drinks";

//Fetching data from api
async function fetchingData() {
  //Try .. catch errors
  try {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      drinkData.push(...data);
      // console.log(drinkData);
      populateMenu1();
      populateMenu2();
    } else {
      throw new Error("Error fetching data");
    }
  } catch (error) {
    console.log(error);
  }
}
//Function to populate menu for cocktails
function populateMenu1() {
  //clearing the hard coded values
  menu.innerHTML = "";
  cocktailMenu.innerHTML = "";
  for (const drink of drinkData) {
    const drinkList = document.createElement("li");

    drinkList.className = "drink-items";
    drinkList.id = drink.idDrink;
    drinkList.textContent = drink.strDrink;
    // console.log(drinkList)
    //appending
    menu.appendChild(drinkList);
  }
}
//Populating cocktail menu
function populateMenu2() {
  //clearing the hard coded values
  cocktailMenu.innerHTML = "";
  for (const drink of drinkData) {
    const drinkList = document.createElement("li");

    drinkList.className = "drink-items";
    drinkList.id = drink.idDrink;
    drinkList.textContent = drink.strDrink;
    // console.log(drinkList)
    //appending
    cocktailMenu.appendChild(drinkList);
  }
  //EventListener
  cocktailMenu.addEventListener("click", (event) => {
    drinkID = event.target.id;
    drinkDisplayer(drinkID);
  });
  drinkDisplayer(drinkID);
}

function drinkDisplayer(drinkID) {
  //getting drinkID variable
  const currentDisplay = drinkData[drinkID - 1];
  //adding cocktail name
  const cocktailName = document.getElementById("cocktail-name");
  cocktailName.textContent = currentDisplay.strDrink;
  //adding image
  const cocktailImage = document.getElementById("cocktail-image");
  cocktailImage.src = currentDisplay.strDrinkThumb;
  //adding category and glass
  const cocktailCategory = document.getElementById("category");
  const cocktailGlass = document.getElementById("glass");
  cocktailCategory.textContent = currentDisplay.strCategory;
  cocktailGlass.textContent = currentDisplay.strGlass;
  //ingredients and procedure
  const nameCocktail = document.getElementById("nameIngredientSection");
  nameCocktail.textContent = currentDisplay.strDrink;
  //procedure
  const procedure = document.getElementById("procedure");
  procedure.textContent = currentDisplay.strInstructions;

  //adding ingredients
  const ingredients = document.getElementById("ingredients");
  const ul = document.createElement("ul");
  for (let i = 1; i <= 5; i++) {
    const li = document.createElement("li");
    if (currentDisplay["strIngredient" + i]) {
      li.textContent = '';
      li.textContent = currentDisplay["strIngredient" + i];

      ul.appendChild(li);
    }
  }
  ingredients.appendChild(ul);
}

fetchingData();
