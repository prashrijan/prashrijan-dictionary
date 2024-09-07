const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const button = document.getElementById("button")
const resultContainer = document.querySelector(".result-container")
const sound = document.getElementById("sound");




button.addEventListener("click", fetchData)
window.addEventListener("keypress" ,(e) => {
    if(e.key === "Enter" ){
        fetchData()
    }
})

function updateResult(data){
    if(Array.isArray(data)){
        resultContainer.innerHTML = ""
        
        resultContainer.innerHTML += 
                `
                    <div class="result">
                        <h2>${data[0].word}</h2>
                        <p>${data[0].meanings[0].partOfSpeech} / ${data[0].phonetics[1].text}</p>
                        <button class="volume"  onclick= "playSound()">
                            <i class="ri-volume-up-line">
                        </button>
                        </i>
                    </div>
                    <div class="definiton">
                        <h3>Definition</h3>
                        <p>${data[0].meanings[0].definitions[0].definition}</p>
                    </div>
                `
                if(data[0].phonetics[1].audio !== ""){
                    sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
                }
        }else{
            resultContainer.innerHTML = ""
            resultContainer.innerHTML = 
            `
                <h3>${data.title}</h3>
                <p>${data.message}</p>
            `
        }
    
            
}

function playSound(){

    if(!sound.src || sound.src === ""){
        alert("We couldn't find the audio for you pal.")
    }

    sound.play()
}


function fetchData(){
    const inputVal = document.getElementById("input").value 

    
    if(!inputVal){
        alert("Please enter a word")
    }else{
        fetch(url + inputVal)
            .then(response => response.json())
            .then((data) => updateResult(data))
            .catch((error) => {
                console.log(error);
                
        })
    }
}