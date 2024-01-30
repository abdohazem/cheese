const wrapperP = document.querySelector(".media .photo");
const carouselP = document.querySelector(".media .photo .wrapper .carousel");
const firstCardWidthP = carouselP.querySelector(
  ".media .photo .wrapper .carousel .card"
).offsetWidth;
const carouselPChildrens = [...carouselP.children];
const arrowBtnsP = document.querySelectorAll(".media .photo .control i");

let isDraggingP = false,
  isAutoPlayP = true,
  startXP,
  startScrollLeftP,
  timeoutIdP;

// Get the number of cards that can fit in the carouselP at once
let cardPerViewP = Math.round(carouselP.offsetWidth / firstCardWidthP);

// Add event listeners for the arrow buttons to scroll the carouselV left and right
arrowBtnsP.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouselP.scrollLeft +=
      btn.id == "left" ? -firstCardWidthP : firstCardWidthP;
  });
});

// Insert copies of the last few cards to beginning of carouselP for infinite scrolling
carouselPChildrens
  .slice(-cardPerViewP)
  .reverse()
  .forEach((card) => {
    carouselP.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carouselV for infinite scrolling
carouselPChildrens.slice(0, cardPerViewP).forEach((card) => {
  carouselP.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carouselP at appropriate postition to hide first few duplicate cards on Firefox
carouselP.classList.add("no-transition");
carouselP.scrollLeft = carouselP.offsetWidth;
carouselP.classList.remove("no-transition");

const dragStartP = (e) => {
  isDraggingP = true;
  carouselP.classList.add("dragging");
  // Records the initial cursor and scroll position of the carouselP
  startXP = e.pageX;
  startScrollLeftP = carouselP.scrollLeft;
};

const draggingP = (e) => {
  if (!isDraggingP) return; // if isDraggingP is false return from here
  // Updates the scroll position of the carouselP based on the cursor moPement
  carouselP.scrollLeft = startScrollLeftP - (e.pageX - startXP);
};

const dragStopP = () => {
  isDraggingP = false;
  carouselP.classList.remove("dragging");
};

const infiniteScrollP = () => {
  // If the carouselP is at the beginning, scroll to the end
  if (carouselP.scrollLeft === 0) {
    carouselP.classList.add("no-transition");
    carouselP.scrollLeft = carouselP.scrollWidth - 2 * carouselP.offsetWidth;
    carouselP.classList.remove("no-transition");
  }
  // If the carouselP is at the end, scroll to the beginning
  else if (
    Math.ceil(carouselP.scrollLeft) ===
    carouselP.scrollWidth - carouselP.offsetWidth
  ) {
    carouselP.classList.add("no-transition");
    carouselP.scrollLeft = carouselP.offsetWidth;
    carouselP.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carouselV
  clearTimeout(timeoutIdP);
  if (!wrapperP.matches(":hover")) autoPlayP();
};

const autoPlayP = () => {
  // Return if window is smaller than 800 or isAutoPlayP is false
  // Autoplay the carouselP after ePery 2500 ms
  timeoutIdP = setTimeout(
    () => (carouselP.scrollLeft += firstCardWidthP),
    1000
  );
};
autoPlayP();

carouselP.addEventListener("mousedown", dragStartP);
carouselP.addEventListener("mousemove", draggingP);
document.addEventListener("mouseup", dragStopP);
carouselP.addEventListener("scroll", infiniteScrollP);
wrapperP.addEventListener("mouseenter", () => clearTimeout(timeoutIdP));
wrapperP.addEventListener("mouseleave", autoPlayP);
