// types.d.ts

interface AI {
  name: string; // a cute name
  icon: string; // an image link
  getNextCard: (hand: number[], targets: number[], opponentPlays: number[][]) => number;
}

// Optionally, export the type if you want to import it elsewhere
export type { AI };
