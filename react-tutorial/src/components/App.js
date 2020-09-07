import React, {Component} from "react";
import Table from "./Table";
import Form from "./Form";
import _ from 'lodash'

const characters = [
    {
        name: 'Charlie',
        job: 'Janitor'
    },
    {
        name: 'Mac',
        job: 'Bouncer',
    },
    {
        name: 'Dee',
        job: 'Aspring actress',
    },
    {
        name: 'Dennis',
        job: 'Bartender',
    },
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: characters
        }
    }

    render() {
        const {characters} = this.state;

        return (
            <div className="container">
                <Table
                    characters={characters}
                    removeCharacter={this.removeCharacter.bind(this)} />
                <Form handleSubmit={this.handleSubmit} />
            </div>
        )
    };

    removeCharacter(name) {
        _.remove(this.state.characters, character => character.name === name);
        this.setState({characters: this.state.characters});
    }

    handleSubmit = (character) => {
        this.setState({character: [...this.state.characters, character]})
    };
}

export default App