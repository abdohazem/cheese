// market slider
const wrapperM = document.querySelector(".market .slider .wrapper");
const carouselM = document.querySelector(".market .slider .wrapper .carousel");
const firstCardWidthM = carouselM.querySelector(
  ".market .slider .wrapper .carousel .card"
).offsetWidth;
const carouselMChildrens = [...carouselM.children];

let isDraggingM = false,
  isAutoPlayM = true,
  startXM,
  startScrollLeftM,
  timeoutIdM;

// Get the number of cards that can fit in the carouselM at once
let cardPerViewM = Math.round(carouselM.offsetWidth / firstCardWidthM);

// Insert copies of the last few cards to beginning of carouselM for infinite scrolling
carouselMChildrens
  .slice(-cardPerViewM)
  .reverse()
  .forEach((card) => {
    carouselM.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert copies of the first few cards to end of carouselM for infinite scrolling
carouselMChildrens.slice(0, cardPerViewM).forEach((card) => {
  carouselM.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carouselM at appropriate postition to hide first few duplicate cards on Firefox
carouselM.classList.add("no-transition");
carouselM.scrollLeft = carouselM.offsetWidth;
carouselM.classList.remove("no-transition");

const dragStartM = (e) => {
  isDraggingM = true;
  carouselM.classList.add("dragging");
  // Records the initial cursor and scroll position of the carouselM
  startXM = e.pageX;
  startScrollLeftM = carouselM.scrollLeft;
};

const draggingM = (e) => {
  if (!isDraggingM) return; // if isDraggingM is false return from here
  // Updates the scroll position of the carouselM based on the cursor movement
  carouselM.scrollLeft = startScrollLeftM - (e.pageX - startXM);
};

const dragStopM = () => {
  isDraggingM = false;
  carouselM.classList.remove("dragging");
};

const infiniteScrollM = () => {
  // If the carouselM is at the beginning, scroll to the end
  if (carouselM.scrollLeft === 0) {
    carouselM.classList.add("no-transition");
    carouselM.scrollLeft = carouselM.scrollWidth - 2 * carouselM.offsetWidth;
    carouselM.classList.remove("no-transition");
  }
  // If the carouselM is at the end, scroll to the beginning
  else if (
    Math.ceil(carouselM.scrollLeft) ===
    carouselM.scrollWidth - carouselM.offsetWidth
  ) {
    carouselM.classList.add("no-transition");
    carouselM.scrollLeft = carouselM.offsetWidth;
    carouselM.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carouselM
  clearTimeout(timeoutIdM);
  if (!wrapperM.matches(":hover")) autoPlayM();
};

const autoPlayM = () => {
  // Return if window is smaller than 800 or isAutoPlayM is false
  // Autoplay the carouselM after every 2500 ms
  timeoutIdM = setTimeout(
    () => (carouselM.scrollLeft += firstCardWidthM),
    2500
  );
};
autoPlayM();

carouselM.addEventListener("mousedown", dragStartM);
carouselM.addEventListener("mousemove", draggingM);
document.addEventListener("mouseup", dragStopM);
carouselM.addEventListener("scroll", infiniteScrollM);
wrapperM.addEventListener("mouseenter", () => clearTimeout(timeoutIdM));
wrapperM.addEventListener("mouseleave", autoPlayM);
