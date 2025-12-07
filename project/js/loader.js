async function loadComponent(target, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(target).innerHTML = html;
}

(async ()=>{
    await loadComponent("logoContainer", "components/logo.html");
    await loadComponent("casesContainer", "components/cases.html");
})();