import * as THREE from 'three';
import Experience from "../Experience.js";
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Player
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
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

        // Debug
        if(this.debug.active)
        {
            this.setDebug()
        }

    }

    setGeometry()
    {
        this.screenGeometry = new THREE.SphereGeometry(5, 32, 16 )
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
        this.material = new THREE.MeshBasicMaterial({
            map: this.textures.color,
            side: THREE.DoubleSide,
            // normalMap: this.textures.color,
            blending: THREE.AdditiveBlending,
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.screenGeometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.position.set(
            -40,
            -14,
            -34
        )
        this.scene.add(this.mesh)
    }

    setDebug()
    {
        this.debugFolder = this.debug.ui.addFolder('Player')
        this.debugFolder.add(this.mesh.position, 'x').min(-100).max(100).step(0.001).name('position X')
        this.debugFolder.add(this.mesh.position, 'y').min(-100).max(100).step(0.001).name('position Y')
        this.debugFolder.add(this.mesh.position, 'z').min(-100).max(100).step(0.001).name('position Z')
    }

    update()
    {
        this.mesh.lookAt(this.camera.controls.object.position)

    }

}