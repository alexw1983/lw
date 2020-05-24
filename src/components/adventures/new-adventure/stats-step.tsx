import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { RandomNumberTable } from "../../shared/random-number-table";

interface Props {
  importPrevious: boolean;
  combatSkill: number;
  endurancePoints: number;
  setCombatSkill: (combatSkill: number) => void;
  setEndurancePoints: (endurancePoints: number) => void;
}

export const StatsStep = (props: Props) => {
  const [showRandomNumberTable, setshowRandomNumberTable] = useState(false);
  const [
    showEndurancePointsRandomNumberTable,
    setShowEndurancePointsRandomNumberTable,
  ] = useState(false);

  const renderImported = () => {
    return (
      <Row>
        <Col>
          <h5>Combat Skill</h5>
        </Col>
        <Col>
          <h5>Endurance Points</h5>
        </Col>
      </Row>
    );
  };

  const renderNotImported = () => {
    return (
      <Row>
        <Col xs={12} md={6}>
          <h5>Combat Skill</h5>
          <p>{props.combatSkill}</p>
          {props.combatSkill === 0 && (
            <Button
              onClick={() => setshowRandomNumberTable(true)}
              className="mb-3"
            >
              Pick Combat Skill
            </Button>
          )}
          <RandomNumberTable
            show={showRandomNumberTable}
            onSelect={(r) => {
              setshowRandomNumberTable(false);
              props.setCombatSkill(r);
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h5>Endurance Points</h5>
          <p>{props.endurancePoints}</p>
          {props.endurancePoints === 0 && (
            <Button
              onClick={() => setShowEndurancePointsRandomNumberTable(true)}
              className="mb-3"
            >
              Pick Endurance Points
            </Button>
          )}
          <RandomNumberTable
            show={showEndurancePointsRandomNumberTable}
            onSelect={(r) => {
              setShowEndurancePointsRandomNumberTable(false);
              props.setEndurancePoints(r);
            }}
          />
        </Col>
      </Row>
    );
  };
  return props.importPrevious ? renderImported() : renderNotImported();
};
