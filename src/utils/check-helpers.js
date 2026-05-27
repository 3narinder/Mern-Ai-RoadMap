export const countChecked = (checks, ids) =>
  ids.filter((id) => checks[id]).length;

export const pctComplete = (checks, ids) =>
  ids.length === 0
    ? 0
    : Math.round((countChecked(checks, ids) / ids.length) * 100);

export const allChecked = (checks, ids) =>
  ids.length > 0 && ids.every((id) => checks[id]);

export const isChecked = (checks, id) => !!checks[id];
