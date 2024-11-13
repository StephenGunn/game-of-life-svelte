import { writable, type Writable, derived } from "svelte/store";

type CustomShape = (0 | 1)[][];

// keeping these in the same order as i include them below
const glider_ne: CustomShape = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 0]
];
const glider_se: CustomShape = [
  [1, 0, 0],
  [0, 1, 1],
  [1, 1, 0]
];
const glider_sw: CustomShape = [
  [0, 0, 1],
  [1, 1, 0],
  [0, 1, 1]
];
const glider_nw: CustomShape = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 1]
];

// add gliders to array
export const gliders = [glider_ne, glider_se, glider_sw, glider_nw];

// direction is index of group array
export const shape_direction = writable(1);

// can hold any group of custom shapes
export const active_shape_group: Writable<CustomShape[]> = writable([]);
