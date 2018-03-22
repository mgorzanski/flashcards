import React from 'react';
import { Table, Button, Input } from 'reactstrap';
import AddWord from './AddWord';

class Words extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words: [],
            currentlyEditedWord: '',
            definition: '',
            explanation: '',
            canPressSubmitButton: true
        }
    }

    getWords = async () => {
        try {
            const response = await fetch('/api/sets/' + this.props.setId + '/words', {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            const json = await response.json();
            this.setState({words: json.words});
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    componentDidMount = () => {
        this.getWords();
    }

    deleteWord = async (wordId) => {
        try {
            await fetch('/api/sets/' + this.props.setId + '/words/' + wordId, {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            this.getWords();
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    editWord = (wordId) => {
        this.setState({currentlyEditedWord: wordId});
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

    handleSave = async (wordId) => {
        try {
            await fetch('/api/sets/' + this.props.setId + '/words/' + wordId, {
                method: 'put',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    word: {definition: this.state.definition, explanation: this.state.explanation}
                })
            });
            this.setState({canPressSubmitButton: true, currentlyEditedWord: '', definition: '', explanation: ''});
            this.getWords();
        }
        catch (e) {
            console.log('Error!', e);
        }
    }

    render() {
        const currentlyEditedWord = this.state.currentlyEditedWord;
        const canPressSubmitButton = this.state.canPressSubmitButton;
        const words = this.state.words.map(word =>
            <tr key={word._id}>
                {currentlyEditedWord === word._id ? (
                    <React.Fragment>
                        <td><Input type="text" name="definition" defaultValue={word.definition} onChange={this.handleChange} /></td>
                        <td><Input type="text" name="explanation" defaultValue={word.explanation} onChange={this.handleChange} /></td>
                        <td>
                            {canPressSubmitButton ? (
                                    <Button color="success" onClick={() => this.handleSave(word._id)}>Save</Button>
                            ) : (
                                <Button color="success" onClick={() => this.handleSave(word._id)} disabled>Save</Button>
                            )}
                            &nbsp;<Button color="light" onClick={() => this.setState({currentlyEditedWord: '', canPressSubmitButton: true, definition: '', explanation: ''})}>Cancel</Button>
                        </td>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <td>{word.definition}</td>
                        <td>{word.explanation}</td>
                        <td><span style={{cursor: 'pointer'}} onClick={() => this.editWord(word._id)} className="oi oi-pencil" aria-hidden="true"></span>{' '}<span style={{cursor: 'pointer'}} onClick={() => this.deleteWord(word._id)} className="oi oi-trash" aria-hidden="true"></span></td>
                    </React.Fragment>
                )}
            </tr>
        );

        return (
            <React.Fragment>
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
                        {words}
                    </tbody>
                </Table>
                <AddWord setId={this.props.setId} userId={1} refreshWordsList={this.getWords} />
            </React.Fragment>
        );
    }
}

export default Words;
