const apiAdapter = {
  async load() {
    const res = await fetch("/api/progress");
    return res.json();
  },

  async save(checks, completionDates) {
    const res = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checks, completionDates }),
    });

    return res.json();
  },

  async toggle(id, completed) {
    const res = await fetch("/api/progress/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });

    return res.json();
  },

  async clear() {
    const res = await fetch("/api/progress", {
      method: "DELETE",
    });

    return res.json();
  },

  async getActivity() {
    const res = await fetch("/api/progress/activity");
    return res.json();
  },
};

export default apiAdapter;
