import React from "react";
import styled from "styled-components";

interface IBoxProps {
  check: boolean;
}

const Box = styled("div")<IBoxProps>`
  background-color: ${props => (props.check ? "#aaa" : "white")};
  box-shadow: ${props => (props.check ? "inset 0px 0px 10px #000" : null)};
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.check ? "#aaa" : "#ccc")};
    box-shadow: ${props =>
      props.check ? "inset 0px 0px 10px #000" : "inset 0px 0px 10px #555"};
  }
`;

interface IProps {
  handleOnClickSquare: (row: number, col: number) => void;
  content: string;
  check: boolean;
  rowIndex: number;
  colIndex: number;
}

class Square extends React.Component<IProps, {}> {
  render() {
    const {
      handleOnClickSquare,
      content,
      check,
      rowIndex,
      colIndex
    } = this.props;
    return (
      <Box
        onClick={() => handleOnClickSquare(rowIndex, colIndex)}
        check={check}
      >
        {content}
      </Box>
    );
  }
}
export default Square;
