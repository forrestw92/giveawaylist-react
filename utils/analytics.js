import { initialize, set, pageview, event, exception } from "react-ga";

export const initGA = () => {
  initialize("UA-104775605-1");
};

export const logPageView = () => {
  set({ page: window.location.pathname });
  pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    event({ category, action, label });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    exception({ description, fatal });
  }
};
