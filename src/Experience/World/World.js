import Experience from "../Experience.js";
import Environment from "./Environment.js"
import WaterClass from './Water.js';
import Screen from './Screen.js';
import Texte from './Texte.js';
import Terrain from './Terrain.js';
import Player from './Player.js';
import Butterfly from './Butterfly.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.screenNumber = 0;
        this.screens = [];

        // Wait for the resources
        this.resources.on('ready', () => 
        {
            // Set up
            // this.water = new WaterClass()

            for(let i = 0; i < this.screenNumber; i ++){
                this.screens.push(new Screen())
            }

            this.environment = new Environment()
            this.terrain = new Terrain()
            this.texte = new Texte()
            this.player = new Player()
            // this.butterfly = new Butterfly()
        })

    }
    update()
    {
        if(this.texte)
            this.texte.update()

        if(this.water)
            this.water.update()

        if(this.player)
            this.player.update()

        if(this.butterfly)
            this.butterfly.update()

        if(this.screens && this.screens.length > 0)
            for(let i = 0; i < this.screenNumber; i ++){
                this.screens[i].update()
            }
    }
}