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
import { IPlayer } from "../../redux/state";

interface Props {
  players: IPlayer[];
}

const PlayersListView: React.FC<Props> = (props: Props) => {
  let history = useHistory();

  const routeChange = () => {
    history.push(`new-player`);
  };

  return (
    <Container>
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
          <Button color="primary" onClick={routeChange}>
            New Player
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PlayersListView;
