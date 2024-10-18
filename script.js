
// nav toggles
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

// JavaScript to toggle sidenav
function openNav() {
    document.getElementById("mySidenav").style.width = "130px";
    document.body.style;
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.marginLeft = "0";
  }

  function openCv() {
    document.getElementById("Cv").style.width = "100%";
    document.body.style.marginLeft = "0%"
  }
  
  function closeCv() {
    document.getElementById("Cv").style.width = "0";
    document.body.style.marginLeft = "0";

  }


  // slideshow
const gallery = document.querySelector('.gallery');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;

// Swipe detection
gallery.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const startX = touch.clientX;
  const startY = touch.clientY;

  gallery.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    if (Math.abs(endX - startX) > Math.abs(endY - startY)) {
      if (endX < startX) {
        // Swipe right
        nextSlide();
      } else {
        // Swipe left
        prevSlide();
      }
    }
  });
});

// Button navigation
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

function prevSlide() {
  currentSlide = (currentSlide - 1 + galleryItems.length) % galleryItems.length;
  updateSlide();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % galleryItems.length;
  updateSlide();
}

function updateSlide() {
  galleryItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentSlide);
  });
  gallery.scrollLeft = currentSlide * galleryItemWidth();
}

function galleryItemWidth() {
  return galleryItems[0].offsetWidth + 10;
}
