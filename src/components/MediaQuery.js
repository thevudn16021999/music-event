import { createMedia } from "@artsy/fresnel";

const MediaQuery = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

export const { Media, MediaContextProvider, createMediaStyle } = MediaQuery;
