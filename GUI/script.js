const musicContainer = document.getElementById("music-container");
const musicInfo = document.getElementById("music-info");
const playBtn = document.getElementById("play");
// const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById("next");
const sentence = document.getElementById("number")
// const random = document.getElementById('random');
const repeat = document.getElementById("repeat");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const timestamp = document.getElementById("timestamp");
// const orderContainer = document.getElementById('order-container');
const yes = document.getElementById("yes");
const no = document.getElementById("no");
// Song titles
const initialSongs = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
	"50",
	"51",
	"52",
	"53",
	"54",
	"55",
	"56",
	"57",
	"58",
	"59",
	"60",
	"61",
	"62",
	"63",
	"64",
	"65",
	"66",
	"67",
	"68",
	"69",
	"70",
	"71",
	"72",
	"73",
	"74",
	"75",
	"76",
	"77",
	"78",
	"79",
	"80",
	"81",
	"82",
	"83",
	"84",
	"85",
	"86",
	"87",
	"88",
	"89",
	"90",
	"91",
	"92",
	"93",
	"94",
	"95",
	"96",
	"97",
	"98",
	"99",
	"100",
	"101",
	"102",
	"103",
	"104",
	"105",
	"106",
	"107",
	"108",
	"109",
	"110",
	"111",
	"112",
	"113",
	"114",
	"115",
	"116",
	"117",
	"118",
	"119",
	"120",
	"121",
	"122",
	"123",
	"124",
	"125",
	"126",
	"127",
	"128",
	"129",
	"130",
	"131",
	"132",
	"133",
	"134",
	"135",
	"136",
	"137",
	"138",
	"139",
	"140",
	"141",
	"142",
	"143",
	"144",
	"145",
	"146",
	"147",
	"148",
	"149",
	"150"
];
let songs = [...initialSongs];

// Keep track of song
let songIndex = 1;

// Initially load song details info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.wav`;
	cover.src = `images/${song}.png`;
}
var startTime;
// Play song
function playSong() {
	updateTimestamp();
	musicContainer.classList.add("play");
	musicInfo.classList.add("show");
	playBtn.querySelector("i.fa").classList.remove("fa-play");
	playBtn.querySelector("i.fa").classList.add("fa-pause");
	audio.play();
	startTime = Date.now();
}

// Pause song
function pauseSong() {
	musicContainer.classList.remove("play");
	playBtn.querySelector("i.fa").classList.add("fa-play");
	playBtn.querySelector("i.fa").classList.remove("fa-pause");

	audio.pause();
}

// Previous song
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = song.length - 1;
	}

	loadSong(songs[songIndex]);

	playSong();
}
// Calculate time
function stopButton() {
	if (startTime) {
		var endTime = Date.now();
		var difference = endTime - startTime;
		alert("Reaction time: " + difference + " ms");
		startTime = null;
	}
	return difference
}
// Next song
function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);

	playSong();
}

// Get song duration
function getSongDuration() {
	let allMins = Math.floor(audio.duration / 60);
	if (allMins < 10) {
		allMins = "0" + String(allMins);
	}

	let allSecs = Math.floor(audio.duration % 60);
	if (allSecs < 10) {
		allSecs = "0" + String(allSecs);
	}

	if (allMins && allSecs) {
		return `${allMins}:${allSecs}`;
	} else {
		return "00:00";
	}
}

// Update timestamp
function updateTimestamp() {
	// Get minutes
	let mins = Math.floor(audio.currentTime / 60);
	if (mins < 10) {
		mins = "0" + String(mins);
	}

	// Get seconds
	let secs = Math.floor(audio.currentTime % 60);
	if (secs < 10) {
		secs = "0" + String(secs);
	}

	if (mins && secs) {
		timestamp.innerHTML = `${mins}:${secs} / ${getSongDuration()}`;
	} else {
		timestamp.innerHTML = "00:00 / 00:00";
	}
}

// Update progress bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;

	updateTimestamp();
}

// Set progress bar & timestamp
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
	updateTimestamp();
}

// Set song on repeat
function repeatSong() {
	const isPlaying = musicContainer.classList.contains("play");

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
}

// Set song on repeat
function setRandomOrder() {
	if (random.classList.contains("active")) {
		random.classList.remove("active");
		songs = [...initialSongs];
		songIndex = songs.indexOf(title.innerText);
	} else {
		random.classList.add("active");
		songs = shuffle(songs);
		songIndex = songs.indexOf(title.innerText);
	}
}

// Shuffle songs
function shuffle(songs) {
	for (let i = songs.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[songs[i], songs[j]] = [songs[j], songs[i]];
	}
	return songs;
}

// Set song on click
function setSong(i) {
	songIndex = i;
	console.log("setSong -> songIndex", songIndex);

	loadSong(songs[songIndex]);

	playSong();
}

// Event listeners
playBtn.addEventListener("click", () => {
	const isPlaying = musicContainer.classList.contains("play");

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song

nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", pauseSong);

// Repeat song
repeat.addEventListener("click", repeatSong);

// Random songs order
// random.addEventListener('click', setRandomOrder);

yes.addEventListener("click", stopButton);
no.addEventListener("click", stopButton);

const download = function (data) {

	// Creating a Blob for having a csv file format
	// and passing the data with type
	const blob = new Blob([data], { type: 'text/csv' });

	// Creating an object for downloading url
	const url = window.URL.createObjectURL(blob)

	// Creating an anchor(a) tag of HTML
	const a = document.createElement('a')

	// Passing the blob downloading url
	a.setAttribute('href', url)

	// Setting the anchor tag attribute for downloading
	// and passing the download file name
	a.setAttribute('download', 'download.csv');

	// Performing a download with click
	a.click()
}

const csvmaker = function (data) {

	// Empty array for storing the values
	csvRows = [];

	// Headers is basically a keys of an
	// object which is id, name, and
	// profession
	const headers = Object.keys(data);

	// As for making csv format, headers
	// must be separated by comma and
	// pushing it into array
	csvRows.push(headers.join(','));

	// Pushing Object values into array
	// with comma separation
	const values = Object.values(data).join(',');
	csvRows.push(values)

	// Returning the array joining with new line
	return csvRows.join('\n')
}

const get = async function () {

	// JavaScript object
	const data = {
		id: 1,
		name: `${stopButton}`,
		profession: "developer"
	}

	const csvdata = csvmaker(data);
	download(csvdata);
}

// Getting element by id and adding
// eventlistener to listen everytime
// button get pressed
const btn = document.getElementById('action');
btn.addEventListener('click', get);
