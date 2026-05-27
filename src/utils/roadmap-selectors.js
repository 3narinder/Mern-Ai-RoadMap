import { MODULES, DSA } from "../data/roadmap-data";

export const getAllModuleIds = () =>
  MODULES.flatMap((m) => m.topics.map((t) => t.id));

export const getAllDSAIds = () => DSA.flatMap((d) => d.topics.map((t) => t.id));

export const getAllRoadmapIds = () => [...getAllModuleIds(), ...getAllDSAIds()];

export const getWeekIds = (modules = []) =>
  modules.flatMap((m) => m.topics.map((t) => t.id));

export const getDSAIds = (topics = []) => topics.map((t) => t.id);
