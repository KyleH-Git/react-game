import { useState } from 'react'
import './App.css';
import Player from './components/Player/Player.jsx';
import NPC from './components/NPC/NPC.jsx';
import PlayerForm from './components/PlayerForm/PlayerForm.jsx'
import GameInfo from './components/GameInfo/GameInfo.jsx'

function App() {
  const [npcData, setNpcData] = useState([
    {
      name: "Archer Thorne",
      hitpoints: 75,
      attackStyle: "High",
      color: "Red"
    },
    {
      name: "Selena Frost",
      hitpoints: 60,
      attackStyle: "Mid",
      color: "Blue"
    },
    {
      name: "Galen Stoneheart",
      hitpoints: 85,
      attackStyle: "High",
      color: "Green"
    },
    {
      name: "Lila Dawn",
      hitpoints: 50,
      attackStyle: "Low",
      color: "Yellow"
    },
    {
      name: "Marek Voss",
      hitpoints: 95,
      attackStyle: "Mid",
      color: "Purple"
    },
    {
      name: "Elyse Blackwood",
      hitpoints: 70,
      attackStyle: "High",
      color: "Orange"
    },
    {
      name: "Jorin Winterfell",
      hitpoints: 80,
      attackStyle: "Low",
      color: "Red"
    },
    {
      name: "Kara Swiftblade",
      hitpoints: 90,
      attackStyle: "Mid",
      color: "Green"
    },
    {
      name: "Drake Ironscale",
      hitpoints: 100,
      attackStyle: "High",
      color: "Blue"
    },
    {
      name: "Vera Shadowmoon",
      hitpoints: 65,
      attackStyle: "Low",
      color: "Purple"
    }
  ]);

  const generateNpcAttack= (style) => {
    let attack = 0;
    if(style=== 'High'){
      attack = Math.random() + 0.2;
    } else if(style === 'Mid') {
      attack = Math.random();
    } else {
      attack = Math.random() - 0.2;
    }

    if(attack <= 0.33){
      return 'high';
    } else if(attack > 0.33 && attack < 0.66){
      return 'mid';
    } else {
      return 'low';
    }
  }

  const attackOutcome = (playerAttack, npcAttack) => {
    let outcome = {
      text: '',
      win: true,
      tie: false,
    };
    if(playerAttack === npcAttack){
      outcome.text = `You both went ${playerAttack}! No damage`
      outcome.tie = true;
    }
    if(playerAttack === 'high'){
      if(npcAttack ==='low'){
        outcome.text = 'You went high and they went low, you lost the fight!'
        outcome.win = false;
      } else if(npcAttack === 'mid'){
        outcome.text = 'You went high and they went mid, you won the fight!'
      }
    } else if (playerAttack === 'mid'){
      if(npcAttack ==='low'){
        outcome.text = 'You went mid and they went low, you lost the fight!'
        outcome.win = false;
      } else if(npcAttack === 'high'){
        outcome.text = 'You went mid and they went high, you won the fight!'
      }
    } else if (playerAttack === 'low'){
      if(npcAttack ==='high'){
        outcome.text = 'You went low and they went high, you lost the fight!'
        outcome.win = false;
      } else if(npcAttack === 'mid'){
        outcome.text = 'You went low and they went mid, you won the fight!'
      }
    }
    return outcome;
  }

  const battle = (outcome) => {
    if(outcome.tie){
      setGameState({...gameState, battle: outcome.text});
    } else if(outcome.win){
      setGameState({...gameState, battle: outcome.text});
      const npcDataCopy = [...npcData];
      npcDataCopy[gameState.level].hitpoints -= 10;
      setNpcData(npcDataCopy);
      if(npcData[gameState.level].hitpoints <= 0){
        setGameState((prevState) => ({...prevState, level: prevState.level + 1}))
      }
    } else {
      setGameState({...gameState, battle: outcome.text});
      setPlayerInfo((prevState) => ({...prevState, playerHitpoints: prevState.playerHitpoints - 1}));
      if(playerInfo.playerHitpoints <= 0){
        setGameState({...gameState, level: -1});
      }
    }
  }

  const [playerInfo, setPlayerInfo] = useState({
    playerName: '',
    playerColor: '',
    playerHitpoints: 100,
    playerAttack: '',
  })

  const [gameState, setGameState] = useState({
    level: 0,
    init: false,
    battle: '',
  });

  const playerMove = (move) => {
    setPlayerInfo({...playerInfo, playerAttack: move});
    const npcAttack = generateNpcAttack(npcData[gameState.level].attackStyle);
    const outcome = attackOutcome(move, npcAttack);
    battle(outcome);
  }

  return (
    <>
    {gameState.init !== true ? 
      <PlayerForm setPlayerInfo={setPlayerInfo} setGameState={setGameState}/>
    :<>
    {gameState.level < 0 ? <h1>You Lose!</h1> : <>
      {gameState.level < 10 ?
      <>
      <GameInfo battleOutcome={gameState.battle}/>
      <Player playerInfo={playerInfo} playerMove={playerMove}/>
      <NPC npcData={npcData} level={gameState.level}/>
      </>
      :
      <h1>You Win!</h1>
    }
    
    </>}
      
    </>}
      
    </>
  )
}

export default App;
