import * as React from "react";
import { IAdventure } from "../../redux/types";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ActionChartList from "./action-chart-list-item";

interface Props {
  adventure: IAdventure;
  saveAdventure: (adventure: IAdventure) => void;
}

const ActionChartView: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Row>
        <Col xs="12" sm="6">
          <Row>
            <Col xs="6" sm="6">
              <Card className="mt-3 mb-3">
                <Card.Body>
                  <Card.Title>CS</Card.Title>
                  <Card.Text>
                    {props.adventure.actionChart.combatSkill}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" sm="6">
              <Card className="mt-3 mb-3">
                <Card.Body>
                  <Card.Title>EP</Card.Title>
                  <Card.Text>
                    {props.adventure.actionChart.endurancePoints}
                  </Card.Text>
                </Card.Body>
              </Card>
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
            <Col>
              <Card className="mt-3 mb-3">
                <Card.Body>
                  <Card.Title>Belt Pouch</Card.Title>
                  <Card.Text>{props.adventure.actionChart.beltPouch}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionChartView;
