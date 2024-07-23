document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.querySelector(".swiper_wrapper");
  const swiperSlides = document.querySelectorAll(".swiper_slide");
  const leftArrow = document.querySelector(".swiper_arrow-left");
  const rightArrow = document.querySelector(".swiper_arrow-right");

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let currentIndex = 0;
  const slideWidth = swiperSlides[0].offsetWidth + 30; // Slide width including gap
  const totalWidth = swiperSlides.length * slideWidth - 30; // Total width including gaps

  swiperSlides.forEach((slide, index) => {
    // Touch events
    slide.addEventListener("touchstart", touchStart(index));
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);

    // Mouse events
    slide.addEventListener("mousedown", touchStart(index));
    slide.addEventListener("mouseup", touchEnd);
    slide.addEventListener("mouseleave", touchEnd);
    slide.addEventListener("mousemove", touchMove);
  });

  function touchStart(index) {
    return function (event) {
      startPos = getPositionX(event);
      isDragging = true;
      swiperWrapper.classList.add("grabbing");
    };
  }

  function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < swiperSlides.length - 1) {
      currentIndex += 1;
    }
    if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
    swiperWrapper.classList.remove("grabbing");
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      setSliderPosition();
    }
  }

  function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  }

  function setSliderPosition() {
    // Limit the translation to prevent sliding beyond the last slide
    const maxTranslate = -((swiperSlides.length - 1) * slideWidth);
    swiperWrapper.style.transform = `translateX(${Math.max(Math.min(currentTranslate, 0), maxTranslate)}px)`;
  }

  function setPositionByIndex() {
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  // Arrows functionality
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      setPositionByIndex();
    }
  });

  rightArrow.addEventListener("click", () => {
    if (currentIndex < swiperSlides.length - 1) {
      currentIndex += 1;
      setPositionByIndex();
    }
  });
});
