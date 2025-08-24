//Contact Form
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        alert('✅ Thank you! Your message has been received.');
        form.reset();
      } else {
        alert('❌ Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('⚠️ Network error. Please check your connection.');
    }
  });

// hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Toggle dropdown + X animation
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active"); // add/remove X class
});

// Close menu when link is clicked
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active"); // reset X
  });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active"); // reset X
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".certslide");
  let images = document.querySelectorAll(".certslide img");
  const dotsContainer = document.querySelector(".dots");
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.querySelector("#certModal .close");

  let index = 0;
  let visibleImages = getVisibleImages();
  let totalImages = images.length;

  function getVisibleImages() {
    return window.innerWidth <= 768 ? 2 : 3;
  }

  // Clone slides for infinite loop

  function cloneSlides() {
    visibleImages = getVisibleImages();   
    totalImages = images.length;

    const firstSet = [...images].slice(0, visibleImages);
    const lastSet = [...images].slice(-visibleImages);

    lastSet.forEach(img => gallery.insertBefore(img.cloneNode(true), images[0]));
    firstSet.forEach(img => gallery.appendChild(img.cloneNode(true)));

    images = document.querySelectorAll(".certslide img");
    index = visibleImages;
    gallery.style.transform = `translateX(-${index * (100 / visibleImages)}%)`;
  }

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalImages; i++) {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => {
        index = i + visibleImages; // jump to that slide
        showSlide();
      });
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll("span");
    dots.forEach(dot => dot.classList.remove("active"));

    // ✅ center image determines active dot
    const realIndex =
      (index - visibleImages + Math.floor(visibleImages / 2) + totalImages) %
      totalImages;

    if (dots[realIndex]) dots[realIndex].classList.add("active");
  }

  function updateActiveImage() {
  images.forEach(img => img.classList.remove("active"));

  // ✅ highlight center image depending on visibleImages
  let centerIndex = index + Math.floor(visibleImages / 2);
  if (images[centerIndex]) {
    images[centerIndex].classList.add("active");
  }
}

 function showSlide(transition = true) {
  const slideWidth = 100 / visibleImages; // % width per slide
  gallery.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
  gallery.style.transform = `translateX(-${index * slideWidth}%)`;
  updateDots();
  updateActiveImage();
}

  function nextSlide() {
    index++;
    showSlide();
    if (index >= totalImages + visibleImages) {
      setTimeout(() => {
        index = visibleImages;
        showSlide(false);
      }, 500);
    }
  }

  function prevSlide() {
    index--;
    showSlide();
    if (index < visibleImages) {
      setTimeout(() => {
        index = totalImages;
        showSlide(false);
      }, 500);
    }
  }

  // Screen click: left = prev, right = next
  document.querySelector(".certslide-wrapper").addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX < rect.left + rect.width / 2) {
      prevSlide();
    } else {
      nextSlide();
    }
  });

  // Modal
  window.openModal = function (img) {
    modal.style.display = "flex";
    modalImg.src = img.src;
  };

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Auto slide
  setInterval(nextSlide, 3000);

  // Init
  cloneSlides();
  createDots();
  showSlide(false);
});


// Toggle About Section
function toggleAbout() {
  const aboutSection = document.getElementById("about-section");
  const btn = event.target;

  if (aboutSection.style.display === "none") {
    aboutSection.style.display = "block";
    btn.textContent = "Read Less";
  } else {
    aboutSection.style.display = "none";
    btn.textContent = "Read More";
  }
}

// About Modal
function openAboutModal() {
  document.getElementById("aboutModal").style.display = "block";
}

function closeAboutModal() {
  document.getElementById("aboutModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(e) {
  var modal = document.getElementById("aboutModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};


