import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

interface Props {
  complete: boolean;
  importPrev: boolean | undefined;
  setImport: (importPrev: boolean) => void;
}

export const ImportStep = (props: Props) => {
  const [importPrevious, setImportPrevious] = useState(props.importPrev);

  return (
    <>
      <Form>
        <Form.Group controlId="importFromPrevious">
          <Form.Check
            inline
            type={"checkbox"}
            name="import-prev"
            id="import-prev-yes"
            label="Import Previous"
            checked={importPrevious}
            disabled={props.complete}
            onClick={() => setImportPrevious(!importPrevious)}
          />
        </Form.Group>
      </Form>
      <Row>
        <Col>
          <Button onClick={() => props.setImport(importPrevious)}>Next</Button>
        </Col>
      </Row>
    </>
  );
};
