const electron = require("electron");
const path = require("path");
const {BrowserWindow} = electron.remote
const axios = require("axios")
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById("notifyBtn")
const priceElm = document.querySelector("h1");
const targetPrice = document.getElementById("targetPrice");
targetPrice.innerHTML = ""
let targetPriceVal = ""
ipc.on("targetPriceVal" , function(evt , arg){
    targetPriceVal = arg;   
    targetPrice.innerHTML = `$${arg}`
})
const isNotified = false ;


const notification = {
    title:"BTC Alert",
    body:"BTC just beat your price !"
}

function getBTC(){
    axios.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD").then(res =>{
        const cryptoPriceInUSD = res.data.USD;
        priceElm.innerHTML = `$${cryptoPriceInUSD}`;
        console.log(targetPrice.innerHTML != "" && targetPriceVal < cryptoPriceInUSD)
        if(targetPrice.innerHTML != "" && targetPriceVal < cryptoPriceInUSD){
           
            const myNotification  = new window.Notification(notification.title , notification)
        }
    })
}
getBTC();
setInterval(getBTC , 5000)
notifyBtn.addEventListener("click", function(){
    //Here we build new window
    const modalPath = path.join("file://" ,  __dirname , "add.html")
    let win = new BrowserWindow({width: 400 , height: 200 ,frame: false , alwaysOnTop:true ,  transparent: true , webPreferences:{
        nodeIntegration:true,
        enableRemoteModule:true
    }})
    // win.webContents.openDevTools()
    win.on("close" , function (){
        win = null 
    })    
    win.loadURL(modalPath)  
})

