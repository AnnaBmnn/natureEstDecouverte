import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setLight('first light')
        this.setEnvironmentMap()
    }

    setFog()
    {
        this.scene.fog = new THREE.Fog( 0x152e42, 30, 200 ); 
        console.log(this.scene.fog)
        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.scene.fog, 'far')
                .name(`Fog : far`)
                .min(30)
                .max(300)
                .step(0.1)

            this.debugFolder
                .add(this.scene.fog, 'near')
                .name(`Fog : near`)
                .min(0)
                .max(100)
                .step(0.1)

            this.debugFolder
                .addColor(this.scene.fog, 'color')
                .name(`Fog : color`)
                // .onChange( ( value ) => {
                //     this.instance.setClearColor(value)
                // } );
        }

    }
    setLight(name)
    {
        const light = new THREE.DirectionalLight('#ffffff', 2.5)
        light.castShadow = true
        light.shadow.camera.far = 15
        light.shadow.mapSize.set(1024, 1024)
        light.shadow.normalBias = 0.05
        light.position.set(4, 0.8, -2)
        this.scene.add(light)

        // const helper = new THREE.DirectionalLightHelper( light, 5 );
        // this.scene.add( helper );

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(light, 'intensity')
                .name(`${name}Intensity`)
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(light.position, 'x')
                .name(`${name}X`)
                .min(-1)
                .max(10)
                .step(0.001)
                
            this.debugFolder
                .add(light.position, 'y')
                .name(`${name}Y`)
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(light.position, 'z')
                .name(`${name}Z`)
                .min(-10)
                .max(10)
                .step(0.001)
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 2.4
        this.environmentMap.texture = this.resources.items.EnvironmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) => 
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}