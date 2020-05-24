import React, { useState } from "react";
import { RandomNumberTable } from "../../shared/random-number-table";
import { Button } from "react-bootstrap";

interface Equipment {
  weapons: string[];
  backpack: string[];
  specialItems: string[];
}

interface Props {
  bookNumber: number;
  equipment: Equipment | undefined;
  setEquipment: (equipment: Equipment) => void;
  setGold: (g: number) => void;
}

export const EquipmentStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);

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

    props.setEquipment(equipment);
    setshowRandomNumberTable(false);
  };

  const renderSelection = () => {
    switch (props.bookNumber) {
      case 1:
        return (
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
        );
    }
  };

  const renderList = () => {
    return (
      <>
        <h5>Weapons</h5>
        {props.equipment.weapons.map((weapon, i) => (
          <p key={`weapon_${i}`}>{weapon}</p>
        ))}
        <h5>Backpack</h5>
        {props.equipment.backpack.map((item, i) => (
          <p key={`backpack_${i}`}>{item}</p>
        ))}
        <h5>Special Items</h5>
        {props.equipment.specialItems.map((item, i) => (
          <p key={`special_item_${i}`}>{item}</p>
        ))}
      </>
    );
  };

  return props.equipment ? renderList() : renderSelection();
};
