// =============================================================================
// QUEST 1
// =============================================================================

const quest1part1 = (input) => {
  let potions = 0;
  const req = { A: 0, B: 1, C: 3 };
  for (const enemy of input.split('')) {
    potions += req[enemy];
  }
  return potions;
};

const quest1part2 = (input) => {
  let potions = 0;
  const req = { A: 0, x: 0, B: 1, C: 3, D: 5 };
  for (let i = 0; i < input.length; i += 2) {
    const battle = input.slice(i, i + 2);
    const [first, second] = battle.split('');
    potions += req[first];
    potions += req[second];

    if (!battle.includes('x')) {
      potions += 2;
    }
  }
  return potions;
};

const quest1part3 = (input) => {
  let potions = 0;
  const req = { A: 0, x: 0, B: 1, C: 3, D: 5 };
  for (let i = 0; i < input.length; i += 3) {
    const battle = input.slice(i, i + 3);
    const [first, second, third] = battle.split('');
    potions += req[first];
    potions += req[second];
    potions += req[third];

    const xCount = Boolean(first === 'x') + Boolean(second === 'x') + Boolean(third === 'x');

    if (xCount === 0) {
      potions += 6;
    } else if (xCount === 1) {
      potions += 2;
    }
  }
  return potions;
};

// =============================================================================
// QUEST 2
// =============================================================================

const quest2part1 = (input) => {
  const lines = input.split('\n\n');
  const words = lines[0].slice(6).split(',');
  const inscription = lines[1];

  let runes = 0;
  for (const word of words) {
    runes += inscription.split(word).length - 1;
  }
  return runes;
};

const quest2part2 = (input) => {
  const toParse = input.split('\n\n');
  const words = toParse[0].slice(6).split(',');
  const lines = toParse[1].split('\n');

  let runeCount = 0;
  for (const line of lines) {
    const runes = new Set();
    for (let i = 0; i < line.length; i++) {
      words.forEach((word) => {
        if (line.slice(i).startsWith(word)) {
          word.split('').forEach((_, idx) => {
            runes.add(i + idx);
          });
        } else {
          const backwards = word.split('').reverse().join('');
          if (line.slice(i).startsWith(backwards)) {
            word.split('').forEach((_, idx) => {
              runes.add(i + idx);
            });
          }
        }
      });
    }
    runeCount += runes.size;
  }
  return runeCount;
};

const quest2part3 = (input) => {
  const [words, grid] = input.split('\n\n').map((el, i) => {
    if (i === 0) {
      return el.slice(6).split(',');
    } else {
      return el.split('\n');
    }
  });

  const runes = new Set();

  // Rows
  grid.forEach((row, y) => {
    const wrapped = `${row}${row}`;
    for (let i = 0; i < row.length; i++) {
      words.forEach((word) => {
        if (wrapped.slice(i).startsWith(word)) {
          word.split('').forEach((_, idx) => {
            const x = (i + idx) % row.length;
            runes.add(xyToString(x, y));
          });
        } else {
          const backwards = word.split('').reverse().join('');
          if (wrapped.slice(i).startsWith(backwards)) {
            backwards.split('').forEach((_, idx) => {
              const x = (i + idx) % row.length;
              runes.add(xyToString(x, y));
            });
          }
        }
      });
    }
  });

  // Columns
  const swappedGrid = reverseGrid(grid);

  swappedGrid.forEach((col, y) => {
    for (let i = 0; i < col.length; i++) {
      words.forEach((word) => {
        if (col.slice(i).startsWith(word)) {
          word.split('').forEach((_, idx) => {
            const x = (i + idx) % col.length;
            runes.add(xyToString(y, x)); // swapped
          });
        } else {
          const backwards = word.split('').reverse().join('');
          if (col.slice(i).startsWith(backwards)) {
            word.split('').forEach((_, idx) => {
              const x = (i + idx) % col.length;
              runes.add(xyToString(y, x)); // swapped
            });
          }
        }
      });
    }
  });

  return runes.size;
};

// =============================================================================
// QUEST 3
// =============================================================================

const quest3part1 = (input) => {
  let digs = 0;
  let grid = input.split('\n').map((row, y) => {
    return row.split('').map((el, x) => {
      if (el === '.') {
        return 0;
      } else {
        digs++;
        return 1;
      }
    });
  });

  let depth = 1;
  let canDig = true;
  while (canDig) {
    canDig = false;
    const newGrid = [...grid.map((row) => row.slice())];
    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[0].length - 1; j++) {
        if (grid[i][j] !== depth) continue;
        if (
          grid[i - 1][j] === depth &&
          grid[i + 1][j] === depth &&
          grid[i][j - 1] === depth &&
          grid[i][j + 1] === depth
        ) {
          newGrid[i][j]++;
          canDig = true;
          digs++;
        }
      }
    }
    depth++;
    grid = newGrid;
  }
  console.log(grid);
  return digs;
};

const quest3part2 = (input) => {
  return quest3part1(input);
};

