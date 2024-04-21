export async function setStorage(key, value) {
    // console.warn(`set ${key} to ${JSON.stringify(value)}`)
    let obj = {}; obj[key] = value;
    await chrome.storage.session.set(obj)
}

export async function getStorage(key) {
    const value = (await chrome.storage.session.get([key]))[key]
    if (value === null || value === undefined) {
        // console.warn(`warning: ${key} not found in storage`)
        return null
    }
    return value
}


// 在containerID组件内部添加一个pathContainer组件
export async function AddPath(path, pathId, containerId) {
    var container = document.getElementById(containerId)

    var pathContainer = document.createElement("div")
    pathContainer.className = "pathContainer"
    pathContainer.id = pathId

    var canvas = document.createElement("canvas")

    // 每行画固定(4)个节点, 根据数量调整高度
    var canvasHeight = [180, 300, 420]
    var height = 0
    var length = path.length
    canvas.width = 1000

    if (length < 5) { height = canvasHeight[0] }
    else if (length < 9) { height = canvasHeight[1] }
    else { height = canvasHeight[2] }

    canvas.height = height
    canvas.style.height = String(height * 390 / canvas.width) + "px"

    canvas.className = "pathCanvas"
    pathContainer.appendChild(canvas)
    container.appendChild(pathContainer)

    var ctx = canvas.getContext('2d')

    var startX = 90
    var distanceX = 180
    var distanceY = 120
    var y = 45
    var radius = 15

    for (var i = 0; i < length; i++) {
        var pos = i % 4
        var x = startX + pos * distanceX
        if (pos == 0 && i > 0) { y += distanceY }

        // 一个圆形
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = 'red'
        ctx.fill()

        // 文字
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(path[i], x, y + 60);

        // 箭头
        if (i < length - 1) {
            x += radius
            var endX = x + distanceX - 2 * radius

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, y);
            ctx.stroke();

            // 绘制箭头头部
            var arrowSize = 30;
            var angle = Math.PI / 9;

            ctx.beginPath();
            ctx.moveTo(endX, y);
            ctx.lineTo(endX - arrowSize * Math.cos(angle), y - arrowSize * Math.sin(angle));
            ctx.lineTo(endX - arrowSize * Math.cos(angle), y + arrowSize * Math.sin(angle));
            ctx.closePath();
            ctx.fill();
        }
    }
}
