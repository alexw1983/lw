import React, { useState } from "react";
import { IAdventure } from "../../redux/state";
import { getBookTitle } from "../../utils/book.utils";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { ImportStep } from "./new-adventure/import-step";
import { StatsStep } from "./new-adventure/stats-step";
import { KaiDisciplines } from "../../data/disciplines";
import { useFormik } from "formik";
import { RandomNumberTable } from "../shared/random-number-table";
import { DisciplinesStep } from "./new-adventure/disciplines-step";

interface Props {
  adventure: IAdventure;
}

const AdventureView = (props: Props) => {
  const [showNewAdventureForm, setShowNewAdventureForm] = useState(false);
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

  const renderHeading = () => {
    return (
      <h1>
        {props.adventure.bookNumber} {getBookTitle(+props.adventure.bookNumber)}
      </h1>
    );
  };

  const renderStart = () => {
    switch (props.adventure.status) {
      case "COMPLETE":
        return (
          <Button onClick={() => setShowNewAdventureForm(true)}>Reset</Button>
        );
      case "IN PROGRESS":
        return <h2>Action Chart</h2>;
      case "NOT STARTED":
        return (
          <Button onClick={() => setShowNewAdventureForm(true)}>
            Get Started
          </Button>
        );
    }
  };

  const renderImportQuestion = () => {
    return (
      <>
        <ImportStep
          setImport={(importPrevious) =>
            setImportQuestion((prevState) => ({
              ...prevState,
              import: importPrevious,
            }))
          }
        />
        {importQuestion.import !== undefined && (
          <Button
            onClick={() =>
              setImportQuestion((prevState) => {
                return { ...prevState, complete: true };
              })
            }
          >
            Next
          </Button>
        )}
      </>
    );
  };

  const renderStatsQuestion = () => {
    return (
      <>
        {!importQuestion.import && (
          <StatsStep
            combatSkill={statsQuestion.combatSkill}
            endurancePoints={statsQuestion.endurancePoints}
            setCombatSkill={handleSetCombatSkill}
            setEndurancePoints={handleSetEndurancePoints}
          />
        )}
        {importQuestion.import && (
          <Row>
            <Col>
              <p>Combat Skill</p>
            </Col>
            <Col>
              <p>Endurance Points</p>
            </Col>
          </Row>
        )}
        {!statsQuestion.complete && (
          <Row>
            <Col>
              <Button
                onClick={() => {
                  setStatsQuestion((prevState) => {
                    return {
                      ...prevState,
                      complete: false,
                    };
                  });
                  setImportQuestion((prevState) => {
                    return { ...prevState, complete: false };
                  });
                }}
              >
                Back
              </Button>
            </Col>
            {statsQuestion.combatSkill !== 0 &&
              statsQuestion.endurancePoints !== 0 && (
                <Col>
                  <Button
                    onClick={() =>
                      setStatsQuestion((prevState) => {
                        return {
                          ...prevState,
                          complete: true,
                        };
                      })
                    }
                  >
                    Next
                  </Button>
                </Col>
              )}
          </Row>
        )}
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
        {!disciplinesQuestion.complete && (
          <Row>
            <Col>
              <Button
                onClick={() => {
                  setStatsQuestion((prevState) => {
                    return {
                      ...prevState,
                      complete: false,
                    };
                  });
                  setDisciplinesQuestion((prevState) => {
                    return { ...prevState, complete: false };
                  });
                }}
              >
                Back
              </Button>
            </Col>

            {disciplinesQuestion.kaiDisciplines.length === 5 &&
              !(
                disciplinesQuestion.kaiDisciplines.includes("weapon-skill") &&
                disciplinesQuestion.weaponSkillNumber < 0
              ) && (
                <Col>
                  <Button
                    onClick={() =>
                      setDisciplinesQuestion((prevState) => {
                        return {
                          ...prevState,
                          complete: true,
                        };
                      })
                    }
                  >
                    Next
                  </Button>
                </Col>
              )}
          </Row>
        )}
      </>
    );
  };

  const renderGoldQuestion = () => {};

  const renderNewAdventure = () => {
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

  return (
    <Container>
      {props.adventure && (
        <>
          {renderHeading()}
          <hr />
          {!showNewAdventureForm && renderStart()}
          <hr />
          {showNewAdventureForm && renderNewAdventure()}
        </>
      )}
    </Container>
  );
};

export default AdventureView;
