import { getStorage, setStorage, AddPath } from "./utils.mjs"

document.addEventListener("DOMContentLoaded", async function () {
    // 绘制路径
    await RemoveAllPath()
    var paths = await getStorage("path")
    var i = 0
    for (; i < paths.length; i++) {
        await AddPath(paths[i]['path'], "path" + String(i), "container")
    }

    // 添加跳转事件
    var pathContainers = document.getElementsByClassName("pathContainer")
    console.log(pathContainers)
    if (pathContainers.length == 0) { return }

    for (let i = 0; i < pathContainers.length; i++) {
        pathContainers[i].addEventListener("click", async function () {
            await setStorage("selectedPath", i)
            var learnPath = "../html/learnPath.html"
            window.location.assign(learnPath)
        })
    }
})

document.addEventListener("DOMContentLoaded", async function () {
    // 显示文字
    const text = document.getElementById("header")
    const value2string = {
        0: "前端开发",
        1: "后端开发",
        2: "全栈开发",
        3: "PC端开发",
        4: "移动端开发"
    }
    const catagory = await getStorage("catagory")
    text.innerText = "针对您选择的："
        + value2string[catagory]
        + "方向，我们推荐您按照一下路径进行开发技术学习："
})


// 返回按钮
const backButton = document.getElementById("backButton")
backButton.addEventListener("click", async function () {
    const popup = '../html/popup.html'
    window.location.assign(popup)
})

async function RemoveAllPath() {
    var container = document.getElementById("container")
    var components = container.getElementsByClassName("path")
    if (components.length === 0) {
        return
    }
    for (component in components) {
        container.removeChild(component)
    }
}

