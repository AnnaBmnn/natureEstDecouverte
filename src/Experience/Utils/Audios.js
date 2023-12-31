import Experience from '../Experience.js'
import EventEmitter from "./EventEmitter.js"
import gsap from 'gsap'

export default class Audios extends EventEmitter
{
    constructor()
    {
        super()
        this.AUDIO_OFF = 0
        this.AUDIO_SOUND = 1
        this.AUDIO_ALL = 2
        this.audioStates = [
            'off',
            'sound',
            'all'
        ]
        this.audioStateIndex = 0
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
            this.audioBackground.addEventListener('timeupdate', () => {
                const buffer = 0.2
                console.log(this.audioBackground.currentTime)
                if (this.audioBackground.currentTime > this.audioBackground.duration - buffer) {
                    this.audioBackground.currentTime = 0.1
                    this.audioBackground.play()
                }
              })
            this.setAudioOnHoverTap()
        })

        // Set up
        this.items = {}
        this.audioLoader.addEventListener('click', ()=> {
            this.audioStateIndex = this.AUDIO_ALL
            //this.isAudioActive = true
            this.audioBackground.play()
            this.audioExperience.classList.add('all')
        })
 
        this.audioExperience.addEventListener('click', ()=> {
            this.audioExperience.classList.remove(this.audioStates[this.audioStateIndex])

            this.audioStateIndex = (this.audioStateIndex + 1) % 3

            this.audioExperience.classList.add(this.audioStates[this.audioStateIndex])
            if(this.audioStateIndex == this.AUDIO_OFF){
                //this.isAudioActive = false
                this.audioBackground.pause()
                this.audioExperience.classList.remove('active')
            }else if (this.audioStateIndex == this.AUDIO_SOUND) {
                //this.isAudioActive = true
                this.audioBackground.pause()
                this.audioExperience.classList.add('active')
            }else if (this.audioStateIndex == this.AUDIO_ALL) {
                //this.isAudioActive = true
                this.audioBackground.play()
                this.audioExperience.classList.add('active')
            }
        })
        document.addEventListener("visibilitychange", (event) => {
            if(this.audioStateIndex == this.AUDIO_ALL){
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
        for(let i = 0; i < this.audiosHoverTap.length; i++){
            this.audiosHoverTap[i].addEventListener('mouseenter', ()=>{
                if(this.experience.audios.audioStateIndex > this.experience.audios.AUDIO_OFF){
                    this.resources.items['AudioButtonHover'].play()
                }

            })
            
        }
        
    }
    
}