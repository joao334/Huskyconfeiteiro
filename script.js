
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const siteHeader = document.getElementById('siteHeader');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const willOpen = !siteNav.classList.contains('active');
    siteNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(willOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      siteNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (siteHeader) {
  const handleHeaderState = () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 18);
  };
  handleHeaderState();
  window.addEventListener('scroll', handleHeaderState, { passive: true });
}

const currentPage = document.body.dataset.page;
if (currentPage) {
  document.querySelectorAll('[data-page-link]').forEach((link) => {
    if (link.dataset.pageLink === currentPage) {
      link.classList.add('active');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const menuCards = document.querySelectorAll('.menu-premium-card[data-category]');

if (filterButtons.length && menuCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      menuCards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ');
        const visible = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxText = document.getElementById('lightboxText');
const lightboxClose = document.getElementById('lightboxClose');

const openLightbox = (tile) => {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxText) return;

  lightboxImage.src = tile.dataset.lightboxImage || '';
  lightboxImage.alt = tile.dataset.lightboxTitle || 'Imagem ampliada';
  lightboxTitle.textContent = tile.dataset.lightboxTitle || '';
  lightboxText.textContent = tile.dataset.lightboxText || '';
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.classList.remove('lightbox-open');
};

document.querySelectorAll('[data-lightbox-image]').forEach((tile) => {
  tile.addEventListener('click', () => openLightbox(tile));
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

const whatsappNumber = '5511988456865';
const nameInput = document.getElementById('name');
const whatsappInput = document.getElementById('whatsapp');
const orderTypeInput = document.getElementById('orderType');
const dateInput = document.getElementById('date');
const detailsInput = document.getElementById('details');
const whatsContactBtn = document.getElementById('whatsContactBtn');
const messagePreview = document.getElementById('messagePreview');
const quickProducts = document.querySelectorAll('.quick-product');

function buildWhatsAppUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppContactLink() {
  if (!whatsContactBtn) return;

  const lines = [
    'Olá, gostaria de fazer um pedido na Husky Confeiteiro.',
    nameInput?.value && `Nome: ${nameInput.value}`,
    whatsappInput?.value && `WhatsApp: ${whatsappInput.value}`,
    orderTypeInput?.value && `Tipo de pedido: ${orderTypeInput.value}`,
    dateInput?.value && `Data desejada: ${dateInput.value}`,
    detailsInput?.value && `Detalhes: ${detailsInput.value}`,
  ].filter(Boolean);

  const message = lines.join('\n');
  whatsContactBtn.href = buildWhatsAppUrl(message);

  if (messagePreview) {
    messagePreview.textContent = message;
  }
}

[nameInput, whatsappInput, orderTypeInput, dateInput, detailsInput].forEach((field) => {
  if (field) {
    field.addEventListener('input', updateWhatsAppContactLink);
  }
});

quickProducts.forEach((button) => {
  button.addEventListener('click', () => {
    quickProducts.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const currentValue = detailsInput?.value?.trim();
    const selectedProduct = button.dataset.product;
    const nextValue = currentValue
      ? `${currentValue}\nProduto de interesse: ${selectedProduct}`
      : `Produto de interesse: ${selectedProduct}`;

    if (detailsInput) {
      detailsInput.value = nextValue;
      detailsInput.dispatchEvent(new Event('input'));
      detailsInput.focus();
    }
  });
});

updateWhatsAppContactLink();

const copyInstagramBtn = document.getElementById('copyInstagramBtn');
if (copyInstagramBtn) {
  copyInstagramBtn.addEventListener('click', async () => {
    const text = copyInstagramBtn.dataset.copyText || '@huskyconfeiteiro';
    try {
      await navigator.clipboard.writeText(text);
      copyInstagramBtn.textContent = 'Copiado!';
      setTimeout(() => {
        copyInstagramBtn.textContent = 'Copiar @';
      }, 1600);
    } catch (error) {
      copyInstagramBtn.textContent = text;
    }
  });
}
