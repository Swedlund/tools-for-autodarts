import { AutodartsToolsConfig } from "@/utils/storage";
import { AutodartsToolsSoundsConfig } from "@/utils/soundsStorage";
import { playSound, play, stop, setVolume, fadeVolume, isPlaying } from "@/utils/playSound";

export async function soundsBackground() {
  try {
    const isSoundsEnabled = (await AutodartsToolsConfig.getValue()).sounds.enabled;
    const soundConfig = await AutodartsToolsSoundsConfig.getValue();

    if (!isSoundsEnabled) return;

    const backgroundLength = soundConfig.background.length;
    const randomBackgroundCount = Math.floor(Math.random() * backgroundLength);

    function jukebox(delay) {
      setInterval(()=> {
        if(!isPlaying(1) && !isPlaying(2) && !isPlaying(3) && !isPlaying(4)) {
          playSound("background", 4, randomBackgroundCount);
          setVolume(4,0);
          play(4);
          fadeVolume(4,0.8);
        }
      }, delay)
    }
    
    jukebox(500) 

  } catch (e) {
    console.error("Autodarts Tools: Set background sounds - Error: ", e);
  }
}
