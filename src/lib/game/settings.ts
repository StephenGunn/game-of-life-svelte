import { writable } from "svelte/store";

// basic game settings
export const speed_range = [500, 350, 250, 150, 80, 40]; // ms
export const speed = writable(5);
export const show_rulers = writable(false);
export const mobile_menu_active = writable(false);
export const is_currently_playing = writable(false);
export const draw_mode = writable("free");
export const controls_width = writable(300);
export const header_height = writable(50);

// used for resizing... keeping here incase I need it later
export const step = 5;
