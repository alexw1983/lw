import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Table,
} from "react-bootstrap";
import { IAdventure, IEnemy } from "../../redux/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import SetUpCombatForm from "./set-up-combat-form";
import { RandomNumberTable } from "../shared/random-number-table";
import { takeDamage } from "../../redux/actions/adventures-action";
import { getDamage } from "./combat.utils";

interface Props {
  adventure: IAdventure;
  saveAdventure: (adventure: IAdventure) => void;
  takeDamage: (damage: number) => void;
}

const CombatLogView: React.FC<Props> = (props: Props) => {
  const [enemy, setEnemy] = useState(undefined as IEnemy);
  const [rounds, setRounds] = useState([]);
  const [showRandom, setShowRandom] = useState(false);

  const startingEndurancePoints = props.adventure
    ? props.adventure.actionChart.currentEndurancePoints
    : 0;

  const getLoneWolfCombatSkill = () => {
    return props.adventure.actionChart.combatSkill;
  };

  const getCombatRatio = () => {
    return getLoneWolfCombatSkill() - enemy.combatSkill;
  };

  const damageEnemy = (damage: number) => {
    setEnemy((prevState) => ({
      ...prevState,
      currentEndurancePoints: enemy.currentEndurancePoints - damage,
    }));
  };

  const dealDamage = (e: number, lw: number) => {
    damageEnemy(e);
    props.takeDamage(lw);
  };

  const handleNextRound = (r: number) => {
    const ratio = getCombatRatio();
    const dmg = getDamage(
      r,
      ratio,
      props.adventure.actionChart.currentEndurancePoints,
      enemy.currentEndurancePoints
    );

    setRounds((prevState) => [
      ...prevState,
      {
        e: enemy.currentEndurancePoints - dmg.e,
        lw: props.adventure.actionChart.currentEndurancePoints - dmg.lw,
      },
    ]);

    dealDamage(dmg.e, dmg.lw);

    setShowRandom(false);
  };

  return (
    <Container>
      <h1>Combat</h1>
      <hr />
      <Row>
        <Col>
          <div className="d-flex justify-content-end align-items-center">
            {props.adventure && (
              <Button
                variant="outline-primary"
                href={`/player/${props.adventure.playerId}/adventure/${props.adventure.bookNumber}`}
              >
                {"< Back"}
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <hr />
      {!enemy && (
        <Row>
          <Col>
            <SetUpCombatForm saveEnemy={(enemy) => setEnemy(enemy)} />
          </Col>
        </Row>
      )}
      {enemy && (
        <>
          <Row>
            <Col>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Lone Wolf Combat Skill</th>
                    <th>Combat Ratio</th>
                    <th>Enemy Combat Skill</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getLoneWolfCombatSkill()}</td>
                    <td>{getCombatRatio()}</td>
                    <td>{enemy.combatSkill}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Lone Wolf</th>
                <th>Enemy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>{startingEndurancePoints}</td>
                <td>{enemy.endurancePoints}</td>
              </tr>
              {rounds.length > 0 &&
                rounds.map((round, idx) => (
                  <tr key={`round_${idx}`}>
                    <td>{idx + 1}</td>
                    <td>{round.lw}</td>
                    <td>{round.e}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Row>
            <Col>
              <Button onClick={() => setShowRandom(true)}>Next Round</Button>
            </Col>
          </Row>
        </>
      )}
      <RandomNumberTable show={showRandom} onSelect={handleNextRound} />
    </Container>
  );
};

export default CombatLogView;
