document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".header_navigation_dropdown");
  const bg = document.querySelector(".header_navigation_dropdown_bg");

  triggers.forEach((trigger) => {
    const dropdown = trigger.querySelector(".header_dropdown_list");

    trigger.addEventListener("click", () => {
      triggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.classList.remove("active");
          otherTrigger.querySelector(".header_dropdown_list").classList.remove("active");
        }
      });

      trigger.classList.toggle("active");
      dropdown.classList.toggle("active");

      bg.classList.toggle("active", trigger.classList.contains("active"));
    });
  });

  // Close all dropdowns if clicking outside of the menu
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header_navigation_dropdown")) {
      triggers.forEach((trigger) => {
        trigger.classList.remove("active");
        trigger.querySelector(".header_dropdown_list").classList.remove("active");
      });
      bg.classList.remove("active");
    }
  });
});
