// Add this JavaScript to your script.js file
// Modal functionality
function openModal(src, type) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = modalVideo.querySelector('source');
    const modalImage = document.getElementById('modalImage');
  
    if (type === 'video') {
      modalVideo.pause();
      modalVideo.src = src;
      if (modalVideoSource) {
        modalVideoSource.src = src;
      }
      modalVideo.style.display = 'block';
      modalImage.style.display = 'none';
      modalVideo.load();
      modalVideo.play().catch(function () {});
    } else {
      modalImage.src = src;
      modalImage.style.display = 'block';
      modalVideo.style.display = 'none';
      modalVideo.pause();
      modalVideo.removeAttribute('src');
      if (modalVideoSource) {
        modalVideoSource.removeAttribute('src');
      }
      modalVideo.load();
    }
  
    // Show the modal
    modal.style.display = 'block';
  
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal when clicking the X
  document.addEventListener('DOMContentLoaded', function () {
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
  
    if (closeModal) {
      closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        const source = modalVideo.querySelector('source');
        if (source) {
          source.removeAttribute('src');
        }
        modalVideo.load();
        document.body.style.overflow = 'auto';
      });
    }
  
    // Close modal when clicking outside of content
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        const source = modalVideo.querySelector('source');
        if (source) {
          source.removeAttribute('src');
        }
        modalVideo.load();
        document.body.style.overflow = 'auto';
      }
    });
  
    // Close modal with escape key
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        const source = modalVideo.querySelector('source');
        if (source) {
          source.removeAttribute('src');
        }
        modalVideo.load();
        document.body.style.overflow = 'auto';
      }
    });
  });