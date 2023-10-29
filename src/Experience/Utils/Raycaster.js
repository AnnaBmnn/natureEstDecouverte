import * as THREE from 'three';
import Experience from "../Experience.js";
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Raycaster
{
    constructor()
    {

        this.experience = new Experience()
        this.camera = null
        this.raycaster = new THREE.Raycaster()
        this.pointer = new THREE.Vector2()
        this.resources = this.experience.resources
        this.intersects = null

        this.onPointerMove = this.onPointerMove.bind(this)
        this.update = this.update.bind(this)
        this.onClick = this.onClick.bind(this)

        this.resources.on('ready', () => 
        {
            this.camera = this.experience.camera.instance
            this.objectToIntersect = this.experience.world.objectToIntersect
            this.isReady = true

            console.log('reayd')

            window.addEventListener( 'mousemove', this.onPointerMove );
            window.addEventListener( 'click', this.onClick );
            document.querySelector('.webgl').addEventListener( 'ontouchstart', this.onClick );
        })


        
    }
    onPointerMove( event ) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }
    onClick(e) {
        document.querySelector('.webgl').classList.add('red')
        console.log('click')
        console.log(this.intersects)
        if(this.intersects && this.intersects.length > 0) {

            if(this.intersects[0].object.linkSrc){
                window.open(this.intersects[0].object.linkSrc, '_blank').focus();
            }
        }
    }
    update()
    {
        if(this.isReady && this.camera){
            this.raycaster.ray.origin.setFromMatrixPosition( this.camera.matrixWorld );
            this.raycaster.ray.direction.set( this.pointer.x, this.pointer.y, 0.5 ).unproject( this.camera ).sub( this.raycaster.ray.origin ).normalize();

            // calculate objects intersecting the picking ray
            this.intersects = this.raycaster.intersectObjects( this.objectToIntersect );

            if(this.intersects.length > 0){
                document.querySelector('body').classList.add('pointer')
                for ( let i = 0; i < this.intersects.length; i ++ ) {
                    this.intersects[ i ].object.material.opacity = 0.9;
                    this.intersects[ i ].object.material.map = this.intersects[ i ].object.material.envMap;
                    this.intersects[ i ].object.material.needsUpdate = true;
                }
            } else {
                document.querySelector('body').classList.remove('pointer')
                for ( let i = 0; i < this.objectToIntersect.length; i ++ ) {
                    this.objectToIntersect[ i ].material.opacity = 0.5;
                    this.objectToIntersect[ i ].material.map = null
                    this.objectToIntersect[ i ].material.needsUpdate = true;
                }
            }
        }
    }

}