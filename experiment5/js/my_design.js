/* global p4_inspirations, p4_initialize, p4_render, p4_mutate */
// color extraction inspired by Alex Legharts use of getcolorindex() and mutate()
// also consulted Adam Smiths variation of the project and chatgpt

function p4_inspirations() {
    return [
      {
        name: "batman",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/P4batman.jpg?v=1714676508802",
        source: "https://www.cnn.com/2022/03/04/entertainment/the-batman-review/index.html",
        whRatio: 10,
        // bg: [0, 30, 0, 255],
        bg: [0, 100, 50, 255],
      },
      {
        name: "darthvader",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/dv.jpg?v=1714686682957",
        source: "https://www.cnn.com/2022/03/04/entertainment/the-batman-review/index.html",
        whRatio: 10,
        bg: [0, 30, 0, 255],
      },
      {
        name: "R2D2 and C3PO",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/P4R2C3.jpg?v=1714676526618",
        source: "https://phys.org/news/2015-12-r2-d2-c-3po.html",
        whRatio: 10,
        // bg: [0, 0, 255, 255]
        bg: [0, 100, 50, 255],
      },
      {
        name: "Pool",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/8b.jpg?v=1714685288499",
        source: "SerKucher",
        whRatio: 10,
        // bg: [0, 0, 255, 255]
        bg: [0, 100, 50, 255],
      },
      {
        name: "troop",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/troop.jpg?v=1714686863724",
        credit:
          "https://www.cnn.com/2022/03/04/entertainment/the-batman-review/index.html",
        whRatio: 10,
        bg: [0, 30, 0, 255],
      },
      {
        name: "K2SO",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/p4K2.jpg?v=1714676520001",
        credit:
          "https://www.reddit.com/r/StarWars/comments/gjlabo/i_just_watched_rogue_one_finally_and_k2so_has_to/",
        whRatio: 5,
        bg: [0, 30, 0, 255],
      },
      {
        name: "Fellowship",
        assetUrl:
          "https://cdn.glitch.global/229801b6-1186-41ee-8996-456f565640a1/P4fellowship.jpg?v=1714676514273",
        credit: "https://www.intofilm.org/films/3930",
        whRatio: 10,
        bg: [0, 30, 0, 255],
      },
    ];
  }
  
  function p4_initialize(insp, numCircs) {
    insp.image.loadPixels();
    resizeCanvas(insp.image.width / insp.whRatio, insp.image.height / insp.whRatio);
    let design = {
      bg: insp.bg,
      circs: [],
      minR: 5,
      maxR: Math.max(insp.image.width / 2, insp.image.height / 2) / insp.whRatio / 3.5,
      alphaBase: 100,
      alphaSub: 70,
      numcircs: numCircs, // Use the passed value here
    };
    let _x, _y, _r, _rot, _alpha;
    for (let i = 0; i < design.numcircs; i++) { // Modify the loop condition here
      _x = floor(random(insp.image.width));
      _y = floor(random(insp.image.height));
      _alpha = random();
      _r = lerp(design.minR, design.maxR, map(i, 0, design.numcircs, 1, 0));
      _rot = random() * 3;
      design.circs.push({
        x: _x / insp.whRatio,
        y: _y / insp.whRatio,
        r: _r,
        col: getColorIndex(_x, _y, insp.image),
        a: design.alphaBase - _alpha * design.alphaSub,
        rot: _rot,
      });
    }
  
    return design;
  }
  
  function p4_render(design, insp) {
    background(design.bg[0], design.bg[1], design.bg[2], design.bg[3]);
    noStroke();
    for (let s of design.circs) {
        fill(s.col[0], s.col[1], s.col[2], s.a);
        ellipse(s.x, s.y, s.r);
        noFill();
    }
  }
  
  function p4_mutate(design, insp, rate) {
    let _x, _y, _r, _rot, _alpha;
    for (let s of design.circs) {
      _x = s.x * insp.whRatio;
      _y = s.y * insp.whRatio;
      _x = floor(mut(_x, 0, insp.image.width - 1, rate));
      _y = floor(mut(_y, 0, insp.image.height - 1, rate));
      _r = mut(s.r, design.minR, design.maxR, rate);
      _alpha =
        design.alphaBase - map(_r, design.minR, design.maxR, 0, design.alphaSub); //don't mut, rather map from size to percentage of max size.
      _rot = mut(s.rot, 0, 3, rate);
      s.x = _x / insp.whRatio;
      s.y = _y / insp.whRatio;
      s.r = _r;
      s.col = getColorIndex(floor(_x), floor(_y), insp.image);
      s.a = _alpha;
      s.rot = _rot;
    }
  }
  
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  
  function getColorIndex(xpos, ypos, img) {
    let index = (ypos * img.width + xpos) * 4;
    let rval = [img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]];
    return rval;
  }

//   function adjustHue(design, hue) {
//     for (let s of design.circs) {
//       let hsl = rgbToHsl(s.col[0], s.col[1], s.col[2]); // Convert RGB to HSL
//       hsl[0] = hue; // Update the hue
//       let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]); // Convert HSL back to RGB
//       s.col = rgb;
//     }
//     return design;
//   }
function adjustHue(design, hue) {
    // Update the hue value of the background color
    design.bg = [hue, design.bg[1], design.bg[2], design.bg[3]];
    return design;
  }
  
  function adjustColor(design, property, value) {
    switch(property) {
        case 'hue':
            design.bg[0] = parseInt(value);
            break;
        case 'saturation':
            design.bg[1] = parseInt(value);
            break;
        case 'lightness':
            design.bg[2] = parseInt(value);
            break;
        case 'alpha':
            design.bg[3] = parseInt(value);
            break;
    }
    return design;
}
//   function rgbToHsl(r, g, b) {
//     r /= 255, g /= 255, b /= 255;
//     let max = Math.max(r, g, b), min = Math.min(r, g, b);
//     let h, s, l = (max + min) / 2;
  
//     if (max === min) {
//       h = s = 0; // achromatic
//     } else {
//       let d = max - min;
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//       switch (max) {
//         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//         case g: h = (b - r) / d + 2; break;
//         case b: h = (r - g) / d + 4; break;
//       }
//       h /= 6;
//     }
  
//     return [h * 360, s * 100, l * 100];
//   }
  
//   function hslToRgb(h, s, l) {
//     let r, g, b;
  
//     h /= 360;
//     s /= 100;
//     l /= 100;
  
//     if (s === 0) {
//       r = g = b = l; // achromatic
//     } else {
//       const hue2rgb = (p, q, t) => {
//         if (t < 0) t += 1;
//         if (t > 1) t -= 1;
//         if (t < 1 / 6) return p + (q - p) * 6 * t;
//         if (t < 1 / 2) return q;
//         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//         return p;
//       };
  
//       const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//       const p = 2 * l - q;
//       r = hue2rgb(p, q, h + 1 / 3);
//       g = hue2rgb(p, q, h);
//       b = hue2rgb(p, q, h - 1 / 3);
//     }
  
//     return [r * 255, g * 255, b * 255];
//   }
  