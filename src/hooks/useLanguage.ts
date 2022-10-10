import { useCallback } from "react";
import { useGlobalState } from "../global/globalState";
import { languages, Texts } from "../translations";

export const useLanguage = () => {
  const { state } = useGlobalState();

  const t = useCallback(
    (k: keyof Texts) => {
      if (state.lan === undefined) return "";
      const lanObject = languages[state.lan as keyof typeof languages];
      return lanObject[k as keyof typeof lanObject];
    },
    [state.lan]
  );

  return { l: state.lan, t };
};
