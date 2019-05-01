const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
//context로 라인도 그리고 하는것. 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//convas에 사이즈 주기,, Pixel manipulating size
//css는 눈에 보이는 사이즈 이고 여기서 지정해주는 사이즈는 픽셀사이즈
canvas.width = 550;
canvas.height = 550;

//바탕색을 default로 하얀색으로 정해줘
ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//context default
//선의 색, 바탕의 색
ctx.strokeStyle="#2c2c2c";
ctx.fillStyle="#2c2c2c";
//linewidth는 선의 굵기를 나타냄
ctx.lineWidth=2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //마우스가 캔버스 안에 들어왔을때 가지는 캔버스의 x와 y좌표
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //path로 내 시작점을 알리는것 이건 클릭전 상황
        ctx.beginPath();
        
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        //current sub-path에 stroke (획)을 그음
        //반대로 fill() 은 현재의 sub-paths에 fill 하는것!
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handelCM(event){
    //우클릭 금지
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    //여기서 a태그가 다운로드하는것도 있어서 그걸 사용해서 다운로드 할거임
    const link = document.createElement('a');
    link.href = image;
    link.download = "myPaint[👩‍🎨]";
    link.click();
}

if(canvas){
    //마우스가 캔버스에 무브할때
    canvas.addEventListener("mousemove",onMouseMove);
    //마우스가 캔버스에서 클릭될때
    canvas.addEventListener("mousedown",startPainting);
    //마우스가 캔버스에서 클릭을 끝낼때? ==> 페인팅을 안해
    canvas.addEventListener("mouseup",stopPainting);
    //마우스가 캔버스를 벗어날때 ==> 페인팅을 안해 
    canvas.addEventListener("mouseleave", stopPainting);
    //캔버스에 fill 하는 click.
    canvas.addEventListener("click",handleCanvasClick);
    //우클릭 감지
    canvas.addEventListener("contextmenu",handelCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

if(range){
    //range이벤트는 input에 반응함
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick);
}