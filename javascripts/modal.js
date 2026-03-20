let lastFocusedElement = null;
let focusTrapHandler = null;

const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalImage = document.getElementById('modalImage');
const modalVideoSource = modalVideo ? modalVideo.querySelector('source') : null;
const closeModalButton = modal ? modal.querySelector('.close-modal') : null;

function getFocusableElements() {
  if (!modal) return [];
  const selector =
    'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"]),video[controls]';

  return Array.from(modal.querySelectorAll(selector)).filter((el) => {
    const isDisabled = el.hasAttribute('disabled');
    const isHidden = el.offsetParent === null;
    return !isDisabled && !isHidden;
  });
}

function resetModalMedia() {
  if (!modalVideo || !modalImage) return;

  modalVideo.pause();
  modalVideo.removeAttribute('src');
  if (modalVideoSource) modalVideoSource.removeAttribute('src');
  modalVideo.load();

  modalImage.removeAttribute('src');
  modalImage.style.display = 'none';
  modalVideo.style.display = 'none';
}

function enableFocusTrap() {
  if (!modal || focusTrapHandler) return;

  focusTrapHandler = function (event) {
    if (event.key !== 'Tab') return;

    const focusables = getFocusableElements();
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !modal.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last || !modal.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  window.addEventListener('keydown', focusTrapHandler);
}

function disableFocusTrap() {
  if (!focusTrapHandler) return;
  window.removeEventListener('keydown', focusTrapHandler);
  focusTrapHandler = null;
}

function closeModalInternal() {
  if (!modal) return;
  if (modal.style.display !== 'block') return;

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');

  disableFocusTrap();
  resetModalMedia();

  document.body.style.overflow = 'auto';

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function openModalInternal(src, type) {
  if (!modal || !modalVideo || !modalImage) return;

  lastFocusedElement = document.activeElement;

  if (type === 'video') {
    modalVideo.pause();
    modalVideo.src = src;
    if (modalVideoSource) modalVideoSource.src = src;
    modalVideo.style.display = 'block';
    modalImage.style.display = 'none';
    modalImage.removeAttribute('src');

    modalVideo.load();
    modalVideo.play().catch(function () {});
  } else {
    modalImage.src = src;
    modalImage.style.display = 'block';
    modalVideo.style.display = 'none';
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    if (modalVideoSource) modalVideoSource.removeAttribute('src');
    modalVideo.load();
  }

  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';
  enableFocusTrap();

  if (closeModalButton) closeModalButton.focus();
}

// Exposed globally because inline `onclick="openModal(...)` is used.
function openModal(src, type) {
  openModalInternal(src, type);
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', function () {
    closeModalInternal();
  });

  closeModalButton.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key !== 'Enter' && key !== ' ') return;
    event.preventDefault();
    closeModalInternal();
  });
}

window.addEventListener('click', function (event) {
  if (!modal) return;
  if (event.target === modal) closeModalInternal();
});

window.addEventListener('keydown', function (event) {
  if (!modal) return;
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModalInternal();
  }
});