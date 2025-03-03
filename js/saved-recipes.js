//global variables
const savedResults = document.querySelector(".saved-results");
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// show saved cards
function showResults() {
  savedResults.innerHTML = "";
  let output = `<div class="row results">`;
  favourites.forEach((item) => {
    if (item) {
      output += `
        <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
          <div class="card">
            <img src="${item.image}" alt="" class="card-img-top">
            <div class="card-body">
              <div class="name"><h5 class="card-title">${item.name}</h5></div>
              <div class="buttons d-flex justify-content-evenly align-items-center mt-3 p-1">
                <button class="btn view-save"><a href="view-recipe.html">View Recipe</a></button>
                <button class="btn save"><i class="fa-solid fa-bookmark not-empty"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });
  output += `</div>`;
  savedResults.innerHTML = output;
  const save = document.querySelectorAll(".results .col-12 .save");
  viewRecipes();
  remove();
}
showResults();

//click on view recipe
function viewRecipes() {
  let searchResultsCopy = [...favourites];
  const results = document.querySelectorAll(".results .col-12 .view-save");
  for (let i = 0; i < results.length; i++) {
    results[i].addEventListener("click", () => {
      localStorage.savedMeal = JSON.stringify(searchResultsCopy[i]);
      localStorage.recipeSource = JSON.stringify("viewSaved");
    });
  }
}

if (favourites.length === 0) {
  savedResults.innerHTML = `<p>No saved recipes yet! Start adding your favorites now.</p>`;
}

//remove from save
function remove() {
  const results = document.querySelectorAll(".results .col-12");
  for (let i = 0; i < results.length; i++) {
    const icon = results[i].querySelector(".save");
    icon.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this recipe from your favourites?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          favourites.splice(i, 1);
          localStorage.setItem("favourites", JSON.stringify(favourites));
          showRemoveSuccess();
          showResults();
        }
      });
    });
  }
  if (favourites.length === 0) {
    savedResults.innerHTML = `<p>No saved recipes yet! Start adding your favorites now.</p>`;
  }
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
