import * as React from "react";
import { IAdventure } from "../../redux/types";
import { Container, Row, Col, Button } from "react-bootstrap";
import ActionChartList from "./action-chart-list-item";

interface Props {
  adventure: IAdventure;
  saveAdventure: (adventure: IAdventure) => void;
}

const ActionChartView: React.FC<Props> = (props: Props) => {
  const handleCompleteAdventure = () => {
    props.saveAdventure(
      Object.assign({}, props.adventure, { status: "COMPLETE" })
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h5>Combat Skill</h5>
          {props.adventure.actionChart.combatSkill}
        </Col>
        <Col>
          <h5>Endurance Points</h5>
          {props.adventure.actionChart.endurancePoints}
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
      <Row>
        <Col>
          <ActionChartList
            header={"Weapons"}
            items={props.adventure.actionChart.equipment.map((x) => x.name)}
          />
        </Col>
        <Col>
          <h5>Belt Pouch</h5>
          {props.adventure.actionChart.beltPouch}
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionChartList
            header={"Backpack"}
            items={props.adventure.actionChart.equipment.map((x) => x.name)}
          />
        </Col>
        <Col>
          <ActionChartList
            header={"Special Items"}
            items={props.adventure.actionChart.equipment.map((x) => x.name)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={(evt) => handleCompleteAdventure()}>Complete</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionChartView;
