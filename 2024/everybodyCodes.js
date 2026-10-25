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

const quest5part1 = (input, rds = 10) => {
  const columns = [];
  input.split('\n').forEach((row) => {
    row.split(' ').forEach((num, i) => {
      columns[i] ??= [];
      columns[i].push(+num);
    });
  });

  let c = 0;
  let shout = 'not set';
  for (let rd = 1; rd <= rds; rd++) {
    const clapper = columns[c].shift();
    c++;
    c %= 4;

    shout = clapRound(clapper, columns, c);
    console.log(`Rd ${rd}: ${shout}`);
  }
  return shout;
};

const clapRound = (clapper, columns, c) => {
  const col = columns[c];
  const newLoc = (clapper - 1) % (col.length * 2);
  const idx = newLoc <= col.length ? newLoc : col.length * 2 - newLoc;
  col.splice(idx, 0, clapper);

  const shout = columns.map((c) => c[0]).join('');
  return shout;
};

const quest5part2 = (input) => {
  const columns = [];
  input.split('\n').forEach((row) => {
    row.split(' ').forEach((num, i) => {
      columns[i] ??= [];
      columns[i].push(+num);
    });
  });

  let c = 0;
  let rd = 0;
  let shout = 'not set';
  const shouted = {};
  while (true) {
    const clapper = columns[c].shift();
    rd++;
    c++;
    c %= 4;

    shout = clapRound(clapper, columns, c);
    shouted[shout] ??= 0;
    shouted[shout]++;
    if (shouted[shout] === 2024) {
      console.log({ rd, shout });
      return rd * shout;
    }
  }
  return 'not found';
};

const quest5part3 = (input) => brentsAlg(input);

/**
 * Solves q5p3 using Brent's algorithm for cycle detection.
 * Uses two pointers, one stationary and one that moves.
 * After each move, we check if the mover matches the stationary.
 * We do this for the current "window size", then move the stationary
 * pointer up to match the mover. The window size increases by a power
 * of two each time, so it goes from 1,2,4,8,16...
 *
 * Faster than Floyd's algorithm as long as computing steps is more difficult
 * than checking if the two items match. We only have to compute each step once,
 * however we do check for matches more frequently. We also are likely to find
 * the cycle a whole cycle earlier than Floyd's.
 */
const brentsAlg = (input) => {
  const columns = [];
  input.split('\n').forEach((row) => {
    row.split(' ').forEach((num, i) => {
      columns[i] ??= [];
      columns[i].push(+num);
    });
  });

  let c = 0;
  let rd = 0;
  let power = 0;
  let cycle = false;
  let maxShout = '0';
  let tortoiseShout = '';

  while (!cycle) {
    let shout = '';
    const tortoise = JSON.stringify(columns);
    for (let i = 0; i < 2 ** power; i++) {
      rd++;

      const clapper = columns[c].shift();
      c++;
      c %= 4;

      shout = clapRound(clapper, columns, c);

      if (shout.localeCompare(maxShout, undefined, { numeric: true }) > 0) {
        maxShout = shout;
        console.log(`New max: ${shout}. Rd: ${rd}`);
      }

      // stringifying the columns takes CPU, so only check
      // the whole grid if the shouts match
      // Without the outer conditional, Floyd's was faster despite
      // Brent's finding the cycle earlier
      if (shout === tortoiseShout) {
        if (JSON.stringify(columns) === tortoise) {
          console.log(`Found the cycle at rd ${rd}`);
          cycle = true;
          break;
        }
      }
    }
    power++;
    tortoiseShout = shout;
  }

  return maxShout;
};

/**
 * Solves q5p3 using Floyd's tortoise and hare algorithm
 * to detect the cycle. This method has a tortoise go one step
 * and a hare go two steps on each iteration. When they're both
 * on the same spot (have identical grids), the hare has lapped
 * the tortoise, completing a cycle.
 *
 * Slower than Brent's if calculating a step is costly, since we have to
 * calculate both the tortoise and the hare's movements, duplicating step computations
 */
const floydsAlg = (input) => {
  const columns = [];
  input.split('\n').forEach((row) => {
    row.split(' ').forEach((num, i) => {
      columns[i] ??= [];
      columns[i].push(+num);
    });
  });

  let rd = 0;
  let maxShout = '0';
  let tortoise = {
    columns: [...columns.map((col) => [...col])],
    c: 0,
  };
  let hare = {
    columns: [...columns.map((col) => [...col])],
    c: 0,
  };

  while (true) {
    rd++;

    const tortoiseClapper = tortoise.columns[tortoise.c].shift();
    tortoise.c++;
    tortoise.c %= 4;

    clapRound(tortoiseClapper, tortoise.columns, tortoise.c);

    let hareClapper = hare.columns[hare.c].shift();
    hare.c++;
    hare.c %= 4;

    let hareShout = clapRound(hareClapper, hare.columns, hare.c);

    if (hareShout.localeCompare(maxShout, undefined, { numeric: true }) > 0) {
      maxShout = hareShout;
      console.log(`New max: ${maxShout}. Rd: ${rd}`);
    }

    hareClapper = hare.columns[hare.c].shift();
    hare.c++;
    hare.c %= 4;

    hareShout = clapRound(hareClapper, hare.columns, hare.c);

    if (hareShout.localeCompare(maxShout, undefined, { numeric: true }) > 0) {
      maxShout = hareShout;
      console.log(`New max: ${maxShout}. Rd: ${rd}`);
    }

    if (JSON.stringify(hare.columns) === JSON.stringify(tortoise.columns)) {
      console.log(`Found the cycle at rd ${rd}`);
      break;
    }

    if (rd % 10000 === 0) {
      console.log(rd);
    }
  }
  return maxShout;
};

// =============================================================================
// QUEST 6
// =============================================================================

const quest6part1 = (input) => {
  const fruitTree = new FruitTree({ input, fullNames: true });
  return fruitTree.uniquePath;
};

const quest6part2 = (input) => {
  const fruitTree = new FruitTree({ input });
  return fruitTree.uniquePath;
};

const quest6part3 = (input) => {
  const fruitTree = new FruitTree({ input, ignorePests: true });
  return fruitTree.uniquePath;
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
