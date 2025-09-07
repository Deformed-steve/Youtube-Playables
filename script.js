let games = [];

async function loadGames() {
  const res = await fetch("games.json");
  games = await res.json();
  showRandomGames();
}

function showRandomGames() {
  const content = document.getElementById("content");
  content.innerHTML = "<h2>Featured Games</h2>";
  
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  selected.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "gameBtn";
    btn.textContent = g.name;
    btn.onclick = () => playGame(g.url);
    content.appendChild(btn);
  });

  const allBtn = document.createElement("button");
  allBtn.className = "gameBtn";
  allBtn.textContent = "All Games";
  allBtn.onclick = showAllGames;
  content.appendChild(allBtn);
}

function showAllGames() {
  const content = document.getElementById("content");
  content.innerHTML = "<h2>All Games</h2>";
  games.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "gameBtn";
    btn.textContent = g.name;
    btn.onclick = () => playGame(g.url);
    content.appendChild(btn);
  });
}

function playGame(url) {
  document.getElementById("content").classList.add("hidden");
  const player = document.getElementById("gamePlayer");
  player.classList.remove("hidden");
  document.getElementById("gameFrame").src = url;
}

function backToGames() {
  document.getElementById("gameFrame").src = "";
  document.getElementById("gamePlayer").classList.add("hidden");
  document.getElementById("content").classList.remove("hidden");
  showAllGames();
}

document.getElementById("backBtn").addEventListener("click", backToGames);
document.getElementById("homeBtn").addEventListener("click", showRandomGames);
document.getElementById("allGamesBtn").addEventListener("click", showAllGames);
document.getElementById("homeTitle").addEventListener("click", showRandomGames);

loadGames();
