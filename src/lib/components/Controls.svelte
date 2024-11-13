<script lang="ts">
  import {
    show_rulers,
    is_currently_playing,
    controls_width,
    mobile_menu_active
  } from "$lib/game/settings";
  import { grid, currently_alive, generation } from "$lib/game/data";
  import Play from "$lib/game/Play.svelte";
  import Randomize from "$lib/game/Randomize.svelte";
  import Resize from "$lib/game/Resize.svelte";
  import Toggle from "./Toggle.svelte";
  import Reset from "$lib/game/Reset.svelte";
  import Speed from "$lib/game/Speed.svelte";
  import DrawTools from "$lib/game/DrawTools.svelte";
</script>

<aside bind:offsetWidth={$controls_width} class:mobile_menu_active={$mobile_menu_active}>
  <div class="controls">
    <div class="item play">
      <Play />
    </div>
    <div class="item">
      <div class="spread">
        <div>generation</div>
        <div>{$generation}</div>
      </div>
      <div class="spread">
        <div>cells</div>
        <div>{$grid.columns * $grid.rows}</div>
      </div>
      <div class="spread">
        <div>alive</div>
        <div>{$currently_alive}</div>
      </div>
      <div class="spread">
        <div>dead</div>
        <div>{$grid.columns * $grid.rows - $currently_alive}</div>
      </div>
    </div>

    <div class="item">
      <div class="title">Speed</div>
      <Speed />
    </div>

    <div class="item">
      <div class="title">Draw Tools</div>
      <DrawTools />
    </div>
    <div class="item">
      <div class="title">Randomize</div>
      <Randomize />
    </div>
    <div class="item">
      <div class="title">Reset Game</div>
      <Reset />
    </div>
    <div class="item">
      <div class="title">Cell Size</div>
      <Resize />
    </div>
    <div class="item">
      <div class="title">Show Rulers</div>
      <Toggle on:switch={() => ($show_rulers = !$show_rulers)} value={$show_rulers} />
    </div>
    <div class="item hide_mobile">
      <div class="title">Keyboard Controls</div>
      <div class="key">
        <kbd>space</kbd>
        <div>
          {#if $is_currently_playing}
            pause
          {:else}
            play
          {/if}
        </div>
      </div>
      <div class="key">
        <kbd>right arrow</kbd>
        <div>single gen.</div>
      </div>
      <div class="key">
        <kbd>r</kbd>
        <div>rotate shape</div>
      </div>
    </div>
  </div>
</aside>

<style>
  aside {
    width: 300px;
    min-width: 300px;
    border-right: 1px solid var(--accent);
    overflow-y: auto;
  }

  .controls {
    padding: 1rem;
    display: flex;
    flex-flow: column;
    gap: 1.5rem;
  }

  .item {
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
  }

  .spread {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    justify-content: space-between;
  }

  .title {
    font-weight: bold;
    color: var(--secondary);
  }

  .key {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
  }

  kbd {
    border: 1px solid var(--muted);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    min-width: 1.5rem;
    text-align: center;
    color: var(--secondary);
  }

  @media (max-width: 768px) {
    aside {
      position: absolute;
      top: 100%;
      /* border-top: 1px solid var(--accent); */
      width: 100%;
      border-right: none;
      background: var(--background);
      z-index: 2;
      padding-bottom: 5rem;
    }
    aside.mobile_menu_active {
      top: 50px;
      height: calc(100% - 50px);
    }

    .hide_mobile {
      display: none;
    }

    .play {
      position: fixed;
      bottom: 0;
      left: 0;
      background: var(--background);
      border-top: 1px solid var(--accent);
      padding: 1rem 5rem 1rem 1rem;
      width: 100%;
      z-index: 10;
    }
  }
</style>
