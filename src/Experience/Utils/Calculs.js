export default class Calculs
{
    constructor()
    {

    }
    getRandomArbitrary(min, max)
    {
        return Math.random() * (max - min) + min;
      }
}