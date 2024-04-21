import { setStorage, getStorage } from "./utils.mjs"


// 获取用户
document.addEventListener('DOMContentLoaded', async function () {
    await UpdateUserName()
})

// 切换至 help 页面
document.getElementById('helpButton').addEventListener('click', function () {
    const helpPage = '../html/help.html'
    window.location.assign(helpPage)
})

// 提交表单按钮
const startButton = document.getElementById("startButton")
startButton.addEventListener('click', async function () {
    const formValue = document.getElementById('catagory').value
    if (!formValue) {
        alert("请选择学习方向")
        return
    }

    setStorage("catagory", formValue)

    // 发送请求
    // const userName = await getStorage("userName")
    // const url = new URL("Server API")
    // url.searchParams.append('catagory', formValue)
    // url.searchParams.append('catagory', userName)
    // fetch(url)
    // .then((response)=>{
    //     // store response
    // })
    // .catch((e)=>{
    //     console.log(e)
    // })


    var res = [
        {
            'path': ["HTML", "CSS", "Javascript"],
            'repos': [{
                'name': "whatwg/html",
                'url': "https://github.com/whatwg/html"
            }, {
                'name': "primer/css",
                'url': "https://github.com/primer/css"
            }, {
                'name': "airbnb/javascript",
                'url': "https://github.com/airbnb/javascript"
            }]
        },
        {
            'path': ["Javascript", "Vue"],
            'repos': [{
                'name': "airbnb/javascript",
                'url': "https://github.com/airbnb/javascript"
            }, {
                'name': "vuejs/vue",
                'url': "https://github.com/vuejs/vue"
            }]
        },
        {
            'path': ["CSS", "Vue", "Element Plus"],
            'repos': [{
                'name': "primer/css",
                'url': "https://github.com/primer/css"
            }, {
                'name': "vuejs/vue",
                'url': "https://github.com/vuejs/vue"
            },
            {
                'name': "element-plus/element-plus",
                'url': "https://github.com/element-plus/element-plus"
            }]
        }
    ]
    await setStorage("path", res)

    // 切换页面
    const searchResult = '../html/searchResult.html'
    window.location.assign(searchResult)

})


async function UpdateUserName() {
    let tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    })
    let tab = tabs[0]

    chrome.tabs.sendMessage(tab.id, { type: 'fetchUserName' })
        .then(async function (res) {
            console.log(res)
            if (res.homePage === "True") {
                await setStorage("userName", res.userName)
                const welcome_text = document.getElementById("hello")
                welcome_text.innerText = "Hello, " + res.userName
                ChangeDisplay("Normal")
            }
            else {
                await setStorage("userName", "")
                ChangeDisplay("NoUser")
            }
        })
        .catch((e) => {
            ChangeDisplay("NoUser")
            console.log(e)
        })
}


function ChangeDisplay(type) {
    if (type === "Normal") {
        document.getElementById("popup").style.display = 'block'
        document.getElementById("noUser").style.display = 'none'
    }
    else if (type === "NoUser") {
        document.getElementById("popup").style.display = 'none'
        document.getElementById("noUser").style.display = 'block'
    }
    else {
        console.warn(`Unknown type: ${type}`)
    }
}

