document.addEventListener("DOMContentLoaded", () => {
  const burgerTrigger = document.querySelector(".burger_menu_btn");
  const burgerMenu = document.querySelector(".header_menu_mobile");
  const mainContent = document.querySelector("main");

  burgerTrigger.addEventListener("click", () => {
    burgerTrigger.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    mainContent.classList.toggle("hidden");
  });
});
