const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('active');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = siteNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      siteNav.classList.remove('active');
    }
  });
}

const currentPage = document.body.dataset.page;
if (currentPage) {
  document.querySelectorAll('[data-page-link]').forEach((link) => {
    if (link.dataset.pageLink === currentPage) {
      link.classList.add('active');
    }
  });
}

const whatsappNumber = '5511988456865';
const nameInput = document.getElementById('name');
const whatsappInput = document.getElementById('whatsapp');
const orderTypeInput = document.getElementById('orderType');
const dateInput = document.getElementById('date');
const detailsInput = document.getElementById('details');
const whatsContactBtn = document.getElementById('whatsContactBtn');

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

  whatsContactBtn.href = buildWhatsAppUrl(lines.join('\n'));
}

[nameInput, whatsappInput, orderTypeInput, dateInput, detailsInput].forEach((field) => {
  if (field) {
    field.addEventListener('input', updateWhatsAppContactLink);
  }
});

updateWhatsAppContactLink();
