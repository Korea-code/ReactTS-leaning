import React, { Dispatch, useCallback, FunctionComponent } from "react";
import styled from "styled-components";
import { CLICK_CELL } from "./TicTacToe";

interface Props {
  dispatch: Dispatch<any>;
  rowIndex: number;
  columnIndex: number;
  cellData: string;
  children: string;
}
const TableColumn: FunctionComponent<Props> = ({
  dispatch,
  rowIndex,
  columnIndex,
  cellData,
  children,
}) => {
  const onClickTd = useCallback(() => {
    if (cellData) return;
    dispatch({ type: CLICK_CELL, row: rowIndex, column: columnIndex });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default TableColumn;
