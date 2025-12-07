document.addEventListener("scroll", () => {
    const logoBar = document.getElementById("logoBar");
    const casesBar = document.getElementById("casesBar");
    if (!logoBar || !casesBar) return;

    let y = Math.min(window.scrollY, 200);
    let o = 1 - y / 200;
    logoBar.style.transform = translateY(-${y}px);
    logoBar.style.opacity = o;
    casesBar.style.transform = translateY(-${y}px);
    casesBar.style.opacity = o;
});