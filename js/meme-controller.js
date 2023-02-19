
const gElCanvasImg = document.querySelector('.canvas-img')
const gCtxImg = gElCanvasImg.getContext('2d')

const gElCanvasText = document.querySelector('.canvas-text')
const gCtxText = gElCanvasText.getContext('2d')

const gElCanvasTextSaved = document.querySelector('.canvas-saved')
const gCtxTextSaved = gElCanvasTextSaved.getContext('2d')

const imgInput = document.querySelector('img-upload')


var font = 'sans-serif'

// renderMeme()
function renderMeme() {
    // newImgSelected(id)
    toggleGallery()
    gCtxImg.clearRect(0, 0, gElCanvasImg.width, gElCanvasImg.height)
    let img = new Image()
    img.addEventListener('load', (event) => { gCtxImg.drawImage(img, 0, 0, gElCanvasImg.width, gElCanvasImg.height) })
    img.src = getCurrImg()
    imgInput.value = ''//idk why its buggy tbh
}

function lineFocus() {
    nextLine()
}

function onLineAdd() {
    makeNewLine()
    setLineTxt(document.querySelector('textarea.text-line').value)
    onChangeSetting()
}

function onLineDelete() {
    deleteLine()
    nextLine()
}

function onChangeAlignment(side) {
    changeAlignment(side)
}

document.querySelector('input.img-upload').addEventListener('change', onImgInput)

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

document.querySelector('textarea.text-line').addEventListener('keyup', onChangeSetting)

function onChangeSetting() {
    gCtxText.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height)
    gCtxText.beginPath()
    setLineTxt(document.querySelector('textarea.text-line').value)
    document.querySelector('.color-btn').value = getTxtColor()
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

    var lines = []
    // split the string into multiple lines based on the maxWidth
    //make functions for this
    seperateLines(words, maxWidth, lines)

    // Determine the height and position of the box
    const boxHeight = lineHeight * lines.length
    const boxTop = textY - boxHeight / 2 - 10
    console.log(boxTop);//got idea for the outbound, like save
    //it and add to the drawing part. so it will be lower, box and the text

    // Draw the box
    gCtxText.strokeStyle = 'white'
    gCtxText.lineWidth = 3
    gCtxText.strokeRect(getLineX()-10, boxTop, 270, boxHeight + 10)

    // Draw each line of text separately
    drawLine(lineHeight, textY, lines)
    // showOtherLines(getCurrLineIdx())
}

function drawLine(lineHeight, textY, lines) {
    lines.forEach((line, i) => {
        gCtxText.beginPath()
        const textYOffset = (i * lineHeight) - ((lines.length - 1) * lineHeight / 2)
        const textBottom = textY + textYOffset + lineHeight / 2
        gCtxText.fillStyle = line.color
  
        // Only draw text if it is within canvas bounds
        if (textBottom > 0 && textBottom < gElCanvasText.height) {
          gCtxText.font = `bold ${line.size}px ${font}`
          gCtxText.fillText(line.text, getLineX(), textY + textYOffset)
        }
        gCtxText.closePath()
      })
}

function seperateLines(words, maxWidth, lines) {
    while (words.length) {
        var lineWords = []
        var lineWidth = 0
        while (words.length && lineWidth + gCtxText.measureText(words[0]).width <= maxWidth) {
          lineWords.push(words.shift())
          lineWidth += gCtxText.measureText(lineWords[lineWords.length - 1]).width
          if (lineWidth < maxWidth && words.length) {
            lineWidth += gCtxText.measureText(' ').width
          }
        }
        lines.push({ text: lineWords.join(' '), color: getTxtColor(), size: getLineSize() })
      }
}

function showOtherLines(id) {//idk if i need id, + need to make it show other lines
    gCtxTextSaved.clearRect(0, 0, gElCanvasText.width, gElCanvasText.height)
    for (let i = 0; i < gMemeLength(); i++) {
        if (i === id) continue
        gCtxTextSaved.beginPath()
        setLineTxt(getLineTxt(i))
        var stringTitle = getLineTxt(i)
        gCtxTextSaved.fillStyle = getTxtColor(i)
        gCtxTextSaved.textAlign = getTextAlignment(i)
        gCtxTextSaved.font = `${getLineSize(i)}px ${font}`
        gCtxTextSaved.fillText(stringTitle, getLineX(i), getLineY(i))
        gCtxText.closePath()
    }
}

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


//ok, starting now, from line 100 the new things i gotta compare. and copy there

