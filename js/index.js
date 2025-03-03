// global variables
const searchButton = document.querySelector(".search button");
let searchInput = document.querySelector(".search input");
const searchResults = document.querySelector(".search-results");
const randomObj = {};
let byName = {};
let byNameResult = [];
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
const categories = document.querySelectorAll(".swiper-slide");

// get data to random meal
async function randomMeal() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const result = await response.json();
    randomObj.id = result.meals[0].idMeal;
    randomObj.name = result.meals[0].strMeal;
    randomObj.category = result.meals[0].strCategory;
    randomObj.area = result.meals[0].strArea;
    randomObj.instructions = result.meals[0].strInstructions;
    randomObj.image = result.meals[0].strMealThumb;
    randomObj.youtube = result.meals[0].strYoutube;
    const ingredients = {};
    const measures = {};
    for (let i = 1; ; i++) {
      const ingredient = result.meals[0][`strIngredient${i}`];
      if (!ingredient) break;
      ingredients[`ingredient${i}`] = ingredient;
    }
    randomObj.ingredients = ingredients;
    for (let i = 1; ; i++) {
      const measure = result.meals[0][`strMeasure${i}`];
      if (!measure) break;
      measures[`measure${i}`] = measure;
    }
    randomObj.measures = measures;
    showRandomMeal();
    checkClickForRandom();
  } catch (error) {
    console.log(error);
  }
}

// show random meal result
function showRandomMeal() {
  const image = document.querySelector(".search-results .card .card-img-top");
  const title = document.querySelector(".search-results .card h5");
  image.src = randomObj.image;
  title.textContent = randomObj.name;
}

// click on save button on random meal
function checkClickForRandom() {
  let searchResultCopy = { ...randomObj };
  const save = document.querySelector(".random .col-12 .save");
  for (let i = 0; i < favourites.length; i++) {
    if (searchResultCopy.id === favourites[i].id)
      save.innerHTML = `<i class="fa-solid fa-bookmark not-empty"></i>`;
  }
  save.addEventListener("click", () => {
    save.style.cssText = "border:none; outline:none";
    const icon = document.querySelector(".fa-bookmark");

    if (icon.classList.contains("empty")) {
      save.innerHTML = `<i class="fa-solid fa-bookmark not-empty"></i>`;
      favourites.push(searchResultCopy);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      showSaveSuccess();
    } else if (icon.classList.contains("not-empty")) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this recipe from your favourites?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          showRemoveSuccess();
          save.innerHTML = `<i class="fa-regular fa-bookmark empty"></i>`;
          favourites = favourites.filter(
            (item) => item && String(item.id) !== String(searchResultCopy.id)
          );
          localStorage.setItem("favourites", JSON.stringify(favourites));
        }
      });
    }
  });
}

randomMeal();

//click on view recipe button when there is a random meal
document.addEventListener("DOMContentLoaded", () => {
  const viewRecipes = document.querySelector(".view-random");
  viewRecipes.addEventListener("click", () => {
    window.localStorage.randomMeal = JSON.stringify(randomObj);
    localStorage.recipeSource = JSON.stringify("viewRandom");
  });
});

//click on search button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInputValue = searchInput.value.trim();
  if (searchInputValue !== "") {
    searchByName(searchInputValue);
  }
});

//Get data after search process
async function searchByName(searchInputValue) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`
    );
    const result = await response.json();
    if (result.meals) {
      const length = Object.values(result.meals).length;
      const values = Object.values(result.meals);
      for (let i = 0; i < length; i++) {
        byName.id = values[i].idMeal;
        byName.name = values[i].strMeal;
        byName.category = values[i].strCategory;
        byName.area = values[i].strArea;
        byName.instructions = values[i].strInstructions;
        if (values[i].strMealThumb === null)
          byName.image = "images/default.png";
        else byName.image = values[i].strMealThumb;
        byName.youtube = values[i].strYoutube;
        const ingredients = {};
        const measures = {};
        for (let j = 1; ; j++) {
          const ingredient = values[i][`strIngredient${j}`];
          if (!ingredient) break;
          ingredients[`ingredient${j}`] = ingredient;
        }
        byName.ingredients = ingredients;
        for (let j = 1; ; j++) {
          const measure = values[i][`strMeasure${j}`];
          if (!measure) break;
          measures[`measure${j}`] = measure;
        }
        byName.measures = measures;
        byNameResult.push(byName);
        byName = {};
      }
      showSearchResults();
      byNameResult = [];
    } else {
      searchResults.innerHTML = `Sorry, we couldn't find any recipes matching your search. Please try using different keywords or browse through our available categories.`;
    }
  } catch (error) {
    console.log(error);
  }
}

//show results of search
function showSearchResults() {
  searchResults.innerHTML = "";
  let output = `<div class="row results">`;
  byNameResult.forEach((item) => {
    output += `
      <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
        <div class="card">
          <img src="${item.image}" alt="" class="card-img-top">
          <div class="card-body">
            <div class="name"><h5 class="card-title">${item.name}</h5></div>
            <div class="buttons d-flex justify-content-evenly align-items-center mt-3 p-1">
              <button class="btn view-search"><a href="view-recipe.html">View Recipe</a></button>
              <button class="btn save"><i class="fa-regular fa-bookmark empty"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  output += `</div>`;
  searchResults.innerHTML = output;
  viewRecipes();
  checkClick();
}

//click on view recipe button after search
function viewRecipes() {
  let searchResultsCopy = [...byNameResult];
  const results = document.querySelectorAll(".results .col-12 .view-search");
  for (let i = 0; i < results.length; i++) {
    results[i].addEventListener("click", () => {
      localStorage.searchMeal = JSON.stringify(searchResultsCopy[i]);
      localStorage.recipeSource = JSON.stringify("viewSearch");
      searchInput.value = "";
    });
  }
}

// click on a category
categories.forEach((category) => {
  category.addEventListener("click", () => {
    window.localStorage.category = category.getAttribute("data-name");
    window.location.href = "view-categories.html";
  });
});

//click on save icon after search
function checkClick() {
  let searchResultsCopy = [...byNameResult];
  const save = document.querySelectorAll(".results .col-12 .save");
  for (let i = 0; i < save.length; i++) {
    if (favourites.some((item) => item.id === searchResultsCopy[i].id)) {
      save[i].innerHTML = `<i class="fa-solid fa-bookmark not-empty"></i>`;
    }
    save[i].addEventListener("click", () => {
      const icon = save[i].querySelector(".fa-bookmark");
      console.log(searchResultsCopy[i]);
      save[i].style.cssText = "border:none;";

      if (icon.classList.contains("empty")) {
        save[i].innerHTML = `<i class="fa-solid fa-bookmark not-empty"></i>`;
        favourites.push(searchResultsCopy[i]);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        showSaveSuccess();
      } else if (icon.classList.contains("not-empty")) {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to remove this recipe from your favourites?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, remove it!",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            showRemoveSuccess();
            save[i].innerHTML = `<i class="fa-regular fa-bookmark empty"></i>`;
            favourites = favourites.filter(
              (item) => item.id !== searchResultsCopy[i].id
            );
            localStorage.setItem("favourites", JSON.stringify(favourites));
          }
        });
      }
    });
  }
}

checkClick();

//show notification when user save a recipe
function showSaveSuccess() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: "Saved successfully!",
  });
}
function showRemoveSuccess() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: "Removed successfully!",
  });
}

//monitor input changes
searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    searchResults.innerHTML = "";
    randomMeal();
  }
});
