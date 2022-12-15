export default class Header
{
    constructor()
    {
        this.domElement = document.querySelector('.js-header')
        console.log(this.domElement)
        this.mouseDown = false

        
        // event
        this.domElement.addEventListener(
            'mousedown', 
            (e)=> {
                this.mouseDown = true
                this.mouseXStart = e.clientX
            }
        )
        window.addEventListener(
            'mouseup', 
            (e)=> {
                this.mouseDown = false
            }
        )
        window.addEventListener(
            'mousemove', 
            (e)=> {
                if(this.mouseDown){
                    console.log(e)
                    this.domElement.style.transform = `translateX(${e.screenX - this.mouseXStart}px)`
                }
            }
        )
    }
}