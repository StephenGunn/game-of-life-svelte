<script lang="ts">
  import { game, grid } from "./data";

  let button: HTMLButtonElement;
  const set_random = () => {
    // we only want a 20% chance of the cell to be alive
    // or too many cells happen and everything dies too fast :(
    // create our randomized board in fresh var in row -> column standard
    let randomized_game: (0 | 1)[][];
    randomized_game = new Array($grid.rows);
    for (let row = 0; row < $grid.rows; row++) {
      randomized_game[row] = new Array($grid.columns);
    }

    for (let row = 0; row < $grid.rows; row++) {
      for (let column = 0; column < $grid.columns; column++) {
        randomized_game[row][column] = Math.random() < 0.8 ? 0 : 1;
      }
    }

    // finalize the random
    $game = randomized_game;
  };
</script>

<button on:click={set_random} bind:this={button}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
    ><rect width="256" height="256" fill="none" /><path
      d="M32,72H55.06a64,64,0,0,1,52.08,26.8l41.72,58.4A64,64,0,0,0,200.94,184H232"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /><polyline
      points="208 48 232 72 208 96"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /><polyline
      points="208 160 232 184 208 208"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /><path
      d="M147.66,100.47l1.2-1.67A64,64,0,0,1,200.94,72H232"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /><path
      d="M32,184H55.06a64,64,0,0,0,52.08-26.8l1.2-1.67"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    /></svg
  > Randomize Cells
</button>

<style>
  button svg {
    width: 1.1rem;
    height: 1.1rem;
  }
</style>
