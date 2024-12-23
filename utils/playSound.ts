import { soundEffectArray } from "@/utils/helpers";
import { AutodartsToolsConfig } from "@/utils/storage";
import { AutodartsToolsSoundsConfig } from "@/utils/soundsStorage";

soundEffectArray[0].autoplay = true;
soundEffectArray[1].autoplay = true;
soundEffectArray[2].autoplay = true;
soundEffectArray[3].autoplay = false;

export async function playSound(configKey: string, slot: number = 1, arrIndex?: number) {
  let soundConfig = (await AutodartsToolsSoundsConfig.getValue())[configKey];
  if (typeof arrIndex === "number") soundConfig = soundConfig[arrIndex];
  const isSoundsEnabled = (await AutodartsToolsConfig.getValue()).sounds.enabled;
  const fileName = soundConfig.info;
  if (!isSoundsEnabled || !fileName) return;
  const fileData = soundConfig.data;
  soundEffectArray[slot - 1].src = fileData || fileName;
}

export function playPointsSound(callerServerUrl: string, callerFileExt: string, turnPoints?: string, slot: number = 1) {
  if (!turnPoints) return;
  if (callerServerUrl?.length) soundEffectArray[slot - 1].src = callerServerUrl + turnPoints + callerFileExt;
}

export function play(slot) {
  if (!slot) return;
  soundEffectArray[slot - 1].play();
}

export function stop(slot) {
  if (!slot) return;
  soundEffectArray[slot - 1].pause();
}

export function setVolume(slot, volume: number=1) {
  if (!slot) return;
  soundEffectArray[slot - 1].volume = Number(volume);
}

export function fadeVolume(slot, toVol: number=0) {
  if (!slot) return;
  (function fade(i) {
    setTimeout(function() {
      if(soundEffectArray[slot - 1].volume > toVol) {
        soundEffectArray[slot - 1].volume -= 0.1;
      }
      else {
          soundEffectArray[slot - 1].volume += 0.1;    
      }      
      let currentVol = Math.round(soundEffectArray[slot - 1].volume * 10) / 10         
      if (currentVol != toVol) fade(i);
    }, 800)
  })(10);    
}

export function isPlaying(slot) {
  if (!slot) return;
  if(soundEffectArray[slot - 1].paused) {
    return(false)
  }
  else {
    return(true)
  }
}