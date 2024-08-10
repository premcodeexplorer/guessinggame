let AnimalsArr = [
    {
        question: "It has two legs and two wings.",
        words: "crow"
    },
    {
        question: "A big cat known as the king of the jungle.",
        words: "lion"
    },
    {
        question: "An animal that hops and has long ears.",
        words: "hare"
    },
    {
        question: "It has a long neck and lives in the savannah.",
        words: "gira"
    },
    {
        question: "An animal known for building dams.",
        words: "beaver"
    }
];

let FoodArr = [
    {
        question: "A yellow fruit that monkeys love.",
        words: "banana"
    },
    {
        question: "A sweet treat made from cocoa.",
        words: "candy"
    },
    {
        question: "A type of pasta, usually long and thin.",
        words: "spaghetti"
    },
    {
        question: "A dairy product that you spread on bread.",
        words: "butter"
    },
    {
        question: "A red fruit often mistaken for a vegetable.",
        words: "tomato"
    }
];

let SportsArr = [
    {
        question: "A sport played with a racket and shuttlecock.",
        words: "tennis"
    },
    {
        question: "A sport where you shoot a ball into a hoop.",
        words: "basketball"
    },
    {
        question: "A team sport played on ice with a puck.",
        words: "icehockey"
    },
    {
        question: "A sport that involves running around bases.",
        words: "baseball"
    },
    {
        question: "A sport that involves swimming, biking, and running.",
        words: "triathlon"
    }
];

let selectedoption = "Animals",
questionCounts=0,
ideaCount=true;

const gamecards = document.querySelector(".gamecards"),
allCards = document.querySelectorAll(".gamecards  .cards"),
playground = document.querySelector(".playground"),
Startgame =document.querySelector(".Startgame"),
questionhints=document.querySelector(".questionhints"),
resetselection=document.querySelector(".resetselection"),
selectedwords=document.querySelector(".selectedwords"),
shufflewords=document.querySelector(".shufflewords");

allCards.forEach( card => {
 card.addEventListener("click",(e)=>{

    allCards.forEach((el) => {
     el.classList.remove("active");
    })

       e.target.classList.add("active");
       selectedoption=(e.target.getAttribute("data-option"))
    });
   });


   Startgame.addEventListener("click", () => {
    if (Startgame.innerText == "Start Game") {
        gamecards.style.display = "none";
        playground.style.display = "block";
        Startgame.innerText = "Back to Home";
        resetselection.style.display="inline";
        resetselection.setAttribute("disabled",true);
        startToGuessTheWord();
    } else {
        gamecards.style.display = "flex";
        playground.style.display = "none";
        Startgame.innerText = "Start Game";
        resetselection.style.display="none";  
    }
});

let selectedArr=[],
randomWords =[];
function startToGuessTheWord(){
    selectedwords.innerHTML="";
    shufflewords.innerHTML="";

    if(selectedoption == "Animals"){
        selectedArr = AnimalsArr;
    }else if(selectedoption == "Food"){
        selectedArr = FoodArr;
    } else{
        selectedArr = SportsArr;
    }

    console.log(selectedArr);
    questionhints.innerHTML = selectedArr[questionCounts].question ;
    randomWords = selectedArr[questionCounts].words.split("");
 

    if(randomWords!=null){
          let checkRandom = randomWords;
          shuffle(randomWords);
       
          if(checkRandom == randomWords){
            shuffle(randomWords);
          }

        randomWords.forEach(char =>{
            let div1 =document.createElement("div");
             div1.classList.add("box");
             selectedwords.append(div1);
           
             let div2 =document.createElement("div");
            div2.classList.add("box");
            div2.innerHTML = char;
                div2.addEventListener("click",(e)=>{
                    chooseWordToGuess(e.target.innerText)
                    e.target.innerText="";
                    e.target.style.background="lightgray";
                });
            shufflewords.append(div2);
        });
    
}
}

function chooseWordToGuess(char){
    const boxes=document.querySelectorAll(".selectedwords .box");
   let Iswordplaced = true;
    totalwords =0;
    corrrectwords="";

    boxes.forEach((box) =>{
         if(Iswordplaced && box.innerText==""){
     box.innerText=char;
     Iswordplaced = false;
         }   

         if(box.innerText !=""){
            corrrectwords += box.innerText.toLowerCase();
            totalwords++;
         }
    });
 

    if(totalwords == randomWords.length){
    checkSelectedWord(corrrectwords);
    }
}

function checkSelectedWord(correctanswer){
    const boxes = document.querySelectorAll(".selectedwords .box");

    if(selectedArr[questionCounts].words == correctanswer){
        boxes.forEach((box) =>{
            box.classList.add("match")
        });


        setTimeout(function (){
            questionCounts++;
            if(questionCounts<5){
            startToGuessTheWord();
            }else{
               alert("game done , please back to home") ;
            }
        },2000);
    }else{
        boxes.forEach((box) =>{
            box.classList.add("shake")
        });
        resetselection.removeAttribute("disabled");
    }
}
resetselection.addEventListener("click",(e)=>{
    startToGuessTheWord();
    resetselection.setAttribute("diabled",true)
});

const shuffle =(array)=>{
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random() * (i+1));
        [array[i],array[j]] = [array[j],array[i]];
    }
    return array;
}