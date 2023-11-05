const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("type-display");
const typeInput = document.getElementById('type-Input');
const timer = document.getElementById('timer');

const typeSound = new Audio('./typing-sound.mp3');
const wrongSound = new Audio('./wrong (1).mp3');
const correctSound = new Audio('./correct.mp3');


/*inputテキスト入力の判定 */
typeInput.addEventListener('input', () =>{

    /*タイプ音をつける */
    typeSound.play();
    typeSound.currentTime = 0;


    const sentenceArray = typeDisplay.querySelectorAll('span');
    //console.log(sentenceArray);
    const arrayvalue = typeInput.value.split('');
    //console.log(arrayvalue);
    let correct = true;
    sentenceArray.forEach((characterSpan,index) => {
        if(arrayvalue[index] == null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }else if(characterSpan.innerText == arrayvalue[index]){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }else{
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');


            wrongSound.play();
            wrongSound.currentTime = 0;

            correct = false;
        }
    })


    if(correct == true){
        correctSound.play();
        correctSound.currentTime = 0;
        RenderNextSentence();
    }
});





/*非同期でランダムな文章を取得する*/
function GetrandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

/*ランダムな文章を取得して表示する*/
async function RenderNextSentence() {
    const sentence = await GetrandomSentence();
    typeDisplay.innerText = sentence; // この行は不要になります。下のコードで置き換えます。
    /*文章を1文字ずつ分解して、spanタグを生成する*/
    let oneText = sentence.split("");

    // typeDisplayの中身をクリアします
    typeDisplay.innerHTML = '';

    oneText.forEach((character) => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        typeDisplay.appendChild(characterSpan); // typeDisplayにcharacterSpanを追加する
        //console.log(characterSpan); // コンソールでspanタグを表示する
        typeDisplay.appendChild(characterSpan);
        //characterSpan.classList.add('correct');
    });

    /*テキストボックスの中身を消す*/
    typeInput.value = '';

    StaratTimer();
}


let startTime = '';
let originTime = 30;

function StaratTimer() {
    timer.innerText = originTime;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = originTime - getTime();
        if(timer.innerText <= 0) TimeUp();
    },1000)
}


function getTime() {
    return Math.floor((new Date() - startTime ) / 1000);
}

function TimeUp() {
    RenderNextSentence();
}

RenderNextSentence();
