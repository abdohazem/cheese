const wrapperD = document.querySelector(".provider .slider");
const carouselD = document.querySelector(
  ".provider .slider .wrapper .carousel"
);
const firstCardWidthD = carouselD.querySelector(
  ".provider .slider .wrapper .carousel .card"
).offsetWidth;
const carouselDChildrens = [...carouselD.children];
const arrowBtnsD = document.querySelectorAll(".provider .slider .control i");

let isDraggingD = false,
  isAutoPlayD = true,
  startXD,
  startScrollLeftD,
  timeoutIdD;

// Get the number of cards that can fit in the carouselS at once
let cardPerViewD = Math.round(carouselD.offsetWidth / firstCardWidthD);

// Add event listeners for the arrow buttons to scroll the carouselV left and right
arrowBtnsD.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouselD.scrollLeft +=
      btn.id == "left" ? -firstCardWidthD : firstCardWidthD;
  });
});

// Insert copies of the last few cards to beginning of carouselS for infinite scrolling
carouselDChildrens
  .slice(-cardPerViewD)
  .reverse()
  .forEach((card) => {
    carouselD.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert coSies of the first few cards to end of carouselV for infinite scrolling
carouselDChildrens.slice(0, cardPerViewD).forEach((card) => {
  carouselD.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carouselP at appropriate postition to hide first few duplicate cards on Firefox
carouselD.classList.add("no-transition");
carouselD.scrollLeft = carouselD.offsetWidth;
carouselD.classList.remove("no-transition");

const dragStartD = (e) => {
  isDraggingD = true;
  carouselD.classList.add("dragging");
  // Records the initial cursor and scroll position of the carouselP
  startXD = e.pageX;
  startScrollLeftD = carouselD.scrollLeft;
};

const draggingD = (e) => {
  if (!isDraggingD) return; // if isDraggingP is false return from here
  // Updates the scroll position of the carouselP based on the cursor moPement
  carouselD.scrollLeft = startScrollLeftD - (e.pageX - startXD);
};

const dragStopD = () => {
  isDraggingD = false;
  carouselD.classList.remove("dragging");
};

const infiniteScrollD = () => {
  // If the carouselS is at the beginning, scroll to the end
  if (carouselD.scrollLeft === 0) {
    carouselD.classList.add("no-transition");
    carouselD.scrollLeft = carouselD.scrollWidth - 2 * carouselD.offsetWidth;
    carouselD.classList.remove("no-transition");
  }
  // If the carouselS is at the end, scroll to the beginning
  else if (
    Math.ceil(carouselD.scrollLeft) ===
    carouselD.scrollWidth - carouselD.offsetWidth
  ) {
    carouselD.classList.add("no-transition");
    carouselD.scrollLeft = carouselD.offsetWidth;
    carouselD.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoSlay if mouse is not hovering over carouselV
  clearTimeout(timeoutIdD);
  if (!wrapperD.matches(":hover")) autoPlayD();
};

const autoPlayD = () => {
  // Return if window is smaller than 800 or isAutoPlayP is false
  // Autoplay the carouselP after ePery 2500 ms
  timeoutIdD = setTimeout(
    () => (carouselD.scrollLeft += firstCardWidthD),
    1000
  );
};
autoPlayD();

carouselD.addEventListener("mousedown", dragStartD);
carouselD.addEventListener("mousemove", draggingD);
document.addEventListener("mouseup", dragStopD);
carouselD.addEventListener("scroll", infiniteScrollD);
wrapperD.addEventListener("mouseenter", () => clearTimeout(timeoutIdD));
wrapperD.addEventListener("mouseleave", autoPlayD);
