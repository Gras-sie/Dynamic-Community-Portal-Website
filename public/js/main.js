// Enable tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  
  // Filter events functionality
  const searchBox = document.getElementById('event-search');
  if (searchBox) {
    searchBox.addEventListener('keyup', filterEvents);
  }
  
  // Enable date sorting functionality
  const dateSortBtn = document.getElementById('date-sort-btn');
  if (dateSortBtn) {
    dateSortBtn.addEventListener('click', sortEventsByDate);
  }
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0) {
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
  }
});

function filterEvents() {
  const searchText = this.value.toLowerCase();
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach(card => {
    const title = card.querySelector('h5').textContent.toLowerCase();
    const location = card.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(searchText) || location.includes(searchText)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Function to sort events by date
function sortEventsByDate() {
  const eventsContainer = document.querySelector('.events-grid');
  if (!eventsContainer) return;
  
  const sortBtn = document.getElementById('date-sort-btn');
  const isAscending = sortBtn.getAttribute('data-sort') === 'asc';
  
  // Get all event cards
  const eventCards = Array.from(document.querySelectorAll('.event-card'));
  
  // Sort the cards
  eventCards.sort((a, b) => {
    const dateA = new Date(a.querySelector('p').textContent.split('|')[0].trim());
    const dateB = new Date(b.querySelector('p').textContent.split('|')[0].trim());
    
    return isAscending ? dateA - dateB : dateB - dateA;
  });
  
  // Remove all current cards
  while (eventsContainer.firstChild) {
    eventsContainer.removeChild(eventsContainer.firstChild);
  }
  
  // Add the sorted cards
  eventCards.forEach(card => {
    eventsContainer.appendChild(card);
  });
  
  sortBtn.setAttribute('data-sort', isAscending ? 'desc' : 'asc');

  const icon = sortBtn.querySelector('i');
  if (isAscending) {
    icon.classList.remove('fa-arrow-down-short-wide');
    icon.classList.add('fa-arrow-up-wide-short');
    sortBtn.querySelector('span').textContent = 'Sort by Date (Newest First)';
  } else {
    icon.classList.remove('fa-arrow-up-wide-short');
    icon.classList.add('fa-arrow-down-short-wide');
    sortBtn.querySelector('span').textContent = 'Sort by Date (Oldest First)';
  }
}

function animateOnScroll() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 50) {
      element.classList.add('animated');
    }
  });
}
const animationStyles = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  .animate-on-scroll.delay-1 {
    transition-delay: 0.2s;
  }
  
  .animate-on-scroll.delay-2 {
    transition-delay: 0.4s;
  }
  
  .animate-on-scroll.delay-3 {
    transition-delay: 0.6s;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);