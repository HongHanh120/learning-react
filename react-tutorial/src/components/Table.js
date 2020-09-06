import React, {Component} from 'react'

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Remove</th>
        </tr>
        </thead>
    )
};

const TableBody = (props) => {
    const rows = props.characters.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={props.removeCharacter.bind(props.characters.name, row.name)}>Delete</button>
                </td>
            </tr>
        )
    });
    return <tbody>{rows}</tbody>
};

const Table = (props) => {
    const {characters, removeCharacter} = props;
    return (
        <table>
            <TableHeader/>
            <TableBody characters={characters}
                       removeCharacter={removeCharacter} />
        </table>
    )
};

export default Table;