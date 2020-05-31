import React, { useState } from "react";
import { ImportStep } from "./import-step";
import { Button, Row, Col } from "react-bootstrap";
import { StatsStep } from "./stats-step";
import { DisciplinesStep } from "./disciplines-step";
import { RandomNumberTable } from "../../shared/random-number-table";
import { ActionRow } from "./actions-row";
import { GoldStep } from "./gold-step";
import {
  IActionChart,
  KaiDiscipline,
  KaiDiscipineId,
  IAdventure,
  IEquipment,
} from "../../../redux/types";
import { KaiDisciplines } from "../../../data/disciplines";
import { EquipmentStep } from "./equipment";

interface Props {
  bookNumber: number;
  previousAdventures: IAdventure[];
  saveActionChart: (chart: IActionChart) => void;
}

export const NewAdventure = (props: Props) => {
  const [showWeaponSkillRandom, setShowWeaponSkillRandom] = useState(false);
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
    kaiDisciplines: [] as KaiDiscipline[],
    weaponSkillNumber: -1,
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

  const handleImportQuestionNext = () => {
    setImportQuestion((prevState) => {
      return { ...prevState, complete: true };
    });

    if (importQuestion.import && props.previousAdventures) {
      const mostRecentAdventure = getMostRecentAdventure();

      if (mostRecentAdventure) {
        setStatsQuestion({
          complete: true,
          combatSkill: mostRecentAdventure.actionChart.combatSkill,
          endurancePoints: mostRecentAdventure.actionChart.endurancePoints,
        });

        const weaponSkill = mostRecentAdventure.actionChart.kaiDiscipines.find(
          (x) => x.id === "weapon-skill"
        );

        setDisciplinesQuestion((prevState) => ({
          ...prevState,
          kaiDisciplines: mostRecentAdventure.actionChart.kaiDiscipines,
          weaponSkillNumber: weaponSkill ? weaponSkill.weaponNumber : -1,
        }));
      }
    }
  };

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

  const handleDiscipinesQuestionBack = () => {
    setStatsQuestion((prevState) => {
      return {
        ...prevState,
        complete: false,
      };
    });
    setDisciplinesQuestion((prevState) => {
      return { ...prevState, complete: false };
    });
  };

  const handleDisciplinesQuestionNext = () =>
    setDisciplinesQuestion((prevState) => {
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
      kaiDiscipines: disciplinesQuestion.kaiDisciplines,
      beltPouch: goldQuestion.gold,
      equipment: equipmentQuestion.equipment,
    };
    console.log(actionChart);
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
              import: importPrevious,
            }))
          }
        />
        <ActionRow
          show={importQuestion.import !== undefined}
          showNextButton={!importQuestion.complete}
          onBackClicked={undefined}
          onNextClicked={handleImportQuestionNext}
        />
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

  const getDiscipline = (id: KaiDiscipineId) => {
    const discipline = KaiDisciplines.find((x) => x.id === id);

    if (discipline.id === "weapon-skill") {
      discipline.weaponNumber = disciplinesQuestion.weaponSkillNumber;
    }

    return discipline;
  };

  const getMaximumDisciplines = () => {
    return (
      5 +
      props.previousAdventures
        .sort((a, b) => a.bookNumber - b.bookNumber)
        .filter((x) => x.bookNumber < props.bookNumber).length
    );
  };

  const renderDisciplinesQuestion = () => {
    return (
      <>
        <DisciplinesStep
          importPrevious={importQuestion.import}
          mostRecentAdventure={props.previousAdventures
            .sort((a, b) => a.bookNumber - b.bookNumber)
            .find((x) => x.bookNumber < props.bookNumber)}
          maxDisciplines={getMaximumDisciplines()}
          complete={disciplinesQuestion.complete}
          kaiDisciplines={disciplinesQuestion.kaiDisciplines.map((x) => x.id)}
          weaponSkillNumber={disciplinesQuestion.weaponSkillNumber}
          setDisciplines={(disciplines: KaiDiscipineId[]) =>
            setDisciplinesQuestion((prevState) => ({
              ...prevState,
              kaiDisciplines: disciplines.map((x) => getDiscipline(x)),
            }))
          }
        />

        {disciplinesQuestion.kaiDisciplines
          .map((x) => x.id)
          .includes("weapon-skill") &&
          !(disciplinesQuestion.weaponSkillNumber > -1) && (
            <Row className="mb-3">
              <Col>
                <Button onClick={() => setShowWeaponSkillRandom(true)}>
                  Pick Weapon
                </Button>
                <RandomNumberTable
                  onSelect={(r) =>
                    setDisciplinesQuestion((prevState) => ({
                      ...prevState,
                      weaponSkillNumber: r,
                    }))
                  }
                  show={showWeaponSkillRandom}
                />
              </Col>
            </Row>
          )}

        <ActionRow
          show={!disciplinesQuestion.complete}
          showNextButton={
            disciplinesQuestion.kaiDisciplines.length ===
              getMaximumDisciplines() &&
            !(
              disciplinesQuestion.kaiDisciplines
                .map((x) => x.id)
                .includes("weapon-skill") &&
              disciplinesQuestion.weaponSkillNumber < 0
            )
          }
          onBackClicked={handleDiscipinesQuestionBack}
          onNextClicked={handleDisciplinesQuestionNext}
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
          mostRecentAdventure={getMostRecentAdventure()}
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

  const renderSave = () => {
    return <Button onClick={() => handleSave()}>Save Action Chart</Button>;
  };

  const showImportStep =
    props.bookNumber > 1 &&
    props.previousAdventures &&
    props.previousAdventures.length > 0 &&
    (!importQuestion.complete ||
      (props.previousAdventures && props.previousAdventures.length > 0));

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
      {equipmentQuestion.complete && renderSave()}
    </>
  );
};
