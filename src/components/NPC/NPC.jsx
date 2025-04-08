const NPC = (props) => {
    return (
        <>
        <h1>NPC</h1>
        {console.log(props)}
        {props.npcData.map((npc, index) => {
            return(
                index === props.level ? <div>{npc.name} {npc.hitpoints} {npc.attackStyle} {npc.color}</div> : <p></p>
            )
        })}
        </>
    );
};

export default NPC;