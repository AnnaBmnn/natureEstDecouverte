import * as THREE from 'three';
import Experience from "../Experience.js";
import screenVertexShader from '../../shaders/vertex.glsl'
import screenFragmentShader from '../../shaders/fragment.glsl'

export default class Player
{
    constructor(textureName, url, position)
    {
        this.experience = new Experience()
        this.raycaster = this.experience.raycaster
        this.debug = this.experience.debug
        this.calculs = this.experience.calculs
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.linkSrc = url
        this.position = position
        this.textureName = textureName

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
        this.glowGeometry = new THREE.SphereGeometry(2, 512, 512 )
        this.screenGeometry = new THREE.SphereGeometry(1, 512, 512 )

    }
    
    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items[this.textureName]

        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            transmission: 1,
            opacity: 0.5,
            transparent: true,
            metalness: 1,
            roughness: 0,
            specularIntensity: 1,
            specularColor: 0xffffff,
            envMap: this.textures.color,
            emissiveIntensity: 1,
            emissiveMap: this.textures.color,
            emissive: 0xffffff,
            lightIntensity: 2,
            exposure: 1
        })
        this.normalMaterial = new THREE.MeshBasicMaterial({
            map: this.textures.color,
            color: new THREE.Color(),
        })
        this.customUniforms = {
            uTime: { value: 0 }
        }
        
        this.material.onBeforeCompile = (shader) =>
        {
            shader.uniforms.uTime = this.customUniforms.uTime
        
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                    #include <begin_vertex>
        
                    float x = cos(transformed.x * 1.0 + uTime * 5.0) + sin(transformed.x * 02.0 + uTime * 1.0)   * 0.5;
                    float y = sin(transformed.y * 0.3 * transformed.x + uTime * 1.0) * cos(transformed.x + uTime)  * 0.2;
                    float z = sin(transformed.z * 1.0 + uTime * 1.0 ) * cos(transformed.y * 1.0 + uTime * 5.0 ) * 0.1;

                    transformed.x = x * 1.3;
                    transformed.y = y + transformed.y;
                    transformed.z = z + transformed.z;

                `
            )
            shader.vertexShader = shader.vertexShader.replace(
                '#include <common>',
                `
                    #include <common>
        
                    uniform float uTime;
                    uniform mat2 rotateMatrix;
        
                    mat2 get2dRotateMatrix(float _angle)
                    {
                        return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
                    }
                `
            )

        }
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.glowGeometry, this.material)
        this.normalMesh = new THREE.Mesh(this.screenGeometry, this.normalMaterial)

        this.mesh.receiveShadow = true
        this.mesh.position.set(
            this.position.x,
            this.position.y,
            this.position.z,
        )
        this.normalMesh.position.set(
            this.position.x,
            this.position.y,
            this.position.z,
        )
        this.mesh.linkSrc = this.linkSrc
        this.scene.add(this.mesh)
        this.scene.add(this.normalMesh)
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

        // Update material
        this.customUniforms.uTime.value += 0.01
        //this.mesh.lookAt(this.camera.controls.object.position)
        this.mesh.rotation.y += 0.01
        this.mesh.rotation.x += 0.01

        this.normalMesh.rotation.y += 0.01
    }

}