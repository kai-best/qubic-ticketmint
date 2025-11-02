export function setupEventPage() {
  // Detect Create Event button on events.html
  const createEventBtn = document.getElementById("createEventBtn");

  if (!createEventBtn) return;

  // Handle Create Event button
  if (!createEventBtn.dataset.bound) {
    createEventBtn.dataset.bound = "true";
    createEventBtn.addEventListener("click", (e) => {
      e.preventDefault();
      htmx.ajax("GET", "/views/createvent.html", {
        target: "#content",
        swap: "innerHTML",
      });
    });
  }
}
