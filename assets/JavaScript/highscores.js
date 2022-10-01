const highScoresList = document.querySelector('#highScoresList');
let highScores = localStorage.getItem('highScores') || [];

highScores = JSON.parse(highScores);

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('');