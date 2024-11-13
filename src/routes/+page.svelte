<script lang="ts">
  import { game, game_loaded } from "$lib/game/data";
  import Grid from "$lib/game/Grid.svelte";
  import Controls from "$lib/components/Controls.svelte";
</script>

{#if $game_loaded}
  <Controls />
{/if}
<Grid />
