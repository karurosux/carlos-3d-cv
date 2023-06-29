const audioEffects = {
  beep: new Audio('audio/beep.ogg'),
  keycap: new Audio('audio/keycap.mp3'),
  switch: new Audio('audio/switch.ogg'),
  lockedDoor: new Audio('audio/locked-door.mp3'),
};

export type EffectName = keyof typeof audioEffects;

export class AudioEffects {
  static initializeAudios() {
    audioEffects.beep.volume = 0.3;
    audioEffects.switch.volume = 0.5;
  }

  static play(name: EffectName) {
    const audio = audioEffects[name] as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
  }
}
