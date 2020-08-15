import * as React from "react";
import styled from "styled-components";
import { FunctionComponent } from "react";

const Container = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.color!};
  text-align: center;
  line-height: 30px;
`;
const Ball: FunctionComponent<{ number: number }> = ({ number }) => {
  let backgroundColor: string;
  if (number < 0) throw Error("lottery number cannot be less then 0");
  if (number >= 0 && number < 10) backgroundColor = "red";
  else if (number < 20) backgroundColor = "orange";
  else if (number < 30) backgroundColor = "yellow";
  else if (number < 40) backgroundColor = "green";
  else backgroundColor = "blue";
  return <Container color={backgroundColor}>{number}</Container>;
};
export default Ball;
