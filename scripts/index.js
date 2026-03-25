function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    utterance.rate = 0.7;   // speed
    utterance.pitch = 1;  // tone
    window.speechSynthesis.speak(utterance);
}

function loadLevels() {
    showSpinner(true);
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((levelData) => {
            showSpinner(false);
            displayLevels(levelData.data);
        });
}

function loadLessons(level_no) {
    showSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/level/${level_no}`)
        .then((response) => response.json())
        .then((lessonData) => {
            let btns = document.getElementsByClassName("lesson-btn");
            for (let btn of btns) {
                btn.classList.add("btn-outline");
            }
            document.getElementById(`lesson-btn-${level_no}`).classList.remove("btn-outline");

            showSpinner(false);
            displayLessons(lessonData.data);
        });
}

function loadDetails(wordId) {
    fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
        .then(response => response.json())
        .then(wordDetails => {
            displayDetails(wordDetails.data);
        });
}


const showSpinner = status => {
    if (status == true) {
        document.getElementById("spinner").hidden = false;
        document.getElementById("lesson-section").hidden = true;
    }
    else {
        document.getElementById("spinner").hidden = true;
        document.getElementById("lesson-section").hidden = false;
    }
}


const displayDetails = (wordDetails) => {
    let word = wordDetails.word;
    let pronounciation = wordDetails.pronunciation;
    let meaning = wordDetails.meaning;
    let example = wordDetails.sentence;
    let synonyms = wordDetails.synonyms;

    const id = document.getElementById("my_modal_5");
    id.innerHTML = "";

    modalDiv = document.createElement("div");

    modalDiv.classList.add("modal-box");

    modalDiv.innerHTML = `
                <div class="border-2 border-[#EDF7FF] rounded-lg p-[24px]">
                    <h1 class="text-[36px] font-semibold">${word === null ? "Not Available" : word} (<i class="fa-solid fa-microphone"
                            style="color: rgb(8, 8, 8);"></i>:${pronounciation === null ? "Not Available" : pronounciation})
                    </h1>
                    <h3 class="font-semibold text-[24px] mt-8">Meaning</h3>
                    <h3 class="bangla-font font-medium text-[24px]">${meaning === null ? "Not Available" : meaning}</h3>
                    <h3 class="font-semibold text-[24px] mt-8">Example</h3>
                    <p class="text-[24px]">${example === null ? "Not Available" : example}</p>
                    <h3 class="bangla-font font-medium text-[24px] mt-8">সমার্থক শব্দগুলো</h3>
                    <div class="flex flex-wrap gap-[18px]">
                    ${synonyms.length === 0
            ? `<p class="text-[20px] bg-[#EDF7FF] border-1 border-[#D7E4EF] px-[20px] py-[6px] rounded-md" >Not Available</p >`
            : synonyms.map(element =>
                `
                            <p class="text-[20px] bg-[#EDF7FF] border-1 border-[#D7E4EF] px-[20px] py-[6px] rounded-md">${element}</p>
                        `).join("")}
                    </div>
                </div>
                <div class="modal-action flex justify-start">
                    <form method="dialog">
                        <button class="btn btn-primary font-medium text-[24px] rounded-lg px-[35px] py-[6px]">Complete Learning</button>
                    </form>
                </div>
    `
    id.appendChild(modalDiv);
    id.showModal();

}


const displayLessons = (lesson) => {
    document.getElementById("lesson-section").innerHTML = "";
    if (lesson.length == 0) {
        const noCard = document.createElement("div");
        noCard.classList.add("col-span-full");
        noCard.innerHTML = `
            <div class="flex justify-center"><img src="assets/alert-error.png" alt=""></div>
            <p class="bangla-font text-[#79716B] text-[14px] text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="bangla-font text-center font-medium text-[35px]">নেক্সট Lesson এ যান</h1>
        `
        document.getElementById("lesson-section").appendChild(noCard);
        return;
    }
    for (let words of lesson) {
        let word = words.word;
        let meaning = words.meaning;
        let pronounciation = words.pronunciation;

        const wordCard = document.createElement("div");

        wordCard.classList.add("px-[47px]", "py-[57px]", "bg-white", "rounded-lg", "space-y-7");

        wordCard.innerHTML = `
            <div class="flex flex-col justify-center items-center">
                <h1 class="font-bold text-[32px] text-center">${word == null ? "Not Found" : word}</h1>
                <p class="font-medium text-[20px] text-center">Meaning /Pronounciation</p>
                <h1 class="bangla-font font-semibold text-[32px] text-center">"${meaning == null ? "Meaning Not Found" : meaning} / ${pronounciation == null ? "Pronounciation Not Found" : pronounciation}"</h1>
            </div>
            <div class="flex justify-between">
                <button onclick="loadDetails(${words.id})" class="btn bg-[#1a90ff1e]"><i class="fa-solid fa-circle-info"
                        style="color: rgb(8, 8, 8);"></i></button>
                <button onclick="pronounceWord('${word === null ? "Not Found" : word}')" class="btn bg-[#1a90ff1e]"> <i class="fa-solid fa-volume-high" style="color: rgb(8, 8, 8);"></i>
                </button>
            </div>
        `
        document.getElementById("lesson-section").appendChild(wordCard);
    }
}

const displayLevels = (levels) => {
    document.getElementById("levels").innerHTML = "";
    for (let level of levels) {
        const levelBtn = document.createElement("button");
        levelBtn.setAttribute("id", `lesson-btn-${level.level_no}`)
        levelBtn.classList.add("btn", "btn-primary", "btn-outline", "lesson-btn");
        levelBtn.setAttribute("onclick", `loadLessons(${level.level_no})`);
        levelBtn.innerHTML = `
                <img src="assets/fa-book-open.png" alt="">
                Lesson-${level.level_no}
        `
        document.getElementById("levels").appendChild(levelBtn);
    }
}

loadLevels();


const displaySearch = (lesson) => {
    document.getElementById("lesson-section").innerHTML = "";
    if (lesson.length == 0) {
        const noCard = document.createElement("div");
        noCard.classList.add("col-span-full");
        noCard.innerHTML = `
            <div class="flex justify-center"><img src="assets/alert-error.png" alt=""></div>
            <p class="bangla-font text-[#79716B] text-[14px] text-center">কোনো মিল পাওয়া যায় নি</p>
            <h1 class="bangla-font text-center font-medium text-[35px]">অন্যকিছু Search করুন</h1>
        `
        document.getElementById("lesson-section").appendChild(noCard);
        return;
    }
    for (let words of lesson) {
        let word = words.word;
        let meaning = words.meaning;
        let pronounciation = words.pronunciation;

        const wordCard = document.createElement("div");

        wordCard.classList.add("px-[47px]", "py-[57px]", "bg-white", "rounded-lg", "space-y-7");

        wordCard.innerHTML = `
            <div class="flex flex-col justify-center items-center">
                <h1 class="font-bold text-[32px] text-center">${word == null ? "Not Found" : word}</h1>
                <p class="font-medium text-[20px] text-center">Meaning /Pronounciation</p>
                <h1 class="bangla-font font-semibold text-[32px] text-center">"${meaning == null ? "Meaning Not Found" : meaning} / ${pronounciation == null ? "Pronounciation Not Found" : pronounciation}"</h1>
            </div>
            <div class="flex justify-between">
                <button onclick="loadDetails(${words.id})" class="btn bg-[#1a90ff1e]"><i class="fa-solid fa-circle-info"
                        style="color: rgb(8, 8, 8);"></i></button>
                <button onclick="pronounceWord('${word === null ? "Not Found" : word}')" class="btn bg-[#1a90ff1e]"> <i class="fa-solid fa-volume-high" style="color: rgb(8, 8, 8);"></i>
                </button>
            </div>
        `
        document.getElementById("lesson-section").appendChild(wordCard);
    }
}

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {

    // all active btns inactive
    let btns = document.getElementsByClassName("lesson-btn");
    for (let btn of btns) {
        btn.classList.add("btn-outline");
    }


    let input = document.getElementById("search-input");
    let searchText = input.value.trim().toLowerCase();

    if (searchText === "") {
        displaySearch([]);
        return;
    }

    showSpinner(true);
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(response => response.json())
        .then(data => {
            const words = data.data;

            const filterWords = words.filter(word => word.word.toLowerCase().includes(searchText));
            displaySearch(filterWords);
        });
    showSpinner(false);
    input.value = "";
});