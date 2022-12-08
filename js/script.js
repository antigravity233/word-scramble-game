const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh_word"),
checkBtn = document.querySelector(".check_word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--; // derrement maxTime by 1
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        intiGame(); // calling the function, so the game restart
    }, 1000);
}

const intiGame = () => {
    initTimer(30); // calling intiTimer function with passing maxtimer value
    let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words
    let wordArray = randomObj.word.split(""); // splitting each letter og random word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // getting random number
        // shuffing and swiping wordArray letters randomly
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); // passing shuffled word as word text
    hintText.innerText = randomObj.hint; // passing random object hint as hint text
    correctWord = randomObj.word.toLowerCase(); // passing random eord hint to correctWord
    inputField.value = ""; // making the input field empty
    inputField.setAttribute("maxlength", correctWord.length); // setting input maxlength vakue to word length
}
intiGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase(); // getting iser value

    // if user didn't enter anything
    if (!userWord) return alert("Please enter a word check");

    // if user word doesn't mathched to the corredt word
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);

    // if above two conditions are failed then show congrats alert because user is correct
    alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
    intiGame();

}

refreshBtn.addEventListener("click", intiGame);
checkBtn.addEventListener("click", checkWord);