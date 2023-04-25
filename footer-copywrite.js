// when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('.footer_copywrite-year')) {
      // get the the span element
      const yrSpan = document.querySelector('.footer_copywrite-year');
      // get the current year
      const currentYr = new Date().getFullYear();
      // set the year span element's text to the current year
      yrSpan.textContent = currentYr;
    }
  });