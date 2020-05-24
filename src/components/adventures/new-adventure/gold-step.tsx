import React, { useState } from "react";
import { RandomNumberTable } from "../../shared/random-number-table";
import { Button } from "react-bootstrap";

interface Props {
  gold: number | undefined;
  setGold: (g) => void;
}

export const GoldStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);

  return (
    <>
      <h5>Belt Pouch</h5>
      {props.gold && <p>{props.gold}</p>}
      {!props.gold && (
        <Button onClick={() => setshowRandomNumberTable(true)} className="mb-3">
          Select Gold Amount
        </Button>
      )}
      <RandomNumberTable
        show={showRandomNumberTable}
        onSelect={(r) => {
          setshowRandomNumberTable(false);
          props.setGold(r);
        }}
      />
    </>
  );
};
