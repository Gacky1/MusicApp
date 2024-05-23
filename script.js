const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/ChooLo.mp3",
    title: "Choo Lo",
    artist: "The Local Train",
    imgSrc: "./img/ChooLo.jpg",
  },
  {
    songSrc: "./music/AaogeTumKabhi.mp3",
    title: "Aaoge Tum Kabhi",
    artist: "The Local Train",
    imgSrc: "./img/aaogetumkabhi.jpg",
  },
  {
    songSrc: "./music/TeriYaad.mp3",
    title: "Teri Yaad",
    artist: "Aditya Rikhari",
    imgSrc: "./img/teriyaad.jpg",
  },
  {
    songSrc: "./music/Baarishein.mp3",
    title: "Baarishein",
    artist: "Anuv Jain",
    imgSrc: "./img/Baarishein.jpg",
  },
  {
    songSrc: "./music/JeeLeZara.mp3",
    title: "Jee Le Zara",
    artist: "Vishal Dadlani",
    imgSrc: "./img/JeeLeZara.jpg",
  },
  {
    songSrc: "./music/iktara.mp3",
    title: "Iktara",
    artist: "Amitabh Bhattacharya",
    imgSrc: "./img/iktara.jpg",
  },
  {
    songSrc: "./music/TeraMeraRishta.mp3",
    title: "Tera Mera Rishta",
    artist: " MUSTAFA ZAHID",
    imgSrc: "./img/teramerarishta.jpg",
  },
  {
    songSrc: "./music/NadaanParinde.mp3",
    title: "Nadaan Parinde",
    artist: "A.R. Rahman",
    imgSrc: "./img/np.jpg",
  },
  {
    songSrc: "./music/TumSe.mp3",
    title: "Tum Se",
    artist: "Varun Jain",
    imgSrc: "./img/tumse.jpg",
  },
  {
    songSrc: "./music/CKP",
    title: "Choli Ke Peeche",
    artist: "Diljit Dosanjh",
    imgSrc: "./img/CKP.jpg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
