document.addEventListener("DOMContentLoaded", () => {
  function initializeSwiper(swiperContainer) {
    const swiperWrapper = swiperContainer.querySelector(".swiper_wrapper");
    const swiperSlides = swiperContainer.querySelectorAll(".swiper_slide");
    const swiperActions = swiperContainer.querySelector(".swiper_actions");
    const leftArrow = swiperContainer.querySelector(".swiper_arrow-left");
    const rightArrow = swiperContainer.querySelector(".swiper_arrow-right");
    const swiperScroll = swiperContainer.querySelector(".swiper_scroll");
    const topScroll = swiperContainer.querySelector(".top_scroll");

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let visibleSlidesCount = 3;
    const slideGap = 30;

    function updateVisibleSlidesCount() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        visibleSlidesCount = 1.5;
      } else if (screenWidth < 1024) {
        visibleSlidesCount = 2;
      } else {
        visibleSlidesCount = 3;
      }
    }

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
      // const { slideWidth } = updateDimensions();
      const totalSlides = swiperSlides.length;
      const totalScrollableSlides = totalSlides - visibleSlidesCount;

      const scrollWidth = (swiperScroll.offsetWidth / totalSlides) * visibleSlidesCount;
      const scrollLeft = (currentIndex / totalScrollableSlides) * (swiperScroll.offsetWidth - scrollWidth);

      topScroll.style.width = `${scrollWidth}px`;
      topScroll.style.transform = `translateX(${scrollLeft}px)`;
    }

    function updateArrows() {
      const { maxTranslate } = updateDimensions();
      leftArrow.classList.toggle("disabled", currentIndex <= 0);
      rightArrow.classList.toggle("disabled", currentIndex >= swiperSlides.length - visibleSlidesCount);
    }

    function toggleSwiperActions() {
      const screenWidth = window.innerWidth;

      if (swiperSlides.length <= 3) {
        swiperActions.style.display = "none";
      } else {
        swiperActions.style.display = "flex";
      }

      if ((screenWidth < 1024 && swiperSlides.length === 3) || swiperSlides.length === 2) {
        swiperActions.style.display = "flex";
      }
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
      const { maxTranslate } = updateDimensions();
      if (currentTranslate > maxTranslate) {
        currentIndex += 1;
        setPositionByIndex();
      }
      updateArrows();
    });

    updateScrollIndicator();
    updateArrows();

    updateVisibleSlidesCount();
    updateDimensions();
    setPositionByIndex();
    toggleSwiperActions();

    window.addEventListener("resize", () => {
      updateVisibleSlidesCount();
      updateDimensions();
      setPositionByIndex();
    });
  }

  const swiperContainers = document.querySelectorAll(".offers_swiper, .product_swiper, .awards_swiper");
  swiperContainers.forEach(initializeSwiper);
});
