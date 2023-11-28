import Experience from '../Experience.js'
import EventEmitter from "./EventEmitter.js"
import gsap from 'gsap'

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
        this.audiosHoverTap = document.querySelectorAll('.js-audio-hover')

        // Options
        this.resources.on('ready', () => 
        {
            this.isReady = true
            this.audioBackground = this.resources.items['AudioBackground']
            this.audioBackground.loop = true
            this.audioBackground.volume = 0.8
            this.setAudioOnHoverTap()
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
                this.audioExperience.classList.add('active')
            }
        })
        document.addEventListener("visibilitychange", (event) => {
            if(this.isAudioActive){
                if(document.visibilityState === "visible"){
                    // this.audioBackground.volume = 1

                    gsap.to(
                        this.audioBackground,
                        {
                            duration: 2,
                            volume: 0.8,
                            onUpdate: ()=> {
                                console.log(this.audioBackground.volume)
                            },
                        }
                    )
                }else {
                    this.audioBackground.volume = 0

                }
            }
        });


    }
    setAudioOnHoverTap()
    {
        console.log('setAudioOnHoverTap')
            for(let i = 0; i < this.audiosHoverTap.length; i++){
                this.audiosHoverTap[i].addEventListener('mouseenter', ()=>{
                    if(this.isAudioActive){
                        this.resources.items['AudioButtonHover'].play()
                    }

                })
                
            }

        
        
        
    }
    
}