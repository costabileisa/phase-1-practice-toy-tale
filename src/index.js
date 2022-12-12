let addToy = false;
let toyCollection;
const toysURL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  
  toyCollection = document.getElementById("toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  listToys()

  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", () => addToyFn())

})

function listToys() {
  fetch(toysURL)
  .then(response => response.json())
  .then(data => {
    data.forEach((toyInfo) => {
    const div = document.createElement("div")
    div.className = "card"

    const h2 = document.createElement("h2")
    h2.innerHTML = toyInfo.name

    const img = document.createElement("img")
    img.src = toyInfo.image
    img.className = "toy-avatar"

    const p = document.createElement("p")
    p.innerHTML = toyInfo.likes
    p.id = toyInfo.id

    const button = document.createElement("button")
    button.className = "like-btn"
    button.id = toyInfo.id
    button.innerHTML = "Like ❤️"

    button.addEventListener("click", () => {
      getLikes(toyInfo.id, toyInfo.likes)
    })

    div.append(h2, img, p, button)
    toyCollection.append(div)
    })
  })
}

function addToyFn() {
  const response = fetch(toysURL, {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": document.querySelector(".add-toy-form input[name='name']").value,
      "image": document.querySelector(".add-toy-form input[name='image']").value,
      "likes": 0
    })
  })
  return response.json()
}

function getLikes(id) {
  const toy = document.getElementById(id)
  fetch(`${toysURL}/${id}`, {
    method: "PATCH",
    headers: {
       "Content-Type": "application/json",
        Accept: "application.json"
      },
    body: JSON.stringify({
    "likes": ++toy.innerHTML
    })
  })
  .then(response => response.json())
  .then(data => {
    toy.innerHTML = data.likes
  })
}
