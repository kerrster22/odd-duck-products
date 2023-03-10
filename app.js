function getRandomProductIndex() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

let totalClicks = 0;
const maxClicks = 10;
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

Product.allProducts = [];

const productNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

for (let i = 0; i < productNames.length; i++) {
  new Product(productNames[i], `assets/${productNames[i]}.jpeg`);
}

// render our products onto the page
function renderProducts() {
  // get three random product indexes
  let product1 = getRandomProductIndex();
  let product2 = getRandomProductIndex();
  let product3 = getRandomProductIndex();

  // check none of them match
  while (
    product1 === product2 ||
    product1 === product3 ||
    product2 === product3
  ) {
    product2 = getRandomProductIndex();
    product3 = getRandomProductIndex();
  }

  // put those images onto the page
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = Product.allProducts[product1].src;
  img1.alt = Product.allProducts[product1].name;

  img2.src = Product.allProducts[product2].src;
  img2.alt = Product.allProducts[product2].name;

  img3.src = Product.allProducts[product3].src;
  img3.alt = Product.allProducts[product3].name;

  // increase views for displayed images
  Product.allProducts[product1].views++;
  Product.allProducts[product2].views++;
  Product.allProducts[product3].views++;
}

// listen for clicks on the images
function handleClick(event) {
  // make sure they are clicking on an image and not the container itself
  if (event.target === imgContainer) {
    alert("You've got to click on the image!");
  } else {
    totalClicks++;
  }

  // increase clicks
  for (let i = 0; i < Product.allProducts.length; i++) {
    if (Product.allProducts[i].name === event.target.alt) {
      Product.allProducts[i].clicks++;
      break; // ends the for loop
    }
  }

  // check max clicks
  if (totalClicks === maxClicks) {
    // remove the event listener so the game ends
    imgContainer.removeEventListener("click", handleClick);
    // maybe rnder results?
    renderResults();
  } else {
    renderProducts();
  }
}

function renderResults() {
  const resultsList = document.getElementById("results-list");

  for (let i = 0; i < Product.allProducts.length; i++) {
    let theProduct = Product.allProducts[i];
    let li = document.createElement("li");
    li.textContent = `${theProduct.name}: ${theProduct.clicks} clicks ${theProduct.views} views`;
    resultsList.appendChild(li);
  }
}

const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", handleClick);

renderProducts();
