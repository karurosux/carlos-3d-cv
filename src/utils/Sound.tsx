import {useLoader, useThree} from '@react-three/fiber';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

type Props = {
  url: string;
};

const Sound = forwardRef<THREE.PositionalAudio, Props>(function Sound(
  {url},
  externalRef
) {
  const sound = useRef<THREE.PositionalAudio>();
  const {camera} = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  useImperativeHandle(externalRef, () => {
    const refResult: {current: THREE.PositionalAudio} = {
      current: null,
    };

    Object.defineProperty(refResult, 'current', {
      get: () => sound.current,
    });

    return refResult.current as THREE.PositionalAudio;
  });

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(0.35);
    camera.add(listener);
    return () => {
      camera.remove(listener);
    };
  }, []);

  return <positionalAudio ref={sound} args={[listener]} />;
});

export default Sound;
