export function setupNavigation() {
    const logo = document.querySelector("header h1"); // TicketMint title
    const dashboardLink = document.querySelector("#sidebar a:nth-child(1)"); // Dashboard
    const eventsLink = document.querySelector("#sidebar a:nth-child(2)"); // Events
    const accountLink = document.querySelector("#sidebar a:nth-child(3)"); // Account
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");

    if (!logo || !dashboardLink || !eventsLink || !accountLink || !content || !sidebar) return;

    if (logo.dataset.bound === "true") return;
    logo.dataset.bound = "true";
    dashboardLink.dataset.bound = "true";
    eventsLink.dataset.bound = "true";
    accountLink.dataset.bound = "true";

    logo.addEventListener("click", () => {
        htmx.ajax("GET", "/views/home.html", { target: "#content", swap: "innerHTML" });
    });

    dashboardLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/dashboard.html", {
            target: "#content",
            swap: "innerHTML"
        });
        closeSidebar();
    });

    eventsLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/events.html", {
            target: "#content",
            swap: "innerHTML"
        });
        closeSidebar();
    });

    accountLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/account.html", {
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