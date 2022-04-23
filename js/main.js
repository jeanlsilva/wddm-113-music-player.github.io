const audioPlayer = document.querySelector("audio");
const playButton = document.querySelector("#play");
const partialProgress = document.querySelector("#partial-progress");
const textForm = document.querySelector("#text-form");
const url = document.querySelector("#url");
const title = document.querySelector("#title");
textForm.addEventListener("submit", (event) => handleSubmit(event));
let interval = 0;

audioPlayer.addEventListener("error", () => {
    title.innerHTML = "";
    alert('Invalid URL');
});

function play() {
    if (audioPlayer.paused) {
        interval = setInterval(() => {
            const progress = Math.floor((audioPlayer.currentTime / audioPlayer.duration) * 100);
            partialProgress.style.width = `${progress}%`;
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
}
