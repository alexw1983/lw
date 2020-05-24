import React, { useState } from "react";
import { ImportStep } from "./import-step";
import { Button, Row, Col } from "react-bootstrap";
import { StatsStep } from "./stats-step";
import { DisciplinesStep } from "./disciplines-step";
import { RandomNumberTable } from "../../shared/random-number-table";
import { ActionRow } from "./actions-row";
import { GoldStep } from "./gold-step";

export const NewAdventure = () => {
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
    kaiDisciplines: [],
    weaponSkillNumber: -1,
  });

  const [goldQuestion, setGoldQuestion] = useState({
    complete: false,
    gold: undefined,
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

  const renderImportQuestion = () => {
    return (
      <>
        <ImportStep
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
          showNextButton={true}
          onBackClicked={undefined}
          onNextClicked={() =>
            setImportQuestion((prevState) => {
              return { ...prevState, complete: true };
            })
          }
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

  const renderDisciplinesQuestion = () => {
    return (
      <>
        <DisciplinesStep
          complete={disciplinesQuestion.complete}
          kaiDisciplines={disciplinesQuestion.kaiDisciplines}
          weaponSkillNumber={disciplinesQuestion.weaponSkillNumber}
          setDisciplines={(disciplines) =>
            setDisciplinesQuestion((prevState) => ({
              ...prevState,
              kaiDisciplines: disciplines,
            }))
          }
        />

        {disciplinesQuestion.kaiDisciplines.includes("weapon-skill") &&
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
            disciplinesQuestion.kaiDisciplines.length === 5 &&
            !(
              disciplinesQuestion.kaiDisciplines.includes("weapon-skill") &&
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
    return (
      <>
        <GoldStep
          gold={goldQuestion.gold}
          setGold={(g) =>
            setGoldQuestion((prevState) => ({ ...prevState, gold: g }))
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

  return (
    <>
      <h2>New Adventure</h2>
      <hr />
      {!importQuestion.complete && renderImportQuestion()}
      {importQuestion.complete && renderStatsQuestion()}
      {statsQuestion.complete && renderDisciplinesQuestion()}
      {disciplinesQuestion.complete && renderGoldQuestion()}
    </>
  );
};
