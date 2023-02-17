
const gElCanvasImg = document.querySelector('.canvas-img')
const gCtxImg = gElCanvasImg.getContext('2d')

const gElCanvasText = document.querySelector('.canvas-text')
const gCtxText = gElCanvasText.getContext('2d')

const gElCanvasTextSaved = document.querySelector('.canvas-saved')
const gCtxTextSaved = gElCanvasTextSaved.getContext('2d')

const imgInput = document.getElementById('img-upload')


var font = 'sans-serif'

// renderMeme()
function renderMeme() {
    // newImgSelected(id)
    // toggleGallery()
    gCtxImg.clearRect(0, 0, gElCanvasImg.width, gElCanvasImg.height)
    let img = new Image()
    img.addEventListener('load', (event) => { gCtxImg.drawImage(img, 0, 0, gElCanvasImg.width, gElCanvasImg.height) })
    img.src = getCurrImg()
    imgInput.value = ''
}

function lineFocus() {
    nextLine()
}

function onLineAdd() {
    makeNewLine()
    setLineTxt(document.getElementById('text-line').value)
    onChangeSetting()
}

function onLineDelete() {
    deleteLine()
    nextLine()
}

function onChangeAlignment(side) {
    changeAlignment(side)
}

document.getElementById('text-line').addEventListener('keyup', onChangeSetting)

function onChangeSetting() {
    gCtxText.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height)
    gCtxText.beginPath()
    setLineTxt(document.getElementById('text-line').value)
    document.getElementById('color-btn').value = getTxtColor()
    var stringTitle = getLineTxt()

    gCtxText.fillStyle = getTxtColor()
    gCtxText.textAlign = getTextAlignment()
    gCtxText.font = `bold ${getLineSize()}px ${font}`

    // add a maximum width for each line of text
    var maxWidth = 250
    var words = stringTitle.split(' ')
    var line = ''
    var textY = getLineY()
    var lineHeight = getLineSize()

    for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + ' '
        var metrics = gCtxText.measureText(testLine)
        var testWidth = metrics.width
        if (testWidth > maxWidth && i > 0) {
            gCtxText.fillText(line, getLineX(), textY)
            line = words[i] + ' '
            textY += lineHeight
        } else {
            line = testLine
        }
    }
    gCtxText.fillText(line, getLineX(), textY)
    gCtxText.closePath()
}

//not rendering at canvas 2 at all

// function showOtherLines(id) {
//     gCtxTextSaved.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height)
//     for (let i = 0; i < gMemeLength(); i++) {
//         if (i === id) continue
//         gCtxTextSaved.beginPath()
//         setLineTxt(getLineTxt(i))
//         var stringTitle = getLineTxt(i)
//         gCtxTextSaved.fillStyle = getTxtColor(i)

//         var maxWidth = 250
//         var words = stringTitle.split(' ')
//         var line = ''
//         var textY = getLineY()
//         var lineHeight = getLineSize()
//         for (var j = 0; j < words.length; j++) {
//             var testLine = line + words[j] + ' '
//             var metrics = gCtxText.measureText(testLine)
//             var testWidth = metrics.width
//             if (testWidth > maxWidth && j > 0) {
//                 gCtxText.fillText(line, getLineX(), textY)
//                 line = words[j] + ' '
//                 textY += lineHeight
//             } else {
//                 line = testLine
//             }
//         }

//         gCtxText.textAlign = getTextAlignment(i)
//         gCtxTextSaved.font = `${getLineSize(i)}px ${font}`
//         // gCtxText.fillText(line, getLineX(), textY)
//         gCtxText.fillText(stringTitle, getLineX(), getLineY())
//         gCtxText.closePath()
//     }
// }

//rendering last word only

