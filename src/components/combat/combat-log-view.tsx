import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Alert,
  Card,
  Form,
} from "react-bootstrap";
import { IAdventure, IEnemy, ICombatConfig } from "../../redux/types";
import SetUpCombatForm from "./set-up-combat-form";
import { RandomNumberTable } from "../shared/random-number-table";
import { getDamage, calculateLoneWolfCombatSkill } from "./combat.utils";
import { Enemies } from "../../data/enemies";

interface Props {
  adventure: IAdventure;
  saveAdventure: (adventure: IAdventure) => void;
  takeDamage: (damage: number) => void;
}

const CombatLogView: React.FC<Props> = (props: Props) => {
  const [enemy, setEnemy] = useState(undefined as IEnemy);
  const [rounds, setRounds] = useState([]);
  const [showRandom, setShowRandom] = useState(false);
  const [config, setConfig] = useState({
    useMindBlast: false,
    usePsiSurge: false,
    useKaiSurge: false,
  } as ICombatConfig);

  const enemyIsDead = enemy && enemy.currentEndurancePoints <= 0;
  const loneWolfIsDead =
    props.adventure && props.adventure?.actionChart.currentEndurancePoints <= 0;
  const magnakaiRank = props.adventure?.actionChart.disciplines.filter(
    (x) => x.type === "MAGNAKAI"
  ).length;

  const getLoneWolfCombatSkill = () => {
    return calculateLoneWolfCombatSkill(
      props.adventure.actionChart,
      enemy,
      config
    );
  };

  const getCombatRatio = () => {
    return (
      getLoneWolfCombatSkill().combatSKill +
      enemy.combatSkillBuffer -
      enemy.combatSkill
    );
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

    const lwDmg = config.useKaiSurge
      ? dmg.lw + 1
      : config.usePsiSurge
      ? magnakaiRank >= 9
        ? dmg.lw + 1
        : dmg.lw + 2
      : dmg.lw;

    setRounds((prevState) => [
      ...prevState,
      {
        r: r,
        eDmg: dmg.e,
        lwDmg: lwDmg,
        e: enemy.currentEndurancePoints - dmg.e,
        lw: props.adventure.actionChart.currentEndurancePoints - lwDmg,
      },
    ]);

    dealDamage(dmg.e, lwDmg);

    setShowRandom(false);
  };

  const renderHeader = () => {
    return <h1>Combat</h1>;
  };

  const renderActionRow = () => {
    return (
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
    );
  };

  const renderRounds = () => {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>Round</th>
              <th>Random Number</th>
              <th>Lone Wolf</th>
              <th>Enemy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>-</td>
              <td>
                {props.adventure.actionChart.currentEndurancePoints}{" "}
                {props.adventure.actionChart.endurancePointsCalculation &&
                  props.adventure.actionChart.endurancePointsCalculation
                    .length > 0 &&
                  props.adventure.actionChart.endurancePointsCalculation.map(
                    (log, idx) => <p key={`ep_log_${idx}`}>{log}</p>
                  )}
              </td>
              <td>{enemy.endurancePoints}</td>
            </tr>
            {rounds.length > 0 &&
              rounds.map((round, idx) => (
                <tr key={`round_${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{round.r}</td>
                  <td>{`${round.lw} (-${round.lwDmg})`}</td>
                  <td>{`${round.e} (-${round.eDmg})`}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {!enemyIsDead && !loneWolfIsDead && (
          <Row>
            <Col>
              <Button onClick={() => setShowRandom(true)}>Next Round</Button>
            </Col>
          </Row>
        )}
      </>
    );
  };

  const renderRatioTable = () => {
    return (
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
            <td>
              <p>
                {
                  calculateLoneWolfCombatSkill(
                    props.adventure.actionChart,
                    enemy,
                    config
                  ).combatSKill
                }
              </p>
              {calculateLoneWolfCombatSkill(
                props.adventure.actionChart,
                enemy,
                config
              ).calcualtion.map((log, idx) => (
                <p key={`log_${idx}`}>{log}</p>
              ))}
            </td>
            <td>{getCombatRatio()}</td>
            <td>{enemy.combatSkill}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const renderAlert = () => {
    return (
      <Row>
        <Col>
          {loneWolfIsDead && <Alert variant="danger">You lost!</Alert>}
          {enemyIsDead && (
            <Alert variant="success">Congratulations you win!</Alert>
          )}
        </Col>
      </Row>
    );
  };

  const renderPreSelected = () => {
    return (
      <Row>
        <Col>
          {Enemies.map((enemy, idx) => (
            <Card
              key={`enemy_${idx}`}
              className="enemy-card"
              onClick={() => setEnemy(enemy)}
            >
              <Card.Body>
                {enemy.name}{" "}
                {`(${enemy.combatSkill}/${enemy.endurancePoints}/${enemy.combatSkillBuffer})`}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    );
  };

  const renderConfig = () => {
    return (
      <>
        {props.adventure &&
          props.adventure.actionChart.disciplines.find(
            (x) => x.id === "mind-blast"
          ) && (
            <Form.Check
              label="Use Mindblast"
              checked={config.useMindBlast}
              onChange={() =>
                setConfig((prevState) => ({
                  ...prevState,
                  useMindBlast: !prevState.useMindBlast,
                }))
              }
            />
          )}
        {props.adventure &&
          props.adventure.actionChart.disciplines.find(
            (x) => x.id === "psi-surge"
          ) &&
          (props.adventure.actionChart.currentEndurancePoints > 6 ||
            (magnakaiRank >= 9 &&
              props.adventure.actionChart.currentEndurancePoints > 4)) && (
            <Form.Check
              label="Use Psi Surge"
              checked={config.usePsiSurge}
              onChange={() =>
                setConfig((prevState) => ({
                  ...prevState,
                  useMindBlast: !prevState.usePsiSurge,
                }))
              }
            />
          )}
        {props.adventure &&
          props.adventure.actionChart.disciplines.find(
            (x) => x.id === "kai-surge"
          ) && (
            <Form.Check
              label="Use Kai Surge"
              checked={config.useKaiSurge}
              onChange={() =>
                setConfig((prevState) => ({
                  ...prevState,
                  useMindBlast: !prevState.useKaiSurge,
                }))
              }
            />
          )}
      </>
    );
  };

  return (
    <Container>
      {renderHeader()}
      <hr />
      <Row>
        <Col>{renderActionRow()}</Col>
      </Row>
      <hr />
      <Row>
        <Col>{renderConfig()}</Col>
      </Row>
      <hr />
      {!enemy && (
        <Row>
          <Col xs={12} className="mb-3">
            {renderPreSelected()}
          </Col>
          <Col xs={12}>
            <SetUpCombatForm saveEnemy={(enemy) => setEnemy(enemy)} />
          </Col>
        </Row>
      )}
      {enemy && (
        <>
          {renderRatioTable()}
          {renderAlert()}
          {renderRounds()}
        </>
      )}
      <RandomNumberTable show={showRandom} onSelect={handleNextRound} />
    </Container>
  );
};

export default CombatLogView;
