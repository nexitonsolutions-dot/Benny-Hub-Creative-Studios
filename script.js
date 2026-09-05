document.getElementById("year").textContent = new Date().getFullYear();

let slideIndex = 0;
const track = document.getElementById("track");
const slideClient = document.getElementById("slide-client");
const slideshowCard = document.getElementById("slideshow-card");
const videoProjectCard = document.getElementById("video-project-card");
const videoThumbnail = document.querySelector(".video-thumbnail");
const projectDialog = document.getElementById("project-dialog");
const dialogClose = document.getElementById("dialog-close");
const dialogImage = document.getElementById("dialog-image");
const dialogVideo = document.getElementById("dialog-video");
const videoProgress = document.getElementById("video-progress");
const dialogClient = document.getElementById("dialog-client");
let totalSlides = 0;

const slideshowImages = {
    "images/img1.jpg": "Koliko Events",
    "images/img2.jpg": "Lifeway Church",
    "images/img3.jpg": "Untamed Empire"
};

const slideshowEntries = () => Object.entries(slideshowImages);

function openProjectDetails() {
    const [imagePath, clientName] = slideshowEntries()[slideIndex] || [];

    if (!projectDialog || !imagePath || !clientName) {
        return;
    }

    dialogVideo.hidden = true;
    videoProgress.hidden = true;
    dialogImage.hidden = false;
    dialogImage.src = imagePath;
    dialogImage.alt = `${clientName} project`;
    dialogClient.textContent = clientName;
    projectDialog.showModal();
}

function openVideoDetails() {
    if (!projectDialog || !dialogVideo) {
        return;
    }

    dialogImage.hidden = true;
    dialogVideo.hidden = false;
    videoProgress.hidden = false;
    videoProgress.value = 0;
    dialogVideo.src = "videos/video.mp4";
    dialogClient.textContent = "Event film";
    projectDialog.showModal();
    dialogVideo.play().catch(() => {});
}

function updateVideoProgress() {
    if (!dialogVideo || !videoProgress || !dialogVideo.duration) {
        return;
    }

    videoProgress.value = (dialogVideo.currentTime / dialogVideo.duration) * 100;
}

function buildSlideshowCards(imageNameMap) {
    if (!track) {
        return;
    }

    track.replaceChildren();

    Object.entries(imageNameMap).forEach(([imagePath, clientName], index) => {
        const slide = document.createElement("div");
        slide.className = "slide";

        const image = document.createElement("img");
        image.src = imagePath;
        image.alt = `${clientName} project`;

        slide.appendChild(image);
        track.appendChild(slide);
    });

    totalSlides = track.querySelectorAll(".slide").length;
    slideIndex = 0;
    updateSlideBanner(imageNameMap);
}

function updateSlideBanner(imageNameMap) {
    if (slideClient) {
        const clientNames = Object.values(imageNameMap);
        slideClient.textContent = clientNames[slideIndex] || "Featured project";
    }
}

function slideShow() {
    if (!track || totalSlides < 2) {
        return;
    }

    slideIndex++;
    
    // Loop back to the first slide
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    const percentageShift = -(slideIndex * 100);
    track.style.transform = `translateX(${percentageShift}%)`;
    updateSlideBanner(slideshowImages);
}

buildSlideshowCards(slideshowImages);

if (videoThumbnail && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            videoThumbnail.play().catch(() => {});
        } else {
            videoThumbnail.pause();
        }
    }, { threshold: 0.25 });

    videoObserver.observe(videoThumbnail);
}

slideshowCard?.addEventListener("click", openProjectDetails);
slideshowCard?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectDetails();
    }
});
videoProjectCard?.addEventListener("click", openVideoDetails);
videoProjectCard?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openVideoDetails();
    }
});
dialogClose?.addEventListener("click", () => projectDialog.close());
dialogVideo?.addEventListener("loadedmetadata", updateVideoProgress);
dialogVideo?.addEventListener("timeupdate", updateVideoProgress);
projectDialog?.addEventListener("close", () => {
    dialogVideo.pause();
    dialogVideo.removeAttribute("src");
    dialogVideo.load();
    dialogVideo.hidden = true;
    videoProgress.hidden = true;
    videoProgress.value = 0;
    dialogImage.hidden = false;
});
projectDialog?.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
        projectDialog.close();
    }
});

// Advance slide every 3 seconds
setInterval(slideShow, 3000);