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
import { Trash, Play } from "react-bootstrap-icons";
import { getBookTitle, getBooks } from "../../utils/book.utils";
import PlayerProgress from "./player-progress";

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

  return (
    <>
      {props.player !== undefined && (
        <Container>
          <h4 className="mt-3">{props.player.name}</h4>
          <hr />
          <h5>Progress</h5>
          <PlayerProgress player={props.player}
            adventures={props.adventures}
            removeAdventure={props.removeAdventure} />
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
