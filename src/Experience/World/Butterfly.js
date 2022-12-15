import * as THREE from 'three';
import Experience from "../Experience.js";
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Butterfly
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
        this.setRandomPosition()
        this.setRandomSpeed()
        console.log('butterfly')
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(1, 1, 124, 124)
    }
    
    setTextures()
    {
        this.textures = {}
        this.textures.color = this.resources.items['ButterflyColor']
        this.textures.color.encoding = THREE.sRGBEncoding
    }

    setMaterial()
    {
        console.log(this.textures.color)

        this.material = new THREE.ShaderMaterial({
            depthWrite: true,
            // blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: screenVertexShader,
            fragmentShader: screenFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 1,
               flatShading: false,
            uniforms: {
                uTime: {value: 0},
                uTexture: { type: "t", value: this.textures.color}
            }
        })
        // this.material = new THREE.MeshStandardMaterial({
        //     map: this.textures.color,
        //     normalMap: this.textures.color,
        //     transparent: true,
        //     opacity: 1,
        //     side: THREE.DoubleSide
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
        this.position = {
            x: 0,
            y: 0,
            z: 0
        }
        // this.mesh.rotation.x =  Math.PI * 0.5
        // this.mesh.position.set( this.position.x,  this.position.y,  this.position.z)
    }

    setRandomSpeed()
    {
        this.speed = this.calculs.getRandomArbitrary(0.01, 0.25);
    }

    setMesh()
    {
        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, 100)

        console.log(this.mesh)

        for(let i = 0; i < 100; i++)
        {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            )
        
            const quaternion = new THREE.Quaternion()
            quaternion.setFromEuler(new THREE.Euler((Math.random() - 0.5) * Math.PI * 2, (Math.random() - 0.5) * Math.PI * 2, 0))
            
            const matrix = new THREE.Matrix4()
            matrix.makeRotationFromQuaternion(quaternion)
            matrix.setPosition(position)
            
            this.mesh.setMatrixAt(i, matrix)
            this.mesh.matrixWorldNeedsUpdate  = true
            this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        }
        this.scene.add(this.mesh)

    }

    update()
    {
        // Update material 
        this.material.uniforms.uTime.value = this.time.elapsed
        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)


    }

}