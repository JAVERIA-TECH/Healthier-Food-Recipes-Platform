// Recipe data
const recipes = [
  {
    id: "nihari",
    category: "breakfast",
    title: "Nihari",
    image: "https://www.pakistantravelblog.com/wp-content/uploads/2020/06/monal-lahore-nihari.jpg",
    description: "A rich, slow-cooked beef stew infused with spices, traditionally enjoyed in Lahore and Karachi.",
    ingredients: [
      "1 kg beef shank (with bone)",
      "1 cup oil or ghee",
      "1 large onion (sliced)",
      "1 tbsp ginger garlic paste",
      "1 tbsp nihari masala",
      "1 tsp red chili powder",
      "1/2 tsp turmeric",
      "2 tbsp wheat flour",
      "Salt to taste",
      "Water as needed",
      "Garnish: Ginger slices, green chilies, lemon, coriander"
    ],
    instructions: [
      "Heat oil/ghee in a large pot. Add onions and fry until golden brown.",
      "Add ginger garlic paste and sauté for a minute.",
      "Add beef and cook until it changes color.",
      "Add all spices and cook for 10-15 mins, stirring frequently.",
      "Add enough water to cover the meat. Cook on low flame for 4-6 hours until tender.",
      "Mix wheat flour in water, add to the curry to thicken.",
      "Garnish and serve hot with naan or kulcha."
    ]
  },
  {
    id: "halwaPuri",
    category: "breakfast",
    title: "Halwa Puri with Chana & Aloo Tarkari",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOtSeVyKVv2e4VeYW8xXHeAWiRObA70i34w&s",
    description: "A classic breakfast combo, usually enjoyed on Sundays, consisting of deep-fried bread (puri), sweet halwa made from semolina, chickpeas (chana), and spiced potatoes (aloo tarkari).",
    ingredients: [
      "For Puri:",
      "2 cups all-purpose flour",
      "2 tbsp semolina (sooji)",
      "Salt & water (to knead)",
      "Oil (for deep frying)",
      "",
      "For Halwa:",
      "1 cup semolina (sooji)",
      "1/2 cup ghee (clarified butter)",
      "1/2 cup sugar",
      "2 cups water",
      "Optional: Cardamom, raisins, almonds"
    ],
    instructions: [
      "Puri: Knead dough, rest for a bit, roll into small discs, and deep fry until they puff up.",
      "Halwa: Roast semolina in ghee, add sugar and water, and cook until it becomes thick.",
      "Chana: Fry onions, add tomatoes and spices, then add chickpeas and let it simmer.",
      "Aloo Tarkari: Sauté onions, tomatoes, and spices, then add potatoes and cook for 10 minutes."
    ]
  },
  // Add all other recipes in the same format
  // Include: payee, doodhPatti, biryani, chickenKarahi, daalChawal, sabziPulao, 
  // yakhniPulao, bhindiGhost, dahiBhally, gulabJamun, rasMalai, sheerKhurma, zarda
];

// Initialize the page with recipes
document.addEventListener('DOMContentLoaded', function() {
  const recipesContainer = document.querySelector('.recipes-container');
  
  // Add all recipes to the page
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('article');
    recipeCard.className = 'recipe-card';
    recipeCard.id = recipe.id;
    recipeCard.dataset.category = recipe.category;
    
    recipeCard.innerHTML = `
      <div class="recipe-header">
        <h3>${recipe.title}</h3>
        <span class="recipe-category">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
      </div>
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
      <div class="recipe-content">
        <p class="recipe-desc">${recipe.description}</p>
        <div class="recipe-details">
          <div class="ingredients">
            <h4>Ingredients</h4>
            <ul>
              ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class="instructions">
            <h4>Instructions</h4>
            <ol>
              ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
    
    recipesContainer.appendChild(recipeCard);
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.dataset.category;
      const recipeCards = document.querySelectorAll('.recipe-card');
      
      recipeCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  
  function searchRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('.recipe-desc').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || desc.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  searchBtn.addEventListener('click', searchRecipes);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchRecipes();
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the data to a server
      // For this demo, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }
});