import * as THREE from 'three';
import Experience from "../Experience.js";
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Screen
{
    constructor()
    {
        this.experience = new Experience()
        this.calculs = this.experience.calculs
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources


        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setRandomSize()
        this.setRandomPosition()
        this.setRandomSpeed()

    }

    setGeometry()
    {
        this.screenGeometry = new THREE.PlaneGeometry(1, 1, 124, 124)
    }
    
    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items['VideoColorTexture']

        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

    }

    setMaterial()
    {

        this.material = new THREE.ShaderMaterial({
            depthWrite: true,
            // blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: screenVertexShader,
            fragmentShader: screenFragmentShader,
            transparent: true,
            opacity: this.calculs.getRandomArbitrary(0.1, 0.3),
            uniforms: {
                uTime: {value: 0},
                uTexture: { type: "t", value: this.textures.color}

            }
        })
        // this.material = new THREE.MeshStandardMaterial({
        //     map: this.textures.color,
        //     normalMap: this.textures.color,
        //     blending: THREE.AdditiveBlending,
        //     transparent: true,
        //     opacity: this.calculs.getRandomArbitrary(0.1, 0.7)
        // })
    }
    setRandomPosition()
    {
        // new position random 
        this.position = {
            x: this.calculs.getRandomArbitrary(-3, 3),
            y: this.calculs.getRandomArbitrary(-3, 3),
            z: this.calculs.getRandomArbitrary(-30, -10)
        }

        this.mesh.position.set( this.position.x,  this.position.y,  this.position.z)
    }
    setRandomSize()
    {
        const width = this.calculs.getRandomArbitrary(6, 14);
        this.sizes = {
            width: width,
            height: this.calculs.getRandomArbitrary(6, width),
        }

        this.mesh.scale.set(this.sizes.width, this.sizes.height)
    }
    setRandomSpeed()
    {
        this.speed = this.calculs.getRandomArbitrary(0.01, 0.25);
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.screenGeometry, this.material)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    update()
    {
        // Update material 
        // this.material.uniforms.uTime.value = this.time.elapsed

        // Update screen position on z
        this.mesh.position.z += this.speed;

        // Test if screen is out of the camera view
        if(this.camera.controls.getDistance() + 2 < this.mesh.position.z)
        {
            // new random position
            this.setRandomPosition()

            // new size random
            this.setRandomSize()

            this.setRandomSpeed()

        }
    }

}