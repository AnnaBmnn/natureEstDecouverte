import Experience from '../Experience.js'

export default class Loader 
{
    constructor()
    {

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.domLoader = document.querySelector('.loader')
        this.domToShow = document.querySelector('.js-load-hidden')
        this.info = document.querySelector('.js-info')

        this.isReady = false

        // Options
        this.resources.on('ready', () => 
        {
            this.domLoader.classList.add('hidden')
            this.isReady = true
            // this.domToShow.classList.remove('js-load-hidden')

            // window.setTimeout(() => {
            //     // this.info.classList.add('hidden')
            //     this.domLoader.classList.add('none')
            // }, 2000);
        })

        this.domLoader.addEventListener('click', ()=>{
            if(this.isReady){
                this.domLoader.classList.add('not-here')
            }
        })


    }
    
}