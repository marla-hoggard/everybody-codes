// =============================================================================
// QUEST 1
// =============================================================================

const quest1part1 = (input) => {
  let needs = 0;
  input.split(',').map((el) => {
    const val = Number(el);
    let nextSquare = 1;
    const squared = nextSquare * nextSquare;
    while (val > squared) {
      nextSquare++;
    }
    needs += squared - val;
  });
  return needs;
};

const quest1part2 = (input) => {
  let needs = 0;
  input.split(',').map((el) => {
    const val = Number(el);
    let nextSquare = 3;
    let frame = nextSquare * nextSquare - (nextSquare - 2) * (nextSquare - 2);
    while (val > frame) {
      nextSquare++;
      frame = nextSquare * nextSquare - (nextSquare - 2) * (nextSquare - 2);
    }
    needs += frame - val;
  });
  return needs;
};

const quest1part3 = (input) => {
  let needs = 0;
  input.split(',').map((el) => {
    const val = Number(el);
    let nextSquare = 3;
    let frame = nextSquare * nextSquare - 1;
    while (val > frame) {
      nextSquare += 2;
      frame = nextSquare * nextSquare - 1;
    }
    // console.log({ val, nextSquare, needs: frame - val });
    needs += frame - val;
  });
  return needs;
};

// =============================================================================
// QUEST 2
// =============================================================================

const quest2part1 = (input) => {
  const lines = input.split('\n');
  let checkSum = 0;
  lines.forEach((line) => {
    const nums = Object.entries(parseQuest2Line(line)).map(
      ([num, { comesBefore, comesAfter }]) => ({
        num,
        comesAfter,
      }),
    );

    let ordered = [];

    while (nums.length) {
      const nextIndex = nums.findIndex((el) => el.comesAfter.every((num) => ordered.includes(num)));
      if (nextIndex === -1) {
        throw new Error("No one's next");
      }
      const next = nums[nextIndex];
      ordered.push(next.num);
      nums.splice(nextIndex, 1);
    }
    const order = ordered.join('');
    checkSum += +order;
  });
  return checkSum;
};

const quest2part2 = (input) => {
  return quest2part1(input);
};

const quest2part3 = (input) => {
  return quest2part1(input);
};

const parseQuest2Line = (line) => {
  const nums = {};
  const comps = line.split(' ').forEach((pair) => {
    const [a, b] = pair.split(/[<>]/);
    nums[a] ??= { comesBefore: [], comesAfter: [] };
    nums[b] ??= { comesBefore: [], comesAfter: [] };

    if (pair.includes('<')) {
      nums[a].comesAfter.push(b);
      nums[b].comesBefore.push(a);
    } else {
      nums[a].comesBefore.push(b);
      nums[b].comesAfter.push(a);
    }
  });
  return nums;
};

// Works for parts 1-2 but not 3
const quest2part1Alternate = (input) => {
  const lines = input.split('\n');
  let checkSum = 0;
  lines.forEach((line) => {
    const nums = parseQuest2Line(line);
    const order = Object.keys(nums)
      .sort((a, b) => {
        if (nums[a].comesBefore.includes(b)) {
          return -1;
        } else if (nums[a].comesAfter.includes(b)) {
          return 1;
          // }  else if (nums[b].comesBefore.includes(a)) {
          //   return 1;
          // } else if (nums[b].comesAfter.includes(a)) {
          //   return -1;
        } else {
          // for (const afterA of nums[a].comesBefore) {
          //   if (nums[b].comesAfter.includes(afterA)) {
          //     nums[a].comesBefore.push(b);
          //     nums[b].comesAfter.push(a);
          //     return -1;
          //   }
          // }
          // for (const beforeA of nums[a].comesAfter) {
          //   if (nums[b].comesBefore.includes(beforeA)) {
          //     nums[a].comesAfter.push(b);
          //     nums[b].comesBefore.push(a);
          //     return 1;
          //   }
          // }
          // for (const afterB of nums[b].comesBefore) {
          //   if (nums[a].comesAfter.includes(afterB)) {
          //     nums[a].comesAfter.push(b);
          //     nums[b].comesBefore.push(a);
          //     return 1;
          //   }
          // }
          // for (const beforeB of nums[b].comesAfter) {
          //   if (nums[a].comesBefore.includes(beforeB)) {
          //     nums[a].comesBefore.push(b);
          //     nums[b].comesAfter.push(a);
          //     return -1;
          //   }
          // }
          throw new Error(`Still none? ${a},${b}`);
        }
      })
      .join('');
    checkSum += +order;
  });
  return checkSum;
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
