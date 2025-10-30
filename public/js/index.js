document.addEventListener("DOMContentLoaded", () => {

    // SideBar Show/Hidden Implementation
    function setupSidebar() {
        const sidebar = document.getElementById('sidebar');
        const menuBtn = document.getElementById('menuBtn');
        const closeBtn = document.getElementById('closeBtn');
        const overlayId = 'sidebar-overlay';

        if (!sidebar || !menuBtn || !closeBtn) return;

        // Prevent duplicate bindings
        if (menuBtn.dataset.bound === "true") return;
        menuBtn.dataset.bound = "true";
        closeBtn.dataset.bound = "true";

        function openSidebar() {
            // Avoid duplicate overlays
            if (document.getElementById(overlayId)) return;

            sidebar.classList.remove('translate-x-full');

            // Create semi-transparent overlay
            const overlay = document.createElement('div');
            overlay.id = overlayId;
            overlay.className = 'fixed inset-0 bg-black bg-opacity-40 z-40';
            document.body.appendChild(overlay);

            overlay.addEventListener('click', closeSidebar);
            document.addEventListener('keydown', escClose); // enable ESC close
        }

        function closeSidebar() {
            sidebar.classList.add('translate-x-full');
            const overlay = document.getElementById(overlayId);
            if (overlay) overlay.remove();
            document.removeEventListener('keydown', escClose); // clean up listener
        }

        function escClose(e) {
            if (e.key === 'Escape') closeSidebar();
        }

        menuBtn.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
    }

    document.addEventListener('DOMContentLoaded', setupSidebar);
    document.body.addEventListener('htmx:afterOnLoad', setupSidebar);

    // Filter Cards Implementation
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
                    matchesDate = eventDate.getMonth() === now.getMonth() &&
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
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    locationSelect.addEventListener("change", filterCards);
    dateSelect.addEventListener("change", filterCards);
});