export function setupFilters() {
    const locationSelect = document.getElementById("location");
    const dateSelect = document.getElementById("dates");
    const cards = document.querySelectorAll(".event-card");

    if (!locationSelect || !dateSelect || cards.length === 0) return;

    function filterCards() {
        const selectedLocation = locationSelect.value;
        const selectedDate = dateSelect.value;
        const now = new Date();

        cards.forEach(card => {
            const eventLocation = card.dataset.location;
            const eventDate = new Date(card.dataset.date);

            const matchesLocation = !selectedLocation || selectedLocation === eventLocation;
            let matchesDate = false;

            switch (selectedDate) {
                case "":
                    matchesDate = true;
                    break;
                case "This Week": {
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay());
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    matchesDate = eventDate >= weekStart && eventDate <= weekEnd;
                    break;
                }
                case "This Month":
                    matchesDate =
                        eventDate.getMonth() === now.getMonth() &&
                        eventDate.getFullYear() === now.getFullYear();
                    break;
                case "This Year":
                    matchesDate = eventDate.getFullYear() === now.getFullYear();
                    break;
                case "2026":
                    matchesDate = eventDate.getFullYear() === 2026;
                    break;
                case "2027+":
                    matchesDate = eventDate.getFullYear() >= 2027;
                    break;
            }

            if (matchesLocation && matchesDate) {
                card.style.removeProperty("display");
            } else {
                card.style.display = "none";
            }
        });
    }

    locationSelect.addEventListener("change", filterCards);
    dateSelect.addEventListener("change", filterCards);
}