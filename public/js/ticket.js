export function setupTicketPage() {
  const transferBtn = document.getElementById("transferBtn");
  const ticketCard = document.getElementById("ticketCard");
  const ticketLabel = document.getElementById("ticketLabel");

  if (!transferBtn || !ticketCard || !ticketLabel) return;
  if (transferBtn.dataset.bound === "true") return;
  transferBtn.dataset.bound = "true";

  // Set random demo image for ticket card
  const demoImages = [
    "/public/assets/ticket1.png",
    "/public/assets/ticket2.png",
    "/public/assets/ticket3.png"
  ];
  const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
  ticketCard.style.backgroundImage = `url('${randomImage}')`;

  // Handle Transfer button click
  transferBtn.addEventListener("click", () => {
    transferBtn.disabled = true;
    transferBtn.textContent = "⏳ Transferring...";
    ticketLabel.textContent = "Processing...";

    setTimeout(() => {
      ticketLabel.textContent = "✅ Transferred Successfully!";
      transferBtn.textContent = "Back to Dashboard";

      transferBtn.classList.remove("from-purple-700", "to-indigo-600");
      transferBtn.classList.add("bg-green-600", "hover:bg-green-500");

      transferBtn.disabled = false;

      transferBtn.addEventListener("click", () => {
        htmx.ajax("GET", "/views/dashboard.html", {
          target: "#content",
          swap: "innerHTML"
        });
      });
    }, 2000);
  });
}
