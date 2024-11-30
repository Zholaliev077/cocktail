const form = document.querySelector("form");
const input = document.querySelector("#search");
const select = document.querySelector("#select");
const output = document.querySelector("#output");
const random = document.querySelector("#random");

const API = "https://www.thecocktaildb.com/api/json/v1/1/";
const GET_ALL_COCKTAILS = API + "filter.php?c=Cocktail";
const GET_BY_NAME = API + "search.php?s=";
const GET_BY_FILTER = API + "filter.php?a=";
const GET_BY_ID = API + "lookup.php?i=";

// ===============================================
const fetchALLcocktails = async () => {
  const req = await fetch(GET_ALL_COCKTAILS);
  const res = await req.json();
  renderCocktails(res.drinks);
};

// ================================================================================================================================
const fetchCOCname = async (e) => {
  e.preventDefault();
  if (!input.value.trim().length) return;
  const req = await fetch(GET_BY_NAME + input.value);
  const res = await req.json();
  renderCocktails(res.drinks);
};

// ==================================================================================================================================
const Fetchcocraildetail = async (id) => {
  // console.log(id);
  const req = await fetch(GET_BY_ID + id);
  const res = await req.json();
  renderDetailcocktail(res.drinks[0]);
};

// =====================================================================================================================================
const fetchByFilter = async () => {
  //   console.log(select.value);
  if (select.value == "all") {
    return fetchALLcocktails();
  }
  const req = await fetch(GET_BY_FILTER + select.value);
  const res = await req.json();
  renderCocktails(res.drinks);
};




// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const renderCocktails = (data) => {
  //   console.log(data);
  output.innerHTML = "";
  data && data.length > 0
    ? data.map((el) => {
        const card = document.createElement("div");
        card.className = "card";
        const image = document.createElement("img");
        image.src = el.strDrinkThumb;
        image.alt = `фото коктейля ${el.strDrink} `;
        const title = document.createElement("h2");
        title.textContent = el.strDrink;

        card.addEventListener("click", () => {
          Fetchcocraildetail(el.idDrink);
        });

        card.append(image, title);
        output.append(card);
      })
    : (output.innerHTML = `<h1>cockstails did not find</h1>`);
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const renderDetailcocktail = (cocktail) => {
  console.log(cocktail);
  output.innerHTML = "";
  const wrapper = document.createElement("div");
  const image = document.createElement("img");
  image.src = cocktail.strDrinkThumb;
  image.alt = ` photo ${cocktail.strDrinks}`;
  const title = document.createElement("h1");
  title.textContent = cocktail.strDrink;
  const ol = document.createElement("ol");

  for (let key in cocktail) {
    // console.log();
    // console.log(cocktail[key]);
    if (key.includes("strIngredient") && cocktail[key]) {
      const li = document.createElement("li");
      li.textContent = cocktail[key];
      ol.append(li);
    }
  }

  wrapper.append(image, title, ol);
  output.append(wrapper);
};



form.addEventListener("submit", fetchCOCname);

select.addEventListener("change", fetchByFilter);

fetchALLcocktails();
