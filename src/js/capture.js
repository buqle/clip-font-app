const {  desktopCapturer, screen } = require('electron')
const { bounds: { width, height } } = screen.getPrimaryDisplay()
const path=require('path')

console.log(__dirname,path.resolve('.'))
const {Draw} = require(`${__dirname}/src/js/draw.js`)
// const {Draw} = require(`./js/draw.js`)



desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
        width, height
    }
}, async(error, sources) => {
    if (error) return console.log(error)
    let screenImgUrl = sources[0].thumbnail.toDataURL()
    
    let bg=document.querySelector('.bg')
    let rect=document.querySelector('.rect')
    let sizeInfo=document.querySelector('.size-info')
    let toolbar=document.querySelector('.toolbar')
    let draw=new Draw(screenImgUrl,bg,width,height,rect,sizeInfo,toolbar)
    document.addEventListener('mousedown',draw.startRect.bind(draw))
    document.addEventListener('mousemove',draw.drawingRect.bind(draw))
    document.addEventListener('mouseup',draw.endRect.bind(draw))
})







