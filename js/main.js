const itemsContainer = document.querySelector(".my-carousel-images");
const thumbsContainer = document.querySelector(".my-thumbnails");

const images = [
  {
    image: "img/01.webp",
    title: "Marvel's Spiderman Miles Morale",
    text: "Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.",
  },
  {
    image: "img/02.webp",
    title: "Ratchet & Clank: Rift Apart",
    text: "Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.",
  },
  {
    image: "img/03.webp",
    title: "Fortnite",
    text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
  },
  {
    image: "img/04.webp",
    title: "Stray",
    text: "Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city",
  },
  {
    image: "img/05.webp",
    title: "Marvel's Avengers",
    text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
  },
];

// Creazione elementi iniziali
createSliderWithThumbs(images, itemsContainer, thumbsContainer);

// Stato dell'applicazione
let activeItem = 0;
const autoplayTime = 3000;
let autoplayForward = true;


// Navigazione
const sliderItems = document.getElementsByClassName("my-carousel-item");
const thumbItems = document.getElementsByClassName("my-thumbnail");

showSlide(activeItem);
document.querySelector(".my-next-hook").addEventListener("click", slideForward);
document.querySelector(".my-prev-hook").addEventListener("click", slideBackword);

// Autoplay
let autoplay = setAutoplay();

const stopBtn = document.getElementById("stop-autoplay");
stopBtn.addEventListener("click", function() {
  if (autoplay) {
    // Se autoplay è settato, allora interval è in funzione e lo posso stoppare
    clearInterval(autoplay);
    autoplay = null;
  } else {
    // Altrimenti l'interval non è settato e lo posso far partire
    autoplay = setAutoplay();
  }
});

const invertBtn = document.getElementById("invert-autoplay");
invertBtn.addEventListener("click", function() {
  // Invertire flag di autoplayForward
  // Se è true --> lo setto al false
  // Altriment ---> lo setto al true
  // if (autoplayForward) {
  //   autoplayForward = false;
  // } else {
  //   autoplayForward = true;
  // }
  autoplayForward = !autoplayForward;
  clearInterval(autoplay);
  autoplay = setAutoplay();
});


/////////////////////////////////////////////////////////
// NAVIGATION NON PURE FUNCTIONS

/**
 * Description: Imposta interval che fa partire lo slider automatico
 * @returns {number} - il numero che rappresenta il processo di interval
 */
function setAutoplay() {
  console.log(autoplayForward);
  let play;
  if (autoplayForward) {
    // Se autoplayForward
    //    setto interval in avanti
    play = setInterval(slideForward, autoplayTime);
  } else {
    // Altrimenti
    //    setto inteval indietro
    play = setInterval(slideBackword, autoplayTime);
  }
  return play;
}

/**
 * Description: La funzione che mostra lo slide successivo
 */
function slideForward() {
  hideSlide(activeItem);
  // Posso andare avanti finchè esiste l'immagine successiva (penultimo elemento)
  if (activeItem < sliderItems.length - 1) {
    activeItem++;
  } else {
    activeItem = 0;
  }
  showSlide(activeItem);
}

/**
 * Description: La funzione che mostra lo slide precedente
 */
function slideBackword() {
  hideSlide(activeItem);
  // Posso andare indietro finché esisite l'immagine precedente (il secondo elemento)
  if (activeItem > 0) {
    activeItem--;
  } else {
    // Altrimenti riparto dall'ultimo elemento
    activeItem = sliderItems.length - 1;
  }
  showSlide(activeItem);
}

/**
 * Description: La funzione che mostra un dato slide
 * @param {number} index - l'indice dello slide da mostrare
 */
function showSlide(index) {
  sliderItems[index].classList.add("active");
  thumbItems[index].classList.add("active");
}

/**
 * Description: La funzione che nascone un dato slide
 * @param {number} index - l'indice dello slide da nascondere
 */
function hideSlide(index) {
  sliderItems[index].classList.remove("active");
  thumbItems[index].classList.remove("active");
}

// UI FUNCTIONS
/**
 * Description: La funzione che crealo slider con i thumbs partendo da array di immagini
 * @param {Array} imagesArray - immagini da inserire nello slider
 * @param {Object} slidesWrapper - elemento html che contiene gli slides
 * @param {Object} thumbsWrapper - elemento html che contiene i thumbs
 */
function createSliderWithThumbs(imagesArray, slidesWrapper, thumbsWrapper) {
  for (let i = 0; i < imagesArray.length; i++) {
    const thisImage = imagesArray[i];
    slidesWrapper.innerHTML += createSlide(thisImage, i);
    thumbsWrapper.append(createThumb(thisImage, i));
  }
}

/**
 * Description: Funzione che crea un singolo slide
 * @param {object} image - immagine da inserire nello slide
 * @returns {String} la stringa che rappresenta elemento html dello slide
 */
function createSlide(image, i) {
  return `<div class="my-carousel-item" carousel-item="${i}">
            <img class="img-fluid" src="${image.image}" alt="${image.title} picture">
            <div class="item-description px-3">
                <h2>${image.title}</h2>
                <p>${image.text}</p>
            </div>
          </div>`;
}

/**
 * Description: Funzione che crea un singolo thumb
 * @param {object} image - immagine da inserire nello thumb
 * @returns {Object} L'elemento html che rappresenta thumb
 */
function createThumb(image, index) {
  const thumb = document.createElement("div");
  thumb.innerHTML = `<img class="img-fluid" src="${image.image}" alt="Thumbnail of ${image.title} picture">`;
  thumb.classList.add("my-thumbnail");
  thumb.addEventListener("click", function () {
    hideSlide(activeItem);
    activeItem = index;
    showSlide(activeItem);
  });
  return thumb;
}
