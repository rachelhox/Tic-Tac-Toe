class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      next: "O",
      gameOver: false };

  }

  componentDidUpdate() {
    if (this.state.gameOver == false) {
      this.winCheck(this.state.squares);
    }
  }

  handleClick(i) {
    if (!this.state.gameOver) {
      let squares = this.state.squares.slice();
      if (squares[i] == null) {
        squares[i] = this.state.next;
        let next = this.state.next == "O" ? "X" : "O";
        this.setState({
          squares: squares,
          next: next,
          gameOver: this.state.gameOver });

      }
    }
  }

  winCheck(gameState) {
    const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];


    let gameOver = winCombos.find(combo => {
      let [a, b, c] = combo;
      return gameState[a] && gameState[a] == gameState[b] && gameState[a] == gameState[c];
    });

    if (gameOver) {
      this.setState({
        squares: this.state.squares,
        next: this.state.next,
        gameOver: true });

    }
  }

  render() {
    return (
      React.createElement("div", { id: "board" },
      React.createElement("div", { id: "status" }, this.state.gameOver ? "Game Over!" : "Tic Tac Toe"),

      React.createElement("div", { class: "board-row" },
      React.createElement(Square, { symbol: this.state.squares[0], onClick: () => this.handleClick(0) }),
      React.createElement(Square, { symbol: this.state.squares[1], onClick: () => this.handleClick(1) }),
      React.createElement(Square, { symbol: this.state.squares[2], onClick: () => this.handleClick(2) })),

      React.createElement("div", { class: "board-row" },
      React.createElement(Square, { symbol: this.state.squares[3], onClick: () => this.handleClick(3) }),
      React.createElement(Square, { symbol: this.state.squares[4], onClick: () => this.handleClick(4) }),
      React.createElement(Square, { symbol: this.state.squares[5], onClick: () => this.handleClick(5) })),

      React.createElement("div", { class: "board-row" },
      React.createElement(Square, { symbol: this.state.squares[6], onClick: () => this.handleClick(6) }),
      React.createElement(Square, { symbol: this.state.squares[7], onClick: () => this.handleClick(7) }),
      React.createElement(Square, { symbol: this.state.squares[8], onClick: () => this.handleClick(8) }))));



  }}


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: this.props.symbol };

  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    return (
      React.createElement("button", { onClick: this.props.onClick }, this.state.symbol));

  }}


ReactDOM.render(React.createElement(Board, null), document.getElementById("app"));