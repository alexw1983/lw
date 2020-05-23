import React from "react";
import { Table, Modal } from "react-bootstrap";
import { getRandomNumbers } from "../../utils/random-number-table.utils";

interface Props {
  show: boolean;
  onSelect: (randomNumber: number) => void;
}

export const RandomNumberTable = (props: Props) => {
  const table = [];

  const shuffled = getRandomNumbers();

  let index = 0;
  for (let i = 0; i < 10; i++) {
    index++;
    const row = [];
    for (let j = 0; j < 10; j++) {
      index++;
      row[j] = shuffled[index];
    }
    table[i] = row;
  }

  const handleOnClick = (r: number) => {
    props.onSelect(r);
  };

  return (
    <Modal show={props.show}>
      <Modal.Body>
        <Table responsive>
          <tbody>
            {table.map((tr, idx) => {
              return (
                <tr key={`random_row_${idx}`}>
                  {tr.map((r, jdx) => {
                    return (
                      <td
                        key={`random_cell_${jdx}`}
                        onClick={() => handleOnClick(r)}
                      >
                        {r}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};
