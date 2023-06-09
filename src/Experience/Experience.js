import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from "./Utils/Sizes.js"
import Calculs from "./Utils/Calculs.js"
import Time from "./Utils/Time.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import Header from "./DOM/Header.js"
import World from "./World/World.js"
import Resources from './Utils/Resources.js'
import Raycaster from './Utils/Raycaster.js'
import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Option
        this.canvas = canvas

        // Set up
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.calculs = new Calculs()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.raycaster = new Raycaster()
        
        // Dom
        // this.header = new Header()

        // Sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => 
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
        this.raycaster.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if( child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
    }
}