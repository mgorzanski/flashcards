import React from 'react';
import { Table } from 'reactstrap';
import AddWord from './AddWord';

class Words extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            words: []
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

    render() {
        const words = this.state.words.map(word =>
            <tr key={word._id}>
                <td>{word.definition}</td>
                <td>{word.explanation}</td>
                <td><span style={{cursor: 'pointer'}} className="oi oi-pencil" aria-hidden="true"></span>{' '}<span style={{cursor: 'pointer'}} onClick={() => this.deleteWord(word._id)} className="oi oi-trash" aria-hidden="true"></span></td>
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
