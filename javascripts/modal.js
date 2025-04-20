// Add this JavaScript to your script.js file
// Modal functionality
function openModal(src, type) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalImage = document.getElementById('modalImage');
  
    // Set the appropriate source based on type
    if (type === 'video') {
      modalVideo.querySelector('source').src = src;
      modalVideo.style.display = 'block';
      modalImage.style.display = 'none';
      modalVideo.load(); // Reload the video with the new source
      modalVideo.play(); // Autoplay when opened
    } else {
      modalImage.src = src;
      modalImage.style.display = 'block';
      modalVideo.style.display = 'none';
      modalVideo.pause(); // Ensure video is paused if switching from video to image
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
        modalVideo.pause(); // Pause video when closing
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      });
    }
  
    // Close modal when clicking outside of content
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause(); // Pause video when closing
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }
    });
  
    // Close modal with escape key
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        modalVideo.pause(); // Pause video when closing
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }
    });
  });