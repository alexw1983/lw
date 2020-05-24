import React, { useState } from "react";
import { IAdventure } from "../../redux/state";
import { getBookTitle } from "../../utils/book.utils";
import { Button, Col, Row, Container } from "react-bootstrap";
import { ImportStep } from "./new-adventure/import-step";
import { StatsStep } from "./new-adventure/stats-step";
import { RandomNumberTable } from "../shared/random-number-table";
import { DisciplinesStep } from "./new-adventure/disciplines-step";
import { NewAdventure } from "./new-adventure/new-adventure";

interface Props {
  adventure: IAdventure;
}

const AdventureView = (props: Props) => {
  const [showNewAdventureForm, setShowNewAdventureForm] = useState(false);

  const renderHeading = () => {
    return (
      <h1>
        {props.adventure.bookNumber} {getBookTitle(+props.adventure.bookNumber)}
      </h1>
    );
  };

  const renderStart = () => {
    switch (props.adventure.status) {
      case "COMPLETE":
        return (
          <Button onClick={() => setShowNewAdventureForm(true)}>Reset</Button>
        );
      case "IN PROGRESS":
        return <h2>Action Chart</h2>;
      case "NOT STARTED":
        return (
          <Button onClick={() => setShowNewAdventureForm(true)}>
            Get Started
          </Button>
        );
    }
  };

  return (
    <Container>
      {props.adventure && (
        <>
          {renderHeading()}
          <hr />
          {!showNewAdventureForm && renderStart()}
          <hr />
          {showNewAdventureForm && <NewAdventure />}
        </>
      )}
    </Container>
  );
};

export default AdventureView;
