import * as React from "react";
import { IActionChart } from "../../redux/state";
import { Container, Row, Col } from "react-bootstrap";
import ActionChartList from "./action-chart-list-item";

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
            items={props.actionChart.kaiDiscipines.map((d) => d.name)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ActionChartList
            header={"Backpack"}
            items={props.actionChart.backpack}
          />
        </Col>
      </Row>
      <Row>
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
