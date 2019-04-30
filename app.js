const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
//context로 라인도 그리고 하는것. 
const colors = document.getElementsByClassName("jsColor");

//convas에 사이즈 주기,, Pixel manipulating size
//css는 눈에 보이는 사이즈 이고 여기서 지정해주는 사이즈는 픽셀사이즈
canvas.width = 550;
canvas.height = 550;

//context default
//선의 색
ctx.strokeStyle="#2c2c2c";
//linewidth는 선의 굵기를 나타냄
ctx.lineWidth=2.5;

let painting = false;

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
}

if(canvas){
    //마우스가 캔버스에 무브할때
    canvas.addEventListener("mousemove",onMouseMove);
    //마우스가 캔버스에서 클릭될때
    canvas.addEventListener("mousedown",startPainting);
    //마우스가 캔버스에서 클릭을 끝낼때? ==> 페인팅을 안해
    canvas.addEventListener("mouseup",stopPainting);
    //마우스가 캔버스를 벗어날때 ==> 페인팅을 안해 
    canvas.addEventListener("mouseleave", stopPainting)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))