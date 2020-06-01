import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

interface Props {
  complete: boolean;
  importPrev: boolean | undefined;
  setImport: (importPrev: boolean) => void;
}

export const ImportStep = (props: Props) => {
  const [importPrevious, setImportPrevious] = useState(!!props.importPrev);

  return (
    <>
      <Form.Check
        inline
        type={"checkbox"}
        name="import-prev"
        id="import-prev-yes"
        label="Import Previous"
        checked={importPrevious}
        disabled={props.complete}
        onChange={() => setImportPrevious(!importPrevious)}
      />
      {!props.complete && (
        <Row className="mt-3">
          <Col>
            <Button onClick={() => props.setImport(importPrevious)}>
              Next
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};
