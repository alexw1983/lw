import React, { useState } from "react";
import { IPlayer, IAdventure, ADVENTURE_STATUS } from "../../redux/state";
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
import { Link } from "react-router-dom";
import { Books } from "../../data/books";
import { getBookTitle } from "../../utils/book.utils";

interface Props {
  player: IPlayer;
  savePlayer: (player: IPlayer) => void;
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
      props.savePlayer(
        Object.assign({}, props.player, {
          adventures: [
            ...props.player.adventures,
            {
              bookNumber: values.bookNumber,
              status: "NOT STARTED",
              actionChart: {},
            } as IAdventure,
          ],
        })
      );
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

  const getIcon = (status: ADVENTURE_STATUS) => {
    switch (status) {
      case "IN PROGRESS":
        return <Clock />;
      case "NOT STARTED":
        return <Circle />;
      case "COMPLETE":
        return <CheckCircle />;
      default:
        return null;
    }
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

  const handleRemoveAdventure = () => {
    const newPlayer = Object.assign({}, props.player, {
      adventures: props.player.adventures.filter(
        (x) => x.bookNumber !== selectedAdventure.bookNumber
      ),
    });

    props.savePlayer(newPlayer);

    setShow(false);
  };

  const getBooks = (player: IPlayer) => {
    return Books.filter(
      (x) =>
        !player.adventures.map((ad) => +ad.bookNumber).includes(x.bookNumber)
    ).sort((s, t) => s.bookNumber - t.bookNumber);
  };

  return (
    <>
      {props.player !== undefined && (
        <Container>
          <h4 className="mt-3">{props.player.name}</h4>
          <hr />
          <h5>Progress</h5>
          <ListGroup>
            {props.player.adventures
              .sort((a, b) => a.bookNumber - b.bookNumber)
              .map((ad, idx) => (
                <ListGroupItem
                  key={`${ad.bookNumber}_${idx}`}
                  variant={getVariant(ad.status)}
                >
                  <Row>
                    <Col xs="1">{ad.bookNumber}</Col>
                    <Col>{getBookTitle(+ad.bookNumber)}</Col>
                    <Col xs="1">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => renderTooltip(props, ad.status)}
                      >
                        <Button className="icon-button" variant="link">
                          {getIcon(ad.status)}
                        </Button>
                      </OverlayTrigger>
                    </Col>
                    <Col xs="1">
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => renderTooltip(props, "Continue")}
                      >
                        <Link
                          to={`/player/${props.player.id}/adventure/${ad.bookNumber}`}
                        >
                          <Play />
                        </Link>
                      </OverlayTrigger>
                    </Col>
                    <Col xs="1">
                      <Button
                        className="icon-button"
                        variant="link"
                        onClick={(evt) => handleShow(evt, ad)}
                      >
                        <Trash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
          </ListGroup>
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
                {getBooks(props.player).map((book) => (
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
        </Container>
      )}
    </>
  );
};

export default PlayerView;
