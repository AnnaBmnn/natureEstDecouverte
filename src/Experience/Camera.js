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
        this.debug = this.experience.debug
        this.activeIndex = null

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
                    0,
                    0,
                    0
                ),
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
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
                    2.63,
                    1.09,
                    -6.94
                ),
                rotation: {
                    x: -2.98,
                    y: 0.35,
                    z: 3.08
                }
            },
            {
                position: new THREE.Vector3(
                    -0.8,
                    1.84,
                    7.23
                ),
                rotation: {
                    x: -0.25,
                    y: -0.12,
                    z: -0.03
                }
            },
        ]

        // Dom element
        this.buttons = document.querySelectorAll('.js-button');
        console.log(this.button)

        // Dom event
        for(let i = 0; i < this.buttons.length; i++){
            this.buttons[i].addEventListener(
                'click', 
                () => {
                    if(this.activeIndex || this.activeIndex === 0){
                        this.buttons[this.activeIndex].classList.remove('button--active')
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