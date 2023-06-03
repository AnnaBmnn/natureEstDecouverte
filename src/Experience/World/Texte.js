import * as THREE from 'three';
import Experience from "../Experience.js";
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Texte
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.meshFollowCamera = true

        this.resource = this.resources.items.Texte

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Texte')
        }

        this.setModel()
    }
    setModel()
    {
        this.model = this.resource.scene

        // Position mesh
        this.model.position.set(-6.868, 5.854, 5.854)
        this.model.rotation.set(2.625, -4.5, 3.03)
        this.model.scale.set(6.819, 6.565)


        // Set Material to all child of a mesh
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material.transparent = true
                child.material.opacity = 1.0
            }
        })

        this.scene.add(this.model)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.model.position, 'x').min(-100).max(100).step(0.001).name('position X')
            this.debugFolder.add(this.model.position, 'y').min(-100).max(100).step(0.001).name('position Y')
            this.debugFolder.add(this.model.position, 'z').min(-100).max(100).step(0.001).name('position Z')
            this.debugFolder.add(this.model.rotation, 'x').min(-100).max(100).step(0.001).name('rotation X')
            this.debugFolder.add(this.model.rotation, 'y').min(-100).max(100).step(0.001).name('rotation Y')
            this.debugFolder.add(this.model.rotation, 'z').min(-100).max(100).step(0.001).name('rotation Z')
            this.debugFolder.add(this.model.scale, 'x').min(0).max(10).step(0.001).name('Scale')
            this.debugFolder.add(this.model.scale, 'y').min(0).max(10).step(0.001).name('Scale')
            this.debugFolder.add(this, 'meshFollowCamera').name('texte follow camera')
        }
    }
    update()
    {
        if(this.meshFollowCamera){
            this.model.lookAt(this.camera.controls.object.position)
        }
    }
}