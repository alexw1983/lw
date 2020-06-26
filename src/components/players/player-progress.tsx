import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  OverlayTrigger,
  Button,
  Modal,
  Tooltip,
} from "react-bootstrap";
import { getBookTitle } from "../../utils/book.utils";
import { Play, Trash } from "react-bootstrap-icons";
import { ADVENTURE_STATUS, IAdventure, IPlayer } from "../../redux/types";
import { Link } from "react-router-dom";

interface Props {
  player: IPlayer;
  adventures: IAdventure[];
  removeAdventure: (adventure: IAdventure) => void;
}

const PlayerProgress = (props: Props) => {
  const [show, setShow] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState({} as IAdventure);

  const handleClose = () => setShow(false);

  const handleRemoveAdventure = () => {
    props.removeAdventure(selectedAdventure);
    setShow(false);
  };

  const getVariant = (status: ADVENTURE_STATUS) => {
    switch (status) {
      case "IN PROGRESS":
        return "warning";
      case "NOT STARTED":
        return "secondary";
      case "COMPLETE":
        return "success";
      default:
        return "secondary";
    }
  };

  const renderRemoveModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Adventure</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure? This will remove all traces.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemoveAdventure}>
            Remove Adventure
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderTooltip = (props, message: string) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  };

  const handleShow = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    adventure: IAdventure
  ) => {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    setShow(true);
    setSelectedAdventure(adventure);
  };

  return (
    <>
      <ListGroup>
        {props.adventures
          .sort((a, b) => a.bookNumber - b.bookNumber)
          .map((ad, idx) => (
            <ListGroupItem
              key={`${ad.bookNumber}_${idx}`}
              variant={getVariant(ad.status)}
            >
              <Row>
                <Col>{ad.bookNumber}</Col>
                <Col>
                  <Link
                    to={`/player/${props.player.id}/adventure/${ad.bookNumber}`}
                  >
                    {getBookTitle(+ad.bookNumber)}
                  </Link>
                </Col>

                <Col>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => renderTooltip(props, "Remove")}
                  >
                    <Button
                      variant="outline-primary"
                      onClick={(evt) => handleShow(evt, ad)}
                    >
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
      </ListGroup>
      {renderRemoveModal()}
    </>
  );
};

export default PlayerProgress;
