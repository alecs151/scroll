const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imgLoaded = 0;
let totalImg = 0;
let imgArr = [];

// Unsplash Api
const count = 20;
const apiKey = "hWaUu_2iePVILgaTsHN-292NedJCUWH3s9hlcrhC2Ew";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imgLoaded++;
  if (imgLoaded === totalImg) {
    ready = true;
    loader.hidden = true;
  }
}

// helper
function setAttributes(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
}

// elements for links and img
function displayImg() {
  imgLoaded = 0;
  totalImg = imgArr.length;
  imgArr.forEach((photo) => {
    // link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // img for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded());
    // place img inside a
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// Fetch
async function getImg() {
  try {
    const response = await fetch(apiUrl);
    imgArr = await response.json();
    displayImg();
  } catch (error) {
    // error
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImg();
  }
});

getImg();
