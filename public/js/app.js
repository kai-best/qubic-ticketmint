document.addEventListener("DOMContentLoaded", () => {

    // Sidebar Show/Hidden Implementation
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

            if (document.getElementById(overlayId)) return;

            sidebar.classList.remove('translate-x-full');

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

    // Filter Cards Implementation
    function setupFilters() {
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

    // Login MVP Implmentation
    function setupLogin() {
        const loginBtn = document.getElementById("loginBtn");
        if (!loginBtn) return;

        if (loginBtn.dataset.bound === "true") return;
        loginBtn.dataset.bound = "true";

        loginBtn.addEventListener("click", () => {

            loginBtn.innerHTML = '<i class="fa-solid fa-user text-xl"></i>';
            loginBtn.classList.remove("px-4", "py-2", "bg-gray-900", "hover:bg-gray-700");
            loginBtn.classList.add("w-10", "h-10", "rounded-full", "bg-gray-900", "flex", "items-center", "justify-center");

        });
    }

    // Navbar Implementation
    function setupNavigation() {
        const logo = document.querySelector("header h1"); // TicketMint title
        const dashboardLink = document.querySelector("#sidebar a:nth-child(1)"); // Dashboard
        const eventsLink = document.querySelector("#sidebar a:nth-child(2)"); // Events
        const content = document.getElementById("content");
        const sidebar = document.getElementById("sidebar");

        if (!logo || !dashboardLink || !eventsLink || !content || !sidebar) return;

        if (logo.dataset.bound === "true") return;
        logo.dataset.bound = "true";
        dashboardLink.dataset.bound = "true";
        eventsLink.dataset.bound = "true";

        logo.addEventListener("click", () => {
            htmx.ajax("GET", "/partials/home.html", { target: "#content", swap: "innerHTML" });
        });

        dashboardLink.addEventListener("click", (e) => {
            e.preventDefault();
            htmx.ajax("GET", "/partials/dashboard.html", {
                target: "#content",
                swap: "innerHTML"
            });
            closeSidebar();
        });

        eventsLink.addEventListener("click", (e) => {
            e.preventDefault();
            htmx.ajax("GET", "/partials/events.html", {
                target: "#content",
                swap: "innerHTML"
            });
            closeSidebar();
        });

        function closeSidebar() {
            sidebar.classList.add("translate-x-full");
            const overlay = document.getElementById("sidebar-overlay");
            if (overlay) overlay.remove();
        }
    }

    // Initialize
    setupSidebar();
    setupFilters();
    setupLogin();
    setupNavigation();

    // Reinitialize
    document.body.addEventListener("htmx:afterOnLoad", () => {
        setupSidebar();
        setupFilters();
        setupLogin();
        setupNavigation();
    });

    document.body.addEventListener('htmx:afterSwap', () => {
        setupSidebar();
        setupNavigation();
    });
});
