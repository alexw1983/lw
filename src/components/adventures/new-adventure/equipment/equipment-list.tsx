import React from "react";
import { getTypeName } from "./equipment.utils";
import { ListGroup } from "react-bootstrap";
import EquipmentItems from "./equipment-items";
import { IEquipment } from "../../../../redux/types";

interface Props {
  complete: boolean;
  equipmentTypes: string[];
  savedEquipment: IEquipment[];
  startingEquipment: IEquipment[];
  selection: IEquipment[];
  handleRemovePreviousItem: (item: IEquipment) => void;
  handleRemoveOption: (item: IEquipment) => void;
}

const EquipmentList = (props: Props) => {
  return (
    <>
      {props.equipmentTypes.map((equipmentType, idx) => (
        <React.Fragment key={`${equipmentType}_${idx}`}>
          <h5 className="mt-3">{getTypeName(equipmentType)}</h5>
          <ListGroup>
            {props.complete && (
              <EquipmentItems
                items={props.savedEquipment}
                equipmentType={equipmentType}
              />
            )}
            {!props.complete && props.startingEquipment && (
              <EquipmentItems
                items={props.startingEquipment}
                equipmentType={equipmentType}
                removeFn={(item: IEquipment) =>
                  props.handleRemovePreviousItem(item)
                }
              />
            )}
            {!props.complete && (
              <EquipmentItems
                items={props.selection}
                equipmentType={equipmentType}
                removeFn={(item: IEquipment) => props.handleRemoveOption(item)}
              />
            )}
          </ListGroup>
        </React.Fragment>
      ))}
    </>
  );
};

export default EquipmentList;
