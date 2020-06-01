import React, { useState } from "react";
import { ImportStep } from "./import-step";
import { Button, Row, Col } from "react-bootstrap";
import { StatsStep } from "./stats-step";
import { RandomNumberTable } from "../../shared/random-number-table";
import { ActionRow } from "./actions-row";
import { GoldStep } from "./gold-step";
import {
  IActionChart,
  KaiDiscipline,
  IAdventure,
  IDiscipline,
} from "../../../redux/types";
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
    combatSkill: 0,
    endurancePoints: 0,
  });
  const [disciplinesQuestion, setDisciplinesQuestion] = useState({
    complete: false,
    disciplines: [] as IDiscipline[],
    weaponSkill: undefined,
  });

  const [goldQuestion, setGoldQuestion] = useState({
    complete: false,
    gold: undefined,
  });

  const [equipmentQuestion, setEquipmentQuestion] = useState({
    complete: false,
    equipment: undefined,
  });

  const handleSetCombatSkill = (r: number) => {
    setStatsQuestion((prevState) => ({
      ...prevState,
      combatSkill: r + 10,
    }));
  };

  const handleSetEndurancePoints = (r) => {
    setStatsQuestion((prevState) => ({
      ...prevState,
      endurancePoints: r + 20,
    }));
  };

  const getMostRecentAdventure = () => {
    return props.previousAdventures
      .filter((a) => a.status === "COMPLETE")
      .sort((a, b) => a.bookNumber - b.bookNumber)
      .find((x) => x.bookNumber < props.bookNumber);
  };

  // const handleImportQuestionNext = () => {
  //   setImportQuestion((prevState) => {
  //     return { ...prevState, complete: true };
  //   });

  //   if (importQuestion.import && props.previousAdventures) {
  //     const mostRecentAdventure = getMostRecentAdventure();

  //     if (mostRecentAdventure) {
  //       setStatsQuestion({
  //         complete: true,
  //         combatSkill: mostRecentAdventure.actionChart.combatSkill,
  //         endurancePoints: mostRecentAdventure.actionChart.endurancePoints,
  //       });
  //     }
  //   }
  // };

  const handleStatsQuestonBack = () => {
    setStatsQuestion((prevState) => {
      return {
        ...prevState,
        complete: false,
      };
    });
    setImportQuestion((prevState) => {
      return { ...prevState, complete: false };
    });
  };

  const handleStatsQuestionNext = () =>
    setStatsQuestion((prevState) => {
      return {
        ...prevState,
        complete: true,
      };
    });

  const handleGoldQuestionBack = () => {
    setDisciplinesQuestion((prevState) => {
      return { ...prevState, complete: false };
    });
    setGoldQuestion((prevState) => {
      return { ...prevState, complete: false };
    });
  };

  const handleGoldQuestionNext = () =>
    setGoldQuestion((prevState) => {
      return {
        ...prevState,
        complete: true,
      };
    });

  const handleSave = () => {
    const actionChart = {
      combatSkill: statsQuestion.combatSkill,
      endurancePoints: statsQuestion.endurancePoints,
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
        {/* <ActionRow
          show={importQuestion.import !== undefined}
          showNextButton={!importQuestion.complete}
          onBackClicked={undefined}
          onNextClicked={handleImportQuestionNext}
        /> */}
      </>
    );
  };

  const renderStatsQuestion = () => {
    return (
      <>
        <StatsStep
          importPrevious={importQuestion.import}
          combatSkill={statsQuestion.combatSkill}
          endurancePoints={statsQuestion.endurancePoints}
          setCombatSkill={handleSetCombatSkill}
          setEndurancePoints={handleSetEndurancePoints}
        />
        <ActionRow
          show={!statsQuestion.complete}
          showNextButton={
            statsQuestion.combatSkill !== 0 &&
            statsQuestion.endurancePoints !== 0
          }
          onBackClicked={handleStatsQuestonBack}
          onNextClicked={handleStatsQuestionNext}
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
    let importedGold = 0;
    const mostRecentAdventure = getMostRecentAdventure();

    if (mostRecentAdventure) {
      importedGold = mostRecentAdventure.actionChart.beltPouch;
    }

    return (
      <>
        <GoldStep
          importedGold={importedGold}
          gold={goldQuestion.gold}
          setGold={(g) =>
            setGoldQuestion((prevState) => ({
              ...prevState,
              gold: importedGold ? g + importedGold + 10 : g,
            }))
          }
        />
        <ActionRow
          show={!goldQuestion.complete}
          showNextButton={goldQuestion.gold !== undefined}
          onBackClicked={handleGoldQuestionBack}
          onNextClicked={handleGoldQuestionNext}
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
    props.previousAdventures.length > 0 &&
    !importQuestion.complete;

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
