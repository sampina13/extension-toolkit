async function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cf8bc36211mshe8ea1fa03e4a36bp1a2a82jsnb5ed8e946814',
            'X-RapidAPI-Host': 'football98.p.rapidapi.com'
        }
    };
    
    const res = await fetch('https://football98.p.rapidapi.com/premierleague/results', options)
    const record = await res.json()

    console.log('record', record)
    
    let myList = Object.values(record[0]);

    document.getElementById('scores').innerHTML = myList[0].map(x => `<li>${x.awayTeam + ' ' + x.awayTeamScore + ' vs ' + x.homeTeam + ' ' + x.homeTeamScore}</li>`).join('');
}
fetchData();