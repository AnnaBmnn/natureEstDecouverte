import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import TerrainLoader from './TerrainLoader.js'
import EventEmitter from "./EventEmitter.js"

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources

        // Set up
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoader()
        this.startLoading()
    }

    setLoader()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.terrainLoader = new TerrainLoader()
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'terrainData')
            {
                this.loaders.terrainLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'audio')
            {
                
                const audioEl = new Audio(source.path)
                
                // audio.src = source.path
                
                audioEl.addEventListener('canplaythrough', ()=> {
                    this.sourceLoaded(source, audioEl)
                })
                
            }
        }
    }

    sourceLoaded(source, loadedFile)
    {
        this.items[source.name] = loadedFile

        this.loaded++

        if(this.loaded === this.toLoad){
            this.trigger('ready')
        }
    }
}