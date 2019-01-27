import React, { Component } from "react";
import Board from "./Board";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
`;

const Header = styled.div`
  margin: 2rem 0 0.5rem;
  font-size: 3rem;
  font-weight: 900;
`;

const InputContainer = styled.div`
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SizeInput = styled.input`
  margin-left: 0.5rem;
  width: 2rem;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding-left: 0.2rem;
`;

const Shuffle = styled.button`
  border: none;
  background-color: white;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-weight: 900;
  padding: 0.2rem 0.55rem;
  margin-bottom: 1rem;
  outline: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  }
`;

const Signiture = styled.div`
  font-weight: 900;
  margin-bottom: 1rem;
`;

interface IState {
  size: number;
  hash: string;
}

class App extends Component<{}, IState> {
  state = {
    size: 5,
    hash: ""
  };

  handleSizeOnChange = (event: any) => {
    this.setState({ size: parseInt(event.target.value) });
  };

  hangdleOnClickShuffle = () => {};
  render() {
    const { size, hash } = this.state;
    return (
      <Container className="App">
        <Header className="App-header">🐶 Emoji Bingo 🐶</Header>
        <Signiture>
          By <span style={{ color: "#0000ff" }}>Paris</span>
          <span style={{ color: "#aaa" }}>Taxi</span>
          <span style={{ color: "#ff0000" }}>Driver</span>
        </Signiture>
        <InputContainer>
          <span>{`SIZE `}</span>
          <SizeInput
            value={size}
            onChange={this.handleSizeOnChange}
            type="number"
            min="1"
            max="12"
          />
        </InputContainer>
        <Shuffle
          onClick={() =>
            this.setState({
              hash: Math.random()
                .toString(36)
                .substring(7)
            })
          }
        >
          ♻️ SHUFFLE ♻️
        </Shuffle>
        <Board key={size + hash} size={size} />
      </Container>
    );
  }
}

export default App;
