import React, { useCallback, useReducerti, useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";

interface TicTacToeState {
  winner: "O" | "X" | "";
  turn: "O" | "X";
  tableData: string[][];
  recentCell: [number, number];
}
const initialState: TicTacToeState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER" as const;
export const CLICK_CELL = "CLICK_CELL" as const;
export const CHANGE_TURN = "CHANGE_TURN" as const;
export const RESET_GAME = "RESET_GAME" as const;

interface SetWinnerAction {
  type: typeof SET_WINNER;
  winner: "O" | "X";
}
const setWinner = (winner: "O" | "X"): SetWinnerAction => {
  return { type: SET_WINNER, winner };
};
interface ClickCellAction {
  type: typeof CLICK_CELL;
  row: number;
  column: number;
}
const clickCell = (row: number, column: number): ClickCellAction => {
  return { type: CLICK_CELL, row, column };
};
interface ChangeTurnAction {
  type: typeof CHANGE_TURN;
}
interface ResetGameAction {
  type: typeof RESET_GAME;
}
type ReducerActions =
  | SetWinnerAction
  | ClickCellAction
  | ChangeTurnAction
  | ResetGameAction;
const reducer = (
  state: TicTacToeState,
  action: ReducerActions,
): TicTacToeState => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.column] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.column],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case RESET_GAME:
      return {
        winner: "",
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, turn, tableData, recentCell } = state;

  const onClickTable = () => {
    console.log("a");
  };
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>winner is {winner}</div>}
    </>
  );
};

export default TicTacToe;
