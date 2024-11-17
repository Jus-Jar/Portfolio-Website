(function () {
    // Handle the button click events to change active section
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // Theme button event listener
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Track scrolling to change active section based on the scroll position
    window.addEventListener('scroll', function() {
        // Get all sections with the content-section class
        let sections = document.querySelectorAll('.content-section');
        let scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the screen
    
        sections.forEach(section => {
            // Check if the scroll position is within the bounds of the section
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                // Remove the 'active' class from the currently active section
                document.querySelector('.active')?.classList.remove('active');
                
                // Add 'active' class to the current section
                section.classList.add('active');
                
                // Update the active button (control button)
                let controlButton = document.querySelector(`[data-id="${section.id}"]`);
                if (controlButton) {
                    // Remove 'active-btn' class from the current active button
                    document.querySelector('.active-btn')?.classList.remove('active-btn');
                    
                    // Add 'active-btn' class to the corresponding control button
                    controlButton.classList.add('active-btn');
                }
            }
        });
    });

})();

// Load each section dynamically
function loadSection(sectionId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => document.getElementById(sectionId).innerHTML = data)
        .catch(error => console.error('Error loading section:', error));
}

// Load sections
loadSection('about', 'pages/about.html');
loadSection('portfolio', 'pages/portfolio.html');
loadSection('contact', 'pages/contact.html');
loadSection('collaborated-projects', 'pages/communityProjects.html');


document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove 'active' class from all tags
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));

        // Add 'active' class to the clicked tag
        tag.classList.add('active');
        
        // Example: Perform action on click (e.g., filtering content)
        console.log(`Selected Topic: ${tag.textContent}`);
    });
});
