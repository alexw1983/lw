import * as React from "react";
import { IAdventure, IEquipment } from "../../redux/types";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Alert,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import ActionChartEquipmentList from "./action-chart-equipment-list";
import CX from "classnames";
import { Plus, Dash } from "react-bootstrap-icons";
import { getEquipmentBonus } from "../combat/combat.utils";

interface Props {
  playerId: string;
  bookNumber: number;
  adventure: IAdventure;
  endurancePoints: number;
  beltPouch: number;
  equipment: IEquipment[];
  saveAdventure: (adventure: IAdventure) => void;
  takeDamage: (damage: number) => void;
  spendMoney: (cost: number) => void;
  removeEquipment: (item: IEquipment) => void;
  addEquipment: (item: IEquipment) => void;
}

const ActionChartView: React.FC<Props> = (props: Props) => {
  const dead = props.endurancePoints <= 0;
  const complete = props.adventure.status === "COMPLETE";

  const renderEndurancePoints = () => {
    const equipmentBonus = props.adventure.actionChart.equipment.reduce(
      (acc, curr) => {
        if (curr.endurancePointsBonus) {
          return acc + curr.endurancePointsBonus;
        }

        return acc;
      },
      0
    );

    const different =
      props.endurancePoints <
      props.adventure.actionChart.endurancePoints + equipmentBonus;

    return (
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title>Endurance Points</Card.Title>
          <Card.Text>
            <span
              className={CX({
                lineThrough: different,
              })}
            >
              {props.adventure.actionChart.endurancePoints + equipmentBonus}
            </span>
            <br />
            {different && <span>{props.endurancePoints}</span>}
          </Card.Text>
          {props.adventure.actionChart.endurancePointsCalculation &&
            props.adventure.actionChart.endurancePointsCalculation.length > 0 &&
            props.adventure.actionChart.endurancePointsCalculation.map(
              (log, idx) => <p key={`ep_log_${idx}`}>{log}</p>
            )}
          {!dead && !complete && (
            <>
              <Button disabled={dead} onClick={() => props.takeDamage(1)}>
                <Dash />
              </Button>
              <Button
                className="ml-3"
                disabled={!different || dead}
                onClick={() => props.takeDamage(-1)}
              >
                <Plus />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderBeltPouch = () => {
    const maximum = props.beltPouch >= 50;
    const minimum = props.beltPouch <= 0;

    return (
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title>Belt Pouch</Card.Title>
          <Card.Text>
            <span>{props.beltPouch}</span>
          </Card.Text>
          {!dead && !complete && (
            <>
              <Button
                disabled={minimum || dead}
                onClick={() => props.spendMoney(1)}
              >
                <Dash />
              </Button>
              <Button
                className="ml-3"
                disabled={maximum || dead}
                onClick={() => props.spendMoney(-1)}
              >
                <Plus />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderDisciplines = () => {
    return (
      <>
        <h5 className="mt-3">Kai Disciplines</h5>
        <ListGroup>
          {props.adventure.actionChart.disciplines.map((discipline, idx) => {
            return (
              <ListGroupItem key={`action-chart-${discipline.id}-${idx}`}>
                {discipline.name}
                {discipline.id === "weapon-skill" &&
                props.adventure.actionChart.weaponSkill
                  ? " (" + props.adventure.actionChart.weaponSkill + ")"
                  : ""}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </>
    );
  };

  return (
    <Container>
      {dead && (
        <Row>
          <Col>
            <Alert variant="danger">You are dead</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col xs="12" sm="6">
          <Row>
            <Col xs="12" sm="6">
              <Card className="mt-3 mb-3">
                <Card.Body>
                  <Card.Title>Combat Skill</Card.Title>
                  <Card.Text>
                    {props.adventure.actionChart.combatSkill}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="12" sm="6">
              {renderEndurancePoints()}
            </Col>
          </Row>
          <Row>
            <Col>{renderDisciplines()}</Col>
          </Row>
        </Col>

        <Col xs="12" sm="6">
          <Row>
            <Col>
              <ActionChartEquipmentList
                complete={dead || complete}
                header={"Weapons"}
                equipmentType="WEAPON"
                items={props.equipment}
                maxItems={2}
                onRemove={props.removeEquipment}
                onAdd={props.addEquipment}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <ActionChartEquipmentList
                complete={dead || complete}
                header={"Backpack"}
                equipmentType="BACKPACK_ITEM"
                items={props.equipment}
                maxItems={8}
                onRemove={props.removeEquipment}
                onAdd={props.addEquipment}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionChartEquipmentList
                complete={dead || complete}
                header={"Special Items"}
                equipmentType="SPECIAL_ITEM"
                items={props.equipment}
                maxItems={12}
                onRemove={props.removeEquipment}
                onAdd={props.addEquipment}
              />
            </Col>
          </Row>
          <Row>
            <Col>{renderBeltPouch()}</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionChartView;
