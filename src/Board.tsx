import React from "react";
import Square from "./Square";
import styled from "styled-components";

interface IContainerProps {
  size: number;
}

const Container = styled("div")<IContainerProps>`
  border: 5px solid black;
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 5rem);
  grid-template-rows: repeat(${props => props.size}, 5rem);
  font-size: 2.5rem;
`;

interface IBingoTitleProps {
  totalBingo: number;
}

const BingoTitle = styled("div")<IBingoTitleProps>`
  margin: 2rem 0;
  font-size: ${props => props.totalBingo / 2}rem;
  font-weight: 900;
  transition: 0.5s ease-in-out;
`;

interface ISquare {
  content: string;
  check: boolean;
}

interface IProps {
  size: number;
}

interface IState {
  matrix: ISquare[][];
}

const emoji = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🦝",
  "🐻",
  " 🐼",
  "🦘",
  "🦡",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐽",
  "🐸",
  "🐵",
  "🙈",
  "🙉",
  "🙊",
  "🐒",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🐣",
  "🐥",
  "🦆",
  "🦢",
  "🦅",
  "🦉",
  "🦚",
  "🦜",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐚",
  "🐞",
  "🐜",
  "🦗",
  "🦂",
  "🦟",
  "🦠",
  "🐢",
  "🐍",
  "🦎",
  "🦖",
  "🦕",
  "🐙",
  "🦑",
  "🦐",
  "🦀",
  "🐡",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🦈",
  "🐊",
  "🐅",
  "🐆",
  "🦓",
  "🦍",
  "🐘",
  "🦏",
  "🦛",
  "🐪",
  "🐫",
  "🦙",
  "🦒",
  "🐃",
  "🐂",
  "🐄",
  "🐎",
  "🐖",
  "🐏",
  "🐑",
  "🐐",
  "🦌",
  "🐕",
  "🐩",
  "🐈",
  "🐓",
  "🦃",
  "🐇",
  "🐁",
  "🐀",
  "🦔",
  "🐾",
  "🐉",
  "🐲",
  "🌵",
  "🎄",
  "🌲",
  "🌳",
  "🌴",
  "🌱",
  "🌿",
  "🍀",
  "🎍",
  "🎋",
  "🍃",
  "🍂",
  "🍁",
  "🍄",
  "🌾",
  "💐",
  "🌷",
  "🌹",
  "🥀",
  "🌺",
  "🌸",
  "🌼",
  "🌻",
  "🌞",
  "🌝",
  "🌛",
  "🌜",
  "🌚",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌙",
  "🌎",
  "💫",
  "💥",
  "🔥",
  "🌈",
  "☁️",
  "⛄️",
  "💧",
  "💦",
  "🌊",
  "🔩",
  "⚙️",
  "🔫",
  "💣",
  "🔪",
  "⚔️",
  "🚬"
];

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    let matrix = [];
    const { size } = props;
    for (let i = 0; i < size; i++) {
      matrix[i] = new Array(size).fill({ content: "", check: false });
    }
    const shuffledEmoji = this.shuffle(emoji);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix[i].splice(j, 1, {
          content: shuffledEmoji[i * size + j],
          check: false
        });
      }
    }
    this.state = {
      matrix
    };
  }
  shuffle = (a: any) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  handleOnClickSquare = async (row: number, col: number) => {
    const prevMatrix = this.state.matrix;
    prevMatrix[row].splice(col, 1, {
      ...prevMatrix[row][col],
      check: !prevMatrix[row][col].check
    });
    await this.setState({ matrix: prevMatrix });
  };

  checkBingo = () => {
    const { size } = this.props;
    const { matrix } = this.state;
    let totalBingo = 0;
    // row
    for (let i = 0; i < size; i++) {
      if (matrix[i].reduce((bingo, square) => bingo && square.check, true))
        totalBingo++;
    }
    // column
    for (let i = 0; i < size; i++) {
      let bingo = true;
      for (let j = 0; j < size; j++) {
        bingo = bingo && matrix[j][i].check;
      }
      if (bingo) totalBingo++;
    }
    // diagnal
    let diagnalBingoOne = true;
    let diagnalBingoTwo = true;
    for (let i = 0; i < size; i++) {
      diagnalBingoOne = diagnalBingoOne && matrix[i][size - i - 1].check;
      diagnalBingoTwo = diagnalBingoTwo && matrix[i][i].check;
    }
    if (diagnalBingoOne) totalBingo++;
    if (diagnalBingoTwo) totalBingo++;
    return totalBingo;
  };

  render() {
    const { size } = this.props;
    const { matrix } = this.state;
    const totalBingo = this.checkBingo();
    return (
      <>
        <Container size={size}>
          {matrix.map((row: ISquare[], rowIndex: number) =>
            row.map((square: ISquare, colIndex: number) => (
              <Square
                handleOnClickSquare={this.handleOnClickSquare}
                key={rowIndex * size + colIndex}
                content={square.content}
                check={square.check}
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            ))
          )}
        </Container>
        <BingoTitle
          totalBingo={totalBingo}
        >{`${totalBingo} Bingo!`}</BingoTitle>
      </>
    );
  }
}

export default Board;
