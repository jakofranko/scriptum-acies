import React from 'react';
import scriptureFetch from '../utils/scriptureApiCall';

class Bibles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bibles: []
        };
    }

    componentDidMount() {
        scriptureFetch('bibles', { language: 'eng' })
            .then(body => {
                this.setState({
                    bibles: body.data
                });
            })
            .catch(e => {
                throw Error("there was a problem retrieving the JSON");
            });
    }

    render() {
        return (
            <div id="bibles">
                <label htmlFor="bible-translation">Bible</label>
                <br />
                {
                    this.state.bibles.length === 0
                    ? <p>Loading Bibles...</p>
                    : (
                        <select name="bible-translation" id="bible-translation" onChange={this.props.handleBibleChange}>
                            <option value="">Select Translation</option>
                            {this.state.bibles.map(bible => <option key={bible.id} value={bible.id}>{bible.name}</option>)}
                        </select>
                    )
                }
            </div>
        );
    }
}

export default Bibles;
