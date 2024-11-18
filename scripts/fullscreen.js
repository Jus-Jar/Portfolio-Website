function viewFullScreen(imgElement) {
    // Create a container for fullscreen content
    const fullScreenContainer = document.createElement("div");
    fullScreenContainer.style.position = "fixed";
    fullScreenContainer.style.top = "0";
    fullScreenContainer.style.left = "0";
    fullScreenContainer.style.width = "100%";
    fullScreenContainer.style.height = "100%";
    fullScreenContainer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    fullScreenContainer.style.zIndex = "9999";
    fullScreenContainer.style.display = "flex";
    fullScreenContainer.style.alignItems = "center";
    fullScreenContainer.style.justifyContent = "center";
    fullScreenContainer.style.overflow = "hidden"; // Prevent scrollbars

    // Create the image element
    const img = document.createElement("img");
    img.src = imgElement.src;
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    img.style.objectFit = "contain";
    img.style.transition = "transform 0.3s ease"; // Smooth zoom transition
    img.style.cursor = "grab"; // Indicate draggable image when zoomed

    let scale = 1; // Zoom level
    let startX = 0, startY = 0; // For dragging
    let isDragging = false;

    // Handle zoom in/out with mouse wheel
    fullScreenContainer.onwheel = (e) => {
        e.preventDefault();
        const zoomSpeed = 0.1;
        scale += e.deltaY < 0 ? zoomSpeed : -zoomSpeed;
        scale = Math.min(Math.max(scale, 1), 5); // Restrict zoom levels between 1x and 5x
        img.style.transform = `scale(${scale})`;
    };

    // Handle dragging when zoomed
    img.onmousedown = (e) => {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            img.style.cursor = "grabbing";
        }
    };

    img.onmousemove = (e) => {
        if (isDragging && scale > 1) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            startX = e.clientX;
            startY = e.clientY;
            const currentTransform = img.style.transform.match(/translate\((.*?)px, (.*?)px\)/);
            const currentX = currentTransform ? parseFloat(currentTransform[1]) : 0;
            const currentY = currentTransform ? parseFloat(currentTransform[2]) : 0;
            img.style.transform = `scale(${scale}) translate(${currentX + dx}px, ${currentY + dy}px)`;
        }
    };

    img.onmouseup = () => {
        isDragging = false;
        img.style.cursor = "grab";
    };

    img.onmouseleave = () => {
        isDragging = false;
        img.style.cursor = "grab";
    };

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
        document.body.removeChild(fullScreenContainer);
    };

    // Append the image and close button to the container
    fullScreenContainer.appendChild(img);
    fullScreenContainer.appendChild(closeButton);
    document.body.appendChild(fullScreenContainer);

    // Request fullscreen for the container
    if (fullScreenContainer.requestFullscreen) {
        fullScreenContainer.requestFullscreen();
    } else if (fullScreenContainer.webkitRequestFullscreen) {
        fullScreenContainer.webkitRequestFullscreen();
    } else if (fullScreenContainer.msRequestFullscreen) {
        fullScreenContainer.msRequestFullscreen();
    }
}
