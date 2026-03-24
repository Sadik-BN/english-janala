function loadLevels() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((levelData) => displayLevels(levelData.data));
}

const displayLevels = (levels) => {
    document.getElementById("levels").innerHTML = "";
    for (let level of levels) {
        const levelBtn = document.createElement("button");
        levelBtn.classList.add("btn", "btn-primary", "btn-outline");
        levelBtn.innerHTML = `
                <img src="assets/fa-book-open.png" alt="">
                Lesson-${level.level_no}
        `
        document.getElementById("levels").appendChild(levelBtn);
    }
}

loadLevels();