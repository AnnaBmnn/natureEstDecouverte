import Experience from '../Experience.js'
import EventEmitter from "./EventEmitter.js"

export default class Audios extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.resources = this.experience.resources
        this.isAudioActive = false
        this.audioLoader = document.querySelector('.js-audio')
        this.audioExperience = document.querySelector('.js-audio-experience')

        // Options
        this.resources.on('ready', () => 
        {
            this.isReady = true
            this.audioBackground = this.resources.items['AudioBackground']

        })

        // Set up
        this.items = {}
        this.audioLoader.addEventListener('click', ()=> {
            this.isAudioActive = true
            this.audioBackground.play()
            this.audioExperience.classList.add('active')
        })
        this.audioExperience.addEventListener('click', ()=> {
            if(this.isAudioActive){
                this.isAudioActive = false
                this.audioBackground.pause()
                this.audioExperience.classList.remove('active')
            }else {
                this.isAudioActive = true
                this.audioBackground.play()
            }
        })

    }
    
}