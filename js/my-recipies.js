// //global variables
// const tabNavLink = document.querySelectorAll(".nav-tabs .nav-link");
// const addRecipe = document.querySelector(".add-recipe");
// const content = document.querySelector(".content");
// const addRow = document.querySelector(".add-row");
// const tbody = document.querySelector(".ingredients-table tbody ");
// const recipes = document.querySelector(".recipes");
// const add = document.querySelector(".add");
// const recipeName = document.getElementById("recipe-name");
// const category = document.getElementById("category");
// const area = document.getElementById("area");
// const instructions = document.getElementById("instructions");
// const youtube = document.getElementById("youtube-link");
// const notes = document.getElementById("notes");
// const myRecipes = JSON.parse(localStorage.getItem("myRecipes")) || [];
// const picture = document.getElementById("image");
// const recipesContainer = recipes.querySelector(".container");
// let imageBase64 = "";

// //convert file to base64
// picture.addEventListener("change", (e) => {
//   const file = picture.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function () {
//       const img = new Image();
//       img.src = reader.result;
//       img.onload = function () {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         canvas.width = 500;
//         canvas.height = 500;
//         ctx.drawImage(img, 0, 0, 500, 500);
//         imageBase64 = canvas.toDataURL("image/jpeg");
//         console.log(imageBase64);
//       };
//     };
//     reader.readAsDataURL(file);
//   }
// });

// // show active tab link
// tabNavLink.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     tabNavLink.forEach((link) => {
//       link.classList.remove("show-active");
//     });
//     e.currentTarget.classList.add("show-active");
//     if (e.currentTarget.textContent === "My Recipes") {
//       recipes.classList.remove("hide");
//       content.classList.add("hide");
//     } else {
//       recipes.classList.add("hide");
//       content.classList.remove("hide");
//     }
//   });
// });

// tabNavLink[0].addEventListener("click", () => {
//   clearInput();
//   add.value = "Add";
//   tabNavLink[1].textContent = "Add New Recipe";
// });

// //add new row
// addRow.addEventListener("click", (e) => {
//   e.preventDefault();
//   const tr = document.createElement("tr");
//   for (let i = 0; i < 3; i++) {
//     const td = document.createElement("td");
//     if (i === 2) {
//       const button = document.createElement("button");
//       button.classList.add("btn");
//       button.classList.add("btn-danger");
//       button.textContent = "Remove";
//       td.appendChild(button);
//     } else {
//       const input = document.createElement("input");
//       input.type = "text";
//       input.classList.add("w-100");
//       td.appendChild(input);
//     }
//     tr.appendChild(td);
//   }
//   tbody.appendChild(tr);
// });

// removeRow();
// function removeRow() {
//   tbody.addEventListener("click", (e) => {
//     if (e.target.classList.contains("btn")) {
//       e.preventDefault();
//       if (tbody.children.length > 1) e.target.closest("tr").remove();
//     }
//   });
// }

// add.addEventListener("click", (e) => {
//   if (add.classList.contains("update")) return;
//   e.preventDefault();
//   const recipeNameValue = recipeName.value.trim();
//   const categoryValue = category.value.trim();
//   const areaValue = area.value.trim();
//   const instructionsValue = instructions.value.trim();
//   const youtubeValue = youtube.value.trim();
//   const notesValue = notes.value.trim();
//   const tr = document.querySelectorAll(".ingredients-table tbody tr");
//   let ingredients = {};
//   let measures = {};
//   for (let i = 0; i < tr.length; i++) {
//     const td = tr[i].querySelectorAll("td input");
//     const measure = td[0].value;
//     const ingredient = td[1].value;
//     ingredients[`ingredient${i + 1}`] = ingredient;
//     measures[`measure${i + 1}`] = measure;
//   }
//   const td = tr[0].querySelectorAll("td input");
//   // if (
//   //   !recipeNameValue ||
//   //   !categoryValue ||
//   //   !instructionsValue ||
//   //   !td[0].value ||
//   //   !td[1].value ||
//   //   !imageBase64
//   // ) {
//   //   Swal.fire({
//   //     icon: "error",
//   //     title: "Oops...",
//   //     text: "Please fill in all the required fields before adding the recipe",
//   //     confirmButtonColor: "#d33",
//   //   });
//   //   return;
//   // }
//   let recipe = {
//     name: recipeNameValue.trim(),
//     category: categoryValue.trim(),
//     area: areaValue.trim(),
//     youtube: youtubeValue.trim(),
//     instructions: instructionsValue.trim(),
//     notes: notesValue.trim(),
//     image: imageBase64,
//   };
//   recipe.ingredients = ingredients;
//   recipe.measures = measures;
//   ingredients = {};
//   measures = {};
//   myRecipes.push(recipe);
//   window.localStorage.setItem("myRecipes", JSON.stringify(myRecipes));
//   showAddSuccess();
//   window.scrollTo({ top: 0, behavior: "smooth" });
//   clearInput();
//   showRecipes();
// });

// function clearInput() {
//   recipeName.value = "";
//   category.value = "";
//   area.value = "";
//   instructions.value = "";
//   youtube.value = "";
//   notes.value = "";
//   // const tr=tbody.querySelectorAll('tr');
//   // const firstTr=tr[0].querySelectorAll('td input');
//   // console.log(tr)
//   // console.log(firstTr)
//   // firstTr[0].value="";
//   // firstTr[1].value="";
//   // for(let i=1;i<tr.length;i++){
//   //   tr[i].remove();
//   // }
// }

// function showAddSuccess() {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     },
//   });
//   Toast.fire({
//     icon: "success",
//     title: "Recipe added successfully",
//   });
// }

// function showRecipes() {
//   const recipes = JSON.parse(localStorage.getItem("myRecipes"));
//   recipesContainer.innerHTML = "";
//   let output = `<div class="row results">`;
//   recipes.forEach((item,index) => {
//     output += `
//       <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
//         <div class="card">
//           <img src="${item.image}" alt="" class="card-img-top">
//           <div class="card-body">
//             <div class="name"><h5 class="card-title">${item.name}</h5></div>
//             <div class="buttons d-flex justify-content-evenly align-items-center mt-3 p-1">
//               <button class="btn view"><a href="view-recipe.html">View Recipe</a></button>
//               <div class="dropdown">
//    <a class="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static"  aria-expanded="false">
//    &#x22EE;
//   </a>
//   <ul class="dropdown-menu">
//     <li><a class="dropdown-item edit" data-index="${index}">Edit</a></li>
//     <li><a class="dropdown-item delete" data-index="${index}">Delete</a></li>
//   </ul>
// </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//   });
//   output += `</div>`;
//   recipesContainer.innerHTML = output;
//   viewRecipe();
//   edit();
//   remove();
//   console.log(recipes)
// }
// showRecipes();

// function viewRecipe() {
//   const view = document.querySelectorAll(".view");
//   let copy = [...myRecipes];
//   if (view.length === 0) return;
//   view.forEach((button, i) => {
//     button.addEventListener("click", () => {
//       localStorage.ownRecipe = JSON.stringify(copy[i]);
//       localStorage.recipeSource = JSON.stringify("viewOwn");
//     });
//   });
// }

// async function edit() {
//   const edit = document.querySelectorAll(".edit");
//   // const copy = [...myRecipes];
//   edit.forEach(btn=>{
//     btn.addEventListener('click',async()=>{
//       recipes.classList.add("hide");
//       content.classList.remove("hide");
//       tabNavLink[0].classList.remove("show-active");
//       tabNavLink[1].classList.add("show-active");
//       const i=parseInt(btn.getAttribute('data-index'));
//       console.log(i)
//       // const copy = [...myRecipes];
//       const copy = JSON.parse(JSON.stringify(myRecipes));
//       console.log(copy)
//       recipeName.value = copy[i].name;
//       category.value = copy[i].category;
//       area.value = copy[i].area;
//       instructions.value = copy[i].instructions;
//       youtube.value = copy[i].youtube;
//       notes.value = copy[i].notes;
//       imageBase64 = copy[i].image;
//       const file = await base64ToFile(copy[i].image, "recipe-image.jpg");
//       const dataTransfer = new DataTransfer();
//       dataTransfer.items.add(file);
//       picture.files = dataTransfer.files;
//       showIngredients(copy, i);
//       add.classList.add("update");
//       const update = document.querySelector(".update");
//       update.value = "Edit";
//       tabNavLink[1].textContent = "Edit Recipe";
//       checkEdit(copy, i);
//     })
//   })
// //    for (let i = 0; i < copy.length; i++) {
// //     edit[i].addEventListener("click", async () => {
// //       recipes.classList.add("hide");
// //       content.classList.remove("hide");
// //       tabNavLink[0].classList.remove("show-active");
// //       tabNavLink[1].classList.add("show-active");
// //       recipeName.value = copy[i].name;
// //       category.value = copy[i].category;
// //       area.value = copy[i].area;
// //       instructions.value = copy[i].instructions;
// //       youtube.value = copy[i].youtube;
// //       notes.value = copy[i].notes;
// //       imageBase64 = copy[i].image;
// //       const file = await base64ToFile(copy[i].image, "recipe-image.jpg");
// //       const dataTransfer = new DataTransfer();
// //       dataTransfer.items.add(file);
// //       picture.files = dataTransfer.files;
// //       showIngredients(copy, i);
// //       add.classList.remove("add");
// //       add.classList.add("update");
// //       const update = document.querySelector(".update");
// //       update.value = "Edit";
// //      tabNavLink[1].textContent = "Edit Recipe";
// //       checkEdit(copy, i);
// //      });
// //     }
// }

