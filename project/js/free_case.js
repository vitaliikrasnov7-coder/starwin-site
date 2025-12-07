document.addEventListener("click", async (e) => {
    if (e.target.id === "freeCase" || e.target.closest("#freeCase")) {
        await openFreeCase();
    }
});

async function openFreeCase() {
    document.getElementById("logoContainer").style.display = "none";
    document.getElementById("casesContainer").style.display = "none";

    const container = document.getElementById("caseOpenContainer");
    container.innerHTML = await (await fetch("components/free_case_open.html")).text();

    const backLogo = document.getElementById("backLogo");
    const rouletteTrack = document.getElementById("rouletteTrack");
    const itemsList = document.getElementById("itemsList");
    const startOpen = document.getElementById("startOpen");
    const resultBlock = document.getElementById("resultBlock");
    const resultTitle = document.getElementById("resultTitle");
    const sellBtn = document.getElementById("sellBtn");
    const keepBtn = document.getElementById("keepBtn");
    const rouletteEl = document.getElementById("roulette");

    backLogo.onclick = () => {
        container.innerHTML = "";
        document.getElementById("logoContainer").style.display = "block";
        document.getElementById("casesContainer").style.display = "block";
    };

    itemsList.innerHTML = "";
    FREE_CASE_ITEMS.forEach(item => {
        let slot = document.createElement("div");
        slot.className = "item-slot";
        let img = document.createElement("img");
        img.src = item.img;
        let r = document.createElement("div");
        r.className = "rarity " + item.rarity;
        slot.appendChild(img);
        slot.appendChild(r);
        itemsList.appendChild(slot);
    });

    rouletteTrack.innerHTML = "";
    const repeats = 30;
    const rouletteSequence = [];
    for (let r = 0; r < repeats; r++) {
        FREE_CASE_ITEMS.forEach(it => rouletteSequence.push(it));
    }
    rouletteSequence.forEach(it => {
        const d = document.createElement("div");
        d.className = "roulette-item";
        d.innerHTML = <img src="${it.img}">;
        rouletteTrack.appendChild(d);
    });

    function getItemWidth() {
        const sample = document.querySelector(".roulette-item");
        if (!sample) return 140;
        return Math.round(sample.getBoundingClientRect().width);
    }

    let isSpinning = false;
    startOpen.onclick = async () => {
        if (isSpinning) return;
        isSpinning = true;
        startOpen.disabled = true;
        resultBlock.style.display = "none";

        const itemWidth = getItemWidth();
        const visibleWidth = rouletteEl.getBoundingClientRect().width;
        const centerOffsetCorrection = Math.round((visibleWidth - itemWidth) / 2);

        const winItem = FREE_CASE_ITEMS.find(i => i.rarity === "white");
        const winBaseIndex = FREE_CASE_ITEMS.indexOf(winItem);

        const baseLoops = 6 + Math.floor(Math.random() * 3);
        const finalIndex = baseLoops * FREE_CASE_ITEMS.length + winBaseIndex;
        const finalOffset = finalIndex * itemWidth - centerOffsetCorrection;

        const fastDistance = Math.max(1200, itemWidth * FREE_CASE_ITEMS.length * 4);
        rouletteTrack.style.transition = transform 2.0s linear;
        rouletteTrack.style.transform = translateX(-${fastDistance}px);

        setTimeout(()=>{
            rouletteTrack.style.transition = transform 3.0s cubic-bezier(.05,.6,.15,1);
            rouletteTrack.style.transform = translateX(-${finalOffset}px);
        }, 2000);

        setTimeout(()=>{
            resultTitle.textContent = Тебе выпал: ${winItem.name};
            resultBlock.style.display = "flex";
            isSpinning = false;
            startOpen.disabled = false;

            if (winItem.rarity === "white") {
                sellBtn.style.display = "none";
                keepBtn.style.display = "none";

                let okBtn = document.getElementById("okBtn");
                if (!okBtn) {
                    okBtn = document.createElement("button");
                    okBtn.className = "result-btn";
                    okBtn.
id = "okBtn";
                    okBtn.textContent = "Хорошо";
                    resultBlock.querySelector(".result-actions").appendChild(okBtn);
                }
                okBtn.style.display = "inline-block";
                okBtn.onclick = () => { resultBlock.style.display = "none"; };

            } else {
                sellBtn.style.display = "inline-block";
                keepBtn.style.display = "inline-block";
                const okBtn = document.getElementById("okBtn");
                if (okBtn) okBtn.style.display = "none";

                sellBtn.onclick = () => alert("Продано");
                keepBtn.onclick = () => alert("Оставлено");
            }
        }, 5200);
    };
}