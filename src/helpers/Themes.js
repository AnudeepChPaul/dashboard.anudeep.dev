const fontFamily = [
  "Montserrat",
  "sans-serif",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  "Arial",
].join(",");

const boxShadow = (a, b, c, d, color) => {
  return `${a || 0}px ${b || 0}px ${c || 0}px ${d || 0}px ${
    color || theme.colors.secondary
  }`;
};

const vivid = {
  colors: {
    primary: "#ffe57f",
    primaryShade: "#ffd740",
    secondary: "#ff6f00",
    contrast: "#000000",
    info: "#0288D1",
    error: "#F50057",
    warning: "#FBC02D",
    success: "#009688",
    transparent: "transparent",
    dark: "#000",
  },
  font: {
    rootFont: 16,
    fontFamily,
  },
  boxShadow,
};

const light = {
  colors: {
    primary: "#f7f9fc",
    primaryShade: "#ffffff",
    secondary: "#666666",
    contrast: "#1b2430",
    info: "#0288D1",
    error: "#D32F2F",
    warning: "#FBC02D",
    success: "#00BFA5",
    transparent: "transparent",
    dark: "#000",
  },
  font: {
    rootFont: 16,
    fontFamily,
  },
  boxShadow,
};

const vintage = {
  colors: {
    primary: "turquoise",
    primaryShade: "mintcream",
    secondary: "#666666",
    contrast: "#1b2430",
    info: "#0288D1",
    error: "#D32F2F",
    warning: "#FBC02D",
    success: "#00BFA5",
    transparent: "transparent",
    dark: "#000",
  },
  font: {
    rootFont: 16,
    fontFamily,
  },
  boxShadow,
};
const dark = {
  colors: {
    primary: "#999999",
    primaryShade: "#444444",
    secondary: "#bcbcbc",
    contrast: "#111111",
    transparent: "transparent",
    info: "#2962FF",
    error: "#F50057",
    warning: "#FFEA00",
    success: "#1DE9B6",
  },
  font: {
    rootFont: 16,
    fontFamily,
  },
  boxShadow,
};

const theme = light;

export default theme;

export const getBrandAnimation = () => ({
  scale: [1, 1.5, 1.5, 1.5, 1],
  rotate: [0, 0, 270, 0, 0],
  transition: { duration: 1, delay: 1.3 },
});

export const getSwirlAnimation = () => ({
  scale: [1, 1.5, 1.5],
  rotate: [0, 360, 360],
  borderRadius: [2, "50%", "50%"],
  transition: { duration: 0.5 },
});
export const getTapAnimation = () => ({ scale: 0.9, rotate: 0 });
export const getZoomAnimation = () => ({ scale: 1.25, rotate: 0 });
export const getLightZoomAnimation = () => ({ scale: 1.07, rotate: 0 });
export const getThinZoomAnimation = () => ({ scale: 1.025, rotate: 0 });
export const getLightTapAnimation = () => ({ scale: 1, rotate: 0 });
export const getSlideInFromTop = () => ({
  animate: { opacity: 1, y: 0 },
  style: { y: "-100%", opacity: 0 },
});
