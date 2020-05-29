import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  complete: boolean;
  importPrev: boolean | undefined;
  setImport: (importPrev: boolean) => void;
}

export const ImportStep = (props: Props) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Import from Previous ?</Form.Label>
      </Form.Group>
      <Form.Group controlId="importFromPrevious">
        <Form.Check
          inline
          type={"radio"}
          name="import-prev"
          id="import-prev-yes"
          label="Yes"
          disabled={props.complete}
          onClick={() => props.setImport(true)}
        />
        <Form.Check
          inline
          type="radio"
          name="import-prev"
          id="import-prev-no"
          label="No"
          disabled={props.complete}
          onClick={() => props.setImport(false)}
        />
      </Form.Group>
    </Form>
  );
};
