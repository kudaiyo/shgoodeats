const grid = document.getElementById('restaurant-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function priceLabel(range) {
  const map = { '¥': 'Budget', '¥¥': 'Moderate', '¥¥¥': 'Upscale', '¥¥¥¥': 'Fine Dining' };
  return map[range] || range;
}

function renderCards(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<p class="empty">No restaurants found.</p>';
    return;
  }
  list.forEach(r => {
    const dishes = Array.isArray(r.mustTry) ? r.mustTry : [r.mustTry];
    const dishTags = dishes.map(d => `<span class="dish-tag">${d}</span>`).join('');

    const metaRows = [
      r.perPerson   ? `<span class="info-pill">💰 ${r.perPerson}</span>` : `<span class="info-pill">💰 ${priceLabel(r.priceRange)}</span>`,
      r.groupSize   ? `<span class="info-pill">👥 ${r.groupSize}</span>` : '',
      r.occasion    ? `<span class="info-pill">🎉 ${r.occasion}</span>` : '',
      r.atmosphere  ? `<span class="info-pill">🏠 ${r.atmosphere}</span>` : '',
    ].filter(Boolean).join('');

    const reservationRow = r.reservation
      ? `<p class="reservation">🗓 ${r.reservation}</p>`
      : '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-emoji">${r.emoji}</div>
      <div class="card-body">
        <div class="card-meta-top">
          <span class="tag">${r.category}</span>
          <span class="price">${r.priceRange}</span>
        </div>
        <h2>${r.name}</h2>
        <p class="neighborhood">📍 ${r.neighborhood}</p>
        <p class="address">${r.address}</p>
        <p class="description">${r.description}</p>
        ${reservationRow}
        <div class="info-pills">${metaRows}</div>
        <div class="must-try">
          <span class="must-try-label">必点 / Must try</span>
          <div class="dish-tags">${dishTags}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const filtered = filter === 'all' ? restaurants : restaurants.filter(r => r.category === filter);
    renderCards(filtered);
  });
});

renderCards(restaurants);
