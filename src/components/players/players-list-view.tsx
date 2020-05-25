import React from "react";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { IPlayer } from "../../redux/types";
import NewPlayerForm from "./new-player-form-container";

interface Props {
  showNewPlayerForm: boolean;
  players: IPlayer[];
  toggleNewPlayerForm: () => void;
}

const PlayersListView: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      {!props.showNewPlayerForm && (
        <>
          <Row className="mt-2">
            <Col>
              <h2>Select Player</h2>
            </Col>
          </Row>
          <Row className="mt-2">
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
          <Row className="mt-2">
            <Col>
              <Button
                color="primary"
                onClick={() => props.toggleNewPlayerForm()}
              >
                New Player
              </Button>
            </Col>
          </Row>
        </>
      )}
      {props.showNewPlayerForm && (
        <Row className="mt-2">
          <Col>
            <NewPlayerForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PlayersListView;
