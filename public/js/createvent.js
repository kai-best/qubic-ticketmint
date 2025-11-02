export function setupCreateEvent() {
  const form = document.getElementById("createEventForm");
  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const uploadZone = document.getElementById("uploadZone");
  const fileInput  = document.getElementById("eventImages");
  const uploadText = document.getElementById("uploadText");

  if (uploadZone && fileInput) {
    uploadZone.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        uploadZone.style.backgroundImage = `url("${imageUrl}")`;
        uploadZone.classList.add("bg-cover","bg-center");
        uploadZone.style.border = "2px solid transparent";
        if (uploadText) uploadText.textContent = "";
      }
    });
  }

  const cancelBtn = document.getElementById("cancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      htmx.ajax("GET", "/views/events.html", { target: "#content", swap: "innerHTML" });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.dataset.submitted === "true") return;
    form.dataset.submitted = "true";
    alert("✅ Event created successfully!");
    htmx.ajax("GET", "/views/events.html", { target: "#content", swap: "innerHTML" });
  });
}

export function setupCreateTicket() {
  const btn = document.getElementById("createTicketBtn");
  if (!btn) return;
  if (btn.dataset.bound === "true") return;
  btn.dataset.bound = "true";

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    htmx.ajax("GET", "/views/ticket.html", {
      target: "#content",
      swap: "innerHTML",
    });
  });
}