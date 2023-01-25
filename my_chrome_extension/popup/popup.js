const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

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
    
    let myList = Object.values(record[0]);

    document.getElementById("popup-content").innerHTML = myList[0].map(x => `<li>${x.awayTeam + ' ' + x.awayTeamScore + ' vs ' + x.homeTeam + ' ' + x.homeTeamScore}</li>`).join('');
}

button1.addEventListener("click", (e) => fetchData("premierleague"));
button2.addEventListener("click", (e) => fetchData("laliga"));
button3.addEventListener("click", (e) => fetchData("seriea"));
