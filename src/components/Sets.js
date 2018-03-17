import React from 'react';
import { Container, Button, Table, Form, Label, FormGroup, Input } from 'reactstrap';

class Sets extends React.Component {
    render () {
        return (
            <Container>
                <section className="set">
                    <div className="set__top">
                        <h3>set.name</h3>
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
                                    <td><span class="oi oi-pencil" aria-hidden="true"></span>{' '}<span class="oi oi-trash" aria-hidden="true"></span></td>
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
            </Container>
        );
    }
}

export default Sets;