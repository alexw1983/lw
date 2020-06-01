import React, { useState } from "react";
import { RandomNumberTable } from "../../shared/random-number-table";
import { Button } from "react-bootstrap";

interface Props {
  complete: boolean;
  gold: number;
  bookNumber: number;
  setGold: (g) => void;
}

const MAX_GOLD = 50;

export const GoldStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);

  const calculateGold = (r: number) => {
    let g = 0;
    switch (+props.bookNumber) {
      case 1:
        g = r;
        break;
      case 2:
        g = props.gold + r + 10;
        break;
    }

    return g > MAX_GOLD ? MAX_GOLD : g;
  };

  return (
    <>
      <h5>Belt Pouch</h5>
      <p>{props.gold}</p>
      {!props.complete && (
        <>
          <Button
            onClick={() => setshowRandomNumberTable(true)}
            className="mb-3"
          >
            Select Gold Amount
          </Button>
          <RandomNumberTable
            show={showRandomNumberTable}
            onSelect={(r) => {
              setshowRandomNumberTable(false);
              props.setGold(calculateGold(r));
            }}
          />
        </>
      )}
    </>
  );
};
