function loadLevels() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((levelData) => displayLevels(levelData.data));
}

function loadLessons(level_no) {
    fetch(`https://openapi.programming-hero.com/api/level/${level_no}`)
        .then((response) => response.json())
        .then((lessonData) => displayLessons(lessonData.data));
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
                <button class="btn bg-[#1a90ff1e]"><i class="fa-solid fa-circle-info"
                        style="color: rgb(8, 8, 8);"></i></button>
                <button class="btn bg-[#1a90ff1e]"> <i class="fa-solid fa-volume-high" style="color: rgb(8, 8, 8);"></i>
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
        levelBtn.classList.add("btn", "btn-primary", "btn-outline");
        levelBtn.setAttribute("onclick", `loadLessons(${level.level_no})`);
        levelBtn.innerHTML = `
                <img src="assets/fa-book-open.png" alt="">
                Lesson-${level.level_no}
        `
        document.getElementById("levels").appendChild(levelBtn);
    }
}

loadLevels();