const quest3part3 = (input) => {
  let digs = 0;
  let grid = input.split('\n').map((row, y) => {
    const nums = row.split('').map((el, x) => {
      if (el === '.') {
        return 0;
      } else {
        digs++;
        return 1;
      }
    });
    // wrap the edges with an empty column
    return [0, ...nums, 0];
  });
  const emptyRow = Array(grid[0].length).fill(0);
  // Add an empty row above and below
  grid.unshift(emptyRow);
  grid.push(emptyRow);

  let depth = 1;
  let canDig = true;
  while (canDig) {
    canDig = false;
    const newGrid = [...grid.map((row) => row.slice())];
    for (let i = 1; i < grid.length - 1; i++) {
      for (let j = 1; j < grid[0].length - 1; j++) {
        if (grid[i][j] !== depth) continue;
        if (
          grid[i - 1][j - 1] === depth &&
          grid[i - 1][j] === depth &&
          grid[i - 1][j + 1] === depth &&
          grid[i][j - 1] === depth &&
          grid[i][j + 1] === depth &&
          grid[i + 1][j - 1] === depth &&
          grid[i + 1][j] === depth &&
          grid[i + 1][j + 1] === depth
        ) {
          newGrid[i][j]++;
          canDig = true;
          digs++;
        }
      }
    }
    depth++;
    grid = newGrid;
  }
  console.log(grid);
  return digs;
};

// =============================================================================
// QUEST 4
// =============================================================================

const quest4part1 = (input) => {
  const heights = input.split('\n').map((el) => +el);
  const min = Math.min(...heights);
  let swings = 0;
  for (const h of heights) {
    swings += h - min;
  }
  return swings;
};

const quest4part2 = (input) => {
  return quest4part1(input);
};

const quest4part3 = (input) => {
  const heights = input
    .split('\n')
    .map((el) => +el)
    .sort((a, b) => a - b);

  const median = heights[Math.ceil(heights.length / 2) - 1];
  console.log({ median });

  let swings = 0;
  for (const h of heights) {
    swings += Math.abs(h - median);
  }
  return swings;
};

// =============================================================================
// QUEST 5
// =============================================================================

const quest5part1 = (input) => {
  return 'incomplete';
};

const quest5part2 = (input) => {
  return 'incomplete';
};

const quest5part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 6
// =============================================================================

const quest6part1 = (input) => {
  return 'incomplete';
};

const quest6part2 = (input) => {
  return 'incomplete';
};

const quest6part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 7
// =============================================================================

const quest7part1 = (input) => {
  return 'incomplete';
};

const quest7part2 = (input) => {
  return 'incomplete';
};

const quest7part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 8
// =============================================================================

const quest8part1 = (input) => {
  return 'incomplete';
};

const quest8part2 = (input) => {
  return 'incomplete';
};

const quest8part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 9
// =============================================================================

const quest9part1 = (input) => {
  return 'incomplete';
};

const quest9part2 = (input) => {
  return 'incomplete';
};

const quest9part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 10
// =============================================================================

const quest10part1 = (input) => {
  return 'incomplete';
};

const quest10part2 = (input) => {
  return 'incomplete';
};

const quest10part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 11
// =============================================================================

const quest11part1 = (input) => {
  return 'incomplete';
};

const quest11part2 = (input) => {
  return 'incomplete';
};

const quest11part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 12
// =============================================================================

const quest12part1 = (input) => {
  return 'incomplete';
};

const quest12part2 = (input) => {
  return 'incomplete';
};

const quest12part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 13
// =============================================================================

const quest13part1 = (input) => {
  return 'incomplete';
};

const quest13part2 = (input) => {
  return 'incomplete';
};

const quest13part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 14
// =============================================================================

const quest14part1 = (input) => {
  return 'incomplete';
};

const quest14part2 = (input) => {
  return 'incomplete';
};

const quest14part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 15
// =============================================================================

const quest15part1 = (input) => {
  return 'incomplete';
};

const quest15part2 = (input) => {
  return 'incomplete';
};

const quest15part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 16
// =============================================================================

const quest16part1 = (input) => {
  return 'incomplete';
};

const quest16part2 = (input) => {
  return 'incomplete';
};

const quest16part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 17
// =============================================================================

const quest17part1 = (input) => {
  return 'incomplete';
};

const quest17part2 = (input) => {
  return 'incomplete';
};

const quest17part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 18
// =============================================================================

const quest18part1 = (input) => {
  return 'incomplete';
};

const quest18part2 = (input) => {
  return 'incomplete';
};

const quest18part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 19
// =============================================================================

const quest19part1 = (input) => {
  return 'incomplete';
};

const quest19part2 = (input) => {
  return 'incomplete';
};

const quest19part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 20
// =============================================================================

const quest20part1 = (input) => {
  return 'incomplete';
};

const quest20part2 = (input) => {
  return 'incomplete';
};

const quest20part3 = (input) => {
  return 'incomplete';
};
