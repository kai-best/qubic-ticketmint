import { setupSidebar } from '/js/sidebar.js';
import { setupFilters } from '/js/filters.js';
import { setupLogin } from '/js/login.js';
import { setupNavigation } from '/js/navbar.js';

document.addEventListener("DOMContentLoaded", () => {

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
