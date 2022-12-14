const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event){ 
    if(isPainting){ 
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY); 
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){ 
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.fillStyle = ctx.strokeStyle = event.target.value;
}
function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.fillStyle = ctx.strokeStyle = color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "🎨채우기모드" 
    }else{ 
        isFilling = true;
        modeBtn.innerText = "✏️그리기모드"
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    alert("정말 전체 삭제할까요?😥")
    ctx.fillStyle = "white"; 
    ctx.fillRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT); 
}
function onEraserClick(){
    ctx.strokeStyle = "white"; 
    isFilling = false; 
    modeBtn.innerText = "🎨채우기모드" 
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}
function onDoubleClick(event){
    if(text !== ""){
        ctx.save();
        const text = textInput.value;
        ctx.lineWidth=1;
        ctx.font = "60px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore(); 
    } 
}
function onSaveClick(){ 
    const url = canvas.toDataURL(); 
    const a = document.createElement("a");
    a.href = url; 
    a.download = "MyDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove); 
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
document.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);


