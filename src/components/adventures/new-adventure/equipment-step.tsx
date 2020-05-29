import React, { useState } from "react";
import { RandomNumberTable } from "../../shared/random-number-table";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

interface Equipment {
  weapons: {
    first: string;
    second: string;
  };
  backpack: string[];
  specialItems: string[];
}

interface Props {
  importPrevious: boolean;
  importedEquipment: Equipment;
  bookNumber: number;
  equipment: Equipment | undefined;
  setEquipment: (equipment: Equipment) => void;
  setGold: (g: number) => void;
}

const initialState = {
  weapons: {
    first: undefined,
    second: undefined,
  },
  backpack: [],
  specialItems: [],
} as Equipment;

export const EquipmentStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);
  const [equipment, setEquipment] = useState(
    props.importedEquipment ? props.importedEquipment : initialState
  );

  const handleBookOneSelect = (r: number) => {
    const equipment = {
      weapons: {
        first: "axe",
        second: "",
      },
      backpack: ["meal"],
      specialItems: ["map-of-summerlund"],
    } as Equipment;

    switch (r) {
      case 0:
        equipment.weapons.second = "broadsword";
        break;
      case 1:
        equipment.weapons.second = "sword";
        break;
      case 2:
        equipment.specialItems.push("helmet");
        break;
      case 3:
        equipment.backpack.push("meal");
        equipment.backpack.push("meal");
        break;
      case 4:
        equipment.specialItems.push("chain-mail-waistcoat");
        break;
      case 5:
        equipment.weapons.second = "mace";
        break;
      case 6:
        equipment.backpack.push("healing-potion");
        break;
      case 7:
        equipment.weapons.second = "quarterstaff";
        break;
      case 8:
        equipment.weapons.second = "spear";
        break;
      case 9:
        props.setGold(12);
        break;
    }

    setEquipment(equipment);
    props.setEquipment(equipment);
    setshowRandomNumberTable(false);
  };

  const handleSelectWeapon = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const weapon = evt.target.value;



    setEquipment(prevState=> ({
      ...prevState,
      weapons: {
        first: !!prevState.weapons.first ?  prevState.weapons.first : weapon,
        second: !!prevState.weapons.second ?  prevState.weapons.second : weapon
      }
    }))
  };

  const renderSelection = () => {
    switch (props.bookNumber) {
      case 1:
        return (
          <>
            {equipment.weapons.first === undefined && (
              <>
                <Button
                  onClick={() => setshowRandomNumberTable(true)}
                  className="mb-3"
                >
                  Pick Equipment
                </Button>
                <RandomNumberTable
                  show={showRandomNumberTable}
                  onSelect={handleBookOneSelect}
                />
              </>
            )}
          </>
        );
      case 2:
        const weapons = [
          "sword",
          "short-sword",
          "mace",
          "quarterstaff",
          "spear",
          "broadsword",
        ];
        const backpack = ["2 meals", "healing-potion"];
        const specialItems = ["chainmail-waistcoat", "shield"];
        return (
          <Row>
            <Col>
              <h5>Pick Two</h5>
              <Form>
                <Row>
                  {weapons.map((weapon, idx) => (
                    <Col xs={6} md={2} key={`weapons_list_${idx}`}>
                      <Form.Check
                        key={`weapon-${idx}`}
                        id={`weapon-${idx}`}
                        type="checkbox"
                        label={weapon}
                        name="equipment"
                        disabled={
                          !!equipment.weapons.first &&
                          !!equipment.weapons.second
                        }
                        onChange={handleSelectWeapon}
                      />
                    </Col>
                  ))}
                  {backpack.map((back, idx) => (
                    <Col xs={6} md={2} key={`backpack_list_${idx}`}>
                      <Form.Check
                        key={`backpack-${idx}`}
                        id={`backpack-${idx}`}
                        type="checkbox"
                        label={back}
                        name="equipment"
                      />
                    </Col>
                  ))}
                  {specialItems.map((item, idx) => (
                    <Col xs={6} md={2} key={`specialItems_list_${idx}`}>
                      <Form.Check
                        key={`specialItems-${idx}`}
                        id={`specialItems-${idx}`}
                        type="checkbox"
                        label={item}
                        name="equipment"
                      />
                    </Col>
                  ))}
                </Row>
              </Form>
            </Col>
          </Row>
        );
      default:
        return <></>;
    }
  };

  const removeWeapon = (weapon: string) => {
    setEquipment((prevState) => ({
      ...prevState,
      weapons: {
        first:
          prevState.weapons.first === weapon
            ? undefined
            : prevState.weapons.first,
        second:
          prevState.weapons.second === weapon
            ? undefined
            : prevState.weapons.second,
      },
    }));
  };

  const renderWeapon = (weapon: string) => {
    return (
      weapon && (
        <p>
          1 - {`${weapon}`}
          {props.bookNumber > 1 && (
            <Button
              className="icon-button"
              variant="link"
              onClick={(evt) => removeWeapon(weapon)}
            >
              <Trash />
            </Button>
          )}
        </p>
      )
    );
  };

  const renderList = () => {
    return (
      <>
        <h5>Weapons</h5>
        {renderWeapon(equipment.weapons.first)}
        {renderWeapon(equipment.weapons.second)}
        <hr />
        <h5>Backpack</h5>
        {equipment.backpack.map((item, i) => (
          <p key={`backpack_${i}`}>{item}</p>
        ))}
        <hr />
        <h5>Special Items</h5>
        {equipment.specialItems.map((item, i) => (
          <p key={`special_item_${i}`}>{item}</p>
        ))}
        <hr />
      </>
    );
  };

  return (
    <>
      {renderList()}
      {renderSelection()}
    </>
  );
};
