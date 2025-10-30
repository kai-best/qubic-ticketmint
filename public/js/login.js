export function setupLogin() {
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