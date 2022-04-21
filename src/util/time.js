export const seconds = (s) => s * 1000;
export const minutes = (m) => seconds(m * 60);
export const hours = (h) => minutes(h * 60);
export const days = (d) => hours(d * 24);
