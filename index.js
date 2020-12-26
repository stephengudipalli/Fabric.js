console.log('index.js is working');

const canvas = new fabric.Canvas('canvas-1', {
    height: 500,
    width: 500,
    selection: false
});


fabric.Image.fromURL('https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/north-america/united-states/newyork/newyork_NationalGeographic_2328428.adapt.1900.1.jpg', (img) => {
    canvas.backgroundImage = img
    canvas.requestRenderAll();
});

let mouseClicked = false;
let currentMode;
const modes = {
    pan: 'pan',
    drawing: 'drawing'
}

const toggleMode = (mode) => {
    if(mode === modes.pan) {
        if (currentMode === modes.pan) {
            currentMode = '';
            canvas.isDrawingMode = false;
            canvas.requestRenderAll();
        } else {
            currentMode = modes.pan
        }
    } else if (mode === modes.drawing) {
        if (currentMode === modes.drawing) {
            currentMode = ''
            canvas.isDrawingMode = false;
            canvas.requestRenderAll();
        } else {
            // Change Brush
            // canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);   // Circle Brush
            canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);    // Spray Brush
            canvas.freeDrawingBrush.color = 'red';          // Color
            canvas.freeDrawingBrush.width = 15;             // width


            currentMode = modes.drawing
            canvas.isDrawingMode = true;
            canvas.requestRenderAll();
        }
    }
    console.log(mode);
    
}

const setPanEvents = (canvas) => {
    canvas.on('mouse:move', (event) => {
        if (mouseClicked && currentMode === modes.pan) {
            canvas.setCursor('grab');
            canvas.requestRenderAll();
            const mouseEvent = event.e;
            const delta = new fabric.Point(mouseEvent.movementX, mouseEvent.movementY);
            canvas.relativePan(delta);
        }
    });
    
    canvas.on('mouse:down', (event) => {
        mouseClicked = true;
        if (mouseClicked === modes.pan) {
            canvas.setCursor('grab');
            canvas.requestRenderAll();
        }
    });
    
    canvas.on('mouse:up', (event) => {
        mouseClicked = true;
        if (mouseClicked === modes.pan) {
            canvas.setCursor('grab');
            canvas.requestRenderAll();
        }
    });
}

setPanEvents(canvas);