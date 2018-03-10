import React from 'react';
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

class AddSet extends React.Component {
    render() {
        return (
            <Container>
                <Card>
                    <CardHeader>Add a new set</CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>                    
                                <Label for="inputName" sm={1}>Name</Label>
                                <Col sm={5}>
                                    <Input type="text" name="name" id="inputName" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 5, offset: 1}}>
                                    <Button>Submit</Button>
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