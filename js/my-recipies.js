//global variables
const tabNavLink = document.querySelectorAll(".nav-tabs .nav-link");
const addRecipe = document.querySelector(".add-recipe");
const content = document.querySelector(".content");
const addRow = document.querySelector(".add-row");
const tbody = document.querySelector(".ingredients-table tbody ");
const recipes = document.querySelector(".recipes");
const add = document.querySelector(".add");
const recipeName = document.getElementById("recipe-name");
const category = document.getElementById("category");
const area = document.getElementById("area");
const instructions = document.getElementById("instructions");
const youtube = document.getElementById("youtube-link");
const notes = document.getElementById("notes");
const myRecipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
const picture = document.getElementById("image");
const recipesContainer = recipes.querySelector(".container");
let imageBase64 = "";
let editingIndex = null;

//convert file to base64
picture.addEventListener("change", (e) => {
  const file = picture.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;
        ctx.drawImage(img, 0, 0, 500, 500);
        imageBase64 = canvas.toDataURL("image/jpeg");
      };
    };
    reader.readAsDataURL(file);
  }
});

// show active tab link
tabNavLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    tabNavLink.forEach((link) => {
      link.classList.remove("show-active");
    });
    e.currentTarget.classList.add("show-active");
    if (e.currentTarget.textContent === "My Recipes") {
      recipes.classList.remove("hide");
      content.classList.add("hide");
    } else {
      recipes.classList.add("hide");
      content.classList.remove("hide");
    }
  });
});

//click the first tab navigation link
tabNavLink[0].addEventListener("click", () => {
  clearInput();
  add.value = "Add";
  tabNavLink[1].textContent = "Add New Recipe";
  editingIndex = null;
});

//add new row
addRow.addEventListener("click", (e) => {
  e.preventDefault();
  const tr = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    const td = document.createElement("td");
    if (i === 2) {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("btn-danger");
      button.textContent = "Remove";
      td.appendChild(button);
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.classList.add("w-100");
      td.appendChild(input);
    }
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
});

removeRow();
function removeRow() {
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      e.preventDefault();
      if (tbody.children.length > 1) e.target.closest("tr").remove();
    }
  });
}

add.addEventListener("click", (e) => {
  e.preventDefault();
  const recipeNameValue = recipeName.value.trim();
  const categoryValue = category.value.trim();
  const areaValue = area.value.trim();
  const instructionsValue = instructions.value.trim();
  const youtubeValue = youtube.value.trim();
  const notesValue = notes.value.trim();
  const tr = document.querySelectorAll(".ingredients-table tbody tr");
  let ingredients = {};
  let measures = {};

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].querySelectorAll("td input");
    const measure = td[0].value.trim();
    const ingredient = td[1].value.trim();
    ingredients[`ingredient${i + 1}`] = ingredient;
    measures[`measure${i + 1}`] = measure;
  }
  const td = tr[0].querySelectorAll("td input");
  if (
    !recipeNameValue ||
    !categoryValue ||
    !instructionsValue ||
    !td[0].value ||
    !td[1].value ||
    !imageBase64
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all the required fields",
      confirmButtonColor: "#d33",
    });
    return;
  }

  const recipe = {
    name: recipeNameValue,
    category: categoryValue,
    area: areaValue,
    youtube: youtubeValue,
    instructions: instructionsValue,
    notes: notesValue,
    image: imageBase64,
    ingredients,
    measures,
  };

  if (editingIndex !== null) {
    myRecipes[editingIndex] = recipe;
    editingIndex = null;
    showEditSuccess();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    myRecipes.push(recipe);
    showAddSuccess();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  localStorage.setItem("myRecipes", JSON.stringify(myRecipes));
  clearInput();
  showRecipes();
});

function clearInput() {
  recipeName.value = "";
  category.value = "";
  area.value = "";
  instructions.value = "";
  youtube.value = "";
  notes.value = "";
  tbody.innerHTML = `
    <tr>
      <td><input type="text" class="w-100"></td>
      <td><input type="text" class="w-100"></td>
      <td><button class="btn btn-danger">Remove</button></td>
    </tr>
  `;
  picture.value = "";
  imageBase64 = "";
}

function showRecipes() {
  recipesContainer.innerHTML = "";
  if (myRecipes.length === 0) {
    recipesContainer.innerHTML = `<p class="text-center">You haven't added any recipes yet. Start by adding your first delicious recipe!</p>`;
    return;
  }
  let output = `<div class="row results">`;
  myRecipes.forEach((item, index) => {
    output += `
    <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
      <div class="card">
        <img src="${item.image}" alt="" class="card-img-top">
        <div class="card-body">
          <div class="name">
            <h5 class="card-title">${item.name}</h5>
          </div>
          <div class="buttons d-flex justify-content-evenly align-items-center mt-3 p-1">
            <button class="btn view">
              <a href="view-recipe.html">View Recipe</a>
            </button>
            <div class="dropdown">
              <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                &#x22EE;
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item edit" data-index="${index}">Edit</a>
                </li>
                <li>
                  <a class="dropdown-item delete" data-index="${index}">Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  });
  recipesContainer.innerHTML = output;
  viewRecipe();
  edit();
  remove();
}

function viewRecipe() {
  const view = document.querySelectorAll(".view");
  let copy = [...myRecipes];
  view.forEach((button, i) => {
    button.addEventListener("click", () => {
      localStorage.ownRecipe = JSON.stringify(copy[i]);
      localStorage.recipeSource = JSON.stringify("viewOwn");
    });
  });
}

function edit() {
  document.querySelectorAll(".edit").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      editingIndex = parseInt(e.target.dataset.index);
      const recipe = myRecipes[editingIndex];
      recipeName.value = recipe.name;
      category.value = recipe.category;
      area.value = recipe.area;
      instructions.value = recipe.instructions;
      youtube.value = recipe.youtube;
      notes.value = recipe.notes;
      imageBase64 = recipe.image;
      const file = await base64ToFile(recipe.image, "image.jpg");
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      picture.files = dataTransfer.files;
      tbody.innerHTML = "";
      Object.keys(recipe.ingredients).forEach((key, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><input value="${recipe.measures[`measure${i + 1}`]}"></td>
          <td><input value="${recipe.ingredients[`ingredient${i + 1}`]}"></td>
          <td><button class="btn btn-danger">Remove</button></td>
        `;
        tbody.appendChild(tr);
      });
      add.value = "Update";
      content.classList.remove("hide");
      recipes.classList.add("hide");
      tabNavLink[1].click();
      tabNavLink[1].textContent = "Edit Recipe";
    });
  });
}

function remove() {
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this recipe from your recipes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          myRecipes.splice(index, 1);
          localStorage.setItem("myRecipes", JSON.stringify(myRecipes));
          showRemoveSuccess();
          showRecipes();
        }
      });
    });
  });
}

showRecipes();

function showEditSuccess() {
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
    title: "Recipe updated successfully",
  });
}

function showAddSuccess() {
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
    title: "Recipe added successfully",
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

function base64ToFile(base64, fileName) {
  return fetch(base64)
    .then((res) => res.blob())
    .then((blob) => new File([blob], fileName, { type: "image/jpeg" }));
}
