import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { KaiDisciplines } from "../../../data/disciplines";
import { KaiDiscipineId, IAdventure } from "../../../redux/types";
import { getWeaponName } from "../../../utils/weapon.utils";

interface Props {
  maxDisciplines: number;
  importPrevious: boolean;
  mostRecentAdventure: IAdventure;
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
                      {`${discipline.name} ${
                        discipline.weaponNumber
                          ? "(" + getWeaponName(discipline.weaponNumber) + ")"
                          : ""
                      }`}
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
          {!props.complete && (
            <>
              <h5>Pick {props.maxDisciplines} disciplines</h5>
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
                              ? `(${getWeaponName(props.weaponSkillNumber)})`
                              : ""
                          }`}
                          type="checkbox"
                          disabled={
                            props.complete ||
                            (formik.values.disciplines.length ===
                              props.maxDisciplines &&
                              !formik.values.disciplines.includes(
                                discipline.id
                              )) ||
                            (props.importPrevious &&
                              props.mostRecentAdventure.actionChart.kaiDiscipines
                                .map((x) => x.id)
                                .includes(discipline.id))
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
