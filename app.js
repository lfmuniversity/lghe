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
