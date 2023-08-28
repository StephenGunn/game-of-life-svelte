// game data, try to avoid complex data for performance concerns
import { writable, type Writable, derived } from "svelte/store";

// board size in pixels so we can calculate how many cells to inti the game with
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
export const generation = writable(0)

// how many cells are currently alive?
export const currently_alive = derived(
    [game, grid],
    ([$game, $grid]) => {
        let alive = 0
        if (!$game || !$game.length) return alive
        // follow the same draw order, row -> column
        for (let row = 0; row < $grid.rows; row++) {
            for (let column = 0; column < $grid.columns; column++) {
                if($game[row][column] === 1) alive++
            }
        }
        return alive
    }
)

