import React from 'react';
import { Table } from 'reactstrap';
import AddWord from './AddWord';

class Words extends React.Component {
    render() {
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
                        <tr>
                            <td>Test word</td>
                            <td>Tłumaczenie</td>
                            <td><span className="oi oi-pencil" aria-hidden="true"></span>{' '}<span className="oi oi-trash" aria-hidden="true"></span></td>
                        </tr>
                    </tbody>
                </Table>
                <AddWord setId={1} userId={1} />
            </React.Fragment>
        );
    }
}

export default Words;
