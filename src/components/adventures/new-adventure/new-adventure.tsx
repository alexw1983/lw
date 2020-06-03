import React, { useState } from "react";
import { ImportStep } from "./import-step";
import { Button } from "react-bootstrap";
import { StatsStep } from "./stats-step";
import { GoldStep } from "./gold-step";
import { IActionChart, IAdventure, IDiscipline } from "../../../redux/types";
import { EquipmentStep } from "./equipment";
import DisciplinesStep from "./disciplines/disciplines-step";

interface Props {
  bookNumber: number;
  previousAdventures: IAdventure[];
  saveActionChart: (chart: IActionChart) => void;
}

export const NewAdventure = (props: Props) => {
  const [importQuestion, setImportQuestion] = useState({
    complete: false,
    import: undefined,
  });
  const [statsQuestion, setStatsQuestion] = useState({
    complete: false,
    combatSkill: undefined,
    endurancePoints: undefined,
  });
  const [disciplinesQuestion, setDisciplinesQuestion] = useState({
    complete: false,
    disciplines: [] as IDiscipline[],
    weaponSkill: undefined,
  });
  const [goldQuestion, setGoldQuestion] = useState({
    complete: false,
    gold: 0,
  });
  const [equipmentQuestion, setEquipmentQuestion] = useState({
    complete: false,
    equipment: undefined,
  });

  const getMostRecentAdventure = () => {
    return props.previousAdventures
      .filter((a) => a.status === "COMPLETE")
      .sort((a, b) => b.bookNumber - a.bookNumber)
      .find((x) => x.bookNumber < props.bookNumber);
  };

  const handleSave = () => {
    const actionChart = {
      combatSkill: statsQuestion.combatSkill,
      endurancePoints: statsQuestion.endurancePoints,
      currentEndurancePoints: statsQuestion.endurancePoints,
      beltPouch: goldQuestion.gold,
      equipment: equipmentQuestion.equipment,
      disciplines: disciplinesQuestion.disciplines,
      weaponSkill: disciplinesQuestion.weaponSkill,
    };
    props.saveActionChart(actionChart);
  };

  const renderImportQuestion = () => {
    return (
      <>
        <ImportStep
          complete={importQuestion.complete}
          importPrev={importQuestion.import}
          setImport={(importPrevious) =>
            setImportQuestion((prevState) => ({
              ...prevState,
              complete: true,
              import: importPrevious,
            }))
          }
        />
        <hr />
      </>
    );
  };

  const renderStatsQuestion = () => {
    const mostRecentAdventure = getMostRecentAdventure();
    const combatSkill =
      importQuestion.import && mostRecentAdventure
        ? mostRecentAdventure.actionChart.combatSkill
        : statsQuestion.combatSkill;

    const endurancePoints =
      importQuestion.import && mostRecentAdventure
        ? mostRecentAdventure.actionChart.endurancePoints
        : statsQuestion.endurancePoints;

    return (
      <>
        <StatsStep
          complete={statsQuestion.complete}
          combatSkill={combatSkill}
          endurancePoints={endurancePoints}
          saveStats={(combatSkill, endurancePoints) => {
            setStatsQuestion((prevState) => ({
              ...prevState,
              complete: true,
              combatSkill: combatSkill,
              endurancePoints: endurancePoints,
            }));
          }}
        />
        <hr />
      </>
    );
  };

  const renderDisciplinesQuestion = () => {
    return (
      <>
        <DisciplinesStep
          bookNumber={props.bookNumber}
          complete={disciplinesQuestion.complete}
          weaponSkill={disciplinesQuestion.weaponSkill}
          mostRecentAdventure={
            importQuestion.import ? getMostRecentAdventure() : undefined
          }
          savedDisciplines={disciplinesQuestion.disciplines}
          saveDisciplines={(disciplines: IDiscipline[]) =>
            setDisciplinesQuestion((prevState) => ({
              ...prevState,
              complete: true,
              disciplines: disciplines,
            }))
          }
          saveWeaponSkill={(weaponSkill) => {
            setDisciplinesQuestion((prevState) => ({
              ...prevState,
              weaponSkill,
            }));
          }}
        />
        <hr />
      </>
    );
  };

  const renderGoldQuestion = () => {
    const mostRecentAdventure = getMostRecentAdventure();

    const gold =
      importQuestion.import && mostRecentAdventure && !goldQuestion.complete
        ? mostRecentAdventure.actionChart.beltPouch
        : goldQuestion.gold;

    return (
      <>
        <GoldStep
          bookNumber={props.bookNumber}
          complete={goldQuestion.complete}
          gold={gold}
          setGold={(g) =>
            setGoldQuestion((prevState) => ({
              ...prevState,
              complete: true,
              gold: g,
            }))
          }
        />
        <hr />
      </>
    );
  };

  const renderEquipmentQuestion = () => {
    return (
      <>
        <EquipmentStep
          mostRecentAdventure={
            importQuestion.import ? getMostRecentAdventure() : undefined
          }
          savedEquipment={equipmentQuestion.equipment}
          bookNumber={props.bookNumber}
          complete={equipmentQuestion.complete}
          saveEquipment={(equipment) => {
            setEquipmentQuestion((prevState) => ({
              ...prevState,
              complete: true,
              equipment: equipment,
            }));
          }}
          setGold={(g) =>
            setGoldQuestion((prevState) => ({
              ...prevState,
              gold: prevState.gold + g,
            }))
          }
        />
        <hr />
      </>
    );
  };

  const showImportStep =
    props.bookNumber > 1 &&
    props.previousAdventures &&
    props.previousAdventures.length > 0;

  return (
    <>
      <h2>New Adventure</h2>
      <hr />
      {showImportStep && renderImportQuestion()}
      {(importQuestion.complete || props.bookNumber < 2) &&
        renderStatsQuestion()}
      {statsQuestion.complete && renderDisciplinesQuestion()}
      {disciplinesQuestion.complete && renderGoldQuestion()}
      {goldQuestion.complete && renderEquipmentQuestion()}
      {equipmentQuestion.complete && (
        <Button onClick={() => handleSave()}>Save Action Chart</Button>
      )}
    </>
  );
};
