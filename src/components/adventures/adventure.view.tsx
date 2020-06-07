import React, { useState } from "react";
import { IAdventure, IActionChart } from "../../redux/types";
import { getBookTitle } from "../../utils/book.utils";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { NewAdventure } from "./new-adventure/new-adventure";
import { ActionChart } from "../action-chart";
import { RandomNumberTable } from "../shared/random-number-table";

interface Props {
  adventure: IAdventure;
  previousAdventures: IAdventure[];
  saveAdventure: (adventure: IAdventure) => void;
  takeDamage: (damage: number) => void;
}

const AdventureView = (props: Props) => {
  const [showNewAdventureForm, setShowNewAdventureForm] = useState(false);
  const [showRandom, setShowRandom] = useState(false);
  const [random, setRandom] = useState(undefined);

  const handleSaveActionChart = (actionChart: IActionChart) => {
    const newAdventure = Object.assign({}, props.adventure, {
      status: "IN PROGRESS",
      actionChart: actionChart,
    });
    props.saveAdventure(newAdventure);
    setShowNewAdventureForm(false);
  };

  const handleCompleteAdventure = () => {
    props.saveAdventure(
      Object.assign({}, props.adventure, { status: "COMPLETE" })
    );
  };

  const renderHeading = () => {
    return (
      <>
        <h1>
          {props.adventure.bookNumber}{" "}
          {getBookTitle(+props.adventure.bookNumber)}
        </h1>
        <Row>
          <Col>
            <p>STATUS = {props.adventure.status}</p>
          </Col>
        </Row>
      </>
    );
  };

  const renderStart = () => {
    switch (props.adventure.status) {
      case "COMPLETE":
        return (
          <>
            <h2>Action Chart</h2>
            <hr />
            <Row>
              <Col>
                <div className="d-flex justify-content-end align-items-center">
                  <Button onClick={() => setShowNewAdventureForm(true)}>
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
            <hr />

            <ActionChart
              playerId={props.adventure.playerId}
              bookNumber={props.adventure.bookNumber}
            />
          </>
        );
      case "IN PROGRESS":
        return (
          <>
            <h2>Action Chart</h2>
            <hr />
            <Row>
              <Col>
                <Button
                  onClick={() => handleCompleteAdventure()}
                  className="ml-1 mt-1"
                >
                  Complete
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => setShowNewAdventureForm(true)}
                  className="ml-1 mt-1"
                >
                  Reset
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-primary"
                  className="ml-1 mt-1"
                  href={`/player/${props.adventure.playerId}/adventure/${props.adventure.bookNumber}/combat`}
                >
                  Combat
                </Button>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Button onClick={() => setShowRandom(true)} className="mb-3">
                  Pick a number from the random number table
                </Button>
                <Card>
                  <Card.Body>{random}</Card.Body>
                </Card>
                <RandomNumberTable
                  show={showRandom}
                  onSelect={(r) => {
                    setShowRandom(false);
                    setRandom(r);
                  }}
                />
              </Col>
            </Row>
            <hr />
            <ActionChart
              playerId={props.adventure.playerId}
              bookNumber={props.adventure.bookNumber}
            />
          </>
        );
      case "NOT STARTED":
        return (
          <>
            <Button onClick={() => setShowNewAdventureForm(true)}>
              Get Started
            </Button>
          </>
        );
    }
  };

  return (
    <Container>
      {props.adventure && (
        <>
          {renderHeading()}
          <hr />
          <Row>
            <Col>
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  variant="outline-primary"
                  href={`/player/${props.adventure.playerId}`}
                >
                  {"< Back"}
                </Button>
              </div>
            </Col>
          </Row>
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