// function showOtherLines(id) {//idk if i need id
//     gCtxTextSaved.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height)
//     for (let i = 0; i < gMemeLength(); i++) {
//         if (i === id) continue
//         gCtxTextSaved.beginPath()
//         setLineTxt(getLineTxt(i))
//         var stringTitle = getLineTxt(i)
//         gCtxText.textAlign = getTextAlignment(i)
//         gCtxTextSaved.font = `${getLineSize(i)}px ${font}`
//         var maxWidth = 250
//         var words = stringTitle.split(' ')
//         var line = ''
//         var textY = getLineY()
//         var lineHeight = getLineSize()
//         for (var j = 0; j < words.length; j++) {
//             var testLine = line + words[j] + ' '
//             var metrics = gCtxText.measureText(testLine)
//             var testWidth = metrics.width
//             if (testWidth > maxWidth && j > 0) {
//                 gCtxText.fillText(line, getLineX(), textY)
//                 line = words[j] + ' '
//                 textY += lineHeight
//             } else {
//                 line = testLine
//             }
//         }
//         gCtxTextSaved.fillStyle = getTxtColor(i)
//         gCtxTextSaved.fillText(line, getLineX(i), getLineY(i))
//         gCtxText.closePath()
//     }
// }

//my basic working thing

function showOtherLines(id) {//idk if i need id
    gCtxTextSaved.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height)
    for (let i = 0; i < gMemeLength(); i++) {
        if (i === id) continue
        gCtxTextSaved.beginPath()
        setLineTxt(getLineTxt(i))
        var stringTitle = getLineTxt(i)
        gCtxTextSaved.fillStyle = getTxtColor(i)
        gCtxText.textAlign = getTextAlignment(i)
        gCtxTextSaved.font = `${getLineSize(i)}px ${font}`
        gCtxTextSaved.fillText(stringTitle, getLineX(i), getLineY(i))
        gCtxText.closePath()
    }
}

// function downloadCanvas() {
//     var gElCanvasDownload = document.querySelector('.canvas-download')
//     var gCtxDownload = gElCanvasDownload.getContext('2d')

//     gCtxDownload.clearRect(0, 0, gElCanvasDownload.width, gElCanvasDownload.height)

//     let img = new Image();
//     img.addEventListener('load', function() {
//       gCtxDownload.drawImage(img, 0, 0, gElCanvasDownload.width, gElCanvasDownload.height)

//       for (let i = 0; i < gMemeLength(); i++) {
//         gCtxDownload.beginPath()
//         setLineTxt(getLineTxt(i))
//         var stringTitle = getLineTxt(i)
//         gCtxDownload.fillStyle = getTxtColor(i)
//         gCtxDownload.font = `${getLineSize(i)}px ${font}`
//         gCtxDownload.fillText(stringTitle, getLineX(i), getLineY(i))
//         gCtxDownload.closePath()
//       }

//       // Get the data URL of the canvas image
//       var dataURL = gElCanvasDownload.toDataURL("image/png")

//       // Create a link and trigger a download of the canvas image
//       var link = document.createElement('a')
//       link.download = 'my-img.png'
//       link.href = dataURL
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     });

//     img.src = getCurrImg()
//   }

document.getElementById('img-upload').addEventListener('change', onImgInput)

function onImgInput(ev) {
    const file = ev.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        const img = new Image()
        img.src = reader.result
        img.onload = () => {
            gCtxImg.drawImage(img, 0, 0, gElCanvasImg.width, gElCanvasImg.height)
        }
    }
    reader.readAsDataURL(file)
}

//trying to separate the saving and making the canvas that is made out of all of them

function downloadCanvas() {
    var gElCanvasDownload = document.querySelector('.canvas-download')
    var gCtxDownload = gElCanvasDownload.getContext('2d')

    gCtxDownload.clearRect(0, 0, gElCanvasDownload.width, gElCanvasDownload.height)

    let img = new Image()
    img.addEventListener('load', function () {
        gCtxDownload.drawImage(img, 0, 0, gElCanvasDownload.width, gElCanvasDownload.height)

        for (let i = 0; i < gMemeLength(); i++) {
            gCtxDownload.beginPath()
            setLineTxt(getLineTxt(i))
            var stringTitle = getLineTxt(i)
            gCtxDownload.fillStyle = getTxtColor(i)
            gCtxDownload.font = `${getLineSize(i)}px ${font}`
            gCtxDownload.fillText(stringTitle, getLineX(i), getLineY(i))
            gCtxDownload.closePath()
        }

        // Get the data URL of the canvas image
        var dataURL = gElCanvasDownload.toDataURL("image/png")

        // Create a link and trigger a download of the canvas image
        var link = document.createElement('a')
        link.download = 'my-img.png'
        link.href = dataURL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })

    img.src = getCurrImg()
}
