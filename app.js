const grid = document.getElementById('restaurant-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
let activeFilter = 'all';

function r_field(r, key) {
  if (currentLang === 'en' && r[key + '_en'] !== undefined) return r[key + '_en'];
  return r[key];
}

function renderCards(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<p class="empty">No restaurants found.</p>';
    return;
  }
  list.forEach(r => {
    const dishes = Array.isArray(r_field(r, 'mustTry')) ? r_field(r, 'mustTry') : [r_field(r, 'mustTry')];
    const dishTags = dishes.map(d => `<span class="dish-tag">${d}</span>`).join('');

    const metaRows = [
      r_field(r, 'groupSize')   ? `<span class="info-pill">👥 ${r_field(r, 'groupSize')}</span>` : '',
      r_field(r, 'occasion')    ? `<span class="info-pill">🎉 ${r_field(r, 'occasion')}</span>` : '',
      r_field(r, 'atmosphere')  ? `<span class="info-pill">🏠 ${r_field(r, 'atmosphere')}</span>` : '',
    ].filter(Boolean).join('');

    const reservationRow = r.reservation
      ? `<p class="reservation">${t('reservationLabel')} ${r_field(r, 'reservation')}</p>`
      : '';

    const spicyChilis = r.spicy ? '🌶️'.repeat(r.spicy) : '';

    const headerContent = r.rating
      ? `<div class="card-rating"><h2 class="card-title">${r_field(r, 'name')}${spicyChilis ? `<span class="card-chili">${spicyChilis}</span>` : ''}</h2></div>`
      : `<div class="card-emoji"><h2 class="card-title">${r_field(r, 'name')}</h2>${r.emoji}</div>`;

    const stamp = r.rating
      ? `<span class="rating-text">${r.rating}</span>`
      : '';

    const perPerson = r_field(r, 'perPerson') || r.priceRange;

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      ${headerContent}
      <div class="card-summary">
        ${stamp}
        <div class="summary-main">
          <div class="summary-meta">
            <span class="summary-category">${tFilter(r.category)}</span>
            <span class="summary-location">📍 ${r_field(r, 'neighborhood')}</span>
            <span class="summary-price">💰 ${perPerson}</span>
          </div>
        </div>
      </div>
      <div class="card-detail">
        <p class="address">📌 ${r_field(r, 'address')}</p>
        <p class="description">${r_field(r, 'description')}</p>
        ${reservationRow}
        ${metaRows ? `<div class="info-pills">${metaRows}</div>` : ''}
        <div class="must-try">
          <span class="must-try-label">${t('mustTryLabel')}</span>
          <div class="dish-tags">${dishTags}</div>
        </div>
        ${r.dianping ? `<a class="dianping-btn" href="${r.dianping}" target="_blank" rel="noopener">${t('dianpingBtn')} →</a>` : ''}
      </div>
    `;

    card.querySelector('.card-summary').addEventListener('click', () => {
      card.classList.toggle('expanded');
    });

    grid.appendChild(card);
  });
}

function applyFilter() {
  const filtered = activeFilter === 'all'
    ? restaurants
    : restaurants.filter(r => r.category === activeFilter);
  renderCards(filtered);
}

function updateStaticText() {
  document.querySelector('.subtitle').textContent = t('subtitle');
  document.querySelector('.hero h1').textContent = t('title');
  document.querySelector('.tagline').textContent = t('tagline');
  document.querySelector('footer p').textContent = t('footer');
  document.getElementById('lang-btn').textContent = t('langBtn');
  filterBtns.forEach(btn => {
    btn.textContent = tFilter(btn.dataset.filter);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilter();
  });
});

document.getElementById('lang-btn').addEventListener('click', () => {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  updateStaticText();
  applyFilter();
});

updateStaticText();
applyFilter();
