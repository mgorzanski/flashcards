import React from 'react';
import { Form, Label, FormGroup, Input, Button } from 'reactstrap';

class AddWord extends React.Component {
    render() {
        return (
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
        );
    }
}

export default AddWord;
