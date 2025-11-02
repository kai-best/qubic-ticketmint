export function setupNavigation() {
    const logo = document.querySelector("header h1");
    const dashboardLink = document.querySelector("#sidebar a:nth-child(1)");
    const eventsLink = document.querySelector("#sidebar a:nth-child(2)");
    const accountLink = document.querySelector("#sidebar a:nth-child(3)");
    const walletLink = document.querySelector("#sidebar a:nth-child(4)");
    const aboutLink = document.querySelector("#sidebar a:nth-child(5)");
    const contactLink = document.querySelector("#sidebar a:nth-child(6)");
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");

    if (!logo || !dashboardLink || !eventsLink || !accountLink || !walletLink || !aboutLink || !contactLink || !content || !sidebar) return;

    if (logo.dataset.bound === "true") return;
    logo.dataset.bound = "true";
    dashboardLink.dataset.bound = "true";
    eventsLink.dataset.bound = "true";
    accountLink.dataset.bound = "true";
    walletLink.dataset.bound = "true";
    aboutLink.dataset.bound = "true";
    contactLink.dataset.bound = "true";

    logo.addEventListener("click", () => {
        htmx.ajax("GET", "/views/home.html", { target: "#content", swap: "innerHTML" });
    });

    dashboardLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/dashboard.html", { target: "#content", swap: "innerHTML" });
        closeSidebar();
    });

    eventsLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/events.html", { target: "#content", swap: "innerHTML" });
        closeSidebar();
    });

    accountLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/account.html", { target: "#content", swap: "innerHTML" });
        closeSidebar();
    });

    walletLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/tmintwallet.html", { target: "#content", swap: "innerHTML" });
        closeSidebar();
    });

    aboutLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/aboutus.html", {
            target: "#content",
            swap: "innerHTML"
        });
        closeSidebar();
    });

    contactLink.addEventListener("click", (e) => {
        e.preventDefault();
        htmx.ajax("GET", "/views/contact.html", {
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
