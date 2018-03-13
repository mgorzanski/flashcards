import React from 'react';
import { Jumbotron, Container, Card, CardTitle, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: []
        }
    }

    getSets = async () => {
        try {
            const response = await fetch('/api/sets', {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            const json = await response.json();
            this.setState({sets: json.results});
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    componentDidMount = () => {
        this.getSets();
    }

    render () {
        const sets = this.state.sets.map((set) =>
            <ListGroupItem tag="a" href={"/sets/" + set._id} action key={set._id}>{set.name}</ListGroupItem>
        );

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
                            {sets}
                        </ListGroup>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default Main;