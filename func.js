//初始化
function init() {
    //初始化棋盘
    for (let i = -5; i < wide + 5; i++) {
        checkboard[i] = []
        for (let j = -5; j < height + 5; j++) {
            checkboard[i][j] = {
                state: true,
                type: 1
            }
        }
    }
    canvas.onclick = chess;
    drawcheckboard();
    tips.innerText = "白方先下"
}
function drawcheckboard() {
    for (let i = 0; i < wide; i++) {
        for (let j = 0; j < height; j++) {
            ctx.beginPath()
            ctx.strokeStyle = "black"

            ctx.fillStyle = "rgb(255,255,224)"
            ctx.strokeRect(i * Grid_Size, j * Grid_Size, Grid_Size, Grid_Size)
            ctx.fillRect(i * Grid_Size, j * Grid_Size, Grid_Size, Grid_Size)

            ctx.closePath()
        }
    }
}
// init()
//绘制棋子
function drawchess(x, y) {
    
    ctx.beginPath()

    ctx.fillStyle = (color === true ? "white" : "black")
    ctx.arc(x * Grid_Size, y * Grid_Size, Grid_Size / 2 * 0.8, 0, 2 * Math.PI)
    ctx.fill()
    ctx.arc(x * Grid_Size, y * Grid_Size, Grid_Size / 2 * 0.8, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()

    checkboard[x][y].type = color
    color = !color

    checkboard[x][y].state = !checkboard[x][y].state
}

//落子
function chess(e) {
    let x = e.pageX - canvas.offsetLeft
    let y = e.pageY - canvas.offsetTop

    x = parseInt((x + Grid_Size / 2) / Grid_Size)
    y = parseInt((y + Grid_Size / 2) / Grid_Size)

    if (!checkboard[x][y].state) return
    drawchess(x, y)


    tips.innerText = (color === true ? "轮到白方" : " 轮到黑方")
    gameover(x, y)

}
function gameover(x, y) {
    if (!direction(x, y)) return;
    tips.innerText = color ===true ? "黑方" +  "胜利" : "白方"  +  "胜利"
    canvas.onclick = null
}



function direction(x,y){
    //上下
    if(partdirection(x,y-5,0,1,checkboard[x][y].type)) return true;
    //左右
    if(partdirection(x-5,y,1,0,checkboard[x][y].type)) return true;
    //斜上
    if(partdirection(x+5,y-5,-1,1,checkboard[x][y].type)) return true;
    //斜下
    if(partdirection(x-5,y-5,1,1,checkboard[x][y].type)) return true;
}

function partdirection(tx,ty,xn,yn,type){
    let count = 0
    for(i=0;i<10;i++){
        if(checkboard[tx][ty].type ===type && checkboard[tx][ty].state ===false){
            count++;
            if(count >=5) return true
        } else {
            count = 0
        }
        tx += xn
        ty += yn
    }
    return false
}
document.getElementById('restart').onclick = function(){
    tips.innerText = ""
    init()
}

// function direction(x, y) {
//     let tx = x
//     let ty = y
//     let type = checkboard[x][y].type
//     let count = 0
//     let i = 0
//     tx -= 5
//     ty -= 5
// //斜下
//     for (i = 0; i < 10; i++) {
//         if (checkboard[tx][ty].type === type && checkboard[tx][ty].state === false) {
//             count++
//             if (count >= 5) return true 
//         } else {
//             count = 0
//         }
    
//         tx++
//         ty++
//     }
// //斜上
// tx  = x +5
// ty  = y -5
// count = 0
// for (i = 0; i < 10; i++) {
//     if (checkboard[tx][ty].type === type && checkboard[tx][ty].state === false) {
//         count++
//         if (count >= 5) return true 
//     } else {
//         count = 0
//     }
//     // console.log(count)
//     tx--
//     ty++
// }
// //上下
// tx = x
// ty = y -5
// count = 0
// for (i = 0; i < 10; i++) {
//     if (checkboard[tx][ty].type === type && checkboard[tx][ty].state === false) {
//         count++
//         if (count >= 5) return true 
//     } else {
//         count = 0
//     }
//     // console.log(count)
//     ty++
// }
// //左右
// tx = x - 5
// ty = y 
// count = 0
// for (i = 0; i < 10; i++) {
//     if (checkboard[tx][ty].type === type && checkboard[tx][ty].state === false) {
//         count++
//         if (count >= 5) return true 
//     } else {
//         count = 0
//     }
//     // console.log(count)
//     tx++
// }
//     return false
// }
init()