const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
let editID = ""; //benzersiz ID
let editElement;
let editFlag = false;
//form gönderildiğinde addItem fonksiyonunu cagır
form.addEventListener("submit", addItem);

//!functions

function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;

    element.classList.add("grocery-item");
    element.setAttributeNode(attr);

    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
              <button class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
            `;
    //delete
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem)
  

    //
    list.appendChild(element);
    // console.log(element)

    //alert
    displayAlert("Basarıyla Eklendi", "success");
    //show container
    container.classList.add("show-container");

    //localstroage
    addToLocalStorage(id, value);
    //içeriği temizle
    setBackToDefault();
  } else if (value !== "" && editFlag) {
  }
}

//alert fonksiyonu
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  console.log(alert);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}
//temizleme
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

//silme işlemei
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.getAttribute("data-id");
  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
}
displayAlert("Eleman kaldırıldı", "danger");

//yerel depoya öge ekleme
function addToLocalStorage(id, value) {
  console.log(id, value);
}
