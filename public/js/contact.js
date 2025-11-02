export function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return; // only run on contact.html
  if (form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill out all required fields before sending.");
      return;
    }

    alert("✅ Your message has been sent successfully!");
    form.reset();

    // Redirect back home after sending
    htmx.ajax("GET", "/views/home.html", {
      target: "#content",
      swap: "innerHTML"
    });
  });
}
