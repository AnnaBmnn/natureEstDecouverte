import Experience from '../Experience.js'

export default class Loader 
{
    constructor()
    {

        this.experience = new Experience()
        this.resources = this.experience.resources

        this.domLoader = document.querySelector('.loader')
        this.domToShow = document.querySelectorAll('.js-load-hidden')
        this.info = document.querySelector('.js-info')

        // Options
        this.resources.on('ready', () => 
        {
            this.domLoader.classList.add('hidden')
            // this.domToShow.classList.add('show')
            for(let i = 0; i < this.domToShow.length; i++){
                this.domToShow[i].classList.remove('js-load-hidden')
            }
            window.setTimeout(() => {
                this.info.classList.add('hidden')
                
            }, 1200);
        })

        // Set up


    }
    
}