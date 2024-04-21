import { AddPath, getStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async function(){
    var paths = await getStorage("path")
    var selectedPath = await getStorage("selectedPath")
    var path = paths[selectedPath]["path"]
    var repos = paths[selectedPath]["repos"]
    
    console.log(path, repos)

    await AddPath(path, "path", "container")

    for(let i = 0; i < repos.length; i++){
        var repoId = "repo" + String(i)
        await AddRepo(repos[i], repoId, "repoContainer")
    }
})

// 返回按钮
const backButton = document.getElementById("backButton")
backButton.addEventListener("click", async function () {
    const searchResult = '../html/searchResult.html'
    window.location.assign(searchResult)
})



async function AddRepo(repo, repoId, containerId){
    const container = document.getElementById(containerId)

    var repoComponent = document.createElement("div")
    repoComponent.className = "repo"
    
    var repoName = document.createElement("div")
    repoName.innerText = repo["name"]
    var repoUrl = document.createElement("a")
    repoUrl.href = repo["url"]
    repoUrl.textContent = repo["url"]

    repoComponent.appendChild(repoName)
    repoComponent.appendChild(repoUrl)
    container.append(repoComponent)

}