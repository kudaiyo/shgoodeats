const grid = document.getElementById('restaurant-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const activeCategories = new Set();
const activeTags = { occasion: new Set(), atmosphere: new Set(), group: new Set() };

function encodeRid(name) {
  return [...name].map(ch => {
    const c = ch.codePointAt(0);
    if ((c >= 0x3000 && c <= 0x9FFF) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0xFF00 && c <= 0xFFEF)) return ch;
    return encodeURIComponent(ch);
  }).join('');
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(el);
  el.focus();
  el.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(el);
  return Promise.resolve();
}

function showShareSheet(url, title) {
  let sheet = document.getElementById('share-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.id = 'share-sheet';
    sheet.innerHTML = `
      <div class="share-sheet-overlay"></div>
      <div class="share-sheet-box">
        <p class="share-sheet-title"></p>
        <div class="share-sheet-url-row">
          <span class="share-sheet-url"></span>
        </div>
        <button class="share-sheet-copy"></button>
        <button class="share-sheet-cancel"></button>
      </div>
    `;
    document.body.appendChild(sheet);
    sheet.querySelector('.share-sheet-overlay').addEventListener('click', () => sheet.classList.remove('visible'));
    sheet.querySelector('.share-sheet-cancel').addEventListener('click', () => sheet.classList.remove('visible'));
    sheet.querySelector('.share-sheet-copy').addEventListener('click', () => {
      const u = sheet.querySelector('.share-sheet-url').textContent;
      copyToClipboard(u).then(() => {
        showToast(currentLang === 'en' ? 'Link copied!' : '链接已复制 ✓');
        sheet.classList.remove('visible');
      });
    });
  }
  const isEn = currentLang === 'en';
  sheet.querySelector('.share-sheet-title').textContent = title;
  sheet.querySelector('.share-sheet-url').textContent = url;
  sheet.querySelector('.share-sheet-copy').textContent = isEn ? '📋 Copy link' : '📋 复制链接';
  sheet.querySelector('.share-sheet-cancel').textContent = isEn ? 'Cancel' : '取消';
  sheet.classList.add('visible');
}

function showToast(msg) {
  let toast = document.getElementById('share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'share-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
}

function r_field(r, key) {
  if (currentLang === 'en' && r[key + '_en'] !== undefined) return r[key + '_en'];
  return r[key];
}

function translateTag(type, zhTag) {
  const map = translations[currentLang].tagMaps[type];
  return (map && map[zhTag]) || zhTag;
}

function renderTags(arr, type) {
  if (!arr || !arr.length) return '';
  return arr.map(tag => `<span class="info-pill">${translateTag(type, tag)}</span>`).join('');
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
      renderTags(r.groupSize, 'group'),
      renderTags(r.occasion, 'occasion'),
      renderTags(r.atmosphere, 'atmosphere'),
    ].filter(Boolean).join('');

    const reservationRow = r.reservation
      ? `<p class="reservation">${t('reservationLabel')} ${r_field(r, 'reservation')}</p>`
      : '';

    const spicyChilis = r.spicy ? '🌶️'.repeat(r.spicy) : '';

    const ratingFruits = r.rating
      ? `<div class="rating-fruits">${'<img src="rating-icon.png" class="rating-fruit" alt="🔥">'.repeat(r.rating)}</div>`
      : '';

    const headerContent = r.rating
      ? `<div class="card-rating"><h2 class="card-title">${r_field(r, 'name')}${spicyChilis ? `<span class="card-chili">${spicyChilis}</span>` : ''}</h2>${ratingFruits}</div>`
      : `<div class="card-emoji"><h2 class="card-title">${r_field(r, 'name')}</h2>${r.emoji}</div>`;

    const perPerson = r_field(r, 'perPerson') || r.priceRange;

    const isCompact = (r.rating >= 3 && (r.spicy || 0) >= 3) || (r.rating >= 2 && (r.spicy || 0) >= 5);
    const card = document.createElement('div');
    card.className = isCompact ? 'card card--compact' : 'card';
    card.dataset.rid = r.name;
    card.innerHTML = `
      ${headerContent}
      <div class="card-summary">
        <div class="summary-main">
          <div class="summary-meta">
            <span class="summary-category">${tFilter(r.category)}</span>
            <span class="summary-location">📌 ${r_field(r, 'address')}</span>
            <span class="summary-price">💰 ${perPerson}</span>
          </div>
        </div>
      </div>
      <div class="card-detail">
        <div class="expand-hint expand-hint--top"><span class="expand-label">${t('expand')}</span><span class="expand-icon">&#8964;</span></div>
        <p class="description">${r_field(r, 'description')}</p>
        ${reservationRow}
        <div class="pills-row">
          ${metaRows ? `<div class="info-pills">${metaRows}</div>` : ''}
          <div class="expand-hint expand-hint--inline"><span class="expand-label">${t('collapse')}</span><span class="expand-icon">&#8964;</span></div>
        </div>
        <div class="must-try">
          <span class="must-try-label">${t('mustTryLabel')}</span>
          <div class="dish-tags">${dishTags}</div>
        </div>
        ${(r.dianpingLinks || (r.dianping ? [{url: r.dianping, label: t('dianpingBtn'), label_en: t('dianpingBtn')}] : []))
            .map(l => `<a class="dianping-btn" href="${l.url}" target="_blank" rel="noopener">${currentLang === 'en' ? (l.label_en || l.label) : l.label} →</a>`)
            .join('')}
        <button class="share-btn">${currentLang === 'en' ? '🔗 Share' : '🔗 分享'}</button>
      </div>
    `;

    const toggleCard = () => {
      card.classList.toggle('expanded');
      const expanded = card.classList.contains('expanded');
      card.querySelector('.expand-hint--top .expand-label').textContent = expanded ? t('collapse') : t('expand');
      if (expanded) {
        requestAnimationFrame(() => {
          const titleEl = card.querySelector('.card-title');
          if (titleEl.scrollWidth > titleEl.clientWidth) {
            card.classList.add('card--title-compact');
          }
        });
      } else {
        card.classList.remove('card--title-compact');
      }
    };

    card.querySelector('.card-summary').addEventListener('click', toggleCard);
    card.querySelectorAll('.expand-hint').forEach(h => h.addEventListener('click', e => { e.stopPropagation(); toggleCard(); }));

    card.querySelector('.share-btn').addEventListener('click', e => {
      e.stopPropagation();
      const url = location.origin + location.pathname + '?r=' + encodeRid(r.name);
      showShareSheet(url, r_field(r, 'name'));
    });

    grid.appendChild(card);
  });
}

function matchesTags(r) {
  const checks = [
    { set: activeTags.occasion, arr: r.occasion },
    { set: activeTags.atmosphere, arr: r.atmosphere },
    { set: activeTags.group, arr: r.groupSize },
  ];
  return checks.every(({ set, arr }) => {
    if (set.size === 0) return true;
    if (!arr) return false;
    return arr.some(tag => set.has(tag));
  });
}

function applyFilter() {
  const filtered = restaurants.filter(r => {
    const catMatch = activeCategories.size === 0 || activeCategories.has(r.category);
    return catMatch && matchesTags(r);
  });
  renderCards(filtered);
}

function updateTagButtons() {
  const lang = translations[currentLang];
  document.querySelectorAll('.tag-btn').forEach(btn => {
    const type = btn.dataset.type;
    const tag = btn.dataset.tag;
    const set = activeTags[type];
    if (tag === '__all__') {
      btn.classList.toggle('active', set.size === 0);
      btn.textContent = lang.tagAll || '全部';
    } else {
      btn.classList.toggle('active', set && set.has(tag));
      const map = lang.tagMaps[type];
      btn.textContent = (map && map[tag]) || tag;
    }
  });
  const labels = lang.tagLabels;
  document.querySelectorAll('.tag-filter-label').forEach(el => {
    const type = el.dataset.type;
    if (labels && labels[type]) el.textContent = labels[type];
  });
}

function updateCategoryButtons() {
  filterBtns.forEach(btn => {
    const filter = btn.dataset.filter;
    btn.textContent = tFilter(filter);
    if (filter === 'all') {
      btn.classList.toggle('active', activeCategories.size === 0);
    } else {
      btn.classList.toggle('active', activeCategories.has(filter));
    }
  });
}

function updateStaticText() {
  document.querySelector('.byob-tip').textContent = t('byob');
  document.getElementById('restaurant-count').textContent = translations[currentLang].restaurantCount(restaurants.length);
  document.getElementById('tab-btn-instr').textContent = t('tabInstr');
  document.getElementById('tab-btn-authors').textContent = t('tabAuthors');

  document.querySelector('.subtitle').textContent = t('subtitle');
  document.querySelector('.hero h1').textContent = t('title');
  document.querySelector('footer p').textContent = t('footer');
  document.getElementById('lang-btn').textContent = t('langBtn');

  document.querySelector('.rating-explainer').innerHTML = t('ratingExplainer');

  const a1 = translations[currentLang].author1;
  const a2 = translations[currentLang].author2;
  const authorCards = document.querySelectorAll('.author-card');
  authorCards[0].querySelector('.author-name').textContent = a1.name;
  authorCards[0].querySelector('.author-title').textContent = a1.title;
  authorCards[0].querySelector('.author-bio').innerHTML = a1.bio;
  authorCards[1].querySelector('.author-name').textContent = a2.name;
  authorCards[1].querySelector('.author-title').textContent = a2.title;
  authorCards[1].querySelector('.author-bio').innerHTML = a2.bio;

  updateCategoryButtons();
  updateTagButtons();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    if (filter === 'all') {
      activeCategories.clear();
    } else if (activeCategories.has(filter)) {
      activeCategories.delete(filter);
    } else {
      activeCategories.add(filter);
    }
    updateCategoryButtons();
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

  let sharedRid = new URLSearchParams(location.search).get('r') || '';
  try { sharedRid = decodeURIComponent(sharedRid); } catch (e) {}
  if (sharedRid) {
    setTimeout(() => {
      const target = [...grid.querySelectorAll('.card')].find(c => c.dataset.rid === sharedRid);
      if (target) {
        target.classList.add('expanded', 'share-highlight');
        setTimeout(() => {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 300);
        setTimeout(() => target.classList.remove('share-highlight'), 3000);
      }
    }, 100);
  }

  // Hide category filter buttons that have no restaurants
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    const filter = btn.dataset.filter;
    if (filter === 'all') return;
    if (!restaurants.some(r => r.category === filter)) {
      btn.style.display = 'none';
    }
  });

  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const tag = btn.dataset.tag;
      const set = activeTags[type];
      if (tag === '__all__') {
        set.clear();
      } else if (set.has(tag)) {
        set.delete(tag);
      } else {
        set.add(tag);
      }
      updateTagButtons();
      applyFilter();
    });
  });

  document.querySelectorAll('.hero-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hero-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.hero-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-panel-' + btn.dataset.tab).classList.add('active');
    });
  });
});
