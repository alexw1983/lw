import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import { IPlayer } from "../../redux/state";

interface Props {
  players: IPlayer[];
}

const PlayersListView: React.FC<Props> = (props: Props) => {
  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    console.log(event.target.value);

    if (form.checkValidity() === false) {
    }

    setValidated(true);
  };

  return (
    <Container>
      {!showNewPlayerForm && (
        <>
          <Row className="mt-1">
            <Col>
              <ListGroup>
                {props.players &&
                  props.players.length > 0 &&
                  props.players.map((player, idx) => {
                    return (
                      <ListGroupItem key={`player_${idx}`}>
                        <Link to={`/player/${player.id}`}>{player.name}</Link>
                      </ListGroupItem>
                    );
                  })}
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              <Button
                color="primary"
                onClick={() => setShowNewPlayerForm(true)}
              >
                New Player
              </Button>
            </Col>
          </Row>
        </>
      )}
      {showNewPlayerForm && (
        <Row>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="please enter the players name"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PlayersListView;
