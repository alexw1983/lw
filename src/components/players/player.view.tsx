import React, { useState } from "react";
import { IPlayer, IAdventure, ADVENTURE_STATUS } from "../../redux/types";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Trash, Clock, CheckCircle, Circle, Play } from "react-bootstrap-icons";
import { getBookTitle, getBooks } from "../../utils/book.utils";

interface Props {
  player: IPlayer;
  adventures: IAdventure[];
  savePlayer: (player: IPlayer) => void;
  saveAdventure: (adventure: IAdventure) => void;
  removeAdventure: (adventure: IAdventure) => void;
}

interface IFormValues {
  bookNumber: number | undefined;
}

const PlayerView: React.FC<Props> = (props: Props) => {
  const [show, setShow] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState({} as IAdventure);

  const handleClose = () => setShow(false);

  const validationSchema = Yup.object().shape({
    bookNumber: Yup.number().required("book is required"),
  });

  const formik = useFormik({
    initialValues: {
      bookNumber: undefined,
    } as IFormValues,
    validationSchema,
    onSubmit: (values) => {
      props.saveAdventure({
        playerId: props.player.id,
        bookNumber: values.bookNumber,
        status: "NOT STARTED",
        actionChart: {},
      } as IAdventure);
    },
  });

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

  function renderTooltip(props, message: string) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

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

  const handleRemoveAdventure = () => {
    props.removeAdventure(selectedAdventure);
    setShow(false);
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

  const renderProgress = () => {
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
                  <Col xs="1">{ad.bookNumber}</Col>
                  <Col xs="8">{getBookTitle(+ad.bookNumber)}</Col>
                  <Col xs="6" md="1">
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={(props) => renderTooltip(props, "Continue")}
                    >
                      <Button
                        variant="outline-primary"
                        href={`/player/${props.player.id}/adventure/${ad.bookNumber}`}
                      >
                        <Play />
                      </Button>
                    </OverlayTrigger>
                  </Col>
                  <Col xs="6" md="1">
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

  return (
    <>
      {props.player !== undefined && (
        <Container>
          <h4 className="mt-3">{props.player.name}</h4>
          <hr />
          <h5>Progress</h5>
          {renderProgress()}
          <hr />
          <h5>New Adventure</h5>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="bookNumber">
              <Form.Label>Select Book</Form.Label>
              <Form.Control
                as="select"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.bookNumber}
                value={formik.values.bookNumber}
              >
                <option value="" label="Select a book" />
                {getBooks(props.adventures).map((book) => (
                  <option value={book.bookNumber} key={book.title}>
                    {book.bookNumber} - {book.title}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.bookNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Add</Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default PlayerView;
