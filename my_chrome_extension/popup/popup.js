const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

const leagueMappings = {
    "button1": "premierleague",
    "button2": "laliga",
    "button3": "seriea"
}

async function fetchData(league) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cf8bc36211mshe8ea1fa03e4a36bp1a2a82jsnb5ed8e946814',
            'X-RapidAPI-Host': 'football98.p.rapidapi.com'
        }
    };

    const res = await fetch('https://football98.p.rapidapi.com/${league}/results', options)
    const record = await res.json()

    console.log('record', record)

    scores.innerHTML = record[0](x => `<li>${x.awayTeam + ' ' + x.awayTeamScore + ' vs ' + x.homeTeam + ' ' + x.homeTeamScore}</li>`).join('');

}

button1.addEventListener("click", (e) => fetchData(leagueMappings["button1"]));
button2.addEventListener("click", (e) => fetchData(leagueMappings["button2"]));
button3.addEventListener("click", (e) => fetchData(leagueMappings["button3"]));
