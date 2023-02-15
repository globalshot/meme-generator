
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2} 
 
var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]; 
var gMeme = { 
    selectedImgId: 1, //can be updated without the
    selectedLineIdx: 0, 
    lines: [ 
            { 
                txt: 'I sometimes eat Falafel', 
                size: 20, 
                align: 'left', 
                color: 'red' 
            } 
    ] 
}

function getCurrImg() {
    return  `meme-imgs (square)/${gMeme.selectedImgId}.jpg`
    // return gMeme.selectedImgId
}

function setLineTxt(text) {
    // gMeme[gMeme.selectedLineIdx].txt = text
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function getLineTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getLineColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color
}

function getLineSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}