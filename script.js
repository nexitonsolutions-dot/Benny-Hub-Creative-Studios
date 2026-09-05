document.getElementById("year").textContent = new Date().getFullYear();

let slideIndex = 0;
const track = document.getElementById("track");
const totalSlides = document.querySelectorAll(".slide").length;

function slideShow() {
    slideIndex++;
    
    // Loop back to the first slide
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    // Shift the track left by 33.33% per index (100 / total slides)
    const percentageShift = -(slideIndex * (100 / totalSlides));
    track.style.transform = `translateX(${percentageShift}%)`;
}

// Advance slide every 3 seconds
setInterval(slideShow, 3000);