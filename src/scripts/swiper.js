document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.querySelector(".swiper_wrapper");
  const swiperSlides = document.querySelectorAll(".swiper_slide");
  const leftArrow = document.querySelector(".swiper_arrow-left");
  const rightArrow = document.querySelector(".swiper_arrow-right");
  const swiperScroll = document.querySelector(".swiper_scroll");
  const topScroll = document.querySelector(".top_scroll");

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let currentIndex = 0;
  const slideGap = 30;
  const visibleSlidesCount = 3;

  function updateDimensions() {
    const slideWidth = swiperSlides[0].offsetWidth + slideGap;
    const containerWidth = swiperWrapper.offsetWidth;
    const slidesWidth = swiperSlides.length * slideWidth;
    const maxTranslate = containerWidth - slidesWidth;

    return {
      slideWidth,
      containerWidth,
      maxTranslate,
    };
  }

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

    if (movedBy < -50 && currentIndex < swiperSlides.length - visibleSlidesCount) {
      currentIndex += 1;
    }
    if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
    swiperWrapper.classList.remove("grabbing");
    updateArrows();
  }

  function touchMove(event) {
    if (isDragging) {
      const { slideWidth, maxTranslate } = updateDimensions();
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      currentTranslate = Math.max(Math.min(currentTranslate, 0), maxTranslate);
      swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }
    updateArrows();
  }

  function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  }

  function setPositionByIndex() {
    const { slideWidth, maxTranslate } = updateDimensions();
    currentTranslate = -currentIndex * slideWidth;
    currentTranslate = Math.max(Math.min(currentTranslate, 0), maxTranslate);
    prevTranslate = currentTranslate;
    swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollIndicator();
  }

  function updateScrollIndicator() {
    const { slideWidth } = updateDimensions();
    const containerWidth = swiperScroll.offsetWidth;
    const totalScrollableWidth = containerWidth;
    const scrollWidth = totalScrollableWidth / visibleSlidesCount;
    const scrollLeft = ((currentIndex * scrollWidth) / totalScrollableWidth) * containerWidth;

    console.log("====================================");
    console.log(currentIndex * slideWidth);
    console.log("====================================");

    topScroll.style.width = `${scrollWidth}px`;
    topScroll.style.transform = `translateX(${scrollLeft}px)`;
  }

  function updateArrows() {
    const { maxTranslate } = updateDimensions();
    currentIndex > 0 ? leftArrow.classList.remove("disabled") : leftArrow.classList.add("disabled");
    currentTranslate > maxTranslate ? rightArrow.classList.remove("disabled") : rightArrow.classList.add("disabled");
    currentIndex != swiperSlides.length - visibleSlidesCount ? rightArrow.classList.remove("disabled") : rightArrow.classList.add("disabled");
  }

  swiperSlides.forEach((slide) => {
    slide.addEventListener("touchstart", touchStart());
    slide.addEventListener("touchend", touchEnd);
    slide.addEventListener("touchmove", touchMove);
    slide.addEventListener("mousedown", touchStart());
    slide.addEventListener("mouseup", touchEnd);
    slide.addEventListener("mouseleave", touchEnd);
    slide.addEventListener("mousemove", touchMove);
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      setPositionByIndex();
    }
    updateArrows();
  });

  rightArrow.addEventListener("click", () => {
    const { slideWidth, maxTranslate } = updateDimensions();
    if (currentTranslate > maxTranslate) {
      currentIndex += 1;
      setPositionByIndex();
    }
    updateArrows();
  });
});
