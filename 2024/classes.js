class FruitTree {
  constructor({ input, fullNames = false, ignorePests = false }) {
    const neighborsByName = {};
    input.split('\n').forEach((row) => {
      const [name, neighbors] = row.split(':');
      neighborsByName[name] = neighbors.split(',');
    });
    this.fruits = [];

    let dataToParse = [
      new Node({ name: 'RR', pathToNode: ['RR'], neighbors: neighborsByName['RR'] }),
    ];
    while (dataToParse.length) {
      const node = dataToParse.shift();
      if (node.name === '@') {
        this.fruits.push(node);
      } else if (node.name === 'ANT' || node.name === 'BUG') {
        continue;
      }

      for (const n of node.neighbors) {
        dataToParse.push(
          new Node({
            name: n,
            pathToNode: node.pathToNode.concat(n),
            neighbors: neighborsByName[n] ?? [],
          }),
        );
      }
    }

    let pathsByLength = new Map();

    this.fruits.forEach((f) => {
      const len = f.pathLength;
      if (!pathsByLength.get(len)) {
        pathsByLength.set(len, []);
      }
      const path = fullNames ? f.pathString : f.shortPathString;
      pathsByLength.get(len).push(path);
    });

    const uniquePaths = [...pathsByLength.values()].filter((paths) => paths.length === 1);
    if (uniquePaths.length !== 1) {
      throw new Error('Multiple unique paths');
    }
    this.uniquePath = uniquePaths[0][0];
  }
}

class Node {
  constructor({ neighbors, name, pathToNode }) {
    this.name = name;
    this.neighbors = neighbors;
    this.pathToNode = pathToNode;
  }

  get isRoot() {
    return this.name === 'RR';
  }

  get isFruit() {
    return this.name === '@';
  }

  get pathString() {
    return this.pathToNode.join('');
  }

  get shortPathString() {
    return this.pathToNode.map((n) => n[0]).join('');
  }

  get pathLength() {
    return this.pathToNode.length;
  }
}
