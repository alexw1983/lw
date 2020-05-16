import * as React from "react";
import { IPlayer } from "../../redux/state";
import { ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";

interface Props {
  player: IPlayer;
  savePlayer: (player: IPlayer) => void;
}

interface IFormValues {
  bookNumber: number | undefined;
}

const PlayerView: React.FC<Props> = (props: Props) => {
  const books = [
    { bookNumber: 1, title: "Flight From The Dark" },
    { bookNumber: 2, title: "Fire On The Water" },
    { bookNumber: 3, title: "Caverns Of Kalte" },
    { bookNumber: 4, title: "The Chasm Of Doom" },
    { bookNumber: 5, title: "Shadow On The Sand" },
  ];

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
              status: "IN PROGRESS",
              actionChart: {},
            },
          ],
        })
      );
    },
  });

  return (
    <>
      {props.player !== undefined && (
        <Container>
          <h4 className="mt-3">{props.player.name}</h4>
          <h5>Progress</h5>
          <ListGroup>
            {props.player.adventures.map((ad, idx) => (
              <ListGroupItem key={`${ad.bookNumber}_${idx}`}>
                {ad.bookNumber} -{" "}
                {books.find((x) => x.bookNumber == ad.bookNumber).title}-{" "}
                {ad.status}
              </ListGroupItem>
            ))}
          </ListGroup>
          <hr />
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
                {books.map((book) => (
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
