import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { RandomNumberTable } from "../../shared/random-number-table";

interface Props {
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

  return (
    <Form>
      <Form.Group>
        <Form.Label>Combat Skill</Form.Label>
        <p>{props.combatSkill}</p>
        {props.combatSkill === 0 && (
          <Button onClick={() => setshowRandomNumberTable(true)}>
            Pick a number from the random number table
          </Button>
        )}
        <RandomNumberTable
          show={showRandomNumberTable}
          onSelect={(r) => {
            setshowRandomNumberTable(false);
            props.setCombatSkill(r);
          }}
        ></RandomNumberTable>
      </Form.Group>
      <Form.Group>
        <Form.Label>Endurance Points</Form.Label>
        <p>{props.endurancePoints}</p>
        {props.endurancePoints === 0 && (
          <Button onClick={() => setShowEndurancePointsRandomNumberTable(true)}>
            Pick a number from the random number table
          </Button>
        )}
        <RandomNumberTable
          show={showEndurancePointsRandomNumberTable}
          onSelect={(r) => {
            setShowEndurancePointsRandomNumberTable(false);
            props.setEndurancePoints(r);
          }}
        ></RandomNumberTable>
      </Form.Group>
    </Form>
  );
};
