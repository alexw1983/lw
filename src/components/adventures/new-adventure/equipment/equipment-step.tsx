import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IEquipment, IAdventure } from "../../../../redux/types";
import {
  buildPreviousEquipment,
  GetEquipmentOptions,
  getRandomSelection,
} from "./equipment.utils";
import EquipmentOptions from "./equipment-options";
import EquipmentList from "./equipment-list";

interface Props {
  bookNumber: number;
  complete: boolean;
  savedEquipment: IEquipment[];
  mostRecentAdventure: IAdventure | undefined;
  saveEquipment: (equipment: IEquipment[]) => void;
  setGold: (gold: number) => void;
}

const MAX_CHOICES = 2;
const MAX_WEAPONS = 2;
const MAX_BACKPACK = 8;
const MAX_SPECIAL_ITEMS = 12;

const EquipmentStep = (props: Props) => {
  const [selection, setSelection] = useState([] as IEquipment[]);
  const [startingEquipment, setStartingEquipment] = useState(
    [] as IEquipment[]
  );

  useEffect(() => {
    setStartingEquipment(
      buildPreviousEquipment(props.mostRecentAdventure, props.bookNumber)
    );
  }, [props.mostRecentAdventure]);

  const options = GetEquipmentOptions(+props.bookNumber);

  const handleRemovePreviousItem = (option: IEquipment) => {
    setStartingEquipment((prevState) => [
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
      setSelection((prevState) => {
        return [...prevState, option];
      });
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
  };

  return (
    <>
      <Row>
        {!props.complete && (
          <Col>
            <EquipmentOptions
              options={options}
              selection={selection}
              bookNumber={props.bookNumber}
              complete={props.complete}
              maxChoices={MAX_CHOICES}
              handleAddOption={handleAddOption}
              handleRandomSelection={handleRandomSelection}
            />
          </Col>
        )}
        <Col>
          <EquipmentList
            equipmentTypes={["WEAPON", "BACKPACK_ITEM", "SPECIAL_ITEM"]}
            handleRemovePreviousItem={handleRemovePreviousItem}
            handleRemoveOption={handleRemoveOption}
            complete={props.complete}
            startingEquipment={startingEquipment}
            selection={selection}
            savedEquipment={props.savedEquipment}
          />
        </Col>
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
