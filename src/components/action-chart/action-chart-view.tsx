import * as React from "react";
import { IAdventure, IEquipment, ILwState } from "../../redux/types";
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
import { useSelector } from "react-redux";

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

  const renderEndurancePoints = () => {
    const different =
      props.adventure.actionChart.endurancePoints !== props.endurancePoints;

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
              {props.adventure.actionChart.endurancePoints}
            </span>
            <br />
            {different && <span>{props.endurancePoints}</span>}
          </Card.Text>
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
        </Card.Body>
      </Card>
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
            <Col>
              <h5 className="mt-3">Kai Disciplines</h5>
              <ListGroup>
                {props.adventure.actionChart.disciplines.map(
                  (discipline, idx) => {
                    return (
                      <ListGroupItem
                        key={`action-chart-${discipline.id}-${idx}`}
                      >
                        {discipline.name}
                        {discipline.id === "weapon-skill" &&
                        props.adventure.actionChart.weaponSkill
                          ? " (" + props.adventure.actionChart.weaponSkill + ")"
                          : ""}
                      </ListGroupItem>
                    );
                  }
                )}
              </ListGroup>
            </Col>
          </Row>
        </Col>

        <Col xs="12" sm="6">
          <Row>
            <Col>
              <ActionChartEquipmentList
                header={"Weapons"}
                equipmentType="WEAPON"
                items={props.equipment}
                onRemove={props.removeEquipment}
                onAdd={props.addEquipment}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <ActionChartEquipmentList
                header={"Backpack"}
                equipmentType="BACKPACK_ITEM"
                items={props.equipment}
                onRemove={props.removeEquipment}
                onAdd={props.addEquipment}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionChartEquipmentList
                header={"Special Items"}
                equipmentType="SPECIAL_ITEM"
                items={props.equipment}
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
