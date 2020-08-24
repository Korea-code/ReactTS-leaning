import React, { useCallback, useReducer, useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";

interface TicTacToeState {
  winner: "O" | "X" | "tie" | "";
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
  winner: "O" | "X" | "tie";
}
const resetGame = (winner: "O" | "X" | "tie"): ResetGameAction => {
  return { type: RESET_GAME, winner };
};
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
        winner: action.winner,
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
  useEffect(() => {
    const [row, column] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][column] === turn &&
      tableData[1][column] === turn &&
      tableData[2][column] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      dispatch(setWinner(turn));
      dispatch(resetGame(turn));
    } else {
      let tie = true;
      tableData.forEach((row) => {
        row.forEach((column) => {
          if (!column) {
            tie = false;
          }
        });
      });
      if (tie) {
        dispatch(resetGame("tie"));
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);
  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      {winner &&
        (winner !== "tie" ? (
          <div>Winner is {winner}</div>
        ) : (
          <div>Tie game</div>
        ))}
    </>
  );
};

export default TicTacToe;
