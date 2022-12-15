import * as THREE from 'three';
import Experience from "../Experience.js";
import { Water } from 'three/examples/jsm/objects/Water2.js';


export default class WaterClass
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.meshFollowCamera = false
        this.scale = 1.5
        this.color = '#215c63'

        this.setGeometry()
        this.setMesh()

        if(this.debug.active)
        {
            this.setDebug()
        }
    }

    setGeometry()
    {
        this.waterGeometry = new THREE.PlaneGeometry( 300, 300 );
        // this.waterGeometry = new THREE.SphereGeometry( 15, 32, 16 );
    }

    setMesh()
    {
        // Water
        this.mesh = new Water( this.waterGeometry, {
            color: new THREE.Color(this.color),
            scale: this.scale,
            flowDirection: new THREE.Vector2( 0, 1 ),
            textureWidth: 1024,
            textureHeight: 1024,
            opacity: 0.,
            transparent: true,
        } );


        // this.mesh.material.side = THREE.DoubleSide
        this.mesh.position.set(0, -10.2, -40)
        this.mesh.rotation.set(- Math.PI * 0.5, 0, - 2.419)

        this.scene.add(this.mesh)
    }
    setDebug()
    {
        // Debug
        this.debugFolder = this.debug.ui.addFolder('Water')

        this.debugFolder.add(this, 'meshFollowCamera').name('texte follow camera')
        this.debugFolder
            .add(this, 'scale')
            .min(-5).max(40).step(0.001).name('Scale')
            .onChange( ( value ) => {
                this.mesh.material.uniforms[ 'config' ].value.w = value;
            } );
            this.debugFolder.add(this.mesh.position, 'x').min(-40).max(40).step(0.001).name('position X')
            this.debugFolder.add(this.mesh.position, 'y').min(-40).max(40).step(0.001).name('position Y')
            this.debugFolder.add(this.mesh.position, 'z').min(-40).max(40).step(0.001).name('position Z')
            this.debugFolder.add(this.mesh.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.001).name('rotation X')
            this.debugFolder.add(this.mesh.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation Y')
            this.debugFolder.add(this.mesh.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.001).name('rotation Z')
            this.debugFolder.addColor( this, 'color' ).onChange( ( value ) => {
                const color = new THREE.Color(value)
                this.mesh.material.uniforms['color'].value = color

            } );
    }
    update()
    {
        if(this.meshFollowCamera){
            this.mesh.lookAt(this.camera.controls.object.position)
        }
        this.mesh.position.y = Math.sin(this.time.elapsed * 0.0001) * 6 - 4.2
    }
}