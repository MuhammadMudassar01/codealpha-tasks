// ================= FILTER BUTTONS =================

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // REMOVE ACTIVE CLASS

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // ADD ACTIVE CLASS

        button.classList.add("active");

        // GET FILTER VALUE

        const filterValue = button.getAttribute("data-filter");

        // FILTER ITEMS

        galleryItems.forEach(item => {

            if (
                filterValue === "all" ||
                item.classList.contains(filterValue)
            ) {

                item.style.display = "block";

            }

            else {

                item.style.display = "none";

            }

        });

    });

});

// ================= LIGHTBOX =================

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close-btn");

const nextBtn = document.querySelector(".next-btn");

const prevBtn = document.querySelector(".prev-btn");

const galleryImages = document.querySelectorAll(".gallery-item img");
const imageCounter =
    document.querySelector(".image-counter");

// CURRENT IMAGE INDEX

let currentIndex = 0;

// OPEN LIGHTBOX

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImage.src = image.src;
        imageCounter.textContent =
            `${currentIndex + 1} / ${galleryImages.length}`;

        currentIndex = index;

    });

});

// CLOSE LIGHTBOX

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});

// NEXT BUTTON

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    }

    lightboxImage.src =
        galleryImages[currentIndex].src;
    imageCounter.textContent =
        `${currentIndex + 1} / ${galleryImages.length}`;

});

// PREVIOUS BUTTON

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex =
            galleryImages.length - 1;
    }

    lightboxImage.src =
        galleryImages[currentIndex].src;
    imageCounter.textContent =
        `${currentIndex + 1} / ${galleryImages.length}`;

});

document.addEventListener("keydown", (event) => {

    // ESC CLOSE

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }

    // RIGHT ARROW

    if (event.key === "ArrowRight") {

        currentIndex++;

        if (currentIndex >= galleryImages.length) {
            currentIndex = 0;
        }

        lightboxImage.src =
            galleryImages[currentIndex].src;

        imageCounter.textContent =
            `${currentIndex + 1} / ${galleryImages.length}`;
    }

    // LEFT ARROW

    if (event.key === "ArrowLeft") {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex =
                galleryImages.length - 1;
        }

        lightboxImage.src =
            galleryImages[currentIndex].src;

        imageCounter.textContent =
            `${currentIndex + 1} / ${galleryImages.length}`;
    }

});

// CLICK OUTSIDE CLOSE

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }
    // ================= LOADER =================

    window.addEventListener("load", () => {

        const loader =
            document.querySelector(".loader-wrapper");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 800);

    });

});