// header sum menu
document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".header_navigation_dropdown");
  const dropdown = document.querySelector(".header_dropdown_list");
  const bg = document.querySelector(".header_navigation_dropdown_bg");

  trigger.addEventListener("click", function () {
    trigger.classList.toggle("active");
    dropdown.classList.toggle("active");
    bg.classList.toggle("active");
  });
});
s;
