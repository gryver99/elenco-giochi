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
      <a href="${game.url}" target="_blank">
        <img src="${game.image}" alt="${game.title}">
      </a>

      <div class="card-content">
        <h3>${icon} ${game.title} Codes (${game.month}) – ${game.status}</h3>
        <p>${game.description}</p>
        <p class="card-meta">Aggiornato il ${formatDate(game.updated_at)}</p>

        <a href="${game.url}" target="_blank">Leggi di più</a>
      </div>
    `;

    container.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(games.length / CARDS_PER_PAGE);
  const pag = document.getElementById('pagination
  return d.toLocaleDateString('it-IT');
}

loadData();
