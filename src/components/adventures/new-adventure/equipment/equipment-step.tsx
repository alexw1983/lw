import React, { useState } from "react";
import { ListGroup, ListGroupItem, Row, Col, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { RandomNumberTable } from "../../../shared/random-number-table";
import { IEquipment, IAdventure } from "../../../../redux/types";
import {
  buildPreviousEquipment,
  getTypeName,
  GetEquipmentOptions,
  getRandomSelection,
} from "./equipment.utils";
import EquipmentItems from "./equipment-items";

interface Props {
  bookNumber: number;
  complete: boolean;
  savedEquipment: IEquipment[];
  mostRecentAdventure: IAdventure | undefined;
  saveEquipment: (equipment: IEquipment[]) => void;
  setGold: (gold: number) => void;
}

const equipmentTypes = ["WEAPON", "BACKPACK_ITEM", "SPECIAL_ITEM"];

const MAX_CHOICES = 2;
const MAX_WEAPONS = 2;
const MAX_BACKPACK = 8;
const MAX_SPECIAL_ITEMS = 12;

const EquipmentStep = (props: Props) => {
  const [selection, setSelection] = useState([] as IEquipment[]);
  const [startingEquipment, setPreviousEquipment] = useState(
    buildPreviousEquipment(props.mostRecentAdventure, props.bookNumber)
  );
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);

  const options = GetEquipmentOptions(+props.bookNumber);

  const handleRemovePreviousItem = (option: IEquipment) => {
    setPreviousEquipment((prevState) => [
      ...prevState.filter((x) => x.id !== option.id),
    ]);
  };

  const handleRemoveOption = (option: IEquipment) => {
    setSelection((prevState) => [
      ...prevState.filter((x) => x.id !== option.id),
    ]);
  };

  const getCountByType = (equipmentType: string) => {
    return startingEquipment
      ? selection.filter((x) => x.type === equipmentType).length +
          startingEquipment.filter((x) => x.type === equipmentType).length
      : 0;
  };

  const handleAddOption = (option: IEquipment) => {
    const weaponsCount = getCountByType("WEAPON");
    const backpackItemCount = getCountByType("BACKPACK_ITEM");
    const specialItemCount = getCountByType("SPECIAL_ITEM");

    if (option.type === "WEAPON" && weaponsCount === MAX_WEAPONS) {
      alert(`Can only carry ${MAX_WEAPONS} weapons`);
    } else if (
      option.type === "BACKPACK_ITEM" &&
      backpackItemCount === MAX_BACKPACK
    ) {
      alert(`Can only carry ${MAX_BACKPACK} backpack items`);
    } else if (
      option.type === "SPECIAL_ITEM" &&
      specialItemCount === MAX_SPECIAL_ITEMS
    ) {
      alert(`Can only carry ${MAX_SPECIAL_ITEMS} special items`);
    } else if (selection.length === MAX_CHOICES) {
      alert(`Can only select ${MAX_CHOICES} items`);
    } else {
      setSelection((prevState) => [...prevState, option]);
    }
  };

  const handleSave = () => {
    if (startingEquipment) {
      props.saveEquipment([...startingEquipment, ...selection]);
    } else {
      props.saveEquipment([...selection]);
    }
  };

  const handleRandomSelection = (r: number) => {
    const equipment = getRandomSelection(+props.bookNumber, r);
    if (+props.bookNumber === 1 && r === 9) {
      props.setGold(12);
    }

    props.saveEquipment([...selection, ...startingEquipment, ...equipment]);
    setshowRandomNumberTable(false);
  };

  const renderEquipment = () => {
    return equipmentTypes.map((equipmentType, idx) => (
      <React.Fragment key={`${equipmentType}_${idx}`}>
        <h5 className="mt-3">{getTypeName(equipmentType)}</h5>
        <ListGroup>
          {props.complete && (
            <EquipmentItems
              items={props.savedEquipment}
              equipmentType={equipmentType}
            />
          )}
          {!props.complete && startingEquipment && (
            <EquipmentItems
              items={startingEquipment}
              equipmentType={equipmentType}
              removeFn={(item: IEquipment) => handleRemovePreviousItem(item)}
            />
          )}
          {!props.complete && (
            <EquipmentItems
              items={selection}
              equipmentType={equipmentType}
              removeFn={(item: IEquipment) => handleRemoveOption(item)}
            />
          )}
        </ListGroup>
      </React.Fragment>
    ));
  };

  const renderOptions = () => {
    const filteredOptions = options.filter((x) => !selection.includes(x));
    const random = [1].includes(+props.bookNumber);

    return (
      <>
        {!random && (
          <>
            <h5 className="mt-3">Pick {MAX_CHOICES}</h5>
            <ListGroup>
              {filteredOptions.map((opt) => {
                return (
                  <ListGroupItem className="equipment">
                    {opt.name}
                    {!props.complete && (
                      <Button
                        className="float-right"
                        onClick={() => handleAddOption(opt)}
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

  return (
    <>
      <Row>
        <Col>{renderEquipment()}</Col>
        {!props.complete && <Col>{renderOptions()}</Col>}
      </Row>
      {!props.complete && (
        <Row>
          <Col>
            <Button className="mt-3" onClick={() => handleSave()}>
              Save
            </Button>
          </Col>
        </Row>
      )}
      <hr />
    </>
  );
};

export default EquipmentStep;
