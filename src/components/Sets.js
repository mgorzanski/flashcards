import React from 'react';
import { Container, Button, Table, Form, Label, FormGroup, Input } from 'reactstrap';

class Sets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            set: '',
            dataLoaded: false
        }
    }

    getCurrentSet = async () => {
        try {
            const response = await fetch('/api/sets/' + this.props.match.params.id, {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            const json = await response.json();
            if (response.status === 200) {
                this.setState({set: json.set, dataLoaded: true});
            } else {
                console.log(json.message);
            }
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    componentWillMount = () => {
        this.getCurrentSet();
    }

    render () {
        const dataLoaded = this.state.dataLoaded;

        return (
            <Container>
                {dataLoaded ? (
                    <section className="set">
                        <div className="set__top">
                            <h2 className="set__title">{this.state.set.name}</h2>
                            <nav className="set__options">
                                <Button color="primary">Learn</Button>{' '}
                                <Button color="warning">Edit</Button>{' '}
                                <Button color="danger">Delete</Button>
                            </nav>
                        </div>

                        <div className="set__body">
                            <h4>Words</h4>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Definition</th>
                                        <th>Explanation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Test word</td>
                                        <td>Tłumaczenie</td>
                                        <td><span className="oi oi-pencil" aria-hidden="true"></span>{' '}<span className="oi oi-trash" aria-hidden="true"></span></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="definitionInput" className="mr-sm-2">Definition</Label>
                                    <Input type="text" name="definition" id="definitionInput" />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="explanationInput" className="mr-sm-2">Explanation</Label>
                                    <Input type="text" name="explanation" id="explanationInput" />
                                </FormGroup>
                                <Button color="success">Add</Button>
                            </Form>
                        </div>
                    </section>
                ) : ''}
            </Container>
        );
    }
}

export default Sets;
