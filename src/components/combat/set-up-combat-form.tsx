import React from "react";
import { Button, Form } from "react-bootstrap";
import { IEnemy } from "../../redux/types";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  saveEnemy: (enemy: IEnemy) => void;
}

const SetUpCombatForm = (props: Props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    endurancePoints: Yup.number().required("Endurance Points is required"),
    combatSkill: Yup.number().required("Combat Skill is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      endurancePoints: ("" as unknown) as number,
      combatSkill: ("" as unknown) as number,
      immuneToMindblast: false,
      undead: false,
      evadeAfter: ("" as unknown) as number,
    } as IEnemy,
    validationSchema,
    onSubmit: (values: IEnemy) => {
      props.saveEnemy({
        ...values,
        currentEndurancePoints: values.endurancePoints,
      });
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="narrow-form">
      <h5>Set up combat</h5>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.name}
          value={formik.values.name}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="combatSkill">
        <Form.Label>Combat Skill</Form.Label>
        <Form.Control
          type="number"
          name="combatSkill"
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.combatSkill}
          value={formik.values.combatSkill}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.combatSkill}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="endurancePoints">
        <Form.Label>Endurance Points</Form.Label>
        <Form.Control
          type="number"
          name="endurancePoints"
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.endurancePoints}
          value={formik.values.endurancePoints}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.endurancePoints}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="immuneToMindblast">
        <Form.Check
          type="checkbox"
          name="immuneToMindblast"
          label="Immune to mindblast"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="undead">
        <Form.Check
          type="checkbox"
          name="undead"
          label="undead"
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="evadeAfter">
        <Form.Label>Evade after how many rounds</Form.Label>
        <Form.Control
          type="number"
          name="evadeAfter"
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.evadeAfter}
          value={formik.values.evadeAfter}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.evadeAfter}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Add Enemy</Button>
    </Form>
  );
};

export default SetUpCombatForm;
