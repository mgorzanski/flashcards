import React from 'react';
import { Jumbotron, Container, Card, CardTitle, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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

    deleteSet = async (setId) => {
        try {
            const response = await fetch('/api/sets/' + setId, {
                  method: 'delete',
                  headers: new Headers({
                      'Content-Type': 'application/json'
                  })
            });
            const json = await response.json();
            console.log(json);
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    render () {
        const sets = this.state.sets.map((set) =>
            <ListGroupItem className="d-inline-flex flex-row justify-content-between align-items-center" tag={Link} to={"/sets/" + set._id} action key={set._id}>
                {set.name}
            </ListGroupItem>
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
                        <CardTitle className="clearfix">
                            <div className="float-left">List of sets:</div>
                            <div className="float-right">
                                <Button tag={Link} to="/sets/new" outline color="success">Add new</Button>
                            </div>
                        </CardTitle>
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
