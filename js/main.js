document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    });
  });
  

  //searchbar//

  document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('searchForm');
  const searchInput = form.querySelector('input[type="search"]');
  const destinationCards = Array.from(document.querySelectorAll('.destination-card'));

  // Filter cards as the user types
  searchInput.addEventListener('input', () => {
    filterCards(searchInput.value);
  });

  // Handle both Enter key and button click (form submit)
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop page reload
    const query = searchInput.value.trim();
    filterCards(query);

    const match = firstMatchingCard(query);
    if (match) {
      // Scroll to the card
      match.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Briefly highlight it
      match.classList.add('highlight');
      setTimeout(() => match.classList.remove('highlight'), 1500);
    }
  });

  function filterCards(query) {
    const q = (query || '').toLowerCase();
    destinationCards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      if (!q || title.includes(q)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  }

  function firstMatchingCard(query) {
    const q = (query || '').toLowerCase();
    if (!q) return null;
    return destinationCards.find(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      return title.includes(q) && !card.classList.contains('hide');
    }) || null;
  }
});


//planner


document.getElementById("plannerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get values
    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const budget = document.getElementById("budget").value;
    const travelers = document.getElementById("travelers").value;

    // Get activities
    const activities = [];
    document.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
      activities.push(cb.value);
    });

    // Display summary
    document.getElementById("summaryDestination").innerText = destination;
    document.getElementById("summaryDates").innerText = startDate + " → " + endDate;
    document.getElementById("summaryBudget").innerText = budget;
    document.getElementById("summaryActivities").innerText = activities.length ? activities.join(", ") : "None";
    document.getElementById("summaryTravelers").innerText = travelers;

    // Show summary with animation
    const summaryCard = document.getElementById("tripSummary");
    summaryCard.classList.remove("d-none");
    setTimeout(() => {
      summaryCard.classList.add("show");
    }, 50);
  });


  