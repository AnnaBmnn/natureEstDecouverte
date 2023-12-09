import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience.js'
import gsap from 'gsap'

export default class Camera
{
    constructor()
    {
        // Set up properties
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.activeIndex = null

        this.resources.on('ready', () => 
        {
            this.swooshsSound = [
                this.resources.items['AudioSwitch1'],
                this.resources.items['AudioSwitch2'],
                this.resources.items['AudioSwitch3'],
                this.resources.items['AudioSwitch4'],
            ]
            this.soundAccueil = this.resources.items['AudioSwitchAccueil']
        })
        this.cameraScreenPosition = [
            // {
            //     position: new THREE.Vector3(
            //         - 53,
            //         - 39,
            //         28
            //     ),
            //     rotation: {
            //         x: 0.95,
            //         y: -0.82,
            //         z: 0.81
            //     }
            // },
            {
                position: new THREE.Vector3(
                    - 73.38107797790065,
                    - 30.130771145231733,
                    - 65.53277372810005
                ),
                rotation: {
                    x: 2.710634089743409,
                    y: -0.7940115828489294,
                    z: 2.8247373131945475
                }
            },
            {
                position: new THREE.Vector3(
                    68.24384140592335,
                    50.564980011221486,
                    58.07883731842146
                ),
                rotation: {
                    x: -0.716347648273074,
                    y: 0.725144578701575,
                    z: 0.5236642404303914
                }
            },
            {
                position: new THREE.Vector3(
                    -77.33026432251154,
                    -3.4197114165253337,
                    -6.18954056728051
                ),
                rotation: {
                    x: 0.3324972529288105,
                    y: -1.3230039695904585,
                    z: 0.3132877695763272
                }
            },
            {
                position: new THREE.Vector3(
                    -21.311442330803057,
                    -1.8770830091184978,
                    64.64994832033483
                ),
                rotation: {
                    x: 0.029026408535724905,
                    y: -0.3183008824199513,
                    z: 0.009086210698174163
                }
            },
        ]

        // Dom element
        this.buttons = document.querySelectorAll('.js-button');

        // Dom event
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].addEventListener(
                'click', 
                (e) => {
                    e.preventDefault()
                    if(this.activeIndex || this.activeIndex === 0){
                        this.buttons[this.activeIndex].classList.remove('button--active')
                    }
                    console.log('this.experience.audios.audioStateIndex')
                    console.log(this.experience.audios.audioStateIndex)
                    console.log(this.experience.audios.AUDIO_OFF)
                    if(i !== 3){
                        if(this.swooshsSound && this.experience.audios.audioStateIndex > this.experience.audios.AUDIO_OFF){
                            this.swooshsSound[this.randomNumber(this.swooshsSound.length)].play()
                        }
                    } else {
                        if(this.experience.audios.audioStateIndex > this.experience.audios.AUDIO_OFF){
                            this.soundAccueil.play()
                        }
                        
                    }
                    this.activeIndex = i
                    this.setCameraPosition(this.cameraScreenPosition[this.activeIndex])
                    this.buttons[this.activeIndex].classList.add('button--active')
                    
                }
            )
        }

        // Set up method
        this.setInstance()
        this.setOrbitControls()



        if(this.debug.active)
        {
            this.setDebug()
        }
    }
    randomNumber(length){
        return Math.floor(Math.random() * length);
    }
    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            1,
            1000
        )
        this.instance.position.set(89, 10, -23)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxDistance = 200
    }

    setDebug()
    {
        this.debugFolder = this.debug.ui.addFolder('Camera')

        this.debugFolder.add(this.instance.position, 'x').min(-1000).max(1000).step(0.001).name('position X')
        this.debugFolder.add(this.instance.position, 'y').min(-1000).max(1000).step(0.001).name('position Y')
        this.debugFolder.add(this.instance.position, 'z').min(-1000).max(1000).step(0.001).name('position Z')
        this.debugFolder.add(this.instance.rotation, 'x').min(-1000).max(1000).step(0.001).name('rotation X')
        this.debugFolder.add(this.instance.rotation, 'y').min(-1000).max(1000).step(0.001).name('rotation Y')
        this.debugFolder.add(this.instance.rotation, 'z').min(-1000).max(1000).step(0.001).name('rotation Z')
    }

    setCameraPosition(positionRotationObject)
    {        
        // this.instance.position.set(positionRotationObject.position.x, positionRotationObject.position.y, positionRotationObject.position.z )
        // this.instance.rotation.set(positionRotationObject.rotation.x, positionRotationObject.rotation.y, positionRotationObject.rotation.z )
        gsap.to(
            this.instance.position,
            {
                duration: 3,
                ease: 'power2.inOut',
                x: positionRotationObject.position.x,
                y: positionRotationObject.position.y,
                z: positionRotationObject.position.z,
            }
        )
        gsap.to(
            this.instance.rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: positionRotationObject.rotation.x,
                y: positionRotationObject.rotation.y,
                z: positionRotationObject.rotation.z,
            },
            '-=1.5'
        )
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}