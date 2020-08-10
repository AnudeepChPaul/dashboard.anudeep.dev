import NProgress from "nprogress";

const start = () => NProgress.start();
const done = () => NProgress.done();

export const initializeLoadingEventSubscribers = () => {
  window.addEventListener("loadstart", start);
  window.addEventListener("loadstop", done);
};

export const fireLoad = (loadFinish) => {
  window.dispatchEvent(new Event(!loadFinish ? "loadstart" : "loadstop"));
};
