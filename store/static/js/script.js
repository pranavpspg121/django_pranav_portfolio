document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!"); // Debugging

    // Say Hello Button - Shows an alert
    document.querySelector(".btn").addEventListener("click", function () {
        alert("Hello! Thanks for visiting my portfolio.");
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Validation
    document.querySelector(".footer__form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission

        let name = document.querySelector("input[placeholder='Your Name']").value.trim();
        let email = document.querySelector("input[placeholder='Your Email Address']").value.trim();
        let message = document.querySelector("textarea").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Basic email validation
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("Thank you! Your message has been sent.");
        this.reset(); // Clear the form after submission
    });

    // Play Button Interaction (if used)
    let playButton = document.querySelector(".video .play");
    if (playButton) {
        playButton.addEventListener("click", function () {
            alert("Video play feature is not implemented yet.");
        });
    }
});
