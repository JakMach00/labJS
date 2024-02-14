const soundButtons = document.querySelectorAll('.soundButton');
const recordButtons = document.querySelectorAll('.recordButton');
const playAllButton = document.querySelector('#playAll');

document.addEventListener('keypress', onKeyPress);

const KeyToSound = {
    q: document.querySelector('#sound1'),
    w: document.querySelector('#sound2'),
    e: document.querySelector('#sound3'),
    r: document.querySelector('#sound4'),
    s: document.querySelector('#sound5'),
    t: document.querySelector('#sound6'),
    y: document.querySelector('#sound7'),
    u: document.querySelector('#sound8'),
    i: document.querySelector('#sound9'),
};

const trackArray = [
    { endTime: 0, sound: [] },
    { endTime: 0, sound: [] },
    { endTime: 0, sound: [] },
    { endTime: 0, sound: [] },
];

function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    playSound(sound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function recordSound(track) {
    const listener = document.addEventListener('keypress', b => track.sound.push({ key: b, timeStamp: Date.now() }));

    setTimeout(() => {
        document.removeEventListener('keypress', listener);
        track.endTime = Date.now();
    }, 1000);
}

function playTrack(track) {
    track.sound.forEach(sound => {
        setTimeout(() => {
            onKeyPress(sound.key);
        }, track.endTime - sound.timeStamp);
    });
}

recordButtons.forEach((button, index) => button.addEventListener('click', () => recordSound(trackArray[index])));

soundButtons.forEach((button, index) => button.addEventListener('click', () => playTrack(trackArray[index])));

playAllButton.addEventListener('click', () => trackArray.forEach(track => playTrack(track)));