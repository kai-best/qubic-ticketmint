import { setupSidebar } from '/js/sidebar.js';
import { setupFilters } from '/js/filters.js';
import { setupLogin } from '/js/login.js';
import { setupNavigation } from '/js/navbar.js';
import { setupCreateEvent } from '/js/createvent.js';
import { setupEventPage } from '/js/event.js';
import { setupContactForm } from '/js/contact.js';

document.addEventListener("DOMContentLoaded", () => {

    // Initialize
    setupSidebar();
    setupFilters();
    setupLogin();
    setupNavigation();
    setupEventPage();
    setupCreateEvent();
    setupContactForm();

    // Reinitialize
    document.body.addEventListener("htmx:afterOnLoad", () => {
        setupSidebar();
        setupFilters();
        setupLogin();
        setupNavigation();
        setupEventPage();
        setupCreateEvent();
        setupContactForm();
    });

    document.body.addEventListener('htmx:afterSwap', () => {
        setupSidebar();
        setupNavigation();
        setupEventPage();
        setupCreateEvent();
        setupContactForm();
    });

    // Wallet Copy Button Logic
    document.addEventListener("click", (e) => {
        if (e.target.textContent.trim() === "Copy") {
            const walletInput = document.getElementById("wallet");
            if (!walletInput) return;
            walletInput.select();
            document.execCommand("copy");
            e.target.textContent = "Copied!";
            setTimeout(() => (e.target.textContent = "Copy"), 1500);
        }
    });
});
