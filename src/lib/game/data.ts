// game data, try to avoid complex data for performance concerns
import { writable, type Writable, derived } from "svelte/store";

// board size in pixels so we can calculate how many cells to inti the game with
export const container = writable({
    w: 0,
    h: 0
})

// cell size in pixels
export const cell_size = writable(30)
export const cell_min_size = writable(30)

// derived store calculates our grid
export const grid = derived(
    [container, cell_size],
    ([$container, $cell_size]) => ({
        // two are subtracted from total columns for layout & bug fix
        columns: Math.floor($container.w / $cell_size) - 2,
        // one is subtracted for same reason as above
        rows: Math.floor($container.h / $cell_size) - 1,
        pixel_w: Math.floor($container.w / $cell_size) * $cell_size,
        pixel_h: Math.floor($container.h / $cell_size) * $cell_size,
        // cell manipulations are repeated here
        orphaned_w: ($container.w % $cell_size) + ($cell_size * 2),
        orphaned_h: ($container.h % $cell_size) + $cell_size
    })
)

// game state in a 2d array, we don't manipulate it here
export const game: Writable<(0|1)[][]> = writable()

// how many cells are currently alive?
export const currently_alive = derived(
    [game, grid],
    ([$game, $grid]) => {
        let alive = 0
        if(!$game || !$game.length) return alive
        for (let x = 0; x < $grid.columns; x++) {
            for (let y = 0; y < $grid.rows; y++) {
                if($game[x][y] === 1) alive++
            }
        }
        return alive
    }
)