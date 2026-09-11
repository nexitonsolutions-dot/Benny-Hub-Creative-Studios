document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");
navToggle?.addEventListener("click", () => {
    const open = mainNav?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(Boolean(open)));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});

const heroDecor = document.getElementById("hero-decor");
const heroSection = heroDecor?.closest(".hero");
const floaterAssets = [
    "assets/camera.svg",
    "assets/lens.svg",
    "assets/film.svg",
    "assets/tripod.svg",
    "assets/drone.svg",
    "assets/spotlight.svg"
];

if (heroDecor && heroSection && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    floaterAssets.forEach((src) => {
        const preload = new Image();
        preload.src = src;
    });

    const smallScreen = window.matchMedia("(max-width: 620px)");
    let heroVisible = true;

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(([entry]) => {
            heroVisible = entry.isIntersecting;
        }).observe(heroSection);
    }

    const randomBetween = (min, max) => min + Math.random() * (max - min);

    const spawnFloater = () => {
        const maxAlive = smallScreen.matches ? 3 : 4;
        if (!heroVisible || document.hidden || heroDecor.childElementCount >= maxAlive) {
            return;
        }

        const floater = document.createElement("img");
        floater.className = "floater";
        floater.alt = "";
        floater.src = floaterAssets[Math.floor(Math.random() * floaterAssets.length)];

        const size = smallScreen.matches ? randomBetween(28, 46) : randomBetween(34, 58);
        floater.style.width = `${size}px`;
        floater.style.left = `${randomBetween(2, 90)}%`;

        const riseHeight = heroSection.offsetHeight + 200;
        const drift = randomBetween(-40, 40);
        const duration = randomBetween(14000, 20000);

        heroDecor.appendChild(floater);
        const rise = floater.animate(
            [
                { transform: "translate(0, 0) rotate(0deg)", opacity: 0 },
                { transform: `translate(${drift * 0.4}px, ${-riseHeight * 0.25}px) rotate(2deg)`, opacity: 0.1, offset: 0.2 },
                { transform: `translate(${drift}px, ${-riseHeight}px) rotate(-2deg)`, opacity: 0 }
            ],
            { duration, easing: "linear", fill: "forwards" }
        );
        rise.onfinish = () => floater.remove();
    };

    const spawnBurst = () => {
        spawnFloater();
        spawnFloater();
    };

    window.setInterval(spawnBurst, 2600);
    window.setTimeout(spawnBurst, 400);
}
const sectionIds = ["about", "work", "services", "pricing", "process", "schedule", "contact"];
const navAnchors = new Map();
mainNav?.querySelectorAll("a").forEach((link) => {
    const hash = link.getAttribute("href");
    if (hash && hash.startsWith("#")) {
        navAnchors.set(hash.slice(1), link);
    }
});

if ("IntersectionObserver" in window && navAnchors.size) {
    let current = "";
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                current = entry.target.id;
            }
        });
        navAnchors.forEach((link, id) => {
            link.classList.toggle("active", id === current);
        });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
            spy.observe(section);
        }
    });
}

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
const whatsappContact = document.getElementById("whatsapp-contact");
const emailContact = document.getElementById("email-contact");
const paymentFormPanel = document.getElementById("payment-form-panel");
const selectedPackageInput = document.getElementById("selected-package");
const selectedPackageLabel = document.getElementById("selected-package-label");
const pricingSectionSelect = document.getElementById("pricing-section-select");
const pricingGroupSelect = document.getElementById("pricing-group-select");
const pricingPackageSelect = document.getElementById("pricing-package-select");
const projectSummaryForm = document.getElementById("project-summary-form");
const projectSummaryStatus = document.getElementById("project-summary-status");
const projectSummaryMessage = document.getElementById("project-summary-message");
const projectSummaryTitle = document.getElementById("project-summary-title");
let totalSlides = 0;

