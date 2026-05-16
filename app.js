const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function switchTab(id) {
  qsa('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === id));
  qsa('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function createDetailBlocks(items) {
  return items.map(([title, text]) => `
    <div class="detail-block">
      <h4>${title}</h4>
      <p>${text}</p>
    </div>
  `).join('');
}

function renderProducts() {
  const container = qs('#productsContainer');
  container.innerHTML = productFamilies.map(family => `
    <div class="product-family ${family.familyClass}">
      <div class="family-head">
        <div>
          <span class="family-kicker">${family.kicker}</span>
          <h3>${family.title}</h3>
          <p>${family.description}</p>
        </div>
        <span class="family-pill">${family.pill}</span>
      </div>
      <div class="product-grid">
        ${family.products.map(product => `
          <article class="product-card ${product.className}" data-product-id="${product.id}">
            <div class="product-top"><span>${product.eyebrow}</span><strong>${product.tag}</strong></div>
            <h4>${product.name}</h4>
            <p>${product.short}</p>
            <div class="chip-row">${product.chips.map(chip => `<span>${chip}</span>`).join('')}</div>
          </article>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderTraining() {
  const container = qs('#trainingContainer');
  container.innerHTML = trainingModules.map(module => `
    <div class="training-card" data-training-id="${module.id}">
      <div class="module-label">${module.label}</div>
      <h3>${module.title}</h3>
      <p>${module.intro}</p>
      <ul>${module.bullets.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function findProduct(id) {
  return productFamilies.flatMap(family => family.products).find(product => product.id === id);
}

function openProductModal(id) {
  const product = findProduct(id);
  if (!product) return;
  const modal = qs('#productModal');
  modal.innerHTML = `
    <div class="modal-card" onclick="event.stopPropagation()">
      <button class="modal-close" data-close-modal>×</button>
      <div class="modal-label">${product.label}</div>
      <h2>${product.name}</h2>
      <p>${product.intro}</p>
      <div class="detail-grid">${createDetailBlocks(product.specs)}</div>
      <div class="selling-box">
        <h3>Come venderlo</h3>
        <p>${product.selling}</p>
      </div>
    </div>
  `;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function openTrainingModal(id) {
  const module = trainingModules.find(item => item.id === id);
  if (!module) return;
  const modal = qs('#trainingModal');
  modal.innerHTML = `
    <div class="modal-card" onclick="event.stopPropagation()">
      <button class="modal-close" data-close-modal>×</button>
      <div class="modal-label">${module.label}</div>
      <h2>${module.title}</h2>
      <p>${module.intro}</p>
      <div class="detail-grid">${createDetailBlocks(module.blocks)}</div>
    </div>
  `;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModals() {
  qsa('.modal').forEach(modal => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });
}

function initEvents() {
  qsa('[data-tab]').forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
  qsa('[data-go]').forEach(item => item.addEventListener('click', () => switchTab(item.dataset.go)));

  document.addEventListener('click', event => {
    const productCard = event.target.closest('[data-product-id]');
    if (productCard) openProductModal(productCard.dataset.productId);

    const trainingCard = event.target.closest('[data-training-id]');
    if (trainingCard) openTrainingModal(trainingCard.dataset.trainingId);

    if (event.target.matches('.modal, [data-close-modal]')) closeModals();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModals();
  });
}

renderProducts();
renderTraining();
initEvents();




/* ADVANCED FAQ SYSTEM */
const faqs = [
  {
    category: 'OLED vs QNED',
    question: 'Perché OLED costa di più?',
    answer: 'OLED utilizza pixel autoilluminanti: ogni pixel può accendersi e spegnersi da solo. Questo permette nero perfetto, contrasto molto elevato e una resa cinematografica superiore rispetto ai TV LED tradizionali.'
  },
  {
    category: 'OLED vs QNED',
    question: 'Meglio OLED o MiniLED?',
    answer: 'OLED è ideale per cinema, nero perfetto, contrasto e gaming premium. MiniLED/QNED è ideale per ambienti luminosi, grandi polliciaggi, sport e rapporto qualità/prezzo.'
  },
  {
    category: 'OLED vs QNED',
    question: 'OLED rischia il burn-in?',
    answer: 'I TV LG OLED integrano sistemi di protezione del pannello e gestione automatica delle immagini statiche. In un normale utilizzo domestico il rischio è molto ridotto.'
  },
  {
    category: 'Gaming',
    question: 'Questo TV va bene per PS5 e Xbox?',
    answer: 'Sì, i modelli più evoluti supportano funzioni gaming come HDMI 2.1, VRR, ALLM, Dolby Vision Gaming e refresh rate elevati fino a 165Hz sui top gamma.'
  },
  {
    category: 'Gaming',
    question: 'Perché LG è forte nel gaming?',
    answer: 'Perché combina refresh rate elevati, basso input lag, VRR, G-Sync, FreeSync, Game Optimizer e Dolby Vision Gaming. È una proposta molto forte per console e PC gaming.'
  },
  {
    category: 'AI & webOS',
    question: 'A cosa serve davvero l’AI sul TV?',
    answer: 'Serve a personalizzare l’esperienza: riconoscimento vocale, suggerimenti contenuti, ricerca intelligente, AI Concierge, Multi AI, Gemini e Copilot.'
  },
  {
    category: 'AI & webOS',
    question: 'Il TV si aggiorna negli anni?',
    answer: 'Sì, molte serie LG integrano webOS Re:New, con aggiornamenti garantiti che mantengono la piattaforma smart più attuale nel tempo.'
  },
  {
    category: 'Audio',
    question: 'Serve una soundbar?',
    answer: 'Dipende dal cliente. I TV premium LG offrono Dolby Atmos e audio evoluto, ma una soundbar migliora immersione, spazialità e bassi, soprattutto per cinema e gaming.'
  },
  {
    category: 'Audio',
    question: 'Cos’è WOW Orchestra?',
    answer: 'È la funzione che sincronizza speaker del TV e soundbar LG compatibile, creando un fronte sonoro più ampio e coinvolgente.'
  },
  {
    category: 'Design',
    question: 'Posso installarlo filo muro?',
    answer: 'Sì, le serie OLED Gallery sono pensate per installazioni premium a parete, con effetto pulito e minimale.'
  },
  {
    category: 'Design',
    question: 'Quale TV è più bello esteticamente?',
    answer: 'Le serie OLED G e i modelli ultra slim sono i più indicati per chi cerca design, profilo sottile e integrazione elegante nell’ambiente.'
  },
  {
    category: 'Vendita',
    question: 'Che cliente compra OLED?',
    answer: 'Cliente premium, appassionato di cinema, gamer enthusiast o persona molto attenta a qualità immagine, nero perfetto e design.'
  },
  {
    category: 'Vendita',
    question: 'Come giustificare il prezzo di un OLED?',
    answer: 'Bisogna spostare il discorso dal prezzo al valore: nero perfetto, contrasto, esperienza cinema, gaming premium, comfort visivo e design.'
  },
  {
    category: 'Vendita',
    question: 'Quando proporre QNED?',
    answer: 'Quando il cliente cerca grande polliciaggio, sport, luminosità, versatilità e un ottimo equilibrio tra qualità e prezzo.'
  },
  {
    category: 'Vendita',
    question: 'Come proporre un 77” o superiore?',
    answer: 'Va raccontata l’immersione: più cinema a casa, più coinvolgimento per sport e gaming, e una distanza di visione spesso inferiore a quella che il cliente immagina.'
  }
];

function renderFaqs() {
  const container = document.getElementById('faqContainer');
  if (!container) return;

  container.innerHTML = faqs.map(faq => `
    <div class="faq-card">
      <div class="faq-category">${faq.category}</div>
      <h3>${faq.question}</h3>
      <p>${faq.answer}</p>
    </div>
  `).join('');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderFaqs);
} else {
  renderFaqs();
}


/* Global search v2 */
(function () {
  function normalizeText(value) {
    return (value || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function getPanelsAndTabs() {
    return {
      panels: Array.from(document.querySelectorAll('.tab-panel')),
      tabs: Array.from(document.querySelectorAll('.tab'))
    };
  }

  function showTabById(tabId) {
    const { panels, tabs } = getPanelsAndTabs();
    const index = panels.findIndex(panel => panel.id === tabId);
    if (index < 0) return;

    panels.forEach((panel, i) => panel.classList.toggle('active', i === index));
    tabs.forEach((tab, i) => tab.classList.toggle('active', i === index));
  }

  function clearSearch() {
    document.querySelectorAll('.search-hidden').forEach(el => el.classList.remove('search-hidden'));
    document.querySelectorAll('.family-hidden').forEach(el => el.classList.remove('family-hidden'));

    const emptyState = document.getElementById('searchEmptyState');
    if (emptyState) emptyState.hidden = true;
  }

  function filterSearch(rawQuery) {
    const query = normalizeText(rawQuery);
    const emptyState = document.getElementById('searchEmptyState');

    if (!query) {
      clearSearch();
      return;
    }

    let totalMatches = 0;
    const tabMatches = {
      prodotti: 0,
      training: 0,
      vendita: 0,
      faq: 0
    };

    const selectors = ['.product-card', '.training-card', '.sales-card', '.faq-card'];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(card => {
        const searchableText = normalizeText(card.innerText + ' ' + (card.dataset.search || ''));
        const isMatch = searchableText.includes(query);

        card.classList.toggle('search-hidden', !isMatch);

        if (isMatch) {
          totalMatches++;
          const panel = card.closest('.tab-panel');
          if (panel && Object.prototype.hasOwnProperty.call(tabMatches, panel.id)) {
            tabMatches[panel.id]++;
          }
        }
      });
    });

    // Product family visibility
    document.querySelectorAll('.product-family').forEach(family => {
      const familyText = normalizeText(family.querySelector('.family-head')?.innerText || '');
      const familyMatches = familyText.includes(query);
      const visibleCards = family.querySelectorAll('.product-card:not(.search-hidden)').length;

      if (familyMatches) {
        family.classList.remove('family-hidden');
        family.querySelectorAll('.product-card').forEach(card => card.classList.remove('search-hidden'));
        totalMatches++;
        tabMatches.prodotti++;
      } else {
        family.classList.toggle('family-hidden', visibleCards === 0);
      }
    });

    if (emptyState) {
      emptyState.hidden = totalMatches > 0;
    }

    if (tabMatches.prodotti > 0) showTabById('prodotti');
    else if (tabMatches.training > 0) showTabById('training');
    else if (tabMatches.vendita > 0) showTabById('vendita');
    else if (tabMatches.faq > 0) showTabById('faq');
  }

  function initGlobalSearch() {
    const input = document.getElementById('globalSearch');

    if (!input) {
      console.warn('[LG HE Portal] globalSearch input not found');
      return;
    }

    clearSearch();

    input.addEventListener('input', function () {
      filterSearch(input.value);
    });

    input.addEventListener('search', function () {
      filterSearch(input.value);
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        input.value = '';
        clearSearch();
        showTabById('home');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalSearch);
  } else {
    initGlobalSearch();
  }
})();