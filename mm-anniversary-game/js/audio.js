const AudioManager = {
  sounds: {},
  music: null,
  isMuted: false
};

function preloadAudio() {
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    const id = audio.id.replace('sfx-', '').replace('bgm', 'bgm');
    AudioManager.sounds[id] = audio;
    if (id === 'bgm') {
      audio.volume = 0.3;
      AudioManager.music = audio;
    } else if (id === 'typing') {
      audio.volume = 0.2;
    } else {
      audio.volume = 0.5;
    }
  });
}

function playSound(soundName) {
  if (AudioManager.isMuted) return;
  const sound = AudioManager.sounds[soundName];
  if (sound) {
    const clone = sound.cloneNode();
    clone.volume = sound.volume;
    clone.play().catch(() => {});
  }
}

function playMusic(musicName) {
  if (AudioManager.isMuted) return;
  const music = AudioManager.sounds[musicName];
  if (music) {
    music.play().catch(() => {});
  }
}

function stopMusic(musicName) {
  const music = AudioManager.sounds[musicName];
  if (music) {
    music.pause();
    music.currentTime = 0;
  }
}

function setMuteAll(muted) {
  AudioManager.isMuted = muted;
  Object.values(AudioManager.sounds).forEach(audio => {
    audio.muted = muted;
  });
}

