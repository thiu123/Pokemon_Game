import { ref, onUnmounted } from "vue";

const volumeState = ref<number>(
  parseFloat(localStorage.getItem("pokemon_audio_volume") || "0.5")
);
const isMutedState = ref<boolean>(
  localStorage.getItem("pokemon_audio_muted") === "true"
);

// Shared audio element (singleton)
let audioEl: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement {
  if (!audioEl) {
    audioEl = new Audio("/sounds/djartmusic-best-game-console-301284.mp3");
    audioEl.loop = true;
    audioEl.volume = isMutedState.value ? 0 : volumeState.value;
  }
  return audioEl;
}

export function useAudio() {
  const volume = volumeState;
  const isMuted = isMutedState;

  function setVolume(val: number) {
    volume.value = Math.max(0, Math.min(1, val));
    localStorage.setItem("pokemon_audio_volume", String(volume.value));
    const audio = getAudio();
    if (!isMuted.value) {
      audio.volume = volume.value;
    }
  }

  function toggleMute() {
    isMuted.value = !isMuted.value;
    localStorage.setItem("pokemon_audio_muted", String(isMuted.value));
    const audio = getAudio();
    audio.volume = isMuted.value ? 0 : volume.value;
  }

  async function play() {
    const audio = getAudio();
    audio.volume = isMuted.value ? 0 : volume.value;
    try {
      await audio.play();
    } catch (e) {
      // Autoplay blocked – will play on next user interaction
      console.warn("Audio autoplay blocked:", e);
    }
  }

  function stop() {
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  }

  onUnmounted(() => {
    stop();
  });

  return {
    volume,
    isMuted,
    play,
    stop,
    toggleMute,
    setVolume,
  };
}
