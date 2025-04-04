
// humburger
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.getElementById("navbar");
    const links = document.querySelectorAll(".list-item a");

    // Toggle menu
    function toggleMenu() {
        navLinks.classList.toggle("active");
    }

    hamburger.addEventListener("click", toggleMenu);

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    });
});

// slider
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  let images = document.querySelectorAll(".gallery-item");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let index = 0;
  const visibleImages = 3;
  const totalImages = images.length;

  function cloneSlides() {
      const firstSet = [...images].slice(0, visibleImages);
      firstSet.forEach(img => gallery.appendChild(img.cloneNode(true)));
      images = document.querySelectorAll(".gallery-item"); // Update node list
  }

  function updateActiveImage() {
      images.forEach(img => img.classList.remove("active"));
      let centerIndex = index + Math.floor(visibleImages / 2); // Target the middle image
      if (centerIndex < images.length) {
          images[centerIndex].classList.add("active");
      }
  }

  function showSlide() {
      gallery.style.transition = "transform 0.5s ease-in-out";
      gallery.style.transform = `translateX(-${index * (100 / visibleImages)}%)`;
      updateActiveImage();
  }

  function nextSlide() {
      index++;
      if (index >= totalImages) {
          setTimeout(() => {
              gallery.style.transition = "none";
              index = 0;
              showSlide();
          }, 500);
      }
      showSlide();
  }

  function prevSlide() {
      index--;
      if (index < 0) {
          index = totalImages - visibleImages;
          gallery.style.transition = "none";
          showSlide();
      }
      setTimeout(() => {
          gallery.style.transition = "transform 0.5s ease-in-out";
          showSlide();
      }, 10);
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
  setInterval(nextSlide, 3000); // Auto slide every 3 seconds
  cloneSlides();
  updateActiveImage();
});


// About section
document.addEventListener("DOMContentLoaded", function () {
  const readMoreButton = document.querySelector(".input-section-button button");
  const contentSections = document.querySelectorAll(".p2, .p3");
  
  // Initially hide the paragraphs
  contentSections.forEach(section => section.style.display = "none");

  readMoreButton.addEventListener("click", function () {
      const isHidden = contentSections[0].style.display === "none";
      
      contentSections.forEach(section => {
          section.style.display = isHidden ? "block" : "none";
      });
      
      readMoreButton.textContent = isHidden ? "Read Less" : "Read More";
  });
});

// cert 
function openModal(imgElement) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "flex";
    modalImg.src = imgElement.src;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = 'auto';
}