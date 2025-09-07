let games = [];

async function loadGames() {
  const res = await fetch("games.json");
  games = await res.json();
  showGames();
}

function showGames() {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";
  games.forEach(g => {
    const card = document.createElement("div");
    card.className = "gameCard";
    card.textContent = g.name;
    card.onclick = () => playGame(g.url);
    grid.appendChild(card);
  });
}

function playGame(url) {
  document.getElementById("gameGrid").classList.add("hidden");
  const player = document.getElementById("player");
  player.classList.remove("hidden");
  document.getElementById("gameFrame").src = url;
}

function backToGames() {
  document.getElementById("gameFrame").src = "";
  document.getElementById("player").classList.add("hidden");
  document.getElementById("gameGrid").classList.remove("hidden");
}

document.getElementById("backBtn").addEventListener("click", backToGames);

loadGames();
