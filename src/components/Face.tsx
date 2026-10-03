import { useEffect, useRef } from 'react';
import * as  THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import type { Emotion } from '../types';

const EXPRESSIONS: Record<Emotion, Record<string, number>> = {
    neutral: {},
    happy: {
      mouthSmile_L: 0.8, mouthSmile_R: 0.8,
      cheekSquint_L: 0.5, cheekSquint_R: 0.5,
      eyeSquint_L: 0.3, eyeSquint_R: 0.3,
    },
    sad: {
      browInnerUp: 0.8,
      mouthFrown_L: 0.7, mouthFrown_R: 0.7,
      mouthShrugLower: 0.4,
    },
    angry: {
      browDown_L: 0.9, browDown_R: 0.9,
      noseSneer_L: 0.5, noseSneer_R: 0.5,
      mouthPress_L: 0.5, mouthPress_R: 0.5,
      eyeSquint_L: 0.4, eyeSquint_R: 0.4,
    },
    surprised: {
      browInnerUp: 0.9,
      browOuterUp_L: 0.9, browOuterUp_R: 0.9,
      eyeWide_L: 0.8, eyeWide_R: 0.8,
      jawOpen: 0.5,
    },
    fear: {
      browInnerUp: 0.9,
      browOuterUp_L: 0.5, browOuterUp_R: 0.5,
      eyeWide_L: 0.7, eyeWide_R: 0.7,
      mouthStretch_L: 0.6, mouthStretch_R: 0.6,
    },
    disgust: {
      noseSneer_L: 0.8, noseSneer_R: 0.8,
      mouthUpperUp_L: 0.6, mouthUpperUp_R: 0.6,
      browDown_L: 0.4, browDown_R: 0.4,
    },
    contempt: {
      mouthSmile_R: 0.5,
      mouthDimple_R: 0.4,
      eyeSquint_R: 0.2,
    },
  };

type Props = {
  emotion: Emotion;
  thinking: boolean;
};

function Face({emotion, thinking}:Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const emotionRef = useRef(emotion);
    emotionRef.current = emotion;   

    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Renderer : tegner 3D scenen i canvas
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height, false);
        container.appendChild(renderer.domElement);

        // Lys & scene 
        const scene = new THREE.Scene();
        const pmrem = new  THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new RoomEnvironment()).texture;

        // kamera
        const camera = new THREE.PerspectiveCamera(45, width/height, 1, 20);
        camera.position.set(0, 0, 3.5);

        //last inn modell
        const ktx2Loader = new KTX2Loader()
            .setTranscoderPath('/basis/')
            .detectSupport(renderer);
        
        let head: THREE.Mesh | null = null;

        new GLTFLoader()
            .setKTX2Loader(ktx2Loader)
            .setMeshoptDecoder(MeshoptDecoder)
            .load('/models/facecap.glb', (gltf) => {
                const model = gltf.scene.children[0];
                scene.add(model);
                head = model.getObjectByName('mesh_2') as THREE.Mesh;
            });
        
        // tegne scenen på nytt hele tiden
        renderer.setAnimationLoop(() => {
            const dict = head?.morphTargetDictionary;
            const influences = head?.morphTargetInfluences;

            if(dict && influences) {
                const target = EXPRESSIONS[emotionRef.current];
                for(const [name, index] of Object.entries(dict)) {
                    const goal = target [name] ?? 0;
                    influences[index]+= (goal - influences[index]) * 0.2;
                }
            }
            renderer.render(scene, camera);
        });

        const resizeObserver = new ResizeObserver(() => {
          const w = container.clientWidth;
          const h = container.clientHeight;
          renderer.setSize(w,h,false);
          camera.aspect = w/h;
          camera.updateProjectionMatrix();
        });
        resizeObserver.observe(container);

        // rydd opp når komponentnen forsvinner
        return () => {
            resizeObserver.disconnect();
            renderer.setAnimationLoop(null);
            ktx2Loader.dispose();
            renderer.dispose();
            container.removeChild(renderer.domElement);
        }
        
    }, []);

    return(
      <div className='face-wrap'>
        <div className='face' ref={containerRef}/>
        {thinking && <p className="thinking face-thinking">thinking...</p>}
      </div>
    )
}

export default Face;