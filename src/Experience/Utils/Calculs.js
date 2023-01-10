import { createNoise2D } from 'simplex-noise';

export default class Calculs
{
  constructor()
  {
    this.noise2D = createNoise2D();
  }
  getRandomArbitrary(min, max)
  {
    return Math.random() * (max - min) + min;
  }
  lerp(x, a, b) {
    return x * (b - a) + a;
  }
  smoothstep(x, a, b) {
    x = x * x * (3.0 - 2.0 * x);
    return x * (b - a) + a;
  }
  _Rand(x, y, values) {
    const k = x + '.' + y;
    if (!(k in values)) {
      values[k] = Math.random() * 2 - 1;
    }
    return values[k];
  }
  // noise2D(x, y) {
  //   // Bilinear filter
  //   const x1 = Math.floor(x);
  //   const y1 = Math.floor(y);
  //   const x2 = x1 + 1;
  //   const y2 = y1 + 1;
  
  //   const xp = x - x1;
  //   const yp = y - y1;

  //   let values = [];
  
  //   const p11 = this._Rand(x1, y1, values);
  //   const p21 = this._Rand(x2, y1, values);
  //   const p12 = this._Rand(x1, y2, values);
  //   const p22 = this._Rand(x2, y2, values);
  
  //   const px1 = this.lerp(xp, p11, p21);
  //   const px2 = this.lerp(xp, p12, p22);
  
  //   return this.lerp(yp, px1, px2);
  // }
}