const emailJsConfig = {
    publicKey: "cQS4i2H1IU7rSdOR1",
    serviceId: "service_9y5tuik",
    templateId: "template_2fim987"
};

const pricingCatalog = {
    "Graphic Design": {
        groups: {
            "Flyers & Cards": [
                { label: "Birthday Flyers", value: "Birthday Flyers", price: "GHC 150" },
                { label: "Church Flyers", value: "Church Flyers", price: "GHC 150" },
                { label: "Business Flyers", value: "Business Flyers", price: "GHC 200" },
                { label: "Invitation Card Only", value: "Invitation Card Only", price: "GHC 150" },
                { label: "Business Package", value: "Business Package", price: "GHC 500" },
                { label: "Event Package", value: "Event Package", price: "GHC 500 - 1500" }
            ],
            "Branding & Logos": [
                { label: "Business Logo", value: "Business Logo", price: "GHC 500" },
                { label: "Church / School Logo", value: "Church / School Logo", price: "GHC 600" },
                { label: "Business Brand", value: "Business Brand", price: "GHC 800 - 1500" }
            ],
            "Print & Media Assets": [
                { label: "Banner Design Only", value: "Banner Design Only", price: "GHC 150" },
                { label: "Certificate Design Only", value: "Certificate Design Only", price: "GHC 150" },
                { label: "Cloth / Fabric Design", value: "Cloth / Fabric Design", price: "GHC 300" },
                { label: "Call Card Design (One Sided)", value: "Call Card Design (One Sided)", price: "GHC 200" },
                { label: "Call Card Design (Two Sided)", value: "Call Card Design (Two Sided)", price: "GHC 350" }
            ]
        }
    },
    "Photography": {
        groups: {
            "Wedding Photography": [
                { label: "Standard", value: "Wedding Photography - Standard", price: "GHC 4,500" },
                { label: "Premium", value: "Wedding Photography - Premium", price: "GHC 6,500" },
                { label: "Exclusive", value: "Wedding Photography - Exclusive", price: "GHC 8,000" }
            ],
            "Studio Sessions": [
                { label: "Pearl", value: "Studio Session - Pearl", price: "GHC 250" },
                { label: "Ruby", value: "Studio Session - Ruby", price: "GHC 450" },
                { label: "Diamond", value: "Studio Session - Diamond", price: "GHC 850" }
            ],
            "Graduation Packages": [
                { label: "Bronze", value: "Graduation Package - Bronze", price: "GHC 500" },
                { label: "Silver", value: "Graduation Package - Silver", price: "GHC 700" },
                { label: "Gold", value: "Graduation Package - Gold", price: "GHC 900" }
            ]
        }
    },
    "Videography": {
        groups: {
            "Event Coverage": [
                { label: "Regular Package", value: "Videography - Regular Package", price: "GHC 3,000" },
                { label: "VIP Package", value: "Videography - VIP Package", price: "GHC 3,500" },
                { label: "VVIP Package", value: "Videography - VVIP Package", price: "GHC 5,000" }
            ],
            "Wedding Videography": [
                { label: "Bronze", value: "Wedding Videography - Bronze", price: "GHC 3,500" },
                { label: "Silver", value: "Wedding Videography - Silver", price: "GHC 5,500" },
                { label: "Gold", value: "Wedding Videography - Gold", price: "GHC 6,500" },
                { label: "Diamond", value: "Wedding Videography - Diamond", price: "GHC 7,500" },
                { label: "Combo Pack", value: "Wedding Videography - Combo Pack", price: "GHC 9,500" }
            ]
        }
    }
};

function populateSectionOptions() {
    if (!pricingSectionSelect) {
        return;
    }

    pricingSectionSelect.innerHTML = '<option value="">Select a section</option>' + Object.keys(pricingCatalog)
        .map((section) => `<option value="${section}">${section}</option>`)
        .join("");
}

