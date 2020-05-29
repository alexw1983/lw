import React, { useState } from "react";
import { RandomNumberTable } from "../../shared/random-number-table";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

interface Equipment {
  weapons: string[];
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
  weapons: [],
  backpack: [],
  specialItems: [],
} as Equipment;

export const EquipmentStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);
  const [equipment, setEquipment] = useState(initialState);
  

  const handleBookOneSelect = (r: number) => {
    const equipment = {
      weapons: ["axe"],
      backpack: ["meal"],
      specialItems: ["map-of-summerlund"],
    } as Equipment;

    switch (r) {
      case 0:
        equipment.weapons.push("broadsword");
        break;
      case 1:
        equipment.weapons.push("sword");
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
        equipment.weapons.push("mace");
        break;
      case 6:
        equipment.backpack.push("healing-potion");
        break;
      case 7:
        equipment.weapons.push("quarterstaff");
        break;
      case 8:
        equipment.weapons.push("spear");
        break;
      case 9:
        props.setGold(12);
        break;
    }

    setEquipment(equipment);
    props.setEquipment(equipment);
    setshowRandomNumberTable(false);
  };

  const handleSelectWeapon = (weapon: string) => {
    if (equipment.weapons.length < 2) {
      setEquipment((prevState) => ({
        ...prevState,
        weapons: [...prevState.weapons, weapon],
      }));
    } else {
      alert("Only two weapons allowed, remove one before continuing");
    }
  };

  const renderSelection = () => {
    switch (props.bookNumber) {
      case 1:
        return (
          <>
            {equipment.weapons.length < 1 && (
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
                        onChange={(evt) => handleSelectWeapon(weapon)}
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
      weapons: prevState.weapons.filter((x) => x !== weapon),
    }));
  };

  const renderWeapon = (weapon: string, i: number) => {
    return (
      weapon && (
        <p key={`weapon_${i}`}>
          {`${i + 1} ${weapon}`}
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
        {equipment && equipment.weapons.map((item, i) => renderWeapon(item, i))}
        <hr />
        <h5>Backpack</h5>
        {equipment && equipment.backpack.map((item, i) => (
          <p key={`backpack_${i}`}>{item}</p>
        ))}
        <hr />
        <h5>Special Items</h5>
        {equipment && equipment.specialItems.map((item, i) => (
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
