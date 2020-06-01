import * as React from "react";
import { IAdventure } from "../../redux/types";
import { Container, Row, Col, Button } from "react-bootstrap";
import ActionChartList from "./action-chart-list-item";

interface Props {
  adventure: IAdventure;
  saveAdventure: (adventure: IAdventure) => void;
}

const ActionChartView: React.FC<Props> = (props: Props) => {
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
            items={props.adventure.actionChart.equipment
              .filter((w) => w.type === "WEAPON")
              .map((x) => x.name)}
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
            items={props.adventure.actionChart.equipment
              .filter((w) => w.type === "BACKPACK_ITEM")
              .map((x) => x.name)}
          />
        </Col>
        <Col>
          <ActionChartList
            header={"Special Items"}
            items={props.adventure.actionChart.equipment
              .filter((w) => w.type === "SPECIAL_ITEM")
              .map((x) => x.name)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ActionChartView;
