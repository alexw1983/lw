import React, { useState } from "react";
import { IAdventure, IActionChart } from "../../redux/types";
import { getBookTitle } from "../../utils/book.utils";
import { Button, Container } from "react-bootstrap";
import { NewAdventure } from "./new-adventure/new-adventure";
import { ActionChart } from "..";

interface Props {
  adventure: IAdventure;
  previousAdventures: IAdventure[];
  saveAdventure: (adventure: IAdventure) => void;
}

const AdventureView = (props: Props) => {
  const [showNewAdventureForm, setShowNewAdventureForm] = useState(false);

  const handleSaveActionChart = (actionChart: IActionChart) => {
    const newAdventure = Object.assign({}, props.adventure, {
      status: "IN PROGRESS",
      actionChart: actionChart,
    });
    props.saveAdventure(newAdventure);
    setShowNewAdventureForm(false);
  };

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
        return (
          <>
            <h2>Action Chart</h2>
            <ActionChart actionChart={props.adventure.actionChart} />
          </>
        );
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
          {showNewAdventureForm && (
            <NewAdventure
              previousAdventures={props.previousAdventures}
              bookNumber={props.adventure.bookNumber}
              saveActionChart={handleSaveActionChart}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default AdventureView;