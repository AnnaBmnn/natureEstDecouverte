export default class Info
{
    constructor()
    {
        this.button = document.querySelector('.js-info-button')
        this.content = document.querySelector('.js-info')
        
        // event
        this.button.addEventListener(
            'click', 
            (e)=> {
                if(this.content.classList.contains('hidden')){
                    this.content.classList.remove('hidden')
                } else {
                    this.content.classList.add('hidden')
                }
            }
        )
    }
}