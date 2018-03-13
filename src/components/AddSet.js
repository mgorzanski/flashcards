import React from 'react';
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

class AddSet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            setName: '',
            canPressSubmitButton: false
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response =  await fetch('/api/sets/' + this.state.setName, {
                method: 'post',
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

        return (
            <Container>
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