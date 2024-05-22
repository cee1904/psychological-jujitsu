// @ts-check

/**
 * @typedef {import('./types').AI} AI
 */

/**
 * AISelector Component
 * @param {{ selected: AI, ais : AI[] }} props
 */
import React from 'react'
export const AISelector = ({selected, ais}) => {
  (<select>
    {ais.map(
      (ai)=><option value={ai.name}>{ai.name}</option>
    )}
  </select>)
}