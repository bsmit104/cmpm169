function generateGrid(numCols, numRows) {
    const grid = new Array(numRows).fill(null).map(() => new Array(numCols));
  
    const baseY = Math.floor(numRows / 2);
    const waterWidth = 5;
    let xoff = 0;
    const noiseStep = 0.1;
  
    let initialRiverPosition = baseY;
  
    for (let i = 0; i < numRows; i++) {
      xoff += noiseStep;
      let riverPos = initialRiverPosition + Math.floor((noise(xoff) - 0.5) * 10);
      riverPos = constrain(riverPos, 0, numRows - waterWidth);
  
      for (let j = 0; j < numCols; j++) {
        if (j >= riverPos && j < riverPos + waterWidth) {
          grid[i][j] = "w";
        } else {
          const innerValue = noise(i / 20, j / 20);
          grid[i][j] = innerValue > 0.5 ? "d" : "g";
        }
      }
    }
  
    return grid;
  }
  
  function constrain(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  function drawGrid(grid) {
    background(128);
    const g = 10;
    const t = millis() / 3000.0;
  
    noStroke();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        let delay = map(i * grid[i].length + j, 0, grid.length * grid[i].length, 0, 2000);
        let tileTime = millis() - delay;
        let noiseT = tileTime / 3000.0;
  
        placeTile(i, j, (4 * pow(noise(noiseT / 10, i, j / 4 + noiseT), 2)) | 0, 14);
  
        if (gridCheck(grid, i, j, "d")) {
          if (tileTime % 5000 < 2000) {
            placeTile(i, j, (4 * pow(random(), g)) | 0, 9);
          } else {
            placeTile(i, j, (4 * pow(random(), g)) | 0, 12);
          }
        } else {
          if (tileTime % 5000 < 2000) {
            drawContext(grid, i, j, "w", 9, 3, true);
          } else {
            drawContext(grid, i, j, "w", 9, 6, true);
          }
        }
  
        if (gridCheck(grid, i, j, "g")) {
          if (tileTime % 5000 < 2000) {
            placeTile(i, j, (4 * pow(random(), g)) | 0, 6);
          } else {
            placeTile(i, j, (4 * pow(random(), g)) | 0, 12);
          }
        } else {
          if (tileTime % 5000 < 2000) {
            drawContext(grid, i, j, "g", 4, 0);
          } else {
            drawContext(grid, i, j, "g", 4, 6);
          }
        }
  
        if (i >= 10 && i < 16 && j >= 10 && j < 16 && !gridCheck(grid, i, j, "w")) {
          if (random() < 0.5) {
            if (tileTime % 5000 < 2000) {
              if (random() < 0.5) {
                placeTile(i, j, 26, 3);
              } else {
                placeTile(i, j, 26, 2);
              }
            } else {
              if (random() < 0.5) {
                placeTile(i, j, 27, 3);
              } else {
                placeTile(i, j, 27, 2);
              }
            }
          }
        }
      }
    }
  }
  
  function drawContext(grid, i, j, target, dti, dtj, invert = false) {
    let code = gridCode(grid, i, j, target);
    if (invert) {
      code = ~code & 0xf;
    }
    let [ti, tj] = lookup[code];
    placeTile(i, j, dti + ti, dtj + tj);
  }
  
  function gridCode(grid, i, j, target) {
    return (
      (gridCheck(grid, i - 1, j, target) << 0) +
      (gridCheck(grid, i, j - 1, target) << 1) +
      (gridCheck(grid, i, j + 1, target) << 2) +
      (gridCheck(grid, i + 1, j, target) << 3)
    );
  }
  
  function gridCheck(grid, i, j, target) {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && grid[i][j] === target;
  }
  
  const lookup = [
    [1, 7],
    [1, 6],
    [0, 7],
    [0, 6],
    [2, 7],
    [2, 6],
    [1, 7],
    [1, 6],
    [1, 8],
    [1, 7],
    [0, 8],
    [0, 7],
    [2, 8],
    [2, 7],
    [1, 8],
    [1, 7]
  ];

//inspo from professors code and chatgpt





// function generateGrid2(numCols, numRows) {
//     const grid = new Array(numRows).fill(null).map(() => new Array(numCols));
  
