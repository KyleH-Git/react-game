import { useState } from "react";

const PlayerForm = (props) => {

    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple'
    ]

    const [formData, setFormData] = useState({
        playerName: '',
        playerColor: '',
    });
 
    const formHasMissingData = !Object.values(formData).every(Boolean);

    const handleChange = (event) =>{
        setFormData({...formData, playerName:event.target.value});
    }

    const handleClick = (event) => {
        event.preventDefault();
        setFormData({...formData, playerColor: event.target.value});
    }

    const handleSubmit = (event) => {
        props.setPlayerInfo({playerName: formData.playerName, playerColor: formData.playerColor, playerHitpoints: 100, playerAttack: ''})
        props.setGameState({level: 0, init: true});
    }

    return(
        <>
        <h1>playerform</h1>
        <h2>Create your fighter!</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="playerName">Player Name:</label>
            <input
                id="playerName"
                type="text"
                name="playerName"
                value={formData.playerName}
                onChange={handleChange}
            />
            <label htmlFor="playerColor">Player Color:</label>
            {colors.map((color, index) => {
                return (
                    <div style={{backgroundColor: color, color: "black"}}>{color}<br></br>
                    <button name={color} value={color} onClick={handleClick}>Add</button></div>
                )
            })}
            <button type="submit" disabled={formHasMissingData}>Submit</button>
        </form>
        <p>{formData.playerName}  {formData.playerColor}</p>
        </>
    );
};

export default PlayerForm;