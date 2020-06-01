import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button, Row, Col } from "react-bootstrap";
import { Plus, Trash } from "react-bootstrap-icons";
import { IDiscipline, IAdventure } from "../../../../redux/types";
import {
  getTypeName,
  getOptions,
  buildPreviousDisciplines,
  getRandomWeapon,
} from "./disciplines.utils";
import { RandomNumberTable } from "../../../shared/random-number-table";

interface Props {
  complete: boolean;
  bookNumber: number;
  mostRecentAdventure: IAdventure | undefined;
  savedDisciplines?: IDiscipline[] | undefined;
  weaponSkill?: string | undefined;
  saveDisciplines: (disciplines: IDiscipline[]) => void;
  saveWeaponSkill: (weaponSkill: string) => void;
}

const DisciplinesStep = (props: Props) => {
  const [showRandom, setShowRandom] = useState(false);
  const [selection, setSelection] = useState([] as IDiscipline[]);
  const [startingDisciplines, setStartingDisciplines] = useState(
    [] as IDiscipline[]
  );

  useEffect(() => {
    setStartingDisciplines(buildPreviousDisciplines(props.mostRecentAdventure));
  }, [props.mostRecentAdventure]);

  const handleSelectDiscipline = (discipline: IDiscipline) => {
    setSelection((prevState) => [...prevState, discipline]);
  };

  const handleRemoveDiscipline = (discipline: IDiscipline) => {
    setSelection((prevState) =>
      prevState.filter((x) => x.id !== discipline.id)
    );
  };

  const handleSave = () => {
    props.saveDisciplines([...selection, ...startingDisciplines]);
  };

  const getNumberOfChoices = () => {
    if (props.mostRecentAdventure) {
      return 1;
    }

    return 5;
  };

  const shouldButtonBeDisabled = () => {
    return selection.length === getNumberOfChoices();
  };

  const renderOptions = () => {
    const filteredDisciplines = getOptions(props.bookNumber, [
      ...selection,
      ...startingDisciplines,
    ]);

    return (
      <>
        <h5 className="mt-3">Pick {getNumberOfChoices()}</h5>
        <ListGroup>
          {filteredDisciplines.map((discipline, idx) => (
            <ListGroupItem key={`discipline_option_${idx}`}>
              {discipline.name}
              <Button
                className="float-right"
                disabled={shouldButtonBeDisabled()}
                onClick={() => handleSelectDiscipline(discipline)}
              >
                <Plus />
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  };

  const renderName = (discipline: IDiscipline) => {
    const weaponsSkill =
      props.mostRecentAdventure &&
      props.mostRecentAdventure.actionChart &&
      props.mostRecentAdventure.actionChart.weaponSkill
        ? props.mostRecentAdventure.actionChart.weaponSkill
        : props.weaponSkill;

    return `${discipline.name} ${
      discipline.id === "weapon-skill" && weaponsSkill
        ? "(" + weaponsSkill + ")"
        : ""
    }`;
  };

  const renderSelection = () => {
    const disciplineTypes = ["KAI", "MAGNAKAI", "GRAND_MASTER"];

    return (
      <>
        {disciplineTypes.map((disciplineType, idx) => (
          <React.Fragment key={`discipline_type_h5_${disciplineType}_${idx}`}>
            <h5 className="mt-3">{getTypeName(disciplineType)} Disciplines</h5>
            <ListGroup>
              {props.complete &&
                props.savedDisciplines &&
                props.savedDisciplines
                  .filter((x) => x.type === disciplineType)
                  .map((discipline, idx) => (
                    <ListGroupItem
                      key={`discipline_saved_${disciplineType}_${idx}`}
                    >
                      {renderName(discipline)}
                    </ListGroupItem>
                  ))}

              {!props.complete &&
                startingDisciplines &&
                startingDisciplines
                  .filter((x) => x.type === disciplineType)
                  .map((discipline, idx) => (
                    <ListGroupItem
                      key={`discipline_starting_${disciplineType}_${idx}`}
                    >
                      {renderName(discipline)}
                    </ListGroupItem>
                  ))}

              {!props.complete &&
                selection
                  .filter((x) => x.type === disciplineType)
                  .map((discipline, idx) => (
                    <ListGroupItem
                      key={`discipline_selected_${disciplineType}_${idx}`}
                    >
                      {renderName(discipline)}
                      <Button
                        className="float-right"
                        onClick={() => handleRemoveDiscipline(discipline)}
                      >
                        <Trash />
                      </Button>
                    </ListGroupItem>
                  ))}
            </ListGroup>
          </React.Fragment>
        ))}
      </>
    );
  };

  const isSaveButtonDisabled = () => {
    return (
      selection.length < getNumberOfChoices() ||
      (selection.find((x) => x.id === "weapon-skill") && !props.weaponSkill)
    );
  };

  const showWeaponSkillChoice = () => {
    return (
      selection.find((x) => x.id === "weapon-skill") &&
      props.weaponSkill === undefined
    );
  };

  const handleSelectWeaponSkill = (r: number) => {
    props.saveWeaponSkill(getRandomWeapon(r));
    setShowRandom(false);
  };

  const renderSelectWeaponSkill = () => {
    return (
      <Row className="mt-3">
        <Col>
          <Button onClick={() => setShowRandom(true)}>Pick Weapon</Button>
          <RandomNumberTable
            show={showRandom}
            onSelect={(r) => handleSelectWeaponSkill(r)}
          />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Row>
        {!props.complete && <Col>{renderOptions()}</Col>}
        <Col>{renderSelection()}</Col>
      </Row>
      {showWeaponSkillChoice() && renderSelectWeaponSkill()}
      {!props.complete && (
        <Row className="mt-3">
          <Col>
            <Button
              disabled={isSaveButtonDisabled()}
              onClick={() => handleSave()}
            >
              Next
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default DisciplinesStep;
