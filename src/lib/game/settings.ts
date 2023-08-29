import { writable } from "svelte/store"

export const speed_range = [500, 350, 250, 150, 80, 40]
export const speed = writable(3)
export const show_coords = writable(false)
export const show_rulers = writable(false)
export const is_currently_playing = writable(false)

// used for resizing... keeping here incase i need it later
export const step = 5