import * as THREE from 'three';
import Experience from "../Experience.js";

export default class Terrain
{
    constructor()
    {
        this.experience = new Experience()
        this.calculs = this.experience.calculs
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.data = this.resources.items.TerrainBesseggen

        console.log(this.experience)

        this._params = {
            octaves: 2,
            persistence: 0.707,
            lacunarity: 1.8,
            exponentiation: 1.5,
            height: 10.0,
            scale: 10.0,
            seed: 1
        }
        this._values = []

        
        this.setGeometry()
        this.setElevation()
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
        this.geometry = new THREE.PlaneGeometry(500, 500, 68, 68);
    }

    setMaterial()
    {
        // this.material = new THREE.MeshStandardMaterial({
        //     // color: 0xdddddd, 
        //     wireframe: false,
        //     map: this.resources.items.GemColor,
        //     displacementMap: this.resources.items.GemDisp,
        //     displacementScale: 4,
        //     aoMap: this.resources.items.GemOcc,
        //     alphaMap: this.resources.items.GemMask,
        //     normalMap: this.resources.items.GemNorm,
        //     roughnessMap: this.resources.items.GemRough,
        //     emissiveMap: this.resources.items.GemMask,
        //     side: THREE.DoubleSide
        // });

        // this.material = new THREE.MeshStandardMaterial({
        //     // color: 0xdddddd, 
        //     wireframe: false,
        //     map: this.resources.items.CoralColor,
        //     displacementMap: this.resources.items.CoralHeight,
        //     displacementScale: 2,
        //     aoMap: this.resources.items.CoralAo,
        //     // alphaMap: this.resources.items.GemMask,
        //     normalMap: this.resources.items.CoralNormal,
        //     roughnessMap: this.resources.items.CoralRoughness,
        //     emissiveMap: this.resources.items.CoralHeight,
        // });
        this.material = new THREE.MeshStandardMaterial({
            color: 0xdddddd, 
            wireframe: true,
            // map: this.resources.items.BacteriaColor,
            // displacementMap: this.resources.items.BacteriaDisp,
            // displacementScale: 2,
            // aoMap: this.resources.items.BacteriaOcc,
            // normalMap: this.resources.items.BacteriaNorm,
            // metalnessMap: this.resources.items.BacteriaSpec,
        });

    }

    setMesh()
    {
        this.terrain = new THREE.Mesh(this.geometry, this.material)
        this.terrain2 = new THREE.Mesh(this.geometry, this.material)
        this.terrain2.castShadow = true
        this.terrain.castShadow = true
        this.terrain.receiveShadow = true
        this.terrain2.receiveShadow = true
        this.terrain.position.set(- 20.97, - 33.754, - 23.92)
        this.terrain.rotation.set(- Math.PI * 0.5, 0, - 2.419)
        this.terrain2.position.set(2.342, - 33.754, 32.875)
        // this.terrain2.rotation.set(- Math.PI * 0.5, 0, 0.664)

        this.scene.add(this.terrain)
        // this.scene.add(this.terrain2)
    }


    calculateFBM(x , y)
    {
        // calculate point elevation with Fractional Brownian Motion
        const xs = x / this._params.scale;
        const ys = y / this._params.scale;
        const G = 2.0 ** (-this._params.persistence);
        let amplitude = 10.0;
        let frequency = 0.5;
        let normalization = 0;
        let total = 0;
        for (let o = 0; o < this._params.octaves; o++) {
            const noiseValue =  this.calculs.noise2D(
                xs * frequency, ys * frequency) * 0.5 + 0.5;
            total += noiseValue * amplitude;
            normalization += amplitude;
            amplitude *= G;
            frequency *= this._params.lacunarity;
        }
        total /= normalization;
        return Math.pow(total, this._params.exponentiation) 
            * this._params.height;
    }
    setElevation()
    {
        for (let i = 0, l = this.geometry.attributes.position.count; i < l; i++) {
            this.geometry.attributes.position.array[3 * i + 2] = this.calculateFBM( 3 * i + 0, 3 * i + 1);
            // this.geometry.attributes.position.array[3 * i + 2] = this.data[i] / 60535 * 50;
        }
        this.geometry.attributes.position.needsUpdate = true;
    }

    setDebug()
    {
        this.debugFolder = this.debug.ui.addFolder('Terrain')

        this.debugFolder.add(this._params, 'octaves').min(0).max(10).step(1.0).name('Octave').onChange(() => {
            this.setElevation() 
        })
        this.debugFolder.add(this._params, 'persistence').min(0).max(10).step(0.001).name('persistence').onChange(() => {
            this.setElevation() 
        })
        this.debugFolder.add(this._params, 'lacunarity').min(0).max(10).step(0.001).name('lacunarity').onChange(() => {
            this.setElevation() 
        })
        this.debugFolder.add(this._params, 'exponentiation').min(0).max(10).step(0.1).name('exponentiation').onChange(() => {
            this.setElevation() 
        })
        this.debugFolder.add(this._params, 'height').min(0).max(500).step(0.1).name('height').onChange(() => {
            this.setElevation() 
        })
        this.debugFolder.add(this._params, 'scale').min(0).max(500).step(0.1).name('scale').onChange(() => {
            this.setElevation() 
        })

        // this.debugFolder.add(this.terrain2.position, 'x').min(-40).max(40).step(0.001).name('position X')
        // this.debugFolder.add(this.terrain2.position, 'y').min(-40).max(40).step(0.001).name('position Y')
        // this.debugFolder.add(this.terrain2.position, 'z').min(-40).max(40).step(0.001).name('position Z')
        // this.debugFolder.add(this.terrain2.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.001).name('rotation X')
        // this.debugFolder.add(this.terrain2.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation Y')
        // this.debugFolder.add(this.terrain2.rotation, 'z').min(-Math.PI).max(Math.PI).step(0.001).name('rotation Z')
    }
}