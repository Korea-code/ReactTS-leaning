import React, { Dispatch, FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import TableColumn from "./TableColumn";

interface Props {
  dispatch: Dispatch<any>;
  rowIndex: number;
  rowData: string[];
}
const TableRow: FunctionComponent<Props> = ({
  dispatch,
  rowIndex,
  rowData,
}) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill(null)
        .map((td, idx) => {
          return useMemo(
            () => (
              <TableColumn
                key={idx}
                dispatch={dispatch}
                rowIndex={rowIndex}
                columnIndex={idx}
                cellData={rowData[idx]}
              >
                {""}
              </TableColumn>
            ),
            [rowData[idx]],
          );
        })}
    </tr>
  );
};

export default TableRow;
