import React from "react";
import { Row, Col, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  showNextButton: boolean;
  onBackClicked: () => void | undefined;
  onNextClicked: () => void | undefined;
}

export const ActionRow = (props: Props) => {
  return (
    props.show && (
      <Row>
        {props.onBackClicked && (
          <Col>
            <Button onClick={props.onBackClicked}>Back</Button>
          </Col>
        )}
        {props.onNextClicked && props.showNextButton && (
          <Col>
            <Button onClick={props.onNextClicked}>Next</Button>
          </Col>
        )}
      </Row>
    )
  );
};
