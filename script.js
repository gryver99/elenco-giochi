const CARDS_PER_PAGE = 10;
let games = [];
let currentPage = 1;

async function loadData() {
  const res = await fetch('data.json');
  const data = await res.json();
  games = data.games || [];

  // 🔥 Ordina automaticamente per data (dal più recente al più vecchio)
  games.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  renderPage(1);
}

function renderPage(page) {
  currentPage = page;
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  const start = (page - 1) * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const pageItems = games.slice(start, end);

  pageItems.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';

    const icon = getStatusIcon(game.status);

    card.innerHTML = `
      <a href="${game.url}">
  <img src="${game.image}" alt="${game.title}">
</a>
      <div class="card-content">
        <h3>${icon} ${game.title} Codes (${game.month}) – ${game.status}</h3>
        <p>${game.description}</p>
        <p class="card-meta">Aggiornato il ${formatDate(game.updated_at)}</p>
        <a href="${game.url}">Leggi di più</a>
      </div>
    `;

    container.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(games.length / CARDS_PER_PAGE);
  const pag = document.getElementById('pagination');
  pag.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => renderPage(i));
    pag.appendChild(btn);
  }

  if (currentPage < totalPages) {
    const next = document.createElement('button');
    next.textContent = 'Next';
    next.addEventListener('click', () => renderPage(currentPage + 1));
    pag.appendChild(next);
  }
}

function getStatusIcon(status) {
  status = status.toLowerCase();
  if (status.includes("new")) return "🆕";
  if (status.includes("updated")) return "🔄";
  if (status.includes("code")) return "🎁";
  if (status.includes("bonus")) return "⭐";
  return "🎮";
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('it-IT');
}

loadData();
