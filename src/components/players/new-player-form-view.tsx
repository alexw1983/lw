import React from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { IPlayer } from "../../redux/types";
import { generateNewPlayer } from "../../utils/player.utils";

interface IFormValues {
  playerName: string;
}

interface Props {
  savePlayer: (player: IPlayer) => void;
}

const validationSchema = Yup.object().shape({
  playerName: Yup.string().required("player name is required"),
});

const NewPlayerFormView = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      playerName: "",
    } as IFormValues,
    validationSchema,
    onSubmit: (values) => {
      props.savePlayer(generateNewPlayer(values.playerName));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group controlId="playerName">
        <Form.Label>Player Name</Form.Label>
        <Form.Control
          isValid={formik.touched.playerName && !formik.errors.playerName}
          isInvalid={!!formik.errors.playerName}
          type="text"
          placeholder="Please enter the player's name"
          onChange={formik.handleChange}
          value={formik.values.playerName}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.playerName}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default NewPlayerFormView;
