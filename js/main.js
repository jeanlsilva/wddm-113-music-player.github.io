const audioPlayer = document.querySelector("audio");
const playButton = document.querySelector("#play");
const partialProgress = document.querySelector("#partial-progress");
const textForm = document.querySelector("#text-form");
const url = document.querySelector("#url");
const title = document.querySelector("#title");
const currentTime = document.querySelector("#current");
const totalTime = document.querySelector("#total");
textForm.addEventListener("submit", (event) => handleSubmit(event));
let interval = 0;

audioPlayer.addEventListener("error", () => {
    title.innerHTML = "";
    alert('Invalid URL');
});

audioPlayer.addEventListener("loadedmetadata", () => {
    if (audioPlayer.duration !== Infinity) {
        const minutes = Math.floor(audioPlayer.duration / 60);
        const seconds = (audioPlayer.duration - minutes * 60).toFixed().padStart(2, '0');
        totalTime.innerHTML = `${minutes}:${seconds}`;
    }
})

function getDuration(src, cb) {
    var audio = new Audio();
    audioPlayer.onloadedmetadata = () => {
        cb(audio.duration);
    }
}

getDuration("banana", (length) => {
    console.log(length)
});

function play() {
    if (audioPlayer.paused) {
        const initialURL = audioPlayer.getAttribute('src');
        if (url.value === '') {
            title.innerHTML = `<h2>${initialURL.split('/').pop()}</h2>`;
            audioPlayer.setAttribute('src', initialURL);
        }
        /*
        const totalMinutes = Math.floor(audioPlayer.duration / 60);
        const totalSeconds = (audioPlayer.duration - totalMinutes * 60).toFixed().padStart(2, '0');
        totalTime.innerHTML = `${totalMinutes} : ${totalSeconds}`;
        */
        interval = setInterval(() => {
            const progress = Math.floor((audioPlayer.currentTime / audioPlayer.duration) * 100);
            partialProgress.style.width = `${progress}%`;
            const minutes = Math.floor(audioPlayer.currentTime / 60);
            const seconds = (audioPlayer.currentTime - minutes * 60).toFixed().padStart(2, '0');
            currentTime.innerHTML = `${minutes}:${seconds}`
        }, 100);
        playButton.innerHTML = "<i class=\"fa-solid fa-pause\"></i>";
        audioPlayer.play();
    } else {
        playButton.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
        audioPlayer.pause();
        clearInterval(interval);
    }
}

function end() {
    partialProgress.style.width = '100%';
    playButton.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
    clearInterval(interval);
}

function backward() {
    if (audioPlayer.currentTime > 5) {
        audioPlayer.currentTime = audioPlayer.currentTime - 5;
    } else {
        audioPlayer.currentTime = 0;
        partialProgress.style.width = '0%';
    }
}

function forward() {
    if (audioPlayer.currentTime < audioPlayer.duration - 5) {
        audioPlayer.currentTime = audioPlayer.currentTime + 5;
    } else {
        audioPlayer.currentTime = audioPlayer.duration;
        partialProgress.style.width = '100%';
    }
}

function handleSubmit(e) {
    e.preventDefault();
    title.innerHTML = `<h2>${url.value.split("/").pop()}</h2>`;
    audioPlayer.setAttribute('src', url.value);
    play();
}
