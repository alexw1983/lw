import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const PlayerList: React.FC<{}> = (props) => {
  const players = [
    {
      id: "1",
      name: "Alex Wilson",
    },
    {
      id: "2",
      name: "Sayer Hilton",
    },
    {
      id: "3",
      name: "Robin Wilson Thorn",
    },
  ];

  let history = useHistory();

  const routeChange = () => {
    history.push(`new-player`);
  };

  return (
    <Container>
      <Row className="mt-1">
        <Col>
          <ListGroup>
            {players.map((player, idx) => {
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
          <Button color="primary" onClick={routeChange}>
            New Player
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayerList;
