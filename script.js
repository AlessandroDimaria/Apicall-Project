let currentGenre = "";
let currentPage = 1;
const pageSize = 14;
let allResults = []; 

async function searchAll() {
  const query = document.getElementById('searchInput').value;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=100`;
  const response = await fetch(url);
  const data = await response.json();
  allResults = data.results;
  currentPage = 1;
  showPage();
}

function setGenre(genre) {
  currentGenre = genre;
  currentPage = 1;
  searchByGenre();
}


async function searchByGenre() {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(currentGenre)}&entity=song&limit=100`;
  const response = await fetch(url);
  const data = await response.json();
  allResults = data.results;
  currentPage = 1;
  showPage();
}


function showPage() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = allResults.slice(start, end);

  pageItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
     <a href="${item.trackViewUrl}" target="_blank">
      <img src="${item.artworkUrl100}" alt="cover"> 
      </a>
      <h4>${item.trackName || item.collectionName}</h4>
      <p>${item.artistName}</p>
      ${item.previewUrl ? `<audio controls src="${item.previewUrl}"></audio>` : ""}
    `;
    resultsDiv.appendChild(card);
  });

  showPages();
}

function showPages() {
  const paginationDiv = document.getElementById('pagina');
  const totalPages = Math.ceil(allResults.length / pageSize);

  paginationDiv.innerHTML = `
    <button onclick="prevPage()">⬅️ Precedente</button>
    <span>Pagina ${currentPage} di ${totalPages}</span>
    <button onclick="nextPage()">Successiva ➡️</button>
  `;
}

function nextPage() {
  const totalPages = Math.ceil(allResults.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    showPage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage();
  }
}
