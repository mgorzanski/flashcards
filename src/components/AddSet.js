import React from 'react';
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Col, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

class AddSet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            setName: '',
            canPressSubmitButton: false,
            displaySuccessAlert: false,
            displayDangerAlert: false,
            lastSetId: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/sets', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    name: this.state.setName
                })
            });
            const json = await response.json();
            if(response.status !== 400) {
                this.setState({displayDangerAlert: false, displaySuccessAlert: true, lastSetId: json.lastSetId});
            } else {
                this.setState({displaySuccessAlert: false, displayDangerAlert: true});
            }
        }
        catch (e) {
            this.setState({displaySuccessAlert: false, displayDangerAlert: true});
        }
    }

    handleChange = (event) => {
        this.setState({setName: event.target.value}, () => {
            if (this.state.setName !== '') {
                this.setState({canPressSubmitButton: true});
            } else {
                this.setState({canPressSubmitButton: false});
            }
        });
    }

    render() {
        const canPressSubmitButton = this.state.canPressSubmitButton;
        const displaySuccessAlert = this.state.displaySuccessAlert;
        const displayDangerAlert = this.state.displayDangerAlert;

        return (
            <Container>
                {displaySuccessAlert ? (
                    <Alert color="success">
                        Set added succesfully! <Link to={'/sets/' + this.state.lastSetId}>Add new words</Link> to it.
                    </Alert>
                ) : ''}

                {displayDangerAlert ? (
                    <Alert color="danger">
                        An error occurred.
                    </Alert>
                ) : ''}
                <Card>
                    <CardHeader>Add a new set</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>                    
                                <Label for="inputName" sm={1}>Name</Label>
                                <Col sm={5}>
                                    <Input type="text" name="name" id="inputName" value={this.state.setName} onChange={this.handleChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 5, offset: 1}}>
                                    {canPressSubmitButton ? (
                                        <Button type="submit">Submit</Button>
                                    ) : (
                                        <Button type="submit" disabled>Submit</Button>
                                    )}
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default AddSet;