import * as React from "react";
import { IAdventure } from "../../redux/types";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import ActionChartList from "./action-chart-list-item";
import CX from "classnames";
import { Plus, Dash } from "react-bootstrap-icons";

interface Props {
  playerId: string;
  bookNumber: number;
  adventure: IAdventure;
  endurancePoints: number;
  beltPouch: number;
  saveAdventure: (adventure: IAdventure) => void;
  takeDamage: (damage: number) => void;
  spendMoney: (cost: number) => void;
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
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      {/* <Row>
        <Col>
          <Button
            variant="outline-primary"
            className="ml-1 mt-1"
            onClick={() => props.takeDamage(5)}
          >
            Take Damage
          </Button>
        </Col>
      </Row> */}
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
              <ActionChartList
                header={"Kai Disciplines"}
                items={props.adventure.actionChart.disciplines.map(
                  (d) =>
                    `${d.name} ${
                      d.id === "weapon-skill" &&
                      props.adventure.actionChart.weaponSkill
                        ? "(" + props.adventure.actionChart.weaponSkill + ")"
                        : ""
                    }`
                )}
              />
            </Col>
          </Row>
        </Col>
        <Col xs="12" sm="6">
          <Row>
            <Col>
              <ActionChartList
                header={"Weapons"}
                items={props.adventure.actionChart.equipment
                  .filter((w) => w.type === "WEAPON")
                  .map((x) => x.name)}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <ActionChartList
                header={"Backpack"}
                items={props.adventure.actionChart.equipment
                  .filter((w) => w.type === "BACKPACK_ITEM")
                  .map((x) => x.name)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ActionChartList
                header={"Special Items"}
                items={props.adventure.actionChart.equipment
                  .filter((w) => w.type === "SPECIAL_ITEM")
                  .map((x) => x.name)}
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
