// game data, try to avoid complex data for performance concerns
import { writable, type Writable, derived } from "svelte/store";

// helpers
export const game_loaded = writable(false)
export const window_width = writable(0)
export const generation = writable(0)

export const mouse_position = writable({
    x: 0,
    y: 0
})

// board size in pixels so we can calculate how many cells to init the game with
export const container = writable({
    w: 0,
    h: 0
})

// cell size in pixels
export const cell_size = writable(20)
export const cell_min_size = writable(20)

// derived store calculates our grid
export const grid = derived(
    [container, cell_size],
    ([$container, $cell_size]) => ({
        // two are subtracted from total columns for desktop, one for mobile
        columns: Math.floor($container.w / $cell_size) - ($container.w > 768 ? 2 : 1),
        // one is subtracted from total rows for desktop, three for mobile
        rows: Math.floor($container.h / $cell_size) - ($container.w > 768 ? 1 : 2),
        pixel_w: Math.floor($container.w / $cell_size) * $cell_size,
        pixel_h: Math.floor($container.h / $cell_size) * $cell_size,
        // cell manipulations are repeated here to help with positioning of the grid
        // the orphanded w is used for the margin on mobile too, to create a nice looking set of margins
        orphaned_w: ($container.w % $cell_size) + ($container.w > 768 ? $cell_size * 2 : $cell_size) - 1,
        orphaned_h: $container.w > 768 ? ($container.h % $cell_size) + $cell_size : ($container.w % $cell_size) + $cell_size - 1
    })
)

// game state in a 2d array, we don't manipulate it here
export const game: Writable<(0|1)[][]> = writable()

// how many cells are currently alive?
export const currently_alive = derived(
    game,
    $game => {
        let alive = 0
        if (!$game || !$game.length) return alive
        // follow the same draw order and count the alive cells, row -> column
        for (let row = 0; row < $game.length; row++) {
            for (let column = 0; column < $game[row].length; column++) {
                if ($game[row][column] === 1) alive++
            }
        }
        return alive
    }
)

export const draw_this_data: Writable<number[][]> = writable([])