//     const baseY = Math.floor(numRows / 2);
//     const waterWidth = 5;
//     let xoff = 0;
//     const noiseStep = 0.1;
  
//     let initialRiverPosition = baseY;
  
//     for (let i = 0; i < numRows; i++) {
//       xoff += noiseStep;
//       let riverPos = initialRiverPosition + Math.floor((noise(xoff) - 0.5) * 10);
//       riverPos = constrain(riverPos, 0, numRows - waterWidth);
  
//       for (let j = 0; j < numCols; j++) {
//         if (j >= riverPos && j < riverPos + waterWidth) {
//           grid[i][j] = "w";
//         } else {
//           const innerValue = noise(i / 20, j / 20);
//           grid[i][j] = innerValue > 0.5 ? "d" : "g";
//         }
//       }
//     }
  
//     return grid;
//   }
  
//   function drawGrid2(grid) {
//     background(128);
//     const g = 10;
//     const t = millis() / 3000.0;
  
//     noStroke();
//     for (let i = 0; i < grid.length; i++) {
//       for (let j = 0; j < grid[i].length; j++) {
//         let delay = map(i * grid[i].length + j, 0, grid.length * grid[i].length, 0, 2000);
//         let tileTime = millis() - delay;
//         let noiseT = tileTime / 3000.0;
  
//         placeTile2(i, j, (4 * pow(noise(noiseT / 10, i, j / 4 + noiseT), 2)) | 0, 14);
  
//         if (gridCheck2(grid, i, j, "d")) {
//           if (tileTime % 5000 < 2000) {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 9);
//           } else {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 12);
//           }
//         } else {
//           if (tileTime % 5000 < 2000) {
//             drawContext2(grid, i, j, "w", 9, 3, true);
//           } else {
//             drawContext2(grid, i, j, "w", 9, 6, true);
//           }
//         }
  
//         if (gridCheck2(grid, i, j, "g")) {
//           if (tileTime % 5000 < 2000) {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 6);
//           } else {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 12);
//           }
//         } else {
//           if (tileTime % 5000 < 2000) {
//             drawContext2(grid, i, j, "g", 4, 0);
//           } else {
//             drawContext2(grid, i, j, "g", 4, 6);
//           }
//         }
  
//         if (i >= 10 && i < 16 && j >= 10 && j < 16 && !gridCheck2(grid, i, j, "w")) {
//           if (random() < 0.5) {
//             if (tileTime % 5000 < 2000) {
//               if (random() < 0.5) {
//                 placeTile2(i, j, 26, 3);
//               } else {
//                 placeTile2(i, j, 26, 2);
//               }
//             } else {
//               if (random() < 0.5) {
//                 placeTile2(i, j, 27, 3);
//               } else {
//                 placeTile2(i, j, 27, 2);
//               }
//             }
//           }
//         }
//       }
//     }
//   }
  
//   function drawContext2(grid, i, j, target, dti, dtj, invert = false) {
//     let code = gridCode2(grid, i, j, target);
//     if (invert) {
//       code = ~code & 0xf;
//     }
//     let [ti, tj] = lookup2[code];
//     placeTile2(i, j, dti + ti, dtj + tj);
//   }
  
//   function gridCode2(grid, i, j, target) {
//     return (
//       (gridCheck2(grid, i - 1, j, target) << 0) +
//       (gridCheck2(grid, i, j - 1, target) << 1) +
//       (gridCheck2(grid, i, j + 1, target) << 2) +
//       (gridCheck2(grid, i + 1, j, target) << 3)
//     );
//   }
  
//   function gridCheck2(grid, i, j, target) {
//     return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && grid[i][j] === target;
//   }
  
//   const lookup2 = [
//     [1, 7],
//     [1, 6],
//     [0, 7],
//     [0, 6],
//     [2, 7],
//     [2, 6],
//     [1, 7],
//     [1, 6],
//     [1, 8],
//     [1, 7],
//     [0, 8],
//     [0, 7],
//     [2, 8],
//     [2, 7],
//     [1, 8],
//     [1, 7]
//   ];

// function generateGrid(numCols, numRows) {
//     const grid = new Array(numRows).fill(null).map(() => new Array(numCols));
  
//     const baseY = Math.floor(numRows / 2);
//     const waterWidth = 5;
//     let xoff = 0;
//     const noiseStep = 0.1;
  
