import React from 'react';
import { Jumbotron, Container, Card, CardTitle, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class Main extends React.Component {
    render () {
        return (
            <Container>
                <Jumbotron>
                    <Container>
                        <h1 className="display-3">Flashcards</h1>
                        <p className="lead">A simple app for learning new words and definitions.</p>
                    </Container>
                </Jumbotron>

                <Card>
                    <CardBody>
                        <CardTitle>List of sets:</CardTitle>
                        <ListGroup>
                            <ListGroupItem tag="a" href="#" action>Random set first</ListGroupItem>
                            <ListGroupItem tag="a" href="#" action>Random set first</ListGroupItem>
                            <ListGroupItem tag="a" href="#" action>Random set first</ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default Main;