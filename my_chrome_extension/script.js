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

    document.getElementById('scores').innerHTML = myList[0].map(x => `<li>${x.awayTeam + ' ' + x.awayTeamScore + ' vs ' + x.homeTeam + ' ' + x.homeTeamScore}</li>`).join('');
}

// Add a message listener that sets the value of "replace"
chrome.runtime.onMessage.addListener((request) => {
    if (request["buttonName"] == "button1") {
        fetchData("premierleague");
    } else if (request["buttonName"] == "button2") {
        fetchData("laliga");
    } else {
        fetchData("seriea");
    }
  });
  