//     let initialRiverPosition = baseY;
  
//     for (let i = 0; i < numRows; i++) {
//       xoff += noiseStep;
//       let riverPos = initialRiverPosition + Math.floor((noise(xoff) - 0.5) * 10);
//       riverPos = constrain(riverPos, 0, numRows - waterWidth);
  
//       for (let j = 0; j < numCols; j++) {
//         if (j >= riverPos && j < riverPos + waterWidth) {
//           grid[i][j] = "w";
//         } else {
//           const innerValue = noise(i / 20, j / 20);
//           grid[i][j] = innerValue > 0.5 ? "d" : "g";
//         }
//       }
//     }
  
//     return grid;
//   }
  
//   function constrain(value, min, max) {
//     return Math.min(Math.max(value, min), max);
//   }
  
//   function drawGrid(grid) {
//     background(128);
//     const g = 10;
//     const t = millis() / 3000.0;
  
//     noStroke();
//     for (let i = 0; i < grid.length; i++) {
//       for (let j = 0; j < grid[i].length; j++) {
//         let delay = map(i * grid[i].length + j, 0, grid.length * grid[i].length, 0, 2000);
//         let tileTime = millis() - delay;
//         let noiseT = tileTime / 3000.0;
  
//         placeTile(i, j, (4 * pow(noise(noiseT / 10, i, j / 4 + noiseT), 2)) | 0, 14);
  
//         if (gridCheck(grid, i, j, "d")) {
//           if (tileTime % 5000 < 2000) {
//             placeTile(i, j, (4 * pow(random(), g)) | 0, 9);
//           } else {
//             placeTile(i, j, (4 * pow(random(), g)) | 0, 12);
//           }
//         } else {
//           if (tileTime % 5000 < 2000) {
//             drawContext(grid, i, j, "w", 9, 3, true);
//           } else {
//             drawContext(grid, i, j, "w", 9, 6, true);
//           }
//         }
  
//         if (gridCheck(grid, i, j, "g")) {
//           if (tileTime % 5000 < 2000) {
//             placeTile(i, j, (4 * pow(random(), g)) | 0, 6);
//           } else {
//             placeTile(i, j, (4 * pow(random(), g)) | 0, 12);
//           }
//         } else {
//           if (tileTime % 5000 < 2000) {
//             drawContext(grid, i, j, "g", 4, 0);
//           } else {
//             drawContext(grid, i, j, "g", 4, 6);
//           }
//         }
  
//         if (i >= 10 && i < 16 && j >= 10 && j < 16 && !gridCheck(grid, i, j, "w")) {
//           if (random() < 0.5) {
//             if (tileTime % 5000 < 2000) {
//               if (random() < 0.5) {
//                 placeTile(i, j, 26, 3);
//               } else {
//                 placeTile(i, j, 26, 2);
//               }
//             } else {
//               if (random() < 0.5) {
//                 placeTile(i, j, 27, 3);
//               } else {
//                 placeTile(i, j, 27, 2);
//               }
//             }
//           }
//         }
//       }
//     }
//   }
  
//   function drawContext(grid, i, j, target, dti, dtj, invert = false) {
//     let code = gridCode(grid, i, j, target);
//     if (invert) {
//       code = ~code & 0xf;
//     }
//     let [ti, tj] = lookup[code];
//     placeTile(i, j, dti + ti, dtj + tj);
//   }
  
//   function gridCode(grid, i, j, target) {
//     return (
//       (gridCheck(grid, i - 1, j, target) << 0) +
//       (gridCheck(grid, i, j - 1, target) << 1) +
//       (gridCheck(grid, i, j + 1, target) << 2) +
//       (gridCheck(grid, i + 1, j, target) << 3)
//     );
//   }
  
//   function gridCheck(grid, i, j, target) {
//     return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && grid[i][j] === target;
//   }
  
//   const lookup = [
//     [1, 7],
//     [1, 6],
//     [0, 7],
//     [0, 6],
//     [2, 7],
//     [2, 6],
//     [1, 7],
//     [1, 6],
//     [1, 8],
//     [1, 7],
//     [0, 8],
//     [0, 7],
//     [2, 8],
//     [2, 7],
//     [1, 8],
//     [1, 7]
//   ];

