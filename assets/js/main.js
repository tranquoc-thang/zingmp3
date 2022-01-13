const listSong = document.querySelector(".content-listsong");
const sliderSong = document.querySelector(".content-slider");
const randomBtn = document.querySelector(".random-btn");
const prevBtn = document.querySelector(".prev-btn");
const playBtn = document.querySelector(".control-start");
const nextBtn = document.querySelector(".next-btn");
const replayBtn = document.querySelector(".replay-btn");
const audio = document.querySelector("#audio");
const progressSong = document.querySelector(".control-duration-progress");
const imgSong = document.querySelector(".control-image");
const nameSong = document.querySelector(".control-song-name");
const singerSong = document.querySelector(".control-song-singer");
const currentDurationSong = document.querySelector(".control-duration-current");
const totalDurationSong = document.querySelector(".control-duration-total");

const app = {
  isPlaying: false,
  isRandom: false,
  isReplay: false,
  currentIndex: 0,
  songs: [
    {
      name: "So Far Away",
      singer: "Martin Garrix & David Guetta",
      path: "./assets/music/song1.mp3",
      image: "./assets/images/song1.png",
    },
    {
      name: "Scared To Be Lonely",
      singer: "Martin Garrix & Dua Lipa",
      path: "./assets/music/song2.mp3",
      image: "./assets/images/song2.jpg",
    },
    {
      name: "Can We Kiss Forever",
      singer: "Kina",
      path: "./assets/music/song3.mp3",
      image: "./assets/images/song3.jpg",
    },
    {
      name: "God Is A Girl",
      singer: "Groove Coverage",
      path: "./assets/music/song4.mp3",
      image: "./assets/images/song4.jpg",
    },
    {
      name: "I'm Yours",
      singer: "Jason Mraz",
      path: "./assets/music/song5.mp3",
      image: "./assets/images/song5.png",
    },
    {
      name: "Never Give It Up",
      singer: "September",
      path: "./assets/music/song6.mp3",
      image: "./assets/images/song6.jpg",
    },
    {
      name: "Marry Me",
      singer: "Jason Derulo",
      path: "./assets/music/song7.mp3",
      image: "./assets/images/song7.jpg",
    },
    {
      name: "Miracle",
      singer: "Cascada",
      path: "./assets/music/song8.mp3",
      image: "./assets/images/song8.jpg",
    },
    {
      name: "My Heart Will Go On",
      singer: "Celine Dion",
      path: "./assets/music/song9.mp3",
      image: "./assets/images/song9.png",
    },
    {
      name: "Poison",
      singer: "Groove Coverage",
      path: "./assets/music/song10.mp3",
      image: "./assets/images/song10.jpg",
    },
    {
      name: "Runnin",
      singer: "Adam Lambert",
      path: "./assets/music/song11.mp3",
      image: "./assets/images/song11.jpg",
    },
    {
      name: "Shy",
      singer: "Jai Waetford",
      path: "./assets/music/song12.mp3",
      image: "./assets/images/song12.png",
    },
    {
      name: "Trouble Is A Friend",
      singer: "Lenka",
      path: "./assets/music/song13.mp3",
      image: "./assets/images/song13.jpg",
    },
    {
      name: "Arcade ",
      singer: "Duncan Laurence",
      path: "./assets/music/song14.mp3",
      image: "./assets/images/song14.jpg",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  renderListSong: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <li class="content-itemsong ${
          index === this.currentIndex ? "content-itemsong--active" : ""
        }" data-index="${index}">
          <img src="${song.image}" alt="" class="content-imgsong">
          <div class="content-detailsong">
            <div class="content-namesong">${song.name}</div>
            <div class="content-singersong">${song.singer}</div>
          </div>
          <div class="content-favoritesong">
            <i class="fas fa-heart"></i>
          </div>
        </li>
      `;
    });
    listSong.innerHTML = htmls.join("");
  },
  renderSlidersong: function () {
    let i = 0;
    const htmls = this.songs.map((song, index) => {
      if (i == 0) {
        i++;
        return `
          <img class="content-slider-img content-slider-img--first" src="${song.image}" alt="">
        `;
      } else if (i == 1) {
        i++;
        return `
          <img class="content-slider-img content-slider-img--second" src="${song.image}" alt="">
        `;
      } else {
        return `
          <img class="content-slider-img content-slider-img--third" src="${song.image}" alt="">
        `;
      }
    });
    sliderSong.innerHTML = htmls.join("");
  },
  handleEvent: function () {
    const _this = this;

    // When click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // When play song
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.classList.add("playing");
    };

    // When pause song
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.classList.remove("playing");
    };

    // When progress song change
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressSong.value = progress;
      }

      let minutes = Math.floor(audio.currentTime / 60);
      let seconds = Math.floor(audio.currentTime % 60).toString();
      if (!seconds[1]) seconds = 0 + seconds;
      currentDurationSong.innerText = `${minutes}:${seconds}`;
    };

    // When user change progress song
    progressSong.onchange = function () {
      const seekTime = (this.value * audio.duration) / 100;
      audio.currentTime = seekTime;
    };

    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.renderListSong();
    };

    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.renderListSong();
    };

    // When click random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("control--active", _this.isRandom);
    };

    // When click replay
    replayBtn.onclick = function () {
      _this.isReplay = !_this.isReplay;
      replayBtn.classList.toggle("control--active", _this.isReplay);
    };

    // When song end
    audio.onended = function () {
      if (_this.isReplay) audio.play();
      else nextBtn.click();
    };

    // When click song on playlist
    listSong.onclick = function (e) {
      const songClick = e.target.closest(
        ".content-itemsong:not(content-itemsong--active)"
      );
      if (songClick) {
        _this.currentIndex = songClick.dataset.index;
        _this.loadCurrentSong();
        _this.renderListSong();
        audio.play();
      }
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) this.currentIndex = 0;
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
    this.loadCurrentSong();
  },
  randomSong: function () {
    const random = Math.floor(Math.random() * this.songs.length);
    this.currentIndex = random;
    this.loadCurrentSong();
  },
  loadCurrentSong: function () {
    imgSong.src = this.currentSong.image;
    nameSong.innerText = this.currentSong.name;
    singerSong.innerText = this.currentSong.singer;
    audio.src = this.currentSong.path;
    audio.onloadedmetadata = function () {
      let minutes = Math.floor(audio.duration / 60);
      let seconds = Math.floor(audio.duration % 60).toString();
      if (!seconds[1]) seconds = 0 + seconds;
      totalDurationSong.innerText = `${minutes}:${seconds}`;
    };
  },
  focusSearchInput: function () {
    const HeaderSearch = document.querySelector(".header-search");
    const SearchInput = document.querySelector(".header-search-input");

    SearchInput.addEventListener("focus", () => {
      HeaderSearch.style = "border-bottom-left-radius: 0; background: #432275;";
    });
    SearchInput.addEventListener("blur", () => {
      HeaderSearch.style =
        "border-bottom-left-radius: 2rem; background: #4e4857;";
    });
  },
  scrollToTop: function () {
    const Header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        Header.style = "background: transparent;";
      } else {
        Header.style = "background: #170f23;";
      }
    });
  },
  sliderSong: function () {
    const SliderImgs = document.querySelectorAll(".content-slider-img");
    let first = 0;
    let second = 1;
    let third = 2;
    setInterval(() => {
      if (SliderImgs[first].classList.contains("content-slider-img--first")) {
        SliderImgs[first].classList.remove("content-slider-img--first");
        SliderImgs[first].classList.add("content-slider-img--third");
      }
      if (SliderImgs[second].classList.contains("content-slider-img--second")) {
        SliderImgs[second].classList.remove("content-slider-img--second");
        SliderImgs[second].classList.add("content-slider-img--first");
      }
      if (SliderImgs[third].classList.contains("content-slider-img--third")) {
        SliderImgs[third].classList.remove("content-slider-img--third");
        SliderImgs[third].classList.add("content-slider-img--second");
      }
      first++;
      second++;
      third++;
      if (third >= SliderImgs.length) third = 0;
      if (first >= SliderImgs.length) first = 0;
      if (second >= SliderImgs.length) second = 0;
    }, 2000);
  },
  start: function () {
    this.defineProperties();
    this.renderListSong();
    this.renderSlidersong();
    this.handleEvent();
    this.focusSearchInput();
    this.scrollToTop();
    this.sliderSong();
  },
};
app.start();
