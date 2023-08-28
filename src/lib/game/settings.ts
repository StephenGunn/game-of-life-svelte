import {
    writable
} from "svelte/store"

export const show_coords = writable(false)
export const show_rulers = writable(true)
export const is_draw = writable(true)
export const is_currently_playing = writable(false)
export const is_fast = writable(true)

// used for resizing... keeping here incase i need it later
export const step = 5