const audioEffects = {
  keycap: new Audio('audio/keycap.mp3'),
  switch: new Audio('audio/switch.ogg'),
  lockedDoor: new Audio('audio/locked-door.mp3'),
};

export type EffectName = keyof typeof audioEffects;

export class AudioEffects {
  static initializeAudios() {
    audioEffects.switch.volume = 0.2;
  }

  static play(name: EffectName) {
    const audio = audioEffects[name] as HTMLAudioElement;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
}
