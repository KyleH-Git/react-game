const Player = (props) => {

    const handleClick = (event) => {

        props.playerMove(event.target.name);
    }

    return (
        <>
        <h1>player</h1>
        <p>{props.playerInfo.playerName} {props.playerInfo.playerColor} {props.playerInfo.playerHitpoints}</p>
        <button name="high" onClick={handleClick}>High</button>
        <button name="mid" onClick={handleClick}>Mid</button>
        <button name="low" onClick={handleClick}>Low</button>
        </>
    )
}

export default Player;