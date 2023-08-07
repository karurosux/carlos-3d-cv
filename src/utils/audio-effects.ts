const audioEffects = {
  keycap: new Audio('audio/key.mp3'),
  switch: new Audio('audio/light-switch.mp3'),
  lockedDoor: new Audio('audio/door-locked.mp3'),
  chairWheel: new Audio('audio/chair-wheel.mp3'),
};

export type EffectName = keyof typeof audioEffects;

export class AudioEffects {
  static canPlay = false;

  static initializeAudios() {
    audioEffects.keycap.volume = 0.6;
    audioEffects.switch.volume = 0.6;
    audioEffects.chairWheel.volume = 0.1;
    audioEffects.lockedDoor.volume = 0.15;
  }

  static play(name: EffectName) {
    if (!this.canPlay) {
      return;
    }
    const audio = audioEffects[name] as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
}
