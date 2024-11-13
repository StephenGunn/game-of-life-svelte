<script lang="ts">
  import { game, grid, generation } from "./data";

  let button: HTMLButtonElement;
  const reset = () => {
    // we only want a 20% chance of the cell to be alive
    // or too many cells happen and everything dies too fast :(
    // create our randomized board in fresh var in row -> column standard
    let reset_game: (0 | 1)[][];
    reset_game = new Array($grid.rows);
    for (let row = 0; row < $grid.rows; row++) {
      reset_game[row] = new Array($grid.columns);
    }

    for (let row = 0; row < $grid.rows; row++) {
      for (let column = 0; column < $grid.columns; column++) {
        reset_game[row][column] = 0;
      }
    }

    // finalize the random
    $generation = 0;
    $game = reset_game;
  };
</script>

<button on:click={reset} bind:this={button}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
    ><rect width="256" height="256" fill="none" /><polyline
      points="24 56 24 104 72 104"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /><path
      d="M67.59,192A88,88,0,1,0,65.77,65.77L24,104"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /></svg
  > Reset
</button>

<style>
  button svg {
    width: 1.1rem;
    height: 1.1rem;
  }
</style>
