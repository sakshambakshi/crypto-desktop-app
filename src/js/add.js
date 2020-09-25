const electron = require("electron");
const path = require("path");
const remote = electron.remote
const ipc = electron.ipcRenderer;
let electronWindow = remote.getCurrentWindow()
const notifyValElem =  document.getElementById("notifyVal")

const notityValForm = document.querySelector("form")

notityValForm.addEventListener("submit" , function(evt){
    evt.preventDefault()
    const notifyVal = notifyValElem.value;
    //Validate the value of notifyVal is it number or not
    ipc.send("update-notify-value" , notifyVal)
    electronWindow.close()
})


const closeBtn = document.getElementById("closeBtn")

closeBtn.addEventListener("click" , function(event){
    
    electronWindow.close()
})