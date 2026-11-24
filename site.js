const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
const compact = window.matchMedia('(max-width: 850px)');
document.documentElement.classList.add('enhanced');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = '菜单';
}

function adaptMenu() {
  menu.hidden = !compact.matches;
  closeMenu();
}

menu.addEventListener('click', () => {
  if (menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  } else {
    menu.setAttribute('aria-expanded', 'true');
    menu.textContent = '收起菜单';
  }
});
nav.addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.mast')) closeMenu();
});
compact.addEventListener('change', adaptMenu);
adaptMenu();

const dialog = document.querySelector('#qr-dialog');
const qrImage = document.querySelector('#qr-image');
for (const link of document.querySelectorAll('[data-qr]')) {
  link.addEventListener('click', event => {
    if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const channel = link.dataset.qr;
    document.querySelector('#qr-title').textContent = channel + '二维码';
    qrImage.src = link.href;
    qrImage.alt = '灵泽出海' + channel + '二维码';
    dialog.showModal();
  });
}
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
