document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".footer_dropdown-toggle");
  const dropdowns = document.querySelectorAll(".footer_dropdown");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const parentDropdown = this.parentElement;

      dropdowns.forEach((dropdown) => {
        if (dropdown !== parentDropdown) {
          dropdown.classList.remove("open");
          dropdown.querySelector(".footer_dropdown-list").style.maxHeight = "0";
        }
      });

      parentDropdown.classList.toggle("open");
      const dropdownList = parentDropdown.querySelector(".footer_dropdown-list");
      dropdownList.style.maxHeight = parentDropdown.classList.contains("open") ? `${dropdownList.scrollHeight}px` : "0";
    });
  });
});