function populateGroupOptions() {
    if (!pricingSectionSelect || !pricingGroupSelect || !pricingPackageSelect) {
        return;
    }

    const selectedSection = pricingSectionSelect.value;
    const sectionGroups = selectedSection ? pricingCatalog[selectedSection]?.groups || {} : {};
    const groupKeys = Object.keys(sectionGroups);

    pricingGroupSelect.disabled = !selectedSection || groupKeys.length === 0;
    pricingGroupSelect.innerHTML = '<option value="">Select a package group</option>' + groupKeys
        .map((groupName) => `<option value="${groupName}">${groupName}</option>`)
        .join("");

    pricingPackageSelect.disabled = true;
    pricingPackageSelect.innerHTML = '<option value="">Select a package</option>';
    hidePaymentForm();
}

function populatePackageOptions() {
    if (!pricingSectionSelect || !pricingGroupSelect || !pricingPackageSelect) {
        return;
    }

    const selectedSection = pricingSectionSelect.value;
    const selectedGroup = pricingGroupSelect.value;
    const packageOptions = selectedSection && selectedGroup ? pricingCatalog[selectedSection]?.groups?.[selectedGroup] || [] : [];

    pricingPackageSelect.disabled = packageOptions.length === 0;
    pricingPackageSelect.innerHTML = '<option value="">Select a package</option>' + packageOptions
        .map((packageItem) => `<option value="${packageItem.value}" data-label="${packageItem.label}" data-price="${packageItem.price}">${packageItem.label} · ${packageItem.price}</option>`)
        .join("");

    hidePaymentForm();
}

function hidePaymentForm() {
    if (paymentFormPanel) {
        paymentFormPanel.classList.remove("visible");
    }
    if (selectedPackageInput) {
        selectedPackageInput.value = "";
    }
    if (selectedPackageLabel) {
        selectedPackageLabel.textContent = "Please choose a package";
    }
}

function showSelectedPackage() {
    if (!pricingSectionSelect || !pricingGroupSelect || !pricingPackageSelect) {
        return;
    }

    const packageOption = pricingPackageSelect.options[pricingPackageSelect.selectedIndex];

    if (!packageOption || !packageOption.value) {
        hidePaymentForm();
        return;
    }

    const sectionName = pricingSectionSelect.value;
    const groupName = pricingGroupSelect.value;
    const packageLabel = packageOption.dataset.label || packageOption.textContent;
    const packagePrice = packageOption.dataset.price || "";
    const selectedText = `${sectionName} · ${groupName} · ${packageLabel} (${packagePrice})`;

    if (selectedPackageInput) {
        selectedPackageInput.value = selectedText;
    }
    if (selectedPackageLabel) {
        selectedPackageLabel.textContent = selectedText;
    }
    if (paymentFormPanel) {
        paymentFormPanel.classList.add("visible");
        paymentFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

pricingSectionSelect?.addEventListener("change", populateGroupOptions);
pricingGroupSelect?.addEventListener("change", populatePackageOptions);
pricingPackageSelect?.addEventListener("change", showSelectedPackage);

populateSectionOptions();
populateGroupOptions();
populatePackageOptions();

function buildProjectSummaryMessage() {
    const formData = new FormData(projectSummaryForm);
    const values = new Map();

    formData.forEach((value, key) => {
        if (key === "message" || value === "") {
            return;
        }

        const currentValues = values.get(key) || [];
        currentValues.push(value);
        values.set(key, currentValues);
    });

    projectSummaryForm.querySelectorAll(".summary-static-value").forEach((staticValue) => {
        const field = staticValue.closest(".summary-field");
        const label = field?.querySelector(":scope > span")?.textContent.trim();
        if (label) {
            values.set(label, [staticValue.textContent.trim()]);
        }
    });

    return Array.from(values.entries())
        .map(([key, fieldValues]) => `${key.replaceAll("-", " ")}: ${fieldValues.join(", ")}`)
        .join("\n");
}

projectSummaryForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!projectSummaryForm.checkValidity()) {
        projectSummaryForm.reportValidity();
        return;
    }

    if (!window.emailjs || Object.values(emailJsConfig).some((value) => value.startsWith("YOUR_EMAILJS_"))) {
        if (projectSummaryStatus) {
            projectSummaryStatus.textContent = "Email service is not configured yet. Please add the EmailJS keys.";
            projectSummaryStatus.className = "summary-form-status error";
        }
        return;
    }

    const submitButton = projectSummaryForm.querySelector(".summary-submit");
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
    }
    if (projectSummaryStatus) {
        projectSummaryStatus.textContent = "Sending your project summary...";
        projectSummaryStatus.className = "summary-form-status";
    }

    try {
        if (projectSummaryMessage) {
            projectSummaryMessage.value = buildProjectSummaryMessage();
        }
        if (projectSummaryTitle) {
            const clientName = projectSummaryForm.elements.name.value.trim() || "Client";
            projectSummaryTitle.value = `Project Scheduled by '${clientName}'.`;
        }
        emailjs.init({ publicKey: emailJsConfig.publicKey });
        await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, projectSummaryForm);
        projectSummaryForm.reset();
        if (projectSummaryStatus) {
            projectSummaryStatus.textContent = "Project summary sent successfully.";
            projectSummaryStatus.className = "summary-form-status success";
        }
    } catch (error) {
        console.error("Unable to send project summary", error);
        if (projectSummaryStatus) {
            projectSummaryStatus.textContent = "Unable to send the project summary. Please try again.";
            projectSummaryStatus.className = "summary-form-status error";
        }
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Submit project summary";
        }
    }
});

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.setAttribute("readonly", "");
    tempInput.style.position = "fixed";
    tempInput.style.left = "-9999px";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function triggerCopiedState(button) {
    if (!button) {
        return;
    }

    button.classList.add("copied");
    button.setAttribute("data-copy-state", "Copied");
    window.setTimeout(() => {
        button.classList.remove("copied");
        button.removeAttribute("data-copy-state");
    }, 1200);
}

