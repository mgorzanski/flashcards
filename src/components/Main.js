import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

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
            </Container>
        );
    }
}

export default Main;