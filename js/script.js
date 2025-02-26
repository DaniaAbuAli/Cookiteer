// slider
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    150: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// global variables
const image = document.querySelector(".details img");
const mainDetails = document.querySelector(".details");

//make navbar link active
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLink = document.querySelectorAll(".nav-link");
  navLink.forEach((link) => {
    if (`/${link.getAttribute("href")}` === currentPath) {
      link.classList.add("active");
    } else link.classList.remove("active");
  });
});

randomRecipeDetails();

// get data and show it
function randomRecipeDetails() {
  let obj = {};
  if (JSON.parse(localStorage.getItem("recipeSource")) === "viewRandom") {
    obj = JSON.parse(localStorage.getItem("randomMeal"));
  } else if (
    JSON.parse(localStorage.getItem("recipeSource")) === "viewSearch"
  ) {
    obj = JSON.parse(localStorage.getItem("searchMeal"));
  } else if (
    JSON.parse(localStorage.getItem("recipeSource")) === "viewCategory"
  ) {
    obj = JSON.parse(localStorage.getItem("categoryMeal"));
    showCategoryDetails(obj);
    return;
  } else if (JSON.parse(localStorage.getItem("recipeSource")) === "viewSaved") {
    obj = JSON.parse(localStorage.getItem("savedMeal"));
  } else if (JSON.parse(localStorage.getItem("recipeSource")) === "viewOwn") {
    obj = JSON.parse(localStorage.getItem("ownRecipe"));
    console.log(obj);
    showOwnRecipe(obj);
    return;
  }
  mainDetails.innerHTML = `
  <div class="row one mt-2">
    <div class="col-12 col-lg-4 flip">
      <div class="front">
      <img src="${obj.image}" alt="">
       </div>
       <div class="back">
          <img src="${obj.image}" alt="">
         <a href="${obj.youtube}" target="_blank"><i class="fa-brands fa-youtube"></i></a>
       </div>
    </div>
    <div class="col-12 col-lg-6 text-start mt-5">
      <h5>Recipe name: <span class="fw-light fs-5">${obj.name}</span></h5>
      <h5>Category: <span class="fw-light fs-5">${obj.category}</span></h5>
      <h5>Area: <span class="fw-light fs-5">${obj.area}</span></h5>
    </div>
  </div>
  <div class="row two mt-4 text-start ms-lg-4">
    <div class="col-12">
      <div class="ingredients">
        <p class="fw-bolder">Ingredients</p>
        <table class="table">
          <tbody>  
          </tbody>
        </table>
      </div>
    </div>
  </div>
    <div class="row three mt-4 text-start ms-lg-4">
        <div class="col-12">
          <div class="instructions">
            <p class="fw-bolder">instructions</p>
            <p>${obj.instructions}</p>
          </div>
        </div>
    </div>
`;
  let length = Object.keys(obj.ingredients).length;
  const tbody = document.querySelector("tbody");
  for (let i = 0; i < length; i++) {
    let measures = Object.values(obj.measures);
    let ingredients = Object.values(obj.ingredients);
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.setAttribute("scop", "row");
    th.innerHTML = `<input type="checkbox">`;
    th.style.width = "30px";
    td.style.padding = "15px";
    td.textContent = `${measures[i]} ${ingredients[i]}`;
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}
// design checkbox
const checkbox = document.querySelectorAll('input[type="checkbox"]');
checkbox.forEach((box) => {
  box.addEventListener("change", function () {
    const td = box.closest("tr").querySelector("td");
    if (box.checked) {
      td.style.textDecoration = "line-through";
      td.style.color = "#757575";
    } else {
      td.style.textDecoration = "none";
      td.style.color = "#1d2228";
    }
  });
});

//show details for a category
function showCategoryDetails(obj) {
  mainDetails.innerHTML = `
  <div class="row one mt-2">
    <div class="col-12 col-lg-4 flip">
      <div class="front">
      <img src="${obj.strMealThumb}" alt="">
       </div>
       <div class="back">
          <img src="${obj.strMealThumb}" alt="">
         <a href="${obj.strYoutube}" target="_blank"><i class="fa-brands fa-youtube"></i></a>
       </div>
    </div>
    <div class="col-12 col-lg-6 text-start mt-5">
      <h5>Recipe name: <span class="fw-light fs-5">${obj.strMeal}</span></h5>
      <h5>Category: <span class="fw-light fs-5">${obj.strCategory}</span></h5>
      <h5>Area: <span class="fw-light fs-5">${obj.strArea}</span></h5>
    </div>
  </div>
  <div class="row two mt-4 text-start ms-lg-4">
    <div class="col-12">
      <div class="ingredients">
        <p class="fw-bolder">Ingredients</p>
        <table class="table">
          <tbody>  
          </tbody>
        </table>
      </div>
    </div>
  </div>
    <div class="row three mt-4 text-start ms-lg-4">
        <div class="col-12">
          <div class="instructions">
            <p class="fw-bolder">instructions</p>
            <p>${obj.strInstructions}</p>
          </div>
        </div>
    </div>
`;
  const tbody = document.querySelector("tbody");
  for (let i = 1; i <= 20; i++) {
    let ingredient = obj[`strIngredient${i}`];
    let measure = obj[`strMeasure${i}`];
    if (!ingredient) break;
    if (!measure) measure = "";
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.setAttribute("scop", "row");
    th.innerHTML = `<input type="checkbox">`;
    th.style.width = "30px";
    td.style.padding = "15px";
    td.textContent = `${measure} ${ingredient}`;
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}

function showOwnRecipe(obj) {
  mainDetails.innerHTML = `
  <div class="row one mt-2">
    <div class="col-12 col-lg-4 flip">
      <div class="front">
      <img src="${obj.image}" alt="">
       </div>
       <div class="back">
          <img src="${obj.image}" alt="">
          ${
            obj.youtube
              ? `<a href="${obj.youtube}" target="_blank"><i class="fa-brands fa-youtube"></i></a>`
              : ""
          }
       </div>
    </div>
    <div class="col-12 col-lg-6 text-start mt-5">
      <h5>Recipe name: <span class="fw-light fs-5">${obj.name}</span></h5>
      <h5>Category: <span class="fw-light fs-5">${obj.category}</span></h5>
      ${
        obj.area
          ? `<h5>Area:<span class="fw-light fs-5">${obj.area}</span></h5>`
          : ""
      }
    </div>
  </div>
  <div class="row two mt-4 text-start ms-lg-4">
    <div class="col-12">
      <div class="ingredients">
        <p class="fw-bolder">Ingredients</p>
        <table class="table">
          <tbody>  
          </tbody>
        </table>
      </div>
    </div>
  </div>
    <div class="row three mt-4 text-start ms-lg-4">
        <div class="col-12">
          <div class="instructions">
            <p class="fw-bolder">instructions</p>
            <p>${obj.instructions}</p>
          </div>
        </div>
    </div>
    ${
      obj.notes
        ? ` <div class="row four mt-4 text-start ms-lg-4">
    <div class="col-12">
      <div class="notes">
        <p class="fw-bolder">notes</p>
        <p>${obj.notes}</p>
      </div>
    </div>
</div>`
        : ""
    }
`;
  let length = Object.keys(obj.ingredients).length;
  const tbody = document.querySelector("tbody");
  for (let i = 0; i < length; i++) {
    let measures = Object.values(obj.measures);
    let ingredients = Object.values(obj.ingredients);
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.setAttribute("scop", "row");
    th.innerHTML = `<input type="checkbox">`;
    th.style.width = "30px";
    td.style.padding = "15px";
    td.textContent = `${measures[i]} ${ingredients[i]}`;
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}

