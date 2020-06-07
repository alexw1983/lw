import * as React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Trash, Plus } from "react-bootstrap-icons";
import { IEquipment } from "../../redux/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

interface Props {
  complete: boolean;
  header: string;
  items: IEquipment[];
  equipmentType: string;
  maxItems: number;
  onAdd?: (item: IEquipment) => void;
  onRemove?: (item: IEquipment) => void;
}

const ActionChartEquipmentList: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = React.useState(false);

  const handleClose = () => {
    setShowForm(false);
    formik.resetForm();
  };

  const handleAddItem = () => {};

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      combatSkillBonus: 0,
      combatSkillBonusVsUndead: 0,
      endurancePointsBonus: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      props.onAdd({
        id: uuidv4(),
        name: values.name,
        type: props.equipmentType,
        description: values.description,
        combatSkillBonus: values.combatSkillBonus,
        combatSkillBonusVsUndead: values.combatSkillBonusVsUndead,
        endurancePointsBonus: values.endurancePointsBonus,
      } as IEquipment);
      handleClose();
    },
  });

  const renderModal = () => {
    return (
      <Modal show={showForm} onHide={handleClose}>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Equipment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.description}
                value={formik.values.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="combatSkillBonus">
              <Form.Label>Combat Skill Bonus</Form.Label>
              <Form.Control
                type="number"
                name="combatSkillBonus"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.combatSkillBonus}
                value={formik.values.combatSkillBonus}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.combatSkillBonus}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="combatSkillBonusVsUndead">
              <Form.Label>Combat Skill Bonus Vs Undead</Form.Label>
              <Form.Control
                type="number"
                name="combatSkillBonusVsUndead"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.combatSkillBonusVsUndead}
                value={formik.values.combatSkillBonusVsUndead}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.combatSkillBonusVsUndead}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="endurancePointsBonus">
              <Form.Label>Endurance Points Bonus</Form.Label>
              <Form.Control
                type="number"
                name="endurancePointsBonus"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.endurancePointsBonus}
                value={formik.values.endurancePointsBonus}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.endurancePointsBonus}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  const filtered = props.items.filter((w) => w.type === props.equipmentType);

  return (
    <>
      <Row>
        <Col>
          <h5 className="mt-3 p-4">
            {`${props.header} (${filtered.length})`}
            {!props.complete && props.onAdd && (
              <Button
                disabled={filtered.length >= props.maxItems}
                className="float-right"
                onClick={() => setShowForm(true)}
              >
                <Plus />
              </Button>
            )}
          </h5>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ListGroup>
            {filtered.map((item, idx) => {
              return (
                <ListGroupItem key={`action-chart-${item.id}-${idx}`}>
                  {item.name}
                  {!props.complete && props.onRemove && (
                    <Button
                      className="float-right"
                      onClick={() => props.onRemove(item)}
                    >
                      <Trash />
                    </Button>
                  )}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>

      {renderModal()}
    </>
  );
};

export default ActionChartEquipmentList;
