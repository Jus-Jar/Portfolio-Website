function viewFullScreen(imgElement) {
    // Create a container for fullscreen content
    const fullScreenContainer = document.createElement("div");
    fullScreenContainer.style.position = "fixed";
    fullScreenContainer.style.top = "0";
    fullScreenContainer.style.left = "0";
    fullScreenContainer.style.width = "100%";
    fullScreenContainer.style.height = "100%";
    fullScreenContainer.style.backgroundColor = "black";
    fullScreenContainer.style.zIndex = "9999";

    // Create the image element
    const img = document.createElement("img");
    img.src = imgElement.src; // Set the clicked image source
    img.style.width = "100vw"; // Full viewport width
    img.style.height = "100vh"; // Full viewport height
    img.style.objectFit = "cover"; // Ensures the image covers the screen while maintaining aspect ratio
    img.style.position = "absolute";

    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "10px 15px";
    closeButton.style.backgroundColor = "rgba(0,0,0,0.8)";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.fontSize = "18px";
    closeButton.style.cursor = "pointer";
    closeButton.style.zIndex = "10000";

    // Exit full-screen on button click
    closeButton.onclick = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            document.exitFullscreen?.() || document.webkitExitFullscreen?.();
        }
        document.body.removeChild(fullScreenContainer); // Remove the container from DOM
    };

    // Append the image and close button to the container
    fullScreenContainer.appendChild(img);
    fullScreenContainer.appendChild(closeButton);
    document.body.appendChild(fullScreenContainer);

    // Request fullscreen for the container
    if (fullScreenContainer.requestFullscreen) {
        fullScreenContainer.requestFullscreen();
    } else if (fullScreenContainer.webkitRequestFullscreen) { // For Safari
        fullScreenContainer.webkitRequestFullscreen();
    } else if (fullScreenContainer.msRequestFullscreen) { // For IE/Edge
        fullScreenContainer.msRequestFullscreen();
    }
}

