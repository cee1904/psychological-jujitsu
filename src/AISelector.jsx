// @ts-check

/**
 * @typedef {import('./types').AI} AI
 */

/**
 * AISelector Component
 * @param {{ selected: AI, ais : AI[] }} props
 */
import React from 'react'
export const AISelector = ({selected, ais, onSelect}) => {
  (<select
    value={selected}
    onChange={e => onSelect(e.target.value)}>


    {ais.map(
      (ai)=><option value={ai.name}>{ai.name}</option>
    )}
  </select>)
  
}