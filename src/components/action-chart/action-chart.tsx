import * as React from "react";
import { IActionChart } from "../../redux/types";
import { Container, Row, Col } from "react-bootstrap";
import ActionChartList from "./action-chart-list-item";
import { getWeaponName } from "../../utils/weapon.utils";

interface Props {
  actionChart: IActionChart;
}

const ActionChart: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Row>
        <Col>
          <h5>Combat Skill</h5>
          {props.actionChart.combatSkill}
        </Col>
        <Col>
          <h5>Endurance Points</h5>
          {props.actionChart.endurancePoints}
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionChartList
            header={"Kai Disciplines"}
            items={props.actionChart.kaiDiscipines.map(
              (d) =>
                `${d.name} ${
                  d.weaponNumber
                    ? "(" + getWeaponName(d.weaponNumber) + ")"
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
            items={[
              props.actionChart.weapons.first,
              props.actionChart.weapons.second,
            ]}
          />
        </Col>
        <Col>
          <h5>Belt Pouch</h5>
          {props.actionChart.beltPouch}
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionChartList
            header={"Backpack"}
            items={props.actionChart.backpack}
          />
        </Col>
        <Col>
          <ActionChartList
            header={"Special Items"}
            items={props.actionChart.specialItems}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ActionChart;
