const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
//设定棋盘常量
let tips = document.getElementById('tips')

let Grid_Size= 40
let wide = 15
let height = 15


let checkboard = []
let color = true

canvas.width = wide * Grid_Size 
canvas.height = height * Grid_Size

// console.log(canvas.width)


 