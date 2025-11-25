     let currentGenre = "";
    let currentPage = 1;
    const pageSize = 15; 
 async function searchArtist() {
      const query = document.getElementById('searchInput').value;
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=10`;
      const response = await fetch(url);
      const data = await response.json();
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = "";
      data.results.forEach(album => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${album.artworkUrl100}" alt="cover">
          <h4>${album.collectionName}</h4>
          <p>${album.artistName}</p>
          <a href="${album.collectionViewUrl}" target="_blank">Apri su iTunes</a>
        `;
        resultsDiv.appendChild(card);
      });
    }
async function searchByGenre(genre) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(genre)}&entity=song&limit=25`;
  const response = await fetch(url);
  const data = await response.json();
  const randomSongs = [];
  while (randomSongs.length < 14 && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    randomSongs.push(data.results.splice(randomIndex, 1)[0]);
  }
  showResults(randomSongs);
}
function showResults(items) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.artworkUrl100}" alt="cover">
      <h4>${item.trackName || item.collectionName}</h4>
      <p>${item.artistName}</p>
      ${item.previewUrl ? `<audio controls src="${item.previewUrl}"></audio>` : ""}
    `;
    resultsDiv.appendChild(card);
  });
}




