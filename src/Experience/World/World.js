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
            this.water = new WaterClass()

            for(let i = 0; i < this.screenNumber; i ++){
                this.screens.push(new Screen())
            }

            this.environment = new Environment()
            this.terrain = new Terrain()
            this.texte = new Texte()
            this.players =  [
                new Player(
                    'VideoColorTexture',
                    'https://vimeo.com/759178311',
                    {
                        x: -40,
                        y: -14,
                        z: -34
                    }
                ),
                new Player(
                    'VideoMoonColorTexture',
                    'https://astra-al.netlify.app/',
                    {
                        x: 56.744,
                        y: 41.477,
                        z: 49.11
                    }
                ),
                new Player(
                    'VideoVegetalColorTexture',
                    'https://vimeo.com/489383417',
                    {
                        x: -39.946,
                        y: -1.779,
                        z: -1.779
                    }
                ),
            ]
            this.objectToIntersect =  [
                this.players[0].mesh,
                this.players[1].mesh,
                this.players[2].mesh
            ]
            // this.butterfly = new Butterfly()
        })

    }
    update()
    {
        if(this.texte)
            this.texte.update()

        if(this.water)
            this.water.update()


        if(this.butterfly)
            this.butterfly.update()

        if(this.players && this.players.length > 0)
            for(let i = 0; i < this.players.length; i ++){
                this.players[i].update()
            }

        if(this.screens && this.screens.length > 0)
            for(let i = 0; i < this.screenNumber; i ++){
                this.screens[i].update()
            }
    }
}