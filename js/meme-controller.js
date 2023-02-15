
var gElCanvasImg = document.querySelector('.canvas-img')
var gCtxImg = gElCanvasImg.getContext('2d')

var gElCanvasText = document.querySelector('.canvas-text')
var gCtxText = gElCanvasText.getContext('2d')

var gElCanvasTextSaved = document.querySelector('.canvas-saved')
var gCtxTextSaved = gElCanvasTextSaved.getContext('2d')

var font = 'sans-serif'
// renderMeme()
function renderMeme() {
    // newImgSelected(id)
    // toggleGallery()
    gCtxImg.clearRect(0, 0, gElCanvasImg.width, gElCanvasImg.height);
    let img = new Image()
    // gCtx.beginPath()
    img.addEventListener('load', (event) => {gCtxImg.drawImage(img, 0, 0, gElCanvasImg.width, gElCanvasImg.height)})
    img.src = getCurrImg()
    // gCtx.closePath()
    // test()
}

function lineFocus() {
    nextLine()
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

    // document.getElementById('text-line').addEventListener('keyup', function () {
    //     gCtxText.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height);
    //     setLineTxt(document.getElementById('text-line').value)
    //     // console.log(document.getElementById('text-line').value);
        
    //     //should i just return gMeme.lines or no, mmmm
    //     var stringTitle = getLineTxt()
    //     gCtxText.fillStyle = getTxtColor()  //text color
    //     // gCtxText  //alignment
        
    //     // gCtxText  //font?
    //     gCtxText.font = `${getLineSize()}px ${font}`;//change ofc this
    //     //change the position otherwise it reset each time, i guess
    //     gCtxText.fillText(stringTitle, gElCanvasText.width/3, 35)})

//testing 2

document.getElementById('text-line').addEventListener('keyup',onChangeSetting)

function onChangeSetting() {
        gCtxText.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height);
        setLineTxt(document.getElementById('text-line').value)
        // console.log(document.getElementById('text-line').value);
        
        //should i just return gMeme.lines or no, mmmm
        var stringTitle = getLineTxt()
        gCtxText.fillStyle = getTxtColor()  //text color
        // gCtxText  //alignment
        
        // gCtxText  //font?
        gCtxText.font = `${getLineSize()}px ${font}`;//change ofc this
        //change the position otherwise it reset each time, i guess
        gCtxText.fillText(stringTitle, gElCanvasText.width/3, getLineY())
}

function showOtherLines(id) {//idk if i need id
    gCtxTextSaved.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height);
    for (let i = 0; i < gMemeLength(); i++) {
        if (i === id) continue
        setLineTxt(gMeme.lines[i].txt)

        // console.log('gMeme.lines[i].txt ---- ',getSpecificTxt(i));
        // setLineTxt(getSpecificTxt(i))

        // console.log(document.getElementById('text-line').value);
        
        //should i just return gMeme.lines or no, mmmm
        var stringTitle = getLineTxt()
        gCtxTextSaved.fillStyle = getTxtColor()  //text color
        // gCtxText  //alignment
        
        // gCtxText  //font?
        gCtxTextSaved.font = `${getLineSize()}px ${font}`;//change ofc this
        //change the position otherwise it reset each time, i guess
        gCtxTextSaved.fillText(stringTitle, gElCanvasTextSaved.width/3, getLineY(i))
    }
}

//idea for saving, render both into 1 canvas, the image and the text, and thats all 

//idea, make 3rd canvas, so it will be
//canvas 1- photo
//canvas 2- the now 1 line edited
//canvas 3- the all other lines saved and displaying, except the line in canvas 2