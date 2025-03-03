//global variables
const category = window.localStorage.getItem("category");
const results = [];
favourites = JSON.parse(localStorage.getItem("favourites")) || [];
const categoryResults = document.querySelector(
  ".category-results .show-results"
);
const title = document.querySelector(".category-results .title h2");

// get data when user choose a category
async function getByCategory() {
  title.textContent = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const result = await response.json();
    const mealPromises = result.meals.map((meal) =>
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      ).then((response) => response.json())
    );
    const meals = await Promise.all(mealPromises);
    results.push(...meals.map((meal) => meal.meals[0]));
    showData();
    checkSave();
  } catch (error) {
    console.log(error);
  }
}
getByCategory();

function showData() {
  categoryResults.innerHTML = "";
  let output = `<div class="row results">`;
  let displayedItems = results.slice(0, 6);
  displayedItems.forEach((item) => {
    output += `
      <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
        <div class="card">
          <img src="${item.strMealThumb}" alt="" class="card-img-top">
          <div class="card-body">
            <div class="name"><h5 class="card-title">${item.strMeal}</h5></div>
            <div class="buttons d-flex justify-content-evenly align-items-center mt-3 p-1">
              <button class="btn view"><a href="view-recipe.html">View Recipe</a></button>
              <button class="btn save"><i class="fa-regular fa-bookmark empty"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  output += `</div>`;
  if (results.length > 6) {
    output += `<div class="text-center mt-3">
                <button id="seeMoreBtn" class="btn">See More</button>
              </div>`;
  }
  categoryResults.innerHTML = output;
  let currentIndex = 6;
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", function () {
      let nextItems = results.slice(currentIndex, currentIndex + 6);
      let newCards = "";
      nextItems.forEach((item) => {
        newCards += `
          <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
            <div class="card">
              <img src="${item.strMealThumb}" alt="" class="card-img-top">
              <div class="card-body">
                <div class="name"><h5 class="card-title">${item.strMeal}</h5></div>
                <div class="buttons d-flex justify-content-evenly align-items-center mt-3 p-1">
                  <button class="btn view"><a href="view-recipe.html">View Recipe</a></button>
                  <button class="btn save"><i class="fa-regular fa-bookmark empty"></i></button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      document.querySelector(".row.results").innerHTML += newCards;
      currentIndex += 6;
      checkSave();
      if (currentIndex >= results.length) {
        seeMoreBtn.style.display = "none";
      }
      viewRecipe();
    });
    viewRecipe();
  }
}

function checkSave() {
  let newResults = changeFormat();
  let searchResultsCopy = [...newResults];
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

function changeFormat() {
  let newResults = [];
  for (let i = 0; i < results.length; i++) {
    let newObj = {};
    newObj.id = results[i].idMeal;
    newObj.name = results[i].strMeal;
    newObj.category = results[i].strCategory;
    newObj.area = results[i].strArea;
    newObj.instructions = results[i].strInstructions;
    if (results[i].strMealThumb === null) newObj.image = "images/default.png";
    else newObj.image = results[i].strMealThumb;
    newObj.youtube = results[i].strYoutube;
    const ingredients = {};
    const measures = {};
    for (let j = 1; ; j++) {
      const ingredient = results[i][`strIngredient${j}`];
      if (!ingredient) break;
      ingredients[`ingredient${j}`] = ingredient;
    }
    newObj.ingredients = ingredients;
    for (let j = 1; ; j++) {
      const measure = results[i][`strMeasure${j}`];
      if (!measure) break;
      measures[`measure${j}`] = measure;
    }
    newObj.measures = measures;
    newResults.push(newObj);
  }
  return newResults;
}

function viewRecipe() {
  const view = document.querySelectorAll(".view");
  console.log(view);
  let copy = [...results];
  view.forEach((button, i) => {
    button.addEventListener("click", () => {
      localStorage.categoryMeal = JSON.stringify(copy[i]);
      localStorage.recipeSource = JSON.stringify("viewCategory");
    });
  });
}
