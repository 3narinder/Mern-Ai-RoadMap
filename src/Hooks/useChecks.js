import { useContext } from "react";
import CheckContext from "../context/CheckContext";

export function useChecks() {
  const ctx = useContext(CheckContext);

  if (!ctx) {
    throw new Error("useChecks must be used inside <CheckProvider>");
  }

  return ctx;
}
