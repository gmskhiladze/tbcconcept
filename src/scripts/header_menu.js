document.addEventListener("DOMContentLoaded", function () {
  // header sum menu
  const triggers = document.querySelectorAll(".header_navigation_dropdown");
  const bg = document.querySelector(".header_navigation_dropdown_bg");

  triggers.forEach((trigger) => {
    const dropdown = trigger.querySelector(".header_dropdown_list");

    trigger.addEventListener("click", function () {
      // Deactivate all other dropdowns
      triggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.classList.remove("active");
          otherTrigger.querySelector(".header_dropdown_list").classList.remove("active");
        }
      });

      // Toggle the clicked dropdown
      trigger.classList.toggle("active");
      dropdown.classList.toggle("active");

      // Handle the background toggle
      if (trigger.classList.contains("active")) {
        bg.classList.add("active");
      } else {
        bg.classList.remove("active");
      }
    });
  });

  // Close all dropdowns if clicking outside of the menu
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".header_navigation_dropdown")) {
      triggers.forEach((trigger) => {
        trigger.classList.remove("active");
        trigger.querySelector(".header_dropdown_list").classList.remove("active");
      });
      bg.classList.remove("active");
    }
  });
});
