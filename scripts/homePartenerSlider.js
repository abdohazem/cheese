const wrapperS = document.querySelector(".partners .slider");
const carouselS = document.querySelector(
  ".partners .slider .wrapper .carousel"
);
const firstCardWidthS = carouselS.querySelector(
  ".partners .slider .wrapper .carousel .card"
).offsetWidth;
const carouselSChildrens = [...carouselS.children];
const arrowBtnsS = document.querySelectorAll(".partners .slider .control i");

let isDraggingS = false,
  isAutoPlayS = true,
  startXS,
  startScrollLeftS,
  timeoutIdS;

// Get the number of cards that can fit in the carouselS at once
let cardPerViewS = Math.round(carouselS.offsetWidth / firstCardWidthS);

// Add event listeners for the arrow buttons to scroll the carouselV left and right
arrowBtnsS.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouselS.scrollLeft +=
      btn.id == "left" ? -firstCardWidthS : firstCardWidthS;
  });
});

// Insert copies of the last few cards to beginning of carouselS for infinite scrolling
carouselSChildrens
  .slice(-cardPerViewS)
  .reverse()
  .forEach((card) => {
    carouselS.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert coSies of the first few cards to end of carouselV for infinite scrolling
carouselSChildrens.slice(0, cardPerViewS).forEach((card) => {
  carouselS.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carouselP at appropriate postition to hide first few duplicate cards on Firefox
carouselS.classList.add("no-transition");
carouselS.scrollLeft = carouselS.offsetWidth;
carouselS.classList.remove("no-transition");

const dragStartS = (e) => {
  isDraggingS = true;
  carouselS.classList.add("dragging");
  // Records the initial cursor and scroll position of the carouselP
  startXS = e.pageX;
  startScrollLeftS = carouselS.scrollLeft;
};

const draggingS = (e) => {
  if (!isDraggingS) return; // if isDraggingP is false return from here
  // Updates the scroll position of the carouselP based on the cursor moPement
  carouselS.scrollLeft = startScrollLeftS - (e.pageX - startXS);
};

const dragStopS = () => {
  isDraggingS = false;
  carouselS.classList.remove("dragging");
};

const infiniteScrollS = () => {
  // If the carouselS is at the beginning, scroll to the end
  if (carouselS.scrollLeft === 0) {
    carouselS.classList.add("no-transition");
    carouselS.scrollLeft = carouselS.scrollWidth - 2 * carouselS.offsetWidth;
    carouselS.classList.remove("no-transition");
  }
  // If the carouselS is at the end, scroll to the beginning
  else if (
    Math.ceil(carouselS.scrollLeft) ===
    carouselS.scrollWidth - carouselS.offsetWidth
  ) {
    carouselS.classList.add("no-transition");
    carouselS.scrollLeft = carouselS.offsetWidth;
    carouselS.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoSlay if mouse is not hovering over carouselV
  clearTimeout(timeoutIdS);
  if (!wrapperS.matches(":hover")) autoPlayS();
};

const autoPlayS = () => {
  // Return if window is smaller than 800 or isAutoPlayP is false
  // Autoplay the carouselP after ePery 2500 ms
  timeoutIdS = setTimeout(
    () => (carouselS.scrollLeft += firstCardWidthS),
    1000
  );
};
autoPlayS();

carouselS.addEventListener("mousedown", dragStartS);
carouselS.addEventListener("mousemove", draggingS);
document.addEventListener("mouseup", dragStopS);
carouselS.addEventListener("scroll", infiniteScrollS);
wrapperS.addEventListener("mouseenter", () => clearTimeout(timeoutIdS));
wrapperS.addEventListener("mouseleave", autoPlayS);
