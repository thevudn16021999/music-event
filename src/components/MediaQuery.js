import { createMedia } from "@artsy/fresnel";

const MediaQuery = createMedia({
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

export const { Media, MediaContextProvider, createMediaStyle } = MediaQuery;