// function generateGrid2(numCols, numRows) {
//     const grid = new Array(numRows).fill(null).map(() => new Array(numCols));
  
//     const baseY = Math.floor(numRows / 2);
//     const waterWidth = 5;
//     let xoff = 0;
//     const noiseStep = 0.1;
  
//     let initialRiverPosition = baseY;
  
//     for (let i = 0; i < numRows; i++) {
//       xoff += noiseStep;
//       let riverPos = initialRiverPosition + Math.floor((noise(xoff) - 0.5) * 10);
//       riverPos = constrain2(riverPos, 0, numRows - waterWidth);
  
//       for (let j = 0; j < numCols; j++) {
//         if (j >= riverPos && j < riverPos + waterWidth) {
//           grid[i][j] = "w";
//         } else {
//           const innerValue = noise(i / 20, j / 20);
//           grid[i][j] = innerValue > 0.5 ? "d" : "g";
//         }
//       }
//     }
  
//     return grid;
//   }
  
//   function constrain2(value, min, max) {
//     return Math.min(Math.max(value, min), max);
//   }
  
//   function drawGrid2(grid) {
//     background(128);
//     const g = 10;
//     const t = millis() / 3000.0;
  
//     noStroke();
//     for (let i = 0; i < grid.length; i++) {
//       for (let j = 0; j < grid[i].length; j++) {
//         let delay = map(i * grid[i].length + j, 0, grid.length * grid[i].length, 0, 2000);
//         let tileTime = millis() - delay;
//         let noiseT = tileTime / 3000.0;
  
//         placeTile2(i, j, (4 * pow(noise(noiseT / 10, i, j / 4 + noiseT), 2)) | 0, 14);
  
//         if (gridCheck(grid, i, j, "d")) {
//           if (tileTime % 5000 < 2000) {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 9);
//           } else {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 12);
//           }
//         } else {
//           if (tileTime % 5000 < 2000) {
//             drawContext(grid, i, j, "w", 9, 3, true);
//           } else {
//             drawContext(grid, i, j, "w", 9, 6, true);
//           }
//         }
  
//         if (gridCheck(grid, i, j, "g")) {
//           if (tileTime % 5000 < 2000) {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 6);
//           } else {
//             placeTile2(i, j, (4 * pow(random(), g)) | 0, 12);
//           }
//         } else {
//           if (tileTime % 5000 < 2000) {
//             drawContext(grid, i, j, "g", 4, 0);
//           } else {
//             drawContext(grid, i, j, "g", 4, 6);
//           }
//         }
  
//         if (i >= 10 && i < 16 && j >= 10 && j < 16 && !gridCheck(grid, i, j, "w")) {
//           if (random() < 0.5) {
//             if (tileTime % 5000 < 2000) {
//               if (random() < 0.5) {
//                 placeTile2(i, j, 26, 3);
//               } else {
//                 placeTile2(i, j, 26, 2);
//               }
//             } else {
//               if (random() < 0.5) {
//                 placeTile2(i, j, 27, 3);
//               } else {
//                 placeTile2(i, j, 27, 2);
//               }
//             }
//           }
//         }
//       }
//     }
//   }
  
//   function drawContext(grid, i, j, target, dti, dtj, invert = false) {
//     let code = gridCode(grid, i, j, target);
//     if (invert) {
//       code = ~code & 0xf;
//     }
//     let [ti, tj] = lookup[code];
//     placeTile2(i, j, dti + ti, dtj + tj);
//   }
  
//   function gridCode(grid, i, j, target) {
//     return (
//       (gridCheck(grid, i - 1, j, target) << 0) +
//       (gridCheck(grid, i, j - 1, target) << 1) +
//       (gridCheck(grid, i, j + 1, target) << 2) +
//       (gridCheck(grid, i + 1, j, target) << 3)
//     );
//   }
  
//   function gridCheck(grid, i, j, target) {
//     return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && grid[i][j] === target;
//   }
  
//   const lookup = [
//     [1, 7],
//     [1, 6],
//     [0, 7],
//     [0, 6],
//     [2, 7],
//     [2, 6],
//     [1, 7],
//     [1, 6],
//     [1, 8],
//     [1, 7],
//     [0, 8],
//     [0, 7],
//     [2, 8],
//     [2, 7],
//     [1, 8],
//     [1, 7]
//   ];