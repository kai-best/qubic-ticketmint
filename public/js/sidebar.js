export function setupSidebar() {
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