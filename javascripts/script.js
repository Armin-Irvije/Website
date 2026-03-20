document.addEventListener('DOMContentLoaded', function () {
  // Tabs: click + keyboard navigation with ARIA synchronization.
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const tabPanes = Array.from(document.querySelectorAll('.tab-pane'));

  function activateTab(tabButton) {
    if (!tabButton) return;

    const targetId = tabButton.getAttribute('data-tab');

    tabButtons.forEach((btn) => {
      const isActive = btn === tabButton;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    tabPanes.forEach((pane) => {
      const isActive = pane.id === targetId;
      pane.classList.toggle('active', isActive);
      pane.hidden = !isActive;
    });
  }

  // Initialize from the current active classes in HTML.
  const initialActive = tabButtons.find((b) => b.classList.contains('active')) || tabButtons[0];
  activateTab(initialActive);

  tabButtons.forEach((button) => {
    button.addEventListener('click', function () {
      activateTab(button);
    });

    button.addEventListener('keydown', function (event) {
      const key = event.key;
      const isNavKey = key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Home' || key === 'End';

      if (!isNavKey) return;
      event.preventDefault();

      const currentIndex = tabButtons.indexOf(button);
      const lastIndex = tabButtons.length - 1;

      let nextIndex = currentIndex;
      if (key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabButtons.length;
      if (key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
      if (key === 'Home') nextIndex = 0;
      if (key === 'End') nextIndex = lastIndex;

      const nextButton = tabButtons[nextIndex];
      activateTab(nextButton);
      nextButton.focus();
    });
  });

  // Show More functionality for experience items (optional).
  const showMoreButtons = document.querySelectorAll('.show-more-btn');
  showMoreButtons.forEach((button) => {
    button.addEventListener('click', function () {
      if (this.textContent === 'Show More') {
        this.textContent = 'Show Less';
      } else {
        this.textContent = 'Show More';
      }
    });
  });
});
