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
      ? `<div class="rating-fruits">${'<img src="dragonfruit.svg" class="rating-fruit" alt="🔥">'.repeat(r.rating)}</div>`
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
        <div class="expand-hint"><span class="expand-label">${t('expand')}</span><span class="expand-icon">&#8964;</span></div>
        <p class="address">📌 ${r_field(r, 'address')}</p>
        <p class="description">${r_field(r, 'description')}</p>
        ${reservationRow}
        ${metaRows ? `<div class="info-pills">${metaRows}</div>` : ''}
        <div class="must-try">
          <span class="must-try-label">${t('mustTryLabel')}</span>
          <div class="dish-tags">${dishTags}</div>
        </div>
        ${(r.dianpingLinks || (r.dianping ? [{url: r.dianping, label: t('dianpingBtn'), label_en: t('dianpingBtn')}] : []))
            .map(l => `<a class="dianping-btn" href="${l.url}" target="_blank" rel="noopener">${currentLang === 'en' ? (l.label_en || l.label) : l.label} →</a>`)
            .join('')}
      </div>
    `;

    const toggleCard = () => {
      card.classList.toggle('expanded');
      const label = card.querySelector('.expand-label');
      label.textContent = card.classList.contains('expanded') ? t('collapse') : t('expand');
    };

    card.querySelector('.card-summary').addEventListener('click', toggleCard);
    card.querySelector('.expand-hint').addEventListener('click', e => { e.stopPropagation(); toggleCard(); });

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
  document.querySelector('.byob-tip').textContent = t('byob');
  document.querySelector('.subtitle').textContent = t('subtitle');
  document.querySelector('.hero h1').textContent = t('title');
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

document.addEventListener('DOMContentLoaded', () => {
  updateStaticText();
  applyFilter();

  const toggle = document.getElementById('authors-toggle');
  const panel = document.getElementById('authors-panel');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    panel.classList.toggle('open');
  });
});
