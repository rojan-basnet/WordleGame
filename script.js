let dataG;
let input="";
let wrdLen=5;
let row=1;
let selectWrd="";
let won=false;
let userGuess={
    1:{
        guessWrd:[],
        guessWrdRes:[]
    },2:{
        guessWrd:[],
        guessWrdRes:[],
    },3:{
        guessWrd:[],
        guessWrdRes:[]
    },4:{
        guessWrd:[],
        guessWrdRes:[]
    },5:{
        guessWrd:[],
        guessWrdRes:[]
    },6:{
        guessWrd:[],
        guessWrdRes:[]
    }
}

document.addEventListener("keydown",(e)=>{
    if(/^[a-zA-Z]$/.test(e.key)){
        if(input.length>=wrdLen) return
        input+=e.key.toLocaleLowerCase()
        allSmallbox[row*5+input.length-6].textContent=e.key
    }
    else if(e.key=="Backspace"){
        if(input!=""){
            input=input.slice(0,-1)
            allSmallbox[input.length+row*5-5].textContent=""
        }
    }else if(e.key=="Enter" && input.length==wrdLen){
        const res=handleCheck(input)
        for(let i=0;i<wrdLen;i++){
            allSmallbox[row*5-5+i].classList.add(res[i])
        }
        if(input==selectWrd){
            middleMan.classList.add("display")
            winWindow.classList.add("display")
            return won=true
        }
        userGuess[row].guessWrd=input.split("")
        userGuess[row].guessWrdRes=res
        console.log(userGuess)
        input=""
        row+=1
    }
})
function hanleNewGame(){
    won=false;
    input="";
    wrdLen=5;
    row=1;
    userGuess={
    1:{
        guessWrd:[],
        guessWrdRes:[]
    },2:{
        guessWrd:[],
        guessWrdRes:[],
    },3:{
        guessWrd:[],
        guessWrdRes:[]
    },4:{
        guessWrd:[],
        guessWrdRes:[]
    },5:{
        guessWrd:[],
        guessWrdRes:[]
    },6:{
        guessWrd:[],
        guessWrdRes:[]
    }
}
    selectRanddomWord(dataG)
    middleMan.classList.remove("display")
    winWindow.classList.remove("display")

    allSmallbox.forEach(box=>{
        if(box.classList.length>1){
            box.classList.remove(box.classList[box.classList.length - 1]);
            box.textContent=""
        }
        
    })

}
const middleMan=document.querySelector(".middleman")
const winWindow=document.querySelector(".gameWonWindow")
const newGame=document.getElementById("newGameaBtn")
const hintBox=document.querySelector(".hintBox")

newGame.addEventListener("click",()=>{
    hanleNewGame()
})

function handleCheck(arr){
    let res=[]
    for(let i=0;i<arr.length;i++){
        const check=arr[i]==selectWrd[i]
        if(check){
            res.push("c")
        }else if(selectWrd.includes(arr[i]))
            res.push("e")
        else
            res.push("w")
        
    }
    return res

}

const board=document.querySelector(".tableDispaly")
board.classList.add("medium")

for(let i=0;i<wrdLen*6;i++){
    const smallbox = document.createElement("div");
    smallbox.classList.add("newbox")
    board.appendChild(smallbox)
}
function selectRanddomWord(arr){
    let wrd=arr[Math.floor(Math.random()*arr.length)]
    selectWrd=wrd.word
    hintBox.textContent="Hint : "+wrd.hint
}

fetch("words.json")
    .then(res=>res.json())
    .then(data=>{
        dataG=data.medium
        selectRanddomWord(dataG)
    })
    .catch(err=>console.log(err))

const allSmallbox=document.querySelectorAll(".newbox")