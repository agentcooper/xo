class Board {
  constructor(n) {
    this.rows =
      Array.from({ length: n })
        .map(row => Array.from({ length: n }));
  }

  getSize() {
    return this.rows.length;
  }

  set(x, y, value) {
    this.rows[x][y] = value;
  }

  get(x, y) {
    return this.rows[x][y];
  }

  toString() {
    return this.rows.map(row => row.join(' ')).join('\n');
  }

  getRows() {
    return this.rows;
  }

  getColumns() {
    const columns = [];

    for (let i = 0; i < this.rows.length; i++) {
      const column = [];

      for (let j = 0; j < this.rows.length; j++) {
        column.push(this.rows[j][i]);
      }

      columns.push(column);
    }

    return columns;
  }

  getDiagonals() {
    const mainDiagonal = [];
    for (let i = 0; i < this.rows.length; i++) {
      mainDiagonal.push(this.rows[i][i]);
    }

    const backDiagonal = [];
    for (let i = 0; i < this.rows.length; i++) {
      backDiagonal.push(this.rows[i][this.rows.length - i - 1]);
    }

    return [ mainDiagonal, backDiagonal ];
  }
}

export default Board;
