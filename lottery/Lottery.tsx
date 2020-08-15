import * as React from "react";
import {
  useState,
  useRef,
  useMemo,
  FunctionComponent,
  useEffect,
  useCallback,
} from "react";
import styled from "styled-components";
import Ball from "./Ball";

// constants
const RANGE_OF_NUMBER: number = 45;
const NUMBER_OF_BALLS: number = 7;

//components
const Container = styled.div`
  height: 600px;
`;
const Button = styled.button`
  display: block;
  width: 200px;
  height: 40px;
  border-radius: 5px;
`;

//functions
const getNumbers: () => number[] = () => {
  const candidates = Array(RANGE_OF_NUMBER)
    .fill(null)
    .map((e, i) => i + 1);
  const selectedNumbers: number[] = [];

  for (let i = 0; i < NUMBER_OF_BALLS; i++)
    selectedNumbers.push(
      candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0],
    );
  const bonusNumber: number = selectedNumbers.splice(NUMBER_OF_BALLS - 1, 1)[0];
  return [...selectedNumbers.sort((a, b) => a - b), bonusNumber];
};

const Lottery: FunctionComponent<{}> = () => {
  const selectedNumbers: number[] = useMemo(() => getNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(selectedNumbers);
  const [showingNumbers, setShowingNumbers] = useState<number[]>([]);
  const [redo, setRedo] = useState(false);
  const intervalId = useRef<number[]>([]);

  useEffect(() => {
    for (let i = 0; i < NUMBER_OF_BALLS; i++) {
      intervalId.current[i] = window.setTimeout(() => {
        setShowingNumbers((prevBalls) => [...prevBalls, winNumbers[i]]);
        if (i === NUMBER_OF_BALLS - 1) setRedo(true);
      }, 800 + 800 * i);
    }

    return () => intervalId.current.forEach((id) => clearTimeout(id));
  }, [intervalId.current]);

  const reSelectNumbers = useCallback(() => {
    setWinNumbers(getNumbers());
    setShowingNumbers([]);
    setRedo(false);
    intervalId.current.forEach((id) => clearTimeout(id));
    intervalId.current = [];
  }, [redo]);

  return (
    <Container>
      {showingNumbers &&
        showingNumbers.map((number) => {
          return <Ball key={number} number={number} />;
        })}
      {redo && <Button onClick={reSelectNumbers}>Select New Numbers</Button>}
    </Container>
  );
};

export default Lottery;
