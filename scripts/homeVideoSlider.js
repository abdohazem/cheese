const wrapperV = document.querySelector(".media .video");
const carouselV = document.querySelector(".media .video .wrapper .carousel");
const firstCardWidthV = carouselV.querySelector(
  ".media .video .wrapper .carousel .card"
).offsetWidth;
const carouselVChildrens = [...carouselV.children];
const arrowBtnsV = document.querySelectorAll(".media .video .control i");

let isDraggingV = false,
  isAutoPlayV = true,
  startXV,
  startScrollLeftV,
  timeoutIdV;

// Get the number of cards that can fit in the carouselV at once
let cardPerViewV = Math.round(carouselV.offsetWidth / firstCardWidthV);

// Add event listeners for the arrow buttons to scroll the carouselV left and right
arrowBtnsV.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouselV.scrollLeft +=
      btn.id == "left" ? -firstCardWidthV : firstCardWidthV;
  });
});

// Insert copies of the last few cards to beginning of carouselV for infinite scrolling
carouselVChildrens
  .slice(-cardPerViewV)
  .reverse()
  .forEach((card) => {
    carouselV.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carouselV for infinite scrolling
carouselVChildrens.slice(0, cardPerViewV).forEach((card) => {
  carouselV.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carouselV at appropriate postition to hide first few duplicate cards on Firefox
carouselV.classList.add("no-transition");
carouselV.scrollLeft = carouselV.offsetWidth;
carouselV.classList.remove("no-transition");

const dragStartV = (e) => {
  isDraggingV = true;
  carouselV.classList.add("dragging");
  // Records the initial cursor and scroll position of the carouselV
  startXV = e.pageX;
  startScrollLeftV = carouselV.scrollLeft;
};

const draggingV = (e) => {
  if (!isDraggingV) return; // if isDraggingV is false return from here
  // Updates the scroll position of the carouselV based on the cursor movement
  carouselV.scrollLeft = startScrollLeftV - (e.pageX - startXV);
};

const dragStopV = () => {
  isDraggingV = false;
  carouselV.classList.remove("dragging");
};

const infiniteScrollV = () => {
  // If the carouselV is at the beginning, scroll to the end
  if (carouselV.scrollLeft === 0) {
    carouselV.classList.add("no-transition");
    carouselV.scrollLeft = carouselV.scrollWidth - 2 * carouselV.offsetWidth;
    carouselV.classList.remove("no-transition");
  }
  // If the carouselV is at the end, scroll to the beginning
  else if (
    Math.ceil(carouselV.scrollLeft) ===
    carouselV.scrollWidth - carouselV.offsetWidth
  ) {
    carouselV.classList.add("no-transition");
    carouselV.scrollLeft = carouselV.offsetWidth;
    carouselV.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carouselV
  clearTimeout(timeoutIdV);
  if (!wrapperV.matches(":hover")) autoPlayV();
};

const autoPlayV = () => {
  // Return if window is smaller than 800 or isAutoPlayV is false
  // Autoplay the carouselV after every 2500 ms
  timeoutIdV = setTimeout(
    () => (carouselV.scrollLeft += firstCardWidthV),
    1000
  );
};
autoPlayV();

carouselV.addEventListener("mousedown", dragStartV);
carouselV.addEventListener("mousemove", draggingV);
document.addEventListener("mouseup", dragStopV);
carouselV.addEventListener("scroll", infiniteScrollV);
wrapperV.addEventListener("mouseenter", () => clearTimeout(timeoutIdV));
wrapperV.addEventListener("mouseleave", autoPlayV);
