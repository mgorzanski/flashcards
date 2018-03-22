import React from 'react';
import { Form, Label, FormGroup, Input, Button } from 'reactstrap';

class AddWord extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            definition: '',
            explanation: '',
            canPressSubmitButton: false
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetch('/api/sets/' + this.props.setId + '/words', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    word: {definition: this.state.definition, explanation: this.state.explanation}
                })
            });
            this.setState({definition: '', explanation: '', canPressSubmitButton: false});
            this.props.refreshWordsList();
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value}, () => {
            if (this.state.definition !== '' && this.state.explanation !== '') {
                this.setState({canPressSubmitButton: true});
            } else {
                this.setState({canPressSubmitButton: false});
            }
        });
    }

    render() {
        const canPressSubmitButton = this.state.canPressSubmitButton;

        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="definitionInput" className="mr-sm-2">Definition</Label>
                    <Input type="text" name="definition" id="definitionInput" value={this.state.definition} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="explanationInput" className="mr-sm-2">Explanation</Label>
                    <Input type="text" name="explanation" id="explanationInput" value={this.state.explanation} onChange={this.handleChange} />
                </FormGroup>
                {canPressSubmitButton ? (
                    <Button color="success">Add</Button>
                ) : (
                    <Button color="success" disabled>Add</Button>
                )}
            </Form>
        );
    }
}

export default AddWord;
