import React from 'react';
import { Container, Button, Table, Form, Label, FormGroup, Input } from 'reactstrap';

class Sets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            set: '',
            dataLoaded: false,
            editingSetName: false,
            newSetName: '',
            canPressSubmitButton: true
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

    handleEdit = () => {
        this.setState({editingSetName: true});
    }

    handleChange = (event) => {
        this.setState({newSetName: event.target.value}, () => {
            if (this.state.newSetName !== '') {
                this.setState({canPressSubmitButton: true});
            } else {
                this.setState({canPressSubmitButton: false});
            }
        });
    }

    updateSetName = async () => {
        try {
            const response = await fetch('/api/sets/' + this.props.match.params.id, {
                method: 'put',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    name: this.state.newSetName
                })
            });
            const set = this.state.set;
            set['name'] = this.state.newSetName;

            if (response.status === 201) {
                this.setState({set: set, editingSetName: false});
            }
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    handleSave = () => {
        this.updateSetName();
    }

    render () {
        const dataLoaded = this.state.dataLoaded;
        const editingSetName = this.state.editingSetName;
        const canPressSubmitButton = this.state.canPressSubmitButton;

        return (
            <Container>
                {dataLoaded ? (
                    <section className="set">
                        <div className="set__top">
                            {editingSetName ? (
                                <Form inline className="set__edit-form">
                                    <FormGroup className="mr-2 mr-sm-2 mb-sm-0">
                                        <Input type="text" name="set" id="inputSetName" defaultValue={this.state.set.name} onChange={this.handleChange} />
                                    </FormGroup>
                                    {canPressSubmitButton ? (
                                        <Button color="success" onClick={() => this.handleSave()}>Save</Button>
                                    ) : (
                                        <Button color="success" disabled>Save</Button>
                                    )}
                                    &nbsp;<Button color="light" onClick={() => this.setState({editingSetName: false})}><span className="oi oi-circle-x"></span></Button>
                                </Form>
                            ) : (
                                <h2 className="set__title">{this.state.set.name}</h2>
                            )}

                            {editingSetName ? (
                                <nav className="set__options">
                                    <Button color="primary" disabled>Learn</Button>{' '}
                                    <Button color="warning" disabled>Edit</Button>{' '}
                                    <Button color="danger" disabled>Delete</Button>
                                </nav>
                            ) : (
                                <nav className="set__options">
                                    <Button color="primary">Learn</Button>{' '}
                                    <Button color="warning" onClick={() => this.handleEdit()}>Edit</Button>{' '}
                                    <Button color="danger">Delete</Button>
                                </nav>
                            )}
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
