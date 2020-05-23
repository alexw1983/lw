import React, { useState } from "react";
import { IAdventure } from "../../redux/state";
import { getBookTitle } from "../../utils/book.utils";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { RandomNumberTable } from "../shared/random-number-table";
import { ImportStep } from "./new-adventure/import-step";
import { StatsStep } from "./new-adventure/stats-step";

interface Props {
  adventure: IAdventure;
}

const AdventureView = (props: Props) => {
  const [showNewAdventureForm, setShowNewAdventureForm] = useState(false);
  const [importQuestion, setImportQuestion] = useState({
    complete: false,
    import: undefined,
  });
  const [statsQuestion, setStatsQuestion] = useState({
    complete: false,
    combatSkill: undefined,
    endurancePoints: undefined,
  });

  return (
    <Container>
      {props.adventure && (
        <>
          <h1>
            {props.adventure.bookNumber}{" "}
            {getBookTitle(+props.adventure.bookNumber)}
          </h1>
          <hr />
          {!showNewAdventureForm &&
            (function () {
              switch (props.adventure.status) {
                case "COMPLETE":
                  return (
                    <Button onClick={() => setShowNewAdventureForm(true)}>
                      Reset
                    </Button>
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
            })()}
          <hr />
          {showNewAdventureForm && (
            <>
              <h2>New Adventure</h2>
              <hr />
              {!importQuestion.complete && (
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
              )}
              {importQuestion.complete && (
                <>
                  {!importQuestion.import && (
                    <StatsStep
                      combatSkill={statsQuestion.combatSkill}
                      endurancePoints={statsQuestion.endurancePoints}
                      setCombatSkill={(r) => {
                        setStatsQuestion((prevState) => ({
                          ...prevState,
                          combatSkill: r + 10,
                        }));
                      }}
                      setEndurancePoints={(r) => {
                        setStatsQuestion((prevState) => ({
                          ...prevState,
                          endurancePoints: r + 20,
                        }));
                      }}
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
                    {statsQuestion.combatSkill !== undefined &&
                      statsQuestion.endurancePoints !== undefined && (
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
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default AdventureView;
