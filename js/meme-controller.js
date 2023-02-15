
var gElCanvasImg = document.querySelector('.canvas-img')
var gCtxImg = gElCanvasImg.getContext('2d')

var gElCanvasText = document.querySelector('.canvas-text')
var gCtxText = gElCanvasText.getContext('2d')

var font = 'sans-serif'
// renderMeme()
function renderMeme() {
    let img = new Image()
    // gCtx.beginPath()
    img.addEventListener('load', (event) => {gCtxImg.drawImage(img, 0, 0, gElCanvasImg.width, gElCanvasImg.height)})
    img.src = getCurrImg()
    // gCtx.closePath()
    // test()
}

//testing stuff

// function test() {

    // document.getElementById('text-line').addEventListener('keyup', function () {
    //     gCtxText.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height);
    //     var stringTitle = document.getElementById('text-line').value;
        
    //     gCtxText.fillStyle = '#7fffd4';
    //     gCtxText.font = '20px sans-serif';//change ofc this
    //     var text_title = stringTitle;
    //     gCtxText.fillText(stringTitle, 15, gElCanvasText.height / 2 + 35)}, 100)

    //testing new 1

    document.getElementById('text-line').addEventListener('keyup', function () {
        gCtxText.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height);
        setLineTxt(document.getElementById('text-line').value)
        console.log(document.getElementById('text-line').value);
        // gCtxText.fillStyle = '#7fffd4';
        // gCtxText.font = '10px sans-serif';//change ofc this
        gCtxText.font = `${getLineSize()}px ${font}`;//change ofc this
        
        //should i just return gMeme.lines or no, mmmm
        var stringTitle = getLineTxt()
        gCtxText.fillStyle = getLineColor()  //text color
        // gCtxText.size = getLineSize() //size
        console.log('getLineSize()',getLineSize());
        // gCtxText  //alignment
        // gCtxText  //font?
        
        
        // var text_title = stringTitle;
        gCtxText.fillText(stringTitle, gElCanvasText.width/3, 35)}, 100)