document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the target tab and activate it
        const targetTab = this.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
      });
    });
    
    // Show More functionality for experience items
    const showMoreButtons = document.querySelectorAll('.show-more-btn');
    
    showMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const experienceItem = this.closest('.experience-item');
        
        // Here you would toggle additional content
        // For demo purposes, let's just change the button text
        if (this.textContent === 'Show More') {
          this.textContent = 'Show Less';
          // You would show more content here
        } else {
          this.textContent = 'Show More';
          // You would hide extra content here
        }
      });
    });
  });