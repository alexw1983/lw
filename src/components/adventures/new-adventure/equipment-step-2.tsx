import React, { useState } from "react";
import { ListGroup, ListGroupItem, Row, Col, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { RandomNumberTable } from "../../shared/random-number-table";

interface Props {
  bookNumber: number;
  complete: boolean;
  saveEquipment: (equipment: IEquipment[]) => void;
  setGold: (gold: number) => void;
}

interface IEquipment {
  id: string;
  type: "WEAPON" | "SPECIAL_ITEM" | "BACKPACK_ITEM";
  name: string;
  description: string;
}

const weapons = [
  { id: "sword", type: "WEAPON", name: "Sword" } as IEquipment,
  {
    id: "short-sword",
    type: "WEAPON",
    name: "Short Sword",
  } as IEquipment,
  { id: "mace", type: "WEAPON", name: "Mace" } as IEquipment,
  {
    id: "quarterstaff",
    type: "WEAPON",
    name: "Quarterstaff",
  } as IEquipment,
  { id: "spear", type: "WEAPON", name: "Spear" } as IEquipment,
  {
    id: "broadsword",
    type: "WEAPON",
    name: "Broadsword",
  } as IEquipment,
];
const backpack = [
  {
    id: "healing-potion",
    type: "BACKPACK_ITEM",
    name: "Healing Potion",
    description:
      "This restores 4 ENDURANCE POINTS to your total when consumed after combat. Enough for one dose",
  } as IEquipment,
  {
    id: "two-meals",
    type: "BACKPACK_ITEM",
    name: "2 meals",
  } as IEquipment,
];
const specialItems = [
  {
    id: "chainmail-waistcoat",
    type: "SPECIAL_ITEM",
    name: "Chainmail Waistcoat",
    description: "This restores 4 ENDURANCE POINTS to your total",
  } as IEquipment,
  {
    id: "shield",
    type: "SPECIAL_ITEM",
    name: "Shield",
    description: "Adds 2 points to your COMBAT SKILL when used in combat",
  } as IEquipment,
];
const equipmentTypes = ["WEAPON", "BACKPACK_ITEM", "SPECIAL_ITEM"];

const importedEquipment = [
  {
    id: "axe",
    type: "WEAPON",
    name: "Axe",
  },
  {
    id: "meal",
    type: "BACKPACK_ITEM",
    name: "Meal",
  },
  {
    id: "map-of-summerlund",
    type: "SPECIAL_ITEM",
    name: "Map of Summerlund",
  },
] as IEquipment[];

const MAX_CHOICES = 2;
const MAX_WEAPONS = 2;
const MAX_BACKPACK = 8;
const MAX_SPECIAL_ITEMS = 12;

export const EquipmentStepTwo = (props: Props) => {
  const [selection, setSelection] = useState([] as IEquipment[]);
  const [previousEquipment, setPreviousEquipment] = useState(importedEquipment);
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);

  const options = [...weapons, ...backpack, ...specialItems] as IEquipment[];

  const getTypeName = (equipmentType: string) => {
    switch (equipmentType) {
      case "WEAPON":
        return "Weapons";
      case "BACKPACK_ITEM":
        return "Backpack";
      case "SPECIAL_ITEM":
        return "Special Items";
      default:
        return "";
    }
  };

  const renderEquipment = () => {
    return equipmentTypes.map((equipmentType) => (
      <>
        <h5 className="mt-3">{getTypeName(equipmentType)}</h5>
        <ListGroup>
          {previousEquipment
            .filter((x) => x.type === equipmentType)
            .map((prev) => (
              <ListGroupItem>
                {prev.name}
                {!props.complete && (
                  <Button
                    className="float-right"
                    onClick={() => handleRemovePreviousItem(prev)}
                  >
                    <Trash />
                  </Button>
                )}
              </ListGroupItem>
            ))}
          {!props.complete &&
            selection
              .filter((x) => x.type === equipmentType)
              .map((item) => {
                return (
                  <ListGroupItem>
                    {item.name}
                    <Button
                      className="float-right"
                      onClick={() => handleRemoveOption(item)}
                    >
                      <Trash />
                    </Button>
                  </ListGroupItem>
                );
              })}
        </ListGroup>
      </>
    ));
  };

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

  const handleAddOption = (option: IEquipment) => {
    const weaponsCount =
      selection.filter((x) => x.type === "WEAPON").length +
      previousEquipment.filter((x) => x.type === "WEAPON").length;

    const backpackItemCount =
      selection.filter((x) => x.type === "BACKPACK_ITEM").length +
      previousEquipment.filter((x) => x.type === "BACKPACK_ITEM").length;

    const specialItemCount =
      selection.filter((x) => x.type === "SPECIAL_ITEM").length +
      previousEquipment.filter((x) => x.type === "SPECIAL_ITEM").length;

    if (option.type === "WEAPON" && weaponsCount === MAX_WEAPONS) {
      alert(`Can only casrry ${MAX_WEAPONS} weapons`);
    } else if (
      option.type === "BACKPACK_ITEM" &&
      backpackItemCount === MAX_BACKPACK
    ) {
      alert(`Can only casrry ${MAX_BACKPACK} backpack items`);
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
    props.saveEquipment([...previousEquipment, ...selection]);
  };

  const handleRandomSelection = (r: number) => {
    const equipment = [] as IEquipment[];

    switch (r) {
      case 0:
        equipment.push({
          id: "broadsword",
          name: "Broadsword",
          type: "WEAPON",
          description: "",
        });
        break;
      case 1:
        equipment.push({
          id: "sword",
          name: "Sword",
          type: "WEAPON",
          description: "",
        });
        break;
      case 2:
        equipment.push({
          id: "helmet",
          name: "Helmet",
          type: "SPECIAL_ITEM",
          description: "Adds 2 ENDURANCE POINTS to your totsl",
        });
        break;
      case 3:
        equipment.push({
          id: "meal",
          name: "Meal",
          type: "BACKPACK_ITEM",
          description: "",
        });
        equipment.push({
          id: "meal",
          name: "Meal",
          type: "BACKPACK_ITEM",
          description: "",
        });
        break;
      case 4:
        equipment.push({
          id: "chain-mail-waistcoat",
          name: "Cahinmail Waistcoat",
          type: "SPECIAL_ITEM",
          description: "Adds 4 ENDURANCE POINTS to total when worn",
        });
        break;
      case 5:
        equipment.push({
          id: "mace",
          name: "Mace",
          type: "WEAPON",
          description: "",
        });
        break;
      case 6:
        equipment.push({
          id: "healing-potion",
          name: "Healing Potion",
          type: "BACKPACK_ITEM",
          description: "",
        });
        break;
      case 7:
        equipment.push({
          id: "quarterstaff",
          name: "Quarterstaff",
          type: "WEAPON",
          description: "",
        });
        break;
      case 8:
        equipment.push({
          id: "spear",
          name: "Spear",
          type: "WEAPON",
          description: "",
        });
        break;
      case 9:
        props.setGold(12);
        break;
    }

    setPreviousEquipment((prevState) => [...prevState, ...equipment]);
    props.saveEquipment(equipment);
    setshowRandomNumberTable(false);
  };

  const renderOptions = () => {
    const filteredOptions = options.filter((x) => !selection.includes(x));
    const random = [1].includes(props.bookNumber);

    return (
      <>
        {!random && (
          <>
            <h5 className="mt-3">Pick {MAX_CHOICES}</h5>
            <ListGroup>
              {filteredOptions.map((opt) => {
                return (
                  <ListGroupItem
                    className="equipment"
                    onClick={() => handleAddOption(opt)}
                  >
                    {opt.name}
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
