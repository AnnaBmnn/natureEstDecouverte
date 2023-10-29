import Experience from '../Experience.js'
import EventEmitter from "./EventEmitter.js"

export default class Audios extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.resources = this.experience.resources
        this.isReady = false
        this.audioDom = document.querySelector('.js-audio')

        // Options
        this.resources.on('ready', () => 
        {
            this.isReady = true

        })

        // Set up
        this.items = {}


    }
    
}