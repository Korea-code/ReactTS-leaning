import React, { useMemo, FunctionComponent, Dispatch } from "react";
import styled from "styled-components";
import TableRow from "./TableRow";

interface Props {
  tableData: string[][];
  dispatch: Dispatch<any>;
  onClick: () => void;
}
const Table: FunctionComponent<Props> = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length)
        .fill(null)
        .map((tr, idx) => {
          useMemo(
            () => (
              <TableRow
                key={idx}
                dispatch={dispatch}
                rowIndex={idx}
                rowData={tableData[idx]}
              />
            ),
            [tableData[idx]],
          );
        })}
    </table>
  );
};

export default Table;
