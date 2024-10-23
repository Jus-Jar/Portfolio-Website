(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

function loadSection(sectionId, filePath) {

    fetch(filePath)
        .then(response => response.text())
        .then(data => document.getElementById(sectionId).innerHTML = data)
        .catch(error => console.error('Error loading section:', error));
}

// Load each section dynamically
loadSection('about', 'pages/about.html');
loadSection('portfolio', 'pages/portfolio.html');
loadSection('contact', 'pages/contact.html');
loadSection('collaborated-projects', 'pages/communityProjects.html');

// loadSection('section3', 'section3.html');