// function base64ToFile(base64, fileName) {
//   return fetch(base64)
//     .then((res) => res.blob())
//     .then((blob) => new File([blob], fileName, { type: "image/jpeg" }));
// }

// function checkEdit(copy,i) {
//   const update = document.querySelector(".update");
//   update.addEventListener("click", (e) => {
//     e.preventDefault();
//     showEditSuccess();
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     copy[i].name = recipeName.value.trim();
//     copy[i].category = category.value.trim();
//     copy[i].area = area.value.trim();
//     copy[i].instructions = instructions.value.trim();
//     copy[i].youtube = youtube.value.trim();
//     copy[i].notes = notes.value.trim();
//     copy[i].image = imageBase64;
//     const tr = document.querySelectorAll(".ingredients-table tbody tr");
//     const ingredients = {};
//     const measures = {};
//     for (let i = 0; i < tr.length; i++) {
//       const td = tr[i].querySelectorAll("td input");
//       const measure = td[0].value;
//       const ingredient = td[1].value;
//       ingredients[`ingredient${i + 1}`] = ingredient;
//       measures[`measure${i + 1}`] = measure;
//     }
//     copy[i].ingredients = ingredients;
//     copy[i].measures = measures;
//     window.localStorage.setItem("myRecipes", JSON.stringify(copy));
//     showRecipes();
//     update.classList.remove("update");
//     update.classList.add("add-recipe");
//   });
// }

// function showIngredients(copy, i) {
//   const length = Object.values(copy[i].ingredients).length;
//   const ingredients = copy[i].ingredients;
//   const measures = copy[i].measures;
//   tbody.innerHTML = "";
//   for (let j = 0; j < length; j++) {
//     tbody.innerHTML += `
//         <tr>
//            <td><input type="text" class="w-100" value="${
//              measures[`measure${j + 1}`]
//            }" /></td>
//            <td><input type="text" class="w-100" value="${
//              ingredients[`ingredient${j + 1}`]
//            }" /></td>
//            <td><button class="btn btn-danger">Remove</button></td>
//        </tr>
//       `;
//   }
// }

// function showEditSuccess() {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     },
//   });
//   Toast.fire({
//     icon: "success",
//     title: "Recipe updated successfully",
//   });
// }

// function remove() {
//   const removeButtons = document.querySelectorAll(".delete");
//   removeButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "Do you really want to remove this recipe from your recipes?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, remove it!",
//         cancelButtonText: "Cancel",
//         reverseButtons: true,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           const index=button.getAttribute('data-index');
//           myRecipes.splice(index, 1);
//           localStorage.setItem("myRecipes", JSON.stringify(myRecipes));
//           showRecipes();
//           // console.log(myRecipes)
//           showRemoveSuccess();
//         }
//       });
//     });
//   });
//   if (myRecipes.length === 0) {
//     recipesContainer.innerHTML = `<p> You haven't added any recipes yet. Start by adding your first delicious recipe!</p>`;
//   }
// }

// function showRemoveSuccess() {
//   const Toast = Swal.mixin({
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//     didOpen: (toast) => {
//       toast.onmouseenter = Swal.stopTimer;
//       toast.onmouseleave = Swal.resumeTimer;
//     },
//   });
//   Toast.fire({
//     icon: "success",
//     title: "Removed successfully!",
//   });
// }

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
  // add.value = "Add";
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
