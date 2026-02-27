<template>
  <div class="audio-control-wrapper" ref="wrapperRef">
    <!-- Toggle button -->
    <button
      @click="togglePanel"
      class="audio-btn"
      :class="{ muted: isMuted }"
      :title="isMuted ? 'Turn on' : 'Turn off'"
    >
      <span class="audio-icon">{{ isMuted ? '🔇' : volumeIcon }}</span>
    </button>

    <!-- Volume panel -->
    <transition name="panel-fade">
      <div v-if="isPanelOpen" class="volume-panel">
        <div class="panel-header">
          <span class="panel-title">🎵 Music</span>
          <button
            @click="toggleMute"
            class="mute-btn"
            :title="isMuted ? 'Turn on' : 'Turn off'"
          >
            {{ isMuted ? '🔇' : '🔊' }}
          </button>
        </div>

        <div class="slider-row">
          <span class="vol-icon">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="volume"
            @input="onVolumeInput"
            class="vol-slider"
            :disabled="isMuted"
            :style="sliderStyle"
          />
          <span class="vol-icon">🔊</span>
        </div>

        <div class="vol-display">
          {{ Math.round(volume * 100) }}%
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAudio } from "@/composables/useAudio";

const { volume, isMuted, toggleMute, setVolume } = useAudio();

const isPanelOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const volumeIcon = computed(() => {
  if (volume.value === 0) return "🔇";
  if (volume.value < 0.4) return "🔈";
  if (volume.value < 0.7) return "🔉";
  return "🔊";
});

const sliderStyle = computed(() => {
  const pct = Math.round(volume.value * 100);
  return {
    background: `linear-gradient(to right, rgba(255,220,50,0.9) 0%, rgba(255,220,50,0.9) ${pct}%, rgba(255,255,255,0.2) ${pct}%, rgba(255,255,255,0.2) 100%)`,
  };
});

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value;
}

function onVolumeInput(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value);
  setVolume(val);
}

// Close panel when clicking outside
function handleOutsideClick(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    isPanelOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleOutsideClick);
});
</script>

<style scoped>
.audio-control-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.audio-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0;
}

.audio-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
  border-color: rgba(255, 255, 255, 0.8);
}

.audio-btn.muted {
  border-color: rgba(255, 80, 80, 0.6);
  background: rgba(255, 80, 80, 0.15);
}

.audio-icon {
  font-size: 1.2rem;
  line-height: 1;
  display: block;
}

/* Volume panel */
.volume-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 200px;
  background: rgba(20, 20, 40, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.panel-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.mute-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  padding: 2px 8px;
  transition: background 0.2s;
}

.mute-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vol-icon {
  font-size: 0.85rem;
  line-height: 1;
  flex-shrink: 0;
}

.vol-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 99px;
  outline: none;
  cursor: pointer;
  transition: background 0.2s;
}

.vol-slider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.vol-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 6px rgba(255, 200, 0, 0.8);
  cursor: pointer;
  transition: transform 0.15s;
}

.vol-slider:not(:disabled)::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.vol-slider::-webkit-slider-runnable-track {
  border-radius: 99px;
  height: 4px;
}

.vol-display {
  text-align: center;
  margin-top: 8px;
  font-size: 0.75rem;
  color: rgba(255, 255, 200, 0.8);
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Transition */
.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
