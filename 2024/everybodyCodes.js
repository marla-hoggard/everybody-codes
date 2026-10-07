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
  return 'incomplete';
};

const quest2part2 = (input) => {
  return 'incomplete';
};

const quest2part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 3
// =============================================================================

const quest3part1 = (input) => {
  return 'incomplete';
};

const quest3part2 = (input) => {
  return 'incomplete';
};

const quest3part3 = (input) => {
  return 'incomplete';
};

// =============================================================================
// QUEST 4
// =============================================================================

const quest4part1 = (input) => {
  return 'incomplete';
};

const quest4part2 = (input) => {
  return 'incomplete';
};

const quest4part3 = (input) => {
  return 'incomplete';
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