function setupLongPressCopy(button, value, label) {
    if (!button) {
        return;
    }

    let longPressTimer = null;
    let longPressTriggered = false;

    const handlePressStart = () => {
        longPressTimer = window.setTimeout(async () => {
            longPressTriggered = true;
            try {
                await copyToClipboard(value);
                triggerCopiedState(button);
            } catch (error) {
                console.error(`Unable to copy ${label}`, error);
            }
        }, 700);
    };

    const cancelPress = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    };

    button.addEventListener("pointerdown", handlePressStart);
    button.addEventListener("pointerup", cancelPress);
    button.addEventListener("pointerleave", cancelPress);
    button.addEventListener("pointercancel", cancelPress);
    button.addEventListener("click", (event) => {
        if (longPressTriggered) {
            event.preventDefault();
            longPressTriggered = false;
            return;
        }
    });
}

setupLongPressCopy(whatsappContact, "0570688025", "phone number");
setupLongPressCopy(emailContact, "asarebernard828@gmail.com", "email address");

const slideshowImages = {
    "https://ik.imagekit.io/nExiton/images/img1.jpg": "Koliko Events",
    "https://ik.imagekit.io/nExiton/images/img2.jpg": "Lifeway Church",
    "https://ik.imagekit.io/nExiton/images/img3.jpg": "Untamed Empire"
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
    dialogVideo.src = "https://ik.imagekit.io/nExiton/videos/video.MP4";
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
        image.decoding = "async";
        image.loading = index === 0 ? "eager" : "lazy";

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
    const saveData = navigator.connection?.saveData;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 620px)").matches;
    if (saveData || reduceMotion || isMobile) {
        videoThumbnail.preload = "none";
    } else {
        const videoObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                videoThumbnail.play().catch(() => {});
            } else {
                videoThumbnail.pause();
            }
        }, { threshold: 0.25 });

        videoObserver.observe(videoThumbnail);
    }
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