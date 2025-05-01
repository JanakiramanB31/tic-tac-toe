import { useState } from "react";
export default function Player({ initialName, symbol, isActive, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    function handleEdit() {
      setIsEditing(editing => !editing);
      if (isEditing) {
        onEdit(symbol, playerName);
      }
    }
    function handleChange(event) {
      setPlayerName(event.target.value);
      pm
    }
  return (
    <li className={isActive ? 'active' : ''}>
    <span className="player">
    {!isEditing &&  <span className="player-name">{playerName}</span>}
    {isEditing &&  <input type="text" value={playerName} name='name' onChange={handleChange}/>}
      <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEdit}>{isEditing ? 'Save': 'Edit'}</button>
    </li>
  )
}