const toggleBtn = document.getElementById("toggleSwitch");
const toggleCircle = document.getElementById("toggleCircle");
const body = document.body;
const header = document.getElementById("main-header");
const form = document.getElementById("form");
let isDark = true; 

toggleBtn.addEventListener('click', () => {
    isDark = !isDark;

    if(!isDark){
        toggleCircle.classList.add("bg-white");
        toggleCircle.classList.remove("bg-black");
        toggleCircle.innerHTML = "☀️";
        body.classList.add("bg-white");
        body.classList.remove("bg-black/90");
        toggleCircle.classList.add("translate-x-6");
        form.classList.add("bg-bgh");
        form.classList.remove("bg-black");
        header.classList.add("bg-bgh");
        header.classList.remove("bg-black");
    } else {
        toggleCircle.classList.add("bg-black");
        toggleCircle.classList.remove("bg-white");
        toggleCircle.innerHTML = "🌙";
        body.classList.add("bg-black/90");
        body.classList.remove("bg-white");
        toggleCircle.classList.remove("translate-x-6");
        form.classList.add("bg-black");
        form.classList.remove("bg-bgh");
        header.classList.add("bg-black");
        header.classList.remove("bg-bgh");
        header.classList.add("bg-black");
    }
});