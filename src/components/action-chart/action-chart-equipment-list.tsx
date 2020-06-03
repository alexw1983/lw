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
import { IEquipment, ILwState } from "../../redux/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

interface Props {
  header: string;
  items: IEquipment[];
  equipmentType: string;
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
    },
    validationSchema,
    onSubmit: (values) => {
      props.onAdd({
        id: uuidv4(),
        name: values.name,
        type: props.equipmentType,
        description: values.description,
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

  return (
    <>
      <Row>
        <Col>
          <h5 className="mt-3 p-4">
            {props.header}
            {props.onAdd && (
              <Button className="float-right" onClick={() => setShowForm(true)}>
                <Plus />
              </Button>
            )}
          </h5>
        </Col>
      </Row>
      {/* <pre>{JSON.stringify(props.items, null, 2)}</pre> */}
      <Row className="mt-3">
        <Col>
          <ListGroup>
            {props.items
              .filter((w) => w.type === props.equipmentType)
              .map((item, idx) => {
                return (
                  <ListGroupItem key={`action-chart-${item.id}-${idx}`}>
                    {item.name}
                    {props.onRemove && (
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
