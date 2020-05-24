import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { KaiDisciplines, KaiDiscipineId } from "../../../data/disciplines";

interface Props {
  complete: boolean;
  weaponSkillNumber: number | undefined;
  kaiDisciplines: KaiDiscipineId[];
  setDisciplines: (disciplines: any[]) => void;
}

export const DisciplinesStep = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      disciplines: props.kaiDisciplines,
    },
    validate: (values: { disciplines: any[] }) => {
      props.setDisciplines(values.disciplines);
    },
    onSubmit: (values) => {},
    validateOnChange: true,
  });

  const getWeaponName = () => {
    switch (props.weaponSkillNumber) {
      case 0:
        return "Dagger";
      case 1:
        return "Spear";
      case 2:
        return "Mace";
      case 3:
        return "Short Sword";
      case 4:
        return "Warhammer";
      case 5:
        return "Sword";
      case 6:
        return "Axe";
      case 7:
        return "Sword";
      case 8:
        return "QuarterStaff";
      case 9:
        return "Broad Sword";
      default:
        return "";
    }
  };

  return (
    <>
      <Row>
        <Col>
          {props.complete && (
            <>
              <h5>Kai Disciplines</h5>
              <Row>
                {KaiDisciplines.filter((x) =>
                  props.kaiDisciplines.includes(x.id)
                ).map((discipline, i) => {
                  return (
                    <Col xs={6} md={2} key={`discipline_list_${i}`}>
                      {discipline.name}
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
          {!props.complete && (
            <>
              <h5>Pick 5 disciplines</h5>
              <Form>
                <Row>
                  {KaiDisciplines.map((discipline) => {
                    return (
                      <Col
                        md={{ span: 4, offset: 2 }}
                        xs={{ span: 6, offset: 4 }}
                        className="mb-3"
                        key={`discipline-row-${discipline.id}`}
                      >
                        <Form.Check
                          className="float-left"
                          key={`discipline-${discipline.id}`}
                          label={`${discipline.name} ${
                            discipline.id === "weapon-skill"
                              ? `(${getWeaponName()})`
                              : ""
                          }`}
                          type="checkbox"
                          disabled={
                            props.complete ||
                            (formik.values.disciplines.length === 5 &&
                              !formik.values.disciplines.includes(
                                discipline.id
                              ))
                          }
                          checked={props.kaiDisciplines.includes(discipline.id)}
                          name="disciplines"
                          id={`discipline-${discipline.id}`}
                          value={discipline.id}
                          onChange={formik.handleChange}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
