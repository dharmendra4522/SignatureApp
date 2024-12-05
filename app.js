// Element references
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvaColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontPicker = document.getElementById("fontPicker");
const retriveButton = document.getElementById("retriveButton");
const ctx = canvas.getContext('2d'); // Fixing variable name

// Initialize variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set stroke and fill color from color picker
colorPicker.addEventListener('change', (ev) => {
    ctx.strokeStyle = ev.target.value;
    ctx.fillStyle = ev.target.value;
});

// Change canvas background color
canvasColor.addEventListener('change', (ev) => {
    canvas.style.backgroundColor = ev.target.value;
    ctx.fillStyle = ev.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fixing typo
});

// Mouse down event for starting drawing
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

// Mouse move event for drawing
canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

// Mouse up event for stopping drawing
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Font picker functionality
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = parseInt(e.target.value, 10); // Ensuring it's a number
});

// Clear button functionality
const initialBackgroundColor = canvas.style.backgroundColor;

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = initialBackgroundColor; // Reset to initial color
});

// Save button functionality
saveButton.addEventListener('click', () => {
    // Fill the background before saving
    ctx.save(); // Save the current state
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = canvas.style.backgroundColor || "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore(); // Restore the original state

    // Save the canvas content
    localStorage.setItem('canvasContents', canvas.toDataURL());

    // Create and download image
    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Retrieve button functionality
retriveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0); // Properly invoke drawImage
        };
    }
});
