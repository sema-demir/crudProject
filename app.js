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

//temizle düğmesine tıkladıgımda clearItem fonksiyonunu cagır
clearBtn.addEventListener("click", clearItems);

//sayfa yuklendiğinde setupItems fonksiyonunu cagır
window.addEventListener("DOMContentLoaded", setupItems)
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
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    //
    list.appendChild(element);
    // console.log(element)

    //alert
    displayAlert("Ürün Sepete Eklendi", "success");
    //show container
    container.classList.add("show-container");

    //localstroage
    addToLocalStorage(id, value);
    //içeriği temizle
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Ürün Değiştirildi", "success");
    editLocalStoroge(editID, value)
    setBackToDefault();
  } else {
    displayAlert("Lütfen Bir Ürün Giriniz", "danger");
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
  const id = element.dataset.id;
  list.removeChild(element);

  if (list.children.length == 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Ürün İptal Edildi", "danger");
 // yerel depodana kaldır
  removeFromLocalStorage(id)
}
//düzenleme fonksiyonu
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //console.log(editElement);
  //formu düzenlenen metinle doldur
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

//listeyi temizle
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container")
  displayAlert("Sepet Boş", "danger")
  setBackToDefault()
}
//!localStorage işlemleri

//yerel depoya öge ekleme
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage()
  items.push(grocery)
  localStorage.setItem("list", JSON.stringify(items) )
}
function getLocalStorage(){
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
function removeFromLocalStorage(id){
  let items = getLocalStorage();
  items = items.filter(function(item){
   if (item.id !==id){
      return item;
    }
  })
}
function editLocalStoroge(id, value){}

function setupItems() {
  let items = getLocalStorage()
}