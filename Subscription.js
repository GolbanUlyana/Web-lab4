document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("subscribed")) {
        setTimeout(() => {
            document.getElementById("subscribe-modal").style.display = "block";
            document.getElementById("overlay").style.display = "block";
        }, 500);
    }

    document.getElementById("accept-btn").addEventListener("click", function () {
        localStorage.setItem("subscribed", "true");
        hideModal();
        showThankYou();
    });

    document.getElementById("decline-btn").addEventListener("click", hideModal);

    function hideModal() {
        document.getElementById("subscribe-modal").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }

    function showThankYou() {
        let thankYou = document.getElementById("thank-you");
        thankYou.style.display = "block";
        setTimeout(() => {
            thankYou.style.display = "none";
        }, 2000);
    }
});
