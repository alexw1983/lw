import React, { useState } from "react";
import { IEquipment } from "../../../../redux/types";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { RandomNumberTable } from "../../../shared/random-number-table";

interface Props {
  complete: boolean;
  maxChoices: number;
  bookNumber: number;
  options: IEquipment[];
  selection: IEquipment[];
  handleAddOption: (item: IEquipment) => void;
  handleRandomSelection: (r: number) => void;
}

const EquipmentOptions = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);

  const filteredOptions = props.options.filter(
    (x) => !props.selection.includes(x)
  );

  const random = [1].includes(+props.bookNumber);

  const handleRandomSelection = (r: number) => {
    setshowRandomNumberTable(false);
    props.handleRandomSelection(r);
  };

  return (
    <>
      {!random && (
        <>
          <h5 className="mt-3">Pick {props.maxChoices}</h5>
          <ListGroup>
            {filteredOptions.map((opt, idx) => {
              return (
                <ListGroupItem
                  className="equipment"
                  key={`equipment_${opt.id}_${idx}`}
                >
                  {opt.name}
                  {!props.complete && (
                    <Button
                      disabled={props.selection.length === props.maxChoices}
                      className="float-right"
                      onClick={() => props.handleAddOption(opt)}
                    >
                      <Plus />
                    </Button>
                  )}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </>
      )}
      {random && (
        <>
          <Button
            onClick={() => setshowRandomNumberTable(true)}
            className="mb-3"
          >
            Pick Equipment
          </Button>
          <RandomNumberTable
            show={showRandomNumberTable}
            onSelect={handleRandomSelection}
          />
        </>
      )}
    </>
  );
};

export default EquipmentOptions;
