document.querySelectorAll("i").forEach(function (element) {
    element.addEventListener("click", function () {
      document.querySelector("ul").classList.toggle("open");
    });
  });
