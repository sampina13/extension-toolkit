const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

async function fetchPrem() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cf8bc36211mshe8ea1fa03e4a36bp1a2a82jsnb5ed8e946814',
            'X-RapidAPI-Host': 'football98.p.rapidapi.com'
        }
    };

    const res = await fetch('https://football98.p.rapidapi.com/premierleague/results', options)
    const record = await res.json()
}

async function fetchlaLiga() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cf8bc36211mshe8ea1fa03e4a36bp1a2a82jsnb5ed8e946814',
            'X-RapidAPI-Host': 'football98.p.rapidapi.com'
        }
    };

    const res = await fetch('https://football98.p.rapidapi.com/laliga/results', options)
    const record = await res.json()
}

async function fetchSeriea() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cf8bc36211mshe8ea1fa03e4a36bp1a2a82jsnb5ed8e946814',
            'X-RapidAPI-Host': 'football98.p.rapidapi.com'
        }
    };

    const res = await fetch('https://football98.p.rapidapi.com/seriea/results', options)
    const record = await res.json()
}

button1.addEventListener("click", (e) => fetchPrem());
button2.addEventListener("click", (e) => fetchlaLiga());
button3.addEventListener("click", (e) => fetchSeriea());
