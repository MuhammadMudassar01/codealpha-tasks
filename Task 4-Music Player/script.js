// AUDIO

const audio =
    document.querySelector(".audio");

// BUTTONS

const playBtn =
    document.querySelector(".play-btn");

const prevBtn =
    document.querySelector(".prev-btn");

const nextBtn =
    document.querySelector(".next-btn");

// PLAYER INFO

const cover =
    document.querySelector(".main-cover");

const title =
    document.querySelector(".track-title");

const artist =
    document.querySelector(".track-artist");

// PROGRESS

const progressBar =
    document.querySelector(".progress-bar");

const currentTimeEl =
    document.querySelector(".current-time");

const durationEl =
    document.querySelector(".duration");

// VOLUME

const volumeSlider =
    document.querySelector(".volume-slider");

// PLAYLIST

const playlistItems =
    document.querySelectorAll(".playlist-item");

// TRACK DATA

const naats = [

    {

        title:
            "Beshak Main Rangon Gul",
        artist:
            "Haqeeqat Mein Khuwar Hai Duniya",
        audio:
            "./naat1.mpeg",

        cover:
            "./image1.jpeg"
    },

    {

        title:
            "Main Qabar Andheri Mein",
        artist:
            "Ghabrao Ga Jab Tanha",
        audio:
            "./naat2.mpeg",

        cover:
            "./image2.jpeg"
    },

    {

        title:
            "Naam-e-Muhammad",
        artist:
            "Dil Ka Ujala Hai Naam-e-Muhammad",
        audio:
            "./naat3.mpeg",

        cover:
            "./image3.jpeg"
    },

    {

        title:
            "Nabi Ka Lab Par",
        artist:
            "Jo Zikr Aya Kamal Aya",
        audio:
            "./naat4.mpeg",

        cover:
            "./image4.jpeg"
    }

];

// VARIABLES

let currentTrack = 0;

let isPlaying = false;

// LOAD TRACK

function loadTrack(index) {

    const track =
        naats[index];

    // FADE EFFECT

    cover.style.opacity = "0";

    // TITLE

    title.textContent =
        track.title;

    // SUBTITLE

    artist.textContent =
        track.artist;

    // AUDIO

    audio.src =
        track.audio;

    // COVER

    cover.src =
        track.cover;

    // FADE IN

    setTimeout(() => {

        cover.style.opacity = "1";

    }, 200);

    // ACTIVE PLAYLIST

    playlistItems.forEach((item) => {

        item.classList.remove("active");
    });

    playlistItems[index]
        .classList.add("active");
}

// PLAY TRACK

function playTrack() {

    audio.play();

    isPlaying = true;

    playBtn.textContent = "⏸";

    cover.classList.add("playing");
}

// PAUSE TRACK

function pauseTrack() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶";

    cover.classList.remove("playing");
}

// PLAY / PAUSE

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        pauseTrack();
    }

    else {

        playTrack();
    }
});

// NEXT TRACK

nextBtn.addEventListener("click", () => {

    currentTrack++;

    if (currentTrack >= naats.length) {

        currentTrack = 0;
    }

    loadTrack(currentTrack);

    playTrack();
});

// PREVIOUS TRACK

prevBtn.addEventListener("click", () => {

    currentTrack--;

    if (currentTrack < 0) {

        currentTrack =
            naats.length - 1;
    }

    loadTrack(currentTrack);

    playTrack();
});

// UPDATE PROGRESS

audio.addEventListener("timeupdate", () => {

    const current =
        audio.currentTime;

    const duration =
        audio.duration;

    // PROGRESS BAR

    progressBar.value =
        (current / duration) * 100 || 0;

    // CURRENT TIME

    let currentMinutes =
        Math.floor(current / 60);

    let currentSeconds =
        Math.floor(current % 60);

    if (currentSeconds < 10) {

        currentSeconds =
            "0" + currentSeconds;
    }

    currentTimeEl.textContent =
        `${currentMinutes}:${currentSeconds}`;

    // DURATION

    let durationMinutes =
        Math.floor(duration / 60);

    let durationSeconds =
        Math.floor(duration % 60);

    if (durationSeconds < 10) {

        durationSeconds =
            "0" + durationSeconds;
    }

    durationEl.textContent =
        `${durationMinutes}:${durationSeconds}`;
});

// SEEK BAR

progressBar.addEventListener("input", () => {

    const duration =
        audio.duration;

    audio.currentTime =
        (progressBar.value / 100) * duration;
});

// VOLUME CONTROL

volumeSlider.addEventListener("input", () => {

    audio.volume =
        volumeSlider.value;
});

// PLAYLIST CLICK

playlistItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentTrack = index;

        loadTrack(currentTrack);

        playTrack();
    });
});

// AUTO NEXT

audio.addEventListener("ended", () => {

    currentTrack++;

    if (currentTrack >= naats.length) {

        currentTrack = 0;
    }

    loadTrack(currentTrack);

    playTrack();
});

// KEYBOARD SUPPORT

document.addEventListener("keydown", (event) => {

    // SPACE = PLAY / PAUSE

    if (event.code === "Space") {

        event.preventDefault();

        if (isPlaying) {

            pauseTrack();
        }

        else {

            playTrack();
        }
    }

    // RIGHT ARROW = NEXT

    if (event.code === "ArrowRight") {

        currentTrack++;

        if (currentTrack >= naats.length) {

            currentTrack = 0;
        }

        loadTrack(currentTrack);

        playTrack();
    }

    // LEFT ARROW = PREVIOUS

    if (event.code === "ArrowLeft") {

        currentTrack--;

        if (currentTrack < 0) {

            currentTrack =
                naats.length - 1;
        }

        loadTrack(currentTrack);

        playTrack();
    }
});

// INITIAL LOAD

loadTrack(currentTrack);
