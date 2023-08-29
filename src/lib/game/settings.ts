import { writable } from "svelte/store"

// basic game settings
export const speed_range = [500, 350, 250, 150, 80, 40] // ms
export const speed = writable(5)
export const show_rulers = writable(false)
export const is_currently_playing = writable(false)
export const draw_mode = writable('free')

// used for resizing... keeping here incase i need it later
export const step = 5