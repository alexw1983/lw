import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { RandomNumberTable } from "../../shared/random-number-table";

interface Props {
  complete: boolean;
  combatSkill: number | undefined;
  endurancePoints: number | undefined;
  saveStats: (combatSkill: number, endurancePoints: number) => void;
}

export const StatsStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);
  const [combatSkill, setCombatSkill] = useState(props.combatSkill);
  const [endurancePoints, setEndurancePoints] = useState(props.endurancePoints);
  const [showEpRandomNumberTable, setShowEpRandomNumberTable] = useState(false);

  const renderNotImported = () => {
    return (
      <Row>
        <Col xs={12} md={6}>
          <h5>Combat Skill</h5>
          <p>{combatSkill}</p>
          {!props.complete && combatSkill === undefined && (
            <>
              <Button
                onClick={() => setshowRandomNumberTable(true)}
                className="mb-3"
              >
                Pick Combat Skill
              </Button>
              <RandomNumberTable
                show={showRandomNumberTable}
                onSelect={(r) => {
                  setshowRandomNumberTable(false);
                  setCombatSkill(r + 10);
                }}
              />
            </>
          )}
        </Col>
        <Col xs={12} md={6}>
          <h5>Endurance Points</h5>
          <p>{endurancePoints}</p>
          {!props.complete && endurancePoints === undefined && (
            <>
              <Button
                onClick={() => setShowEpRandomNumberTable(true)}
                className="mb-3"
              >
                Pick Endurance Points
              </Button>
              <RandomNumberTable
                show={showEpRandomNumberTable}
                onSelect={(r) => {
                  setShowEpRandomNumberTable(false);
                  setEndurancePoints(r + 20);
                }}
              />
            </>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <>
      {renderNotImported()}
      {endurancePoints && combatSkill && !props.complete && (
        <Row>
          <Col>
            <Button
              onClick={() => props.saveStats(combatSkill, endurancePoints)}
            >
              Next
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};
