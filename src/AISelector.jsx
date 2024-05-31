// @ts-check

/**
 * @typedef {import('./types').AI} AI
 */

/**
 * AISelector Component
 * @param {{ selected: AI, ais : AI[], onSelect: (newAIName: string, idx: number) => void, idx: number }} props
 */
import React from 'react';

export const AISelector = ({ selected, ais, onSelect, idx, allAIS }) => {
  return (
    <select
      value={selected.name}
      onChange={(e) => onSelect(e.target.value, idx)}
    >
      {allAIS.map((ai) => (
        <option key={ai.name} value={ai.name}>
          {ai.name}
        </option>
      ))}
    </select>
  );
};