/**
 * VIRSA RESTRO • CAFE • LOUNGE
 * Nurtured by The New Eagle Restaurant | Sai Nagar, Amravati
 * Full Official Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initMenuSystem();
  initModals();
  initContactForm();
  initFloatingActions();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle-btn');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. HERO SLIDESHOW & QUICK BOOKING
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides && slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5500);
  }

  const quickForm = document.getElementById('quickBookingForm');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('quickDate').value;
      const time = document.getElementById('quickTime').value;
      const guests = document.getElementById('quickGuests').value;
      const seating = document.getElementById('quickSeating').value;

      openTableModal({ date, time, guests, seating });
    });
  }
}

/* ==========================================================================
   3. EXHAUSTIVE OFFICIAL MENU DATA (VIRSA AMRAVATI)
   ========================================================================== */
const menuItems = [
  // --- HOT BEVERAGES ---
  { id: 'hb1', name: 'Indian Masala Tea Pot', category: 'beverages', diet: 'veg', price: 125, desc: 'Aromatic spiced milk tea brewed with cardamom, ginger, and cloves.', image: 'assets/images/dish-coffee.jpg', badge: 'Hot Beverage', spice: 0 },
  { id: 'hb2', name: 'Black Tea Pot', category: 'beverages', diet: 'veg', price: 125, desc: 'Freshly steeped pure Assam black tea served in a royal pot.', image: 'assets/images/dish-coffee.jpg', badge: 'Hot Beverage', spice: 0 },
  { id: 'hb3', name: 'Lemon Tea Pot', category: 'beverages', diet: 'veg', price: 125, desc: 'Zesty black tea infused with fresh lemon and honey drops.', image: 'assets/images/dish-coffee.jpg', badge: 'Hot Beverage', spice: 0 },
  { id: 'hb4', name: 'Green Tea Pot', category: 'beverages', diet: 'veg', price: 125, desc: 'Antioxidant-rich whole green tea leaves steeped to gentle perfection.', image: 'assets/images/dish-coffee.jpg', badge: 'Hot Beverage', spice: 0 },
  { id: 'hb5', name: 'Nescafe Coffee Pot', category: 'beverages', diet: 'veg', price: 125, desc: 'Frothy hot coffee prepared with fresh milk.', image: 'assets/images/dish-coffee.jpg', badge: 'Hot Beverage', spice: 0 },
  { id: 'hb6', name: 'Hot Chocolate / Hot Milk', category: 'beverages', diet: 'veg', price: 125, desc: 'Rich velvety hot cocoa or nourishing sweetened hot milk.', image: 'assets/images/dish-coffee.jpg', badge: 'Hot Beverage', spice: 0 },

  // --- COLD BEVERAGES ---
  { id: 'cb1', name: 'Fresh Lime Soda / Water', category: 'beverages', diet: 'veg', price: 99, desc: 'Refreshing lime with choice of sweet, salted, or mixed soda/water.', image: 'assets/images/dish-mocktails.jpg', badge: 'Cooler', spice: 0 },
  { id: 'cb2', name: 'Sweet Lassi', category: 'beverages', diet: 'veg', price: 119, desc: 'Thick churned sweet Punjabi curd topped with clotted malai.', image: 'assets/images/dish-mocktails.jpg', badge: 'Traditional', spice: 0 },
  { id: 'cb3', name: 'Buttermilk (Chaas)', category: 'beverages', diet: 'veg', price: 99, desc: 'Cooling churned curd tempered with roasted cumin, mint, and rock salt.', image: 'assets/images/dish-mocktails.jpg', badge: 'Digestive', spice: 0 },
  { id: 'cb4', name: 'Mango Lassi', category: 'beverages', diet: 'veg', price: 129, desc: 'Luscious Alphonso mango pulp blended with thick sweet yoghurt.', image: 'assets/images/dish-mocktails.jpg', badge: 'Seasonal Pick', spice: 0 },
  { id: 'cb5', name: 'Special Dry Fruit Lassi', category: 'beverages', diet: 'veg', price: 159, desc: 'Royal thick lassi loaded with almonds, pistachios, cashews & saffron.', image: 'assets/images/dish-mocktails.jpg', badge: 'Chef Special', spice: 0 },
  { id: 'cb6', name: 'Red Bull Energy Drink', category: 'beverages', diet: 'veg', price: 199, desc: 'Original chilled Red Bull energy drink can.', image: 'assets/images/dish-mocktails.jpg', badge: 'Energy', spice: 0 },
  { id: 'cb7', name: 'Diet Coke / Soft Drinks (Thumbs Up, Fanta, Sprite)', category: 'beverages', diet: 'veg', price: 55, desc: 'Chilled aerated beverages of your choice.', image: 'assets/images/dish-mocktails.jpg', badge: 'Chilled', spice: 0 },

  // --- CONTINENTAL STARTERS (VEGETARIAN) ---
  { id: 'csv1', name: 'French Fries (Classic / Peri Peri / Mexican)', category: 'continental-starters', diet: 'veg', price: 179, desc: 'Golden crispy potato fingers served with ketchup (Peri Peri: ₹199, Mexican: ₹229).', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Crunchy', spice: 1 },
  { id: 'csv2', name: 'Loaded Nachos', category: 'continental-starters', diet: 'veg', price: 319, desc: 'Crispy corn tortilla chips served with rich cream sauce & Mexican beans salsa.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'House Special', spice: 1 },
  { id: 'csv3', name: 'Corn Cheese Balls', category: 'continental-starters', diet: 'veg', price: 319, desc: 'Golden balls made with sweet American corn, processed cheese, mozzarella & dry herbs.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Cheesy', spice: 0 },
  { id: 'csv4', name: 'Garlic Bread with Dip Sauce / Cheese Dip', category: 'continental-starters', diet: 'veg', price: 319, desc: 'Oven-baked crusty artisan garlic bread served with assorted creamy dips.', image: 'assets/images/dish-pizza.jpg', badge: 'Artisan', spice: 0 },
  { id: 'csv5', name: 'Bruschettas', category: 'continental-starters', diet: 'veg', price: 329, desc: 'Chopped tomato, fresh basil & garlic spooned over olive oil brushed toast, balsamic drizzle.', image: 'assets/images/dish-pizza.jpg', badge: 'Italian', spice: 0 },
  { id: 'csv6', name: 'Mexican Quesadilla (Veg)', category: 'continental-starters', diet: 'veg', price: 329, desc: 'Toasted tortilla loaded with sauteed onion, bell pepper, zucchini and melted cheese.', image: 'assets/images/dish-pizza.jpg', badge: 'Mexican', spice: 1 },
  { id: 'csv7', name: 'Tostadas (Must Try)', category: 'continental-starters', diet: 'veg', price: 329, desc: 'Crispy tortilla triangles topped with savory Mexican beans and crunchy bell peppers.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Must Try', spice: 1 },
  { id: 'csv8', name: 'Stuffed Mushrooms', category: 'continental-starters', diet: 'veg', price: 349, desc: 'Delicately stuffed button mushrooms packed with herbs and melted cheese.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Gourmet', spice: 1 },

  // --- CONTINENTAL STARTERS (NON-VEGETARIAN) ---
  { id: 'csn1', name: 'Chicken Quesadilla', category: 'continental-starters', diet: 'non-veg', price: 419, desc: 'Toasted tortilla packed with grilled chicken, bell peppers, onions and molten cheese.', image: 'assets/images/dish-pizza.jpg', badge: 'Loaded', spice: 1 },
  { id: 'csn2', name: 'Chicken Enchiladas (Gratinated)', category: 'continental-starters', diet: 'non-veg', price: 419, desc: 'Tortilla rolled with diced chicken and beans, topped with tomato sauce and gratinated cheese.', image: 'assets/images/dish-pizza.jpg', badge: 'Gratinated', spice: 1 },
  { id: 'csn3', name: 'Kentucky Fried Chicken (KFC Style)', category: 'continental-starters', diet: 'non-veg', price: 419, desc: 'Thin slices of chicken, secret crumbed and golden fried till pure perfection.', image: 'assets/images/dish-tandoori.jpg', badge: 'Crispy Best', spice: 1 },
  { id: 'csn4', name: 'Chicken Pesto Bites', category: 'continental-starters', diet: 'non-veg', price: 419, desc: 'Succulent dices of chicken skewered in aromatic basil pine-nut pesto marinade.', image: 'assets/images/dish-tandoori.jpg', badge: 'Chef Special', spice: 1 },
  { id: 'csn5', name: 'Fish Finger with Tartar Sauce', category: 'continental-starters', diet: 'non-veg', price: 519, desc: 'Crumbed batons of fresh river fish, golden fried and served with house tartar sauce.', image: 'assets/images/dish-tandoori.jpg', badge: 'Seafood', spice: 0 },

  // --- ORIENTAL STARTERS (VEGETARIAN) ---
  { id: 'osv1', name: 'Chilli Paneer (Dry / Gravy)', category: 'oriental-starters', diet: 'veg', price: 349, desc: 'Fried paneer cubes pan-tossed with diced onions, capsicum, and oriental soya sauce.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Classic', spice: 2 },
  { id: 'osv2', name: 'Veg Spring Roll', category: 'oriental-starters', diet: 'veg', price: 319, desc: 'Deep fried crispy pastry rolls filled with shredded garden veggies in light soya.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Crispy', spice: 1 },
  { id: 'osv3', name: 'Vegetable Lollypop', category: 'oriental-starters', diet: 'veg', price: 319, desc: 'Crispy lollys made with spiced minced vegetables and oriental herbs.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Popular', spice: 1 },
  { id: 'osv4', name: 'Crispy Honey Chilly Potatoes', category: 'oriental-starters', diet: 'veg', price: 279, desc: 'Crisp fried potato batons tossed in a sweet and tangy honey chilli glaze with sesame.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Sweet & Spicy', spice: 2 },
  { id: 'osv5', name: 'Veg Manchurian (Dry / Gravy)', category: 'oriental-starters', diet: 'veg', price: 279, desc: 'Golden vegetable dumplings tossed with ginger, garlic, and coriander soya sauce.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Indo-Chinese', spice: 2 },
  { id: 'osv6', name: 'Paneer Satay with Peanut Sauce', category: 'oriental-starters', diet: 'veg', price: 349, desc: 'Grilled paneer satay skewers served with authentic creamy peanut butter dip.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Thai Twist', spice: 1 },
  { id: 'osv7', name: 'Thai Cottage Cheese', category: 'oriental-starters', diet: 'veg', price: 349, desc: 'Paneer medallions stuffed with galangal, fresh basil & exotic veg, panko crumbed.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Exotic', spice: 2 },
  { id: 'osv8', name: 'Mushroom Chilly / Salt & Pepper', category: 'oriental-starters', diet: 'veg', price: 349, desc: 'Crispy button mushrooms tossed with green chillies or crushed black pepper and sea salt.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Crisp', spice: 2 },
  { id: 'osv9', name: 'Veg Dimsum (Momos)', category: 'oriental-starters', diet: 'veg', price: 319, desc: 'Delicate steamed dumplings stuffed with exotic vegetables and creamy ricotta.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Steamed', spice: 0 },
  { id: 'osv10', name: 'Crispy Veg / Soya Tossed', category: 'oriental-starters', diet: 'veg', price: 279, desc: 'Assorted seasonal vegetables fried crisp or wok-tossed in spiced soya.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Wok Tossed', spice: 1 },
  { id: 'osv11', name: 'Crispy Corn Salt and Pepper', category: 'oriental-starters', diet: 'veg', price: 279, desc: 'Crispy fried American sweet corn tossed with sea salt, crushed peppercorns & scallions.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Bestseller', spice: 1 },

  // --- ORIENTAL STARTERS (NON-VEGETARIAN) ---
  { id: 'osn1', name: 'Chicken Spring Roll', category: 'oriental-starters', diet: 'non-veg', price: 379, desc: 'Crisp pastry rolls packed with julienned chicken and crunchy veggies in soya glaze.', image: 'assets/images/dish-tandoori.jpg', badge: 'Crispy', spice: 1 },
  { id: 'osn2', name: 'Chicken Lemon Pepper', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Dices of tender chicken wok-tossed in zesty lemon pepper sauce.', image: 'assets/images/dish-tandoori.jpg', badge: 'Zesty', spice: 2 },
  { id: 'osn3', name: 'Chicken Manchurian (Dry / Gravy)', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Diced chicken tossed in chopped ginger, garlic, fresh green chillies and dark soya.', image: 'assets/images/dish-tandoori.jpg', badge: 'Popular', spice: 2 },
  { id: 'osn4', name: 'Five Spice Chicken', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Tender chicken stir-fried with traditional Chinese 5-spice blend and bell peppers.', image: 'assets/images/dish-tandoori.jpg', badge: 'Aromatic', spice: 2 },
  { id: 'osn5', name: 'Chicken Singapore', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Deep fried boneless chicken tossed in a fiery red Singaporean chilli sauce.', image: 'assets/images/dish-tandoori.jpg', badge: 'Spicy', spice: 3 },
  { id: 'osn6', name: 'Crispy Asian Chicken', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Crispy fried chicken bites encrusted with golden sesame seeds and sweet soya.', image: 'assets/images/dish-tandoori.jpg', badge: 'Sesame Glaze', spice: 1 },
  { id: 'osn7', name: 'Chicken Dimsum (Momos)', category: 'oriental-starters', diet: 'non-veg', price: 399, desc: 'Steamed translucent dumplings filled with juicy spiced minced chicken.', image: 'assets/images/dish-tandoori.jpg', badge: 'Steamed', spice: 1 },
  { id: 'osn8', name: 'Chicken Lollypop with Hot Garlic Sauce', category: 'oriental-starters', diet: 'non-veg', price: 399, desc: 'Crispy fried chicken wings shaped into lollipops served with spicy hot garlic dip.', image: 'assets/images/dish-tandoori.jpg', badge: 'Fan Favorite', spice: 2 },
  { id: 'osn9', name: 'Chicken Chilly Dry / Chicken 65', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Diced chicken tossed with garlic, green pepper and fiery chilli oil.', image: 'assets/images/dish-tandoori.jpg', badge: 'Fiery', spice: 3 },
  { id: 'osn10', name: 'Kung Pao Chicken', category: 'oriental-starters', diet: 'non-veg', price: 419, desc: 'Succulent chicken dices tossed in rich oyster sauce with roasted cashewnuts & dry chillies.', image: 'assets/images/dish-tandoori.jpg', badge: 'Authentic', spice: 2 },
  { id: 'osn11', name: 'Chilli Fish', category: 'oriental-starters', diet: 'non-veg', price: 519, desc: 'Batter-fried fish fillet tossed with dark soya, bell peppers, and fresh green chillies.', image: 'assets/images/dish-tandoori.jpg', badge: 'Fish Specialty', spice: 2 },
  { id: 'osn12', name: 'Pan Fried Singapore Fish', category: 'oriental-starters', diet: 'non-veg', price: 519, desc: 'Pan-fried fish fillet infused with soya sauce, roasted garlic, ginger juliennes and scallions.', image: 'assets/images/dish-tandoori.jpg', badge: 'Pan Fried', spice: 1 },
  { id: 'osn13', name: 'Chilly Prawns', category: 'oriental-starters', diet: 'non-veg', price: 649, desc: 'Crispy fried king prawns tossed with spicy green chillies, garlic, and dark soya.', image: 'assets/images/dish-tandoori.jpg', badge: 'Prawns', spice: 3 },
  { id: 'osn14', name: 'Prawns Burnt Chilly', category: 'oriental-starters', diet: 'non-veg', price: 649, desc: 'Deep fried prawns infused with smoking burnt chilli oil and garlic chips.', image: 'assets/images/dish-tandoori.jpg', badge: 'Chef Special', spice: 3 },
  { id: 'osn15', name: 'Butterfly Prawns', category: 'oriental-starters', diet: 'non-veg', price: 649, desc: 'Golden crispy fried prawns served with spicy dip.', image: 'assets/images/dish-tandoori.jpg', badge: 'Crispy Prawns', spice: 1 },

  // --- INDIAN TANDOOR STARTERS (VEGETARIAN) ---
  { id: 'isv1', name: 'Paneer Hilltop (House Speciality)', category: 'indian-starters', diet: 'veg', price: 349, desc: 'House Specialty: Stuffed paneer with cheese marinated in yellow masala, roasted in clay tandoor.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'House Special', spice: 2 },
  { id: 'isv2', name: 'Paneer Sufiyana Tikka', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Cottage cheese marinated in fennel-flavoured green masala and roasted to perfection.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Fennel Herb', spice: 1 },
  { id: 'isv3', name: 'Paneer Malai Seekh Kabab', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Grated paneer, processed cheese, and mawa mix skewered and served with creamy dip.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Melt-in-Mouth', spice: 1 },
  { id: 'isv4', name: 'Dahi Ke Sholey', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Twice cooked hung curd and soft cheese kebabs with a crispy golden outer crust.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Legendary', spice: 1 },
  { id: 'isv5', name: 'Paneer Tikka (Red Masala)', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Cottage cheese cubes steeped in spiced red yoghurt masala and roasted in tandoor.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Tandoori', spice: 2 },
  { id: 'isv6', name: 'Paneer Reshmi Tikka', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Cottage cheese marinated in rich cream, hung curd, cashew paste and mild aromatic spices.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Silky Cream', spice: 1 },
  { id: 'isv7', name: 'Paneer Royal Roll Tikka', category: 'indian-starters', diet: 'veg', price: 349, desc: 'Stuffed and rolled paneer slices in Chef’s secret recipe — an extraordinary tandoor delicacy.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Secret Recipe', spice: 2 },
  { id: 'isv8', name: 'Paneer Koliwada', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Crisp fried paneer cubes seasoned with coastal Koliwada red spices.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Coastal Spices', spice: 2 },
  { id: 'isv9', name: 'Hara Bhara Kebab', category: 'indian-starters', diet: 'veg', price: 319, desc: 'Chopped spinach and green pea patties mixed with cashewnut, served with mint chutney.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Nutritious', spice: 1 },
  { id: 'isv10', name: 'Afghani Soya Chaap', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Extra soft soya chaap marinated in rich cashew paste and hung curd, tandoor grilled.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Rich Creamy', spice: 1 },
  { id: 'isv11', name: 'Tandoori Soya Chaap', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Juicy soya chaap steeped in spicy red tandoori marinade and smoky char-grilled.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Spicy Red', spice: 2 },
  { id: 'isv12', name: 'Stuffed Dum Ke Mushroom', category: 'indian-starters', diet: 'veg', price: 349, desc: 'Tandoor cooked stuffed mushrooms mixed with green spiced hung curd.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Stuffed', spice: 2 },
  { id: 'isv13', name: 'Veg Seekh Kebab', category: 'indian-starters', diet: 'veg', price: 329, desc: 'Minced vegetables with authentic Indian herbs, skewered and served with mint yoghurt sauce.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Charcoal Grilled', spice: 2 },
  { id: 'isv14', name: 'Assorted Veg Platter', category: 'indian-starters', diet: 'veg', price: 999, desc: 'Lavish grand platter featuring an assortment of our finest vegetarian tandoori kebabs.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Grand Platter', spice: 2 },

  // --- INDIAN TANDOOR STARTERS (NON-VEGETARIAN) ---
  { id: 'isn1', name: 'Chicken Seekh Kebab', category: 'indian-starters', diet: 'non-veg', price: 449, desc: 'Spiced minced chicken skewered on iron rods and cooked over glowing coals, served with mint chutney.', image: 'assets/images/dish-tandoori.jpg', badge: 'Tandoori', spice: 2 },
  { id: 'isn2', name: 'Chicken Tikka', category: 'indian-starters', diet: 'non-veg', price: 449, desc: 'Boneless chicken leg cubes in fiery red spiced hung curd marination, charred to juicy perfection.', image: 'assets/images/dish-tandoori.jpg', badge: 'Classic', spice: 2 },
  { id: 'isn3', name: 'Chicken Kalimirch Tikka', category: 'indian-starters', diet: 'non-veg', price: 449, desc: 'Boneless chicken marinated with coarsely crushed black peppercorns and thick hung curd.', image: 'assets/images/dish-tandoori.jpg', badge: 'Black Pepper', spice: 2 },
  { id: 'isn4', name: 'Murgh Malai Tikka', category: 'indian-starters', diet: 'non-veg', price: 469, desc: 'Luscious chunks of chicken marinated with clotted cream, processed cheese & cardamom.', image: 'assets/images/dish-tandoori.jpg', badge: 'Velvet Soft', spice: 1 },
  { id: 'isn5', name: 'Chicken Shofiana Tikka', category: 'indian-starters', diet: 'non-veg', price: 469, desc: 'Chicken marinated in fennel seed, cream, hung curd, and Chef’s special chutney.', image: 'assets/images/dish-tandoori.jpg', badge: 'Fennel Infused', spice: 1 },
  { id: 'isn6', name: 'Nawabi Murgh Kalmi', category: 'indian-starters', diet: 'non-veg', price: 599, desc: 'Succulent chicken legs marinated in yoghurt, cream, saffron, cashews & spices, gently roasted.', image: 'assets/images/dish-tandoori.jpg', badge: 'Nawabi Feast', spice: 2 },
  { id: 'isn7', name: 'Tandoori Murgh (Half / Full)', category: 'indian-starters', diet: 'non-veg', price: 359, desc: 'The undisputed king of Punjabi tandoor in authentic red spices (Full: ₹649).', image: 'assets/images/dish-tandoori.jpg', badge: 'King of Tandoor', spice: 2 },
  { id: 'isn8', name: 'Sukha Chicken', category: 'indian-starters', diet: 'non-veg', price: 469, desc: 'Diced chicken tempered with aromatic fresh curry leaves, crushed black pepper and dry roasted spices.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'South Spiced', spice: 3 },
  { id: 'isn9', name: 'Mutton Seekh Kebab', category: 'indian-starters', diet: 'non-veg', price: 549, desc: 'Finely minced spiced mutton skewers cooked in tandoor. Literally dissolves on your tongue.', image: 'assets/images/dish-tandoori.jpg', badge: 'Melt-in-Mouth', spice: 2 },
  { id: 'isn10', name: 'Mutton Gallouti Kebab', category: 'indian-starters', diet: 'non-veg', price: 549, desc: 'Lucknow famed mutton medallions cooked on griddle with smoked clove & vetiver.', image: 'assets/images/dish-tandoori.jpg', badge: 'Lucknow Heritage', spice: 2 },
  { id: 'isn11', name: 'Sukha Mutton', category: 'indian-starters', diet: 'non-veg', price: 549, desc: 'Boneless tender mutton slow-roasted with grated dry coconut, curry leaves, and spices.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Dry Masala', spice: 3 },
  { id: 'isn12', name: 'Awadhi Raan', category: 'indian-starters', diet: 'non-veg', price: 1599, desc: 'Whole mutton leg marinated with cheese, cream, brown onion & yellow chilli powder, delicately roasted.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Royal Grandeur', spice: 2 },
  { id: 'isn13', name: 'Fish Tikka / Ajwani Tikka', category: 'indian-starters', diet: 'non-veg', price: 549, desc: 'Chunks of fish marinated in red masala or carom seed (ajwain) hung curd, tandoor roasted.', image: 'assets/images/dish-tandoori.jpg', badge: 'Charcoal Fish', spice: 2 },
  { id: 'isn14', name: 'Fish Koliwada / Amritsari Fish Fry', category: 'indian-starters', diet: 'non-veg', price: 549, desc: 'Crispy spiced deep fried fish fillets in traditional batter served with lemon.', image: 'assets/images/dish-tandoori.jpg', badge: 'Crispy Fry', spice: 2 },
  { id: 'isn15', name: 'Rawa Fried Fish', category: 'indian-starters', diet: 'non-veg', price: 549, desc: 'Goan spiced fish fillet coated with semolina (rawa) and shallow pan-fried.', image: 'assets/images/dish-tandoori.jpg', badge: 'Goan Style', spice: 2 },
  { id: 'isn16', name: 'Tandoori Prawns / Prawns Koliwada', category: 'indian-starters', diet: 'non-veg', price: 699, desc: 'King prawns marinated in tandoori red spices or Koliwada batter (Koliwada: ₹649).', image: 'assets/images/dish-tandoori.jpg', badge: 'Seafood Master', spice: 2 },
  { id: 'isn17', name: 'Assortment of Non-Veg Platter', category: 'indian-starters', diet: 'non-veg', price: 1399, desc: 'Lavish royal platter featuring chicken tikkas, mutton seekh, fish kebabs, and prawns.', image: 'assets/images/dish-tandoori.jpg', badge: 'The Maharaja Platter', spice: 2 },

  // --- SOUPS & SALADS ---
  { id: 'sp1', name: 'Manchow Soup (Veg / Chicken)', category: 'soups', diet: 'veg', price: 179, desc: 'Spicy garlic broth loaded with vegetables or chicken (Chicken: ₹219), served with crispy noodles.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Hot Broth', spice: 2 },
  { id: 'sp2', name: 'Hot N Sour Soup (Veg / Chicken)', category: 'soups', diet: 'veg', price: 179, desc: 'Tangy oriental soup with pepper, shredded vegetables or chicken (Chicken: ₹219).', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Tangy & Spicy', spice: 2 },
  { id: 'sp3', name: 'Lemon Coriander Soup (Veg / Chicken)', category: 'soups', diet: 'veg', price: 179, desc: 'Clear refreshing broth flavored with crushed coriander stems and freshly squeezed lemon (Chicken: ₹219).', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Refreshing', spice: 1 },
  { id: 'sp4', name: 'Burnt Garlic Soup (Veg / Chicken)', category: 'soups', diet: 'veg', price: 179, desc: 'Smoky broth infused with golden roasted garlic bits (Chicken: ₹219).', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Garlic Smoky', spice: 1 },
  { id: 'sp5', name: 'Tomato Basil Soup', category: 'soups', diet: 'veg', price: 179, desc: 'Rich purée of roasted ripe tomatoes infused with Italian sweet basil.', image: 'assets/images/dish-pasta.jpg', badge: 'Continental', spice: 0 },
  { id: 'sp6', name: 'Mushroom Cappuccino', category: 'soups', diet: 'veg', price: 199, desc: 'Frothy, velvety cream of wild button mushroom soup served in cappuccino style.', image: 'assets/images/dish-coffee.jpg', badge: 'Gourmet', spice: 0 },
  { id: 'sp7', name: 'Tom Kha Kai / Tom Yum Soup', category: 'soups', diet: 'non-veg', price: 229, desc: 'Authentic Thai coconut base soup (Tom Kha Kai) or spicy lemongrass broth (Tom Yum: ₹179/₹219).', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Thai Broth', spice: 2 },
  { id: 'sp8', name: 'Egg Drop Soup', category: 'soups', diet: 'non-veg', price: 219, desc: 'Comforting frothy egg ribbon broth soup with mild seasoning.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Egg Broth', spice: 0 },
  { id: 'sl1', name: 'Greek Salad / Russian Salad', category: 'soups', diet: 'veg', price: 219, desc: 'Crisp lettuce, feta cheese, olives in vinaigrette, or Russian potato-veggie mayonnaise salad.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Salad', spice: 0 },
  { id: 'sl2', name: 'Caesar Salad / Lebanese Salad', category: 'soups', diet: 'veg', price: 219, desc: 'Crunchy iceberg, croutons & parmesan, or millets, bell peppers & cherry tomatoes in French dressing.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Salad', spice: 0 },

  // --- CONTINENTAL MAINS & PASTAS ---
  { id: 'cm1', name: 'Pasta Arrabiata with Garlic Bread', category: 'continental-mains', diet: 'veg', price: 389, desc: 'Al dente penne in spicy chunky plum tomato sauce with fresh herbs & garlic bread.', image: 'assets/images/dish-pasta.jpg', badge: 'Spicy Italian', spice: 2 },
  { id: 'cm2', name: 'Pasta Alfredo with Garlic Bread', category: 'continental-mains', diet: 'veg', price: 389, desc: 'Pasta bathed in rich parmesan cheese sauce with exotic vegetables and garlic bread.', image: 'assets/images/dish-pasta.jpg', badge: 'Cheesy Rich', spice: 0 },
  { id: 'cm3', name: 'Pasta in Pesto Sauce', category: 'continental-mains', diet: 'veg', price: 389, desc: 'Pasta tossed in vibrant sauce of fresh sweet basil, garlic, parmesan and pine nuts.', image: 'assets/images/dish-pasta.jpg', badge: 'Basil Pesto', spice: 0 },
  { id: 'cm4', name: 'Veg Lasagne', category: 'continental-mains', diet: 'veg', price: 389, desc: 'Layered pasta sheets packed with exotic vegetables, Italian herb sauce & gratinated cheese.', image: 'assets/images/dish-pasta.jpg', badge: 'Oven Baked', spice: 1 },
  { id: 'cm5', name: 'Paneer Shashlik', category: 'continental-mains', diet: 'veg', price: 449, desc: 'Soft marinated paneer skewered with capsicum, onion, baked over herbed rice with tomato sauce.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Continental Paneer', spice: 1 },
  { id: 'cm6', name: 'Baked Vegetable / Baked Spinach & Corn', category: 'continental-mains', diet: 'veg', price: 449, desc: 'Diced vegetables or spinach and corn in rich cheese sauce, gratinated with melted crust.', image: 'assets/images/dish-pasta.jpg', badge: 'Gratinated', spice: 0 },
  { id: 'cm7', name: 'Italian Risotto', category: 'continental-mains', diet: 'veg', price: 449, desc: 'Creamy arborio Italian rice simmered with leeks, American sweet corn and parmesan.', image: 'assets/images/dish-biryani.jpg', badge: 'Risotto', spice: 0 },
  { id: 'cm8', name: 'Chicken Lasagne with Garlic Bread', category: 'continental-mains', diet: 'non-veg', price: 499, desc: 'Baked layers of pasta sheets with spiced chicken mince, rich tomato sauce & cheese.', image: 'assets/images/dish-pasta.jpg', badge: 'Baked Mince', spice: 1 },
  { id: 'cm9', name: 'Chicken Pasta (Arrabiata / Alfredo)', category: 'continental-mains', diet: 'non-veg', price: 499, desc: 'Pasta with tender chicken in spicy tomato Arrabiata or creamy cheesy Alfredo sauce.', image: 'assets/images/dish-pasta.jpg', badge: 'Chicken Pasta', spice: 1 },
  { id: 'cm10', name: 'Chicken Steak with Mushroom Sauce', category: 'continental-mains', diet: 'non-veg', price: 499, desc: 'Herb-grilled chicken breast served with herbed rice, mashed potatoes, veggies & brown sauce.', image: 'assets/images/dish-sizzler.jpg', badge: 'Gourmet Steak', spice: 1 },
  { id: 'cm11', name: 'Fish N Chips', category: 'continental-mains', diet: 'non-veg', price: 599, desc: 'Golden crumbed fillet of fish served with crispy french fries and tartar sauce.', image: 'assets/images/dish-tandoori.jpg', badge: 'British Classic', spice: 0 },
  { id: 'cm12', name: 'Grilled Fish in Lemon Butter Sauce', category: 'continental-mains', diet: 'non-veg', price: 599, desc: 'Fresh fish fillet grilled with herbs, served with buttered rice, mash & lemon butter glaze.', image: 'assets/images/dish-tandoori.jpg', badge: 'Lemon Butter', spice: 0 },

  // --- HOUSE SIZZLERS ---
  { id: 'sz1', name: 'Cottage Cheese Steak Sizzler', category: 'sizzlers', diet: 'veg', price: 519, desc: 'Grilled cottage cheese steak on a sizzling iron skillet with herbed rice, fries & exotic veggies.', image: 'assets/images/dish-sizzler.jpg', badge: 'Sizzling Sensation', spice: 2 },
  { id: 'sz2', name: 'Tex - Mex Sizzler', category: 'sizzlers', diet: 'veg', price: 519, desc: 'Veg club tikki paired with Mexican spicy rice, golden french fries and pepper sauce.', image: 'assets/images/dish-sizzler.jpg', badge: 'Tex-Mex', spice: 2 },
  { id: 'sz3', name: 'Chicken Steak Sizzler', category: 'sizzlers', diet: 'non-veg', price: 569, desc: 'Succulent grilled chicken patties with herbed butter rice, fries and brown mushroom sauce.', image: 'assets/images/dish-sizzler.jpg', badge: 'House Bestseller', spice: 2 },
  { id: 'sz4', name: 'Chicken Sizzler - Oriental Way', category: 'sizzlers', diet: 'non-veg', price: 569, desc: 'Smokey chilli chicken served with wok fried rice, Schezwan noodles, and crisp fries.', image: 'assets/images/dish-sizzler.jpg', badge: 'Oriental Sizzler', spice: 3 },

  // --- ASIAN MAIN COURSE & NOODLES ---
  { id: 'am1', name: 'Veg Thai Curry (Red / Yellow / Green)', category: 'asian', diet: 'veg', price: 419, desc: 'Exotic vegetables in authentic coconut cream Thai curry served with fragrant steamed rice.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Thai Specialty', spice: 2 },
  { id: 'am2', name: 'Chicken Thai Curry (Red / Yellow / Green)', category: 'asian', diet: 'non-veg', price: 569, desc: 'Tender chicken simmered in rich coconut milk Thai curry with galangal and basil (Prawns: ₹669).', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Thai Curry', spice: 2 },
  { id: 'am3', name: 'Shaolin Platter', category: 'asian', diet: 'veg', price: 519, desc: 'Wok fried rice, soft noodles with vegetable Manchurian balls in spicy garlic sauce.', image: 'assets/images/dish-crispy-corn.jpg', badge: 'Shaolin Feast', spice: 2 },
  { id: 'am4', name: 'Diced Chilly Chicken (House Specialty)', category: 'asian', diet: 'non-veg', price: 419, desc: 'House specialty: Diced chicken with green chillies in savory white sauce. Perfect with rice.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'House Special', spice: 2 },
  { id: 'am5', name: 'Hunan Chicken', category: 'asian', diet: 'non-veg', price: 419, desc: 'Spiced chicken cubes wok-tossed in traditional Chinese Hunan sauce with peppers.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Hunan Province', spice: 3 },
  { id: 'am6', name: 'Veg Hakka Noodles / Burnt Garlic Noodles', category: 'asian', diet: 'veg', price: 269, desc: 'Wok tossed noodles with shredded vegetables and soya or aromatic burnt garlic.', image: 'assets/images/dish-pasta.jpg', badge: 'Wok Noodles', spice: 1 },
  { id: 'am7', name: 'Veg Fried Rice / Schezwan Fried Rice', category: 'asian', diet: 'veg', price: 269, desc: 'Aged rice tossed with crunchy veggies in classic soya or fiery Schezwan sauce.', image: 'assets/images/dish-biryani.jpg', badge: 'Wok Rice', spice: 2 },
  { id: 'am8', name: 'Chicken Hakka Noodles / Schezwan Rice', category: 'asian', diet: 'non-veg', price: 349, desc: 'Egg and chicken juliennes tossed with soft noodles or aromatic stir-fried rice (Rice: ₹319).', image: 'assets/images/dish-pasta.jpg', badge: 'Chicken Wok', spice: 2 },
  { id: 'am9', name: 'Nasi Goreng (Veg / Non-Veg)', category: 'asian', diet: 'non-veg', price: 499, desc: 'Indonesian fried rice, stir fry greens, and chicken satay served with rice crackers (Veg: ₹389).', image: 'assets/images/dish-biryani.jpg', badge: 'Indonesian', spice: 2 },

  // --- INDIAN MAIN COURSE (VEGETARIAN) ---
  { id: 'imv1', name: 'Paneer Lababdar (Chef’s Kitchen)', category: 'indian-veg-mains', diet: 'veg', price: 349, desc: 'Paneer cooked in rich tomato base gravy with bell peppers, made in pure Desi Ghee.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Royal Kitchen', spice: 2 },
  { id: 'imv2', name: 'Paneer Varhadi (Amravati Special)', category: 'indian-veg-mains', diet: 'veg', price: 349, desc: 'Cottage cheese prepared in authentic local Vidarbha / Varhadi black spice gravy (Half: ₹199).', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Varhadi Pride', spice: 3 },
  { id: 'imv3', name: 'Paneer Butter Masala', category: 'indian-veg-mains', diet: 'veg', price: 349, desc: 'Dices of fresh cottage cheese in silky, buttery tomato Makhani gravy (Half: ₹199).', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'All-Time Classic', spice: 1 },
  { id: 'imv4', name: 'Paneer Kadhai / Tikka Masala', category: 'indian-veg-mains', diet: 'veg', price: 349, desc: 'Paneer with pounded coriander seeds & kadhai masala or charred tikka in rich gravy.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Spicy Masala', spice: 2 },
  { id: 'imv5', name: 'Paneer Awadhi Pasanda', category: 'indian-veg-mains', diet: 'veg', price: 379, desc: 'Stuffed layered cottage cheese steeped in Chef’s secret Awadhi cashew gravy.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Awadhi Royalty', spice: 1 },
  { id: 'imv6', name: 'Paneer Kaju Masala', category: 'indian-veg-mains', diet: 'veg', price: 379, desc: 'Rich North Indian curry loaded with roasted golden whole cashews and paneer cubes.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Cashew Delight', spice: 2 },
  { id: 'imv7', name: 'Veg Kolhapuri', category: 'indian-veg-mains', diet: 'veg', price: 299, desc: 'Assorted farm-fresh vegetables cooked in fiery Kolhapuri red chilli gravy.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Extra Spicy', spice: 3 },
  { id: 'imv8', name: 'Methi Malai Mutter', category: 'indian-veg-mains', diet: 'veg', price: 329, desc: 'Sweet green peas and fragrant fenugreek leaves in a mild clotted cashew cream gravy.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Mild & Sweet', spice: 0 },
  { id: 'imv9', name: 'Kaju Masala / Navratan Korma', category: 'indian-veg-mains', diet: 'veg', price: 349, desc: 'Whole cashewnuts in medium spiced onion gravy or 9 gems of veggies & dry fruits in cream.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Royal Curries', spice: 1 },
  { id: 'imv10', name: 'Mushroom Masala / Mushroom Kadhai', category: 'indian-veg-mains', diet: 'veg', price: 319, desc: 'White button mushrooms cooked in Punjabi spiced onion-tomato or kadhai masala (Kadhai: ₹349).', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Mushroom', spice: 2 },
  { id: 'imv11', name: 'Subzi Miloni Tarkari / Deewani Handi', category: 'indian-veg-mains', diet: 'veg', price: 319, desc: 'Melange of vegetables in pureed spinach gravy or mild spiced handi curry.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Handi Special', spice: 2 },
  { id: 'imv12', name: 'Vegetable Kofta / Rajasthani Kofta', category: 'indian-veg-mains', diet: 'veg', price: 319, desc: 'Melt-in-mouth vegetable or paneer koftas in rich gravy tempered with aromatic kalonji.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Kofta Gravy', spice: 1 },
  { id: 'imv13', name: 'Dum Aloo Banarasi', category: 'indian-veg-mains', diet: 'veg', price: 319, desc: 'Stuffed baby potatoes cooked in spicy orange gravy with coriander and hint of jaggery.', image: 'assets/images/dish-paneer-tikka.jpg', badge: 'Banarasi', spice: 2 },

  // --- INDIAN MAIN COURSE (NON-VEGETARIAN & EGGS) ---
  { id: 'imn1', name: 'Murg Rara (Straight from Punjab)', category: 'indian-nonveg-mains', diet: 'non-veg', price: 549, desc: 'VIRSA ICONIC: Chicken mince and tender chicken cuts cooked in roasted onion-tomato gravy.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Amravati’s #1 Pick', spice: 3 },
  { id: 'imn2', name: 'Mutton Rara', category: 'indian-nonveg-mains', diet: 'non-veg', price: 649, desc: 'Boneless tender mutton simmered in spiced mutton mince gravy with whole spices.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Mutton Crown', spice: 3 },
  { id: 'imn3', name: 'Butter Chicken (House Speciality)', category: 'indian-nonveg-mains', diet: 'non-veg', price: 449, desc: 'House Specialty: Tandoori chicken simmered in rich buttery tomato satin gravy (Half: ₹279).', image: 'assets/images/dish-chicken-rara.jpg', badge: 'House Special', spice: 1 },
  { id: 'imn4', name: 'Murgh Varhadi (Vidarbha Special)', category: 'indian-nonveg-mains', diet: 'non-veg', price: 449, desc: 'Tender chicken cooked in the legendary dark roasted spices of Varhad / Amravati (Half: ₹249).', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Varhadi Style', spice: 3 },
  { id: 'imn5', name: 'Saoji Chicken Masala (Nagpur Special)', category: 'indian-nonveg-mains', diet: 'non-veg', price: 449, desc: 'Nagpur special fiery Saoji masala — 100% authentic homemade recipe with deep spice notes.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Saoji Heat', spice: 3 },
  { id: 'imn6', name: 'Mutton Rogan Josh (House Speciality)', category: 'indian-nonveg-mains', diet: 'non-veg', price: 569, desc: 'Authentic Kashmiri preparation with whole spices, fennel, dried ginger, and ratanjot.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Kashmiri Classic', spice: 2 },
  { id: 'imn7', name: 'Khandeshi Mutton / Mutton Bhuna', category: 'indian-nonveg-mains', diet: 'non-veg', price: 569, desc: 'Mutton cooked in homemade Khandeshi kala masala or slow-roasted bhuna onion-tomato gravy.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Bhuna Masala', spice: 3 },
  { id: 'imn8', name: 'Jaisalmer Gosht', category: 'indian-nonveg-mains', diet: 'non-veg', price: 569, desc: 'Baby mutton prepared in typical Rajasthani royal red chilli gravy.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Rajasthani', spice: 3 },
  { id: 'imn9', name: 'Kesariya Murgh / Murgh Laziz', category: 'indian-nonveg-mains', diet: 'non-veg', price: 449, desc: 'Chicken simmered in royal saffron base gravy or creamy gravy with capsicum (Laziz: ₹469).', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Saffron Cream', spice: 1 },
  { id: 'imn10', name: 'Murg Musallam (Whole Stuffed Chicken)', category: 'indian-nonveg-mains', diet: 'non-veg', price: 749, desc: 'Whole tandoori chicken stuffed with rice and boiled eggs, napped with royal tomato gravy.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Grand Emperor', spice: 2 },
  { id: 'imn11', name: 'Egg Curry - Varhadi Style', category: 'indian-nonveg-mains', diet: 'non-veg', price: 349, desc: 'Boiled eggs simmered in spicy Vidarbha roasted masala gravy (Half: ₹199).', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Varhadi Egg', spice: 2 },
  { id: 'imn12', name: 'Egg Masala Dry (Kassa) / Bhurji Curry', category: 'indian-nonveg-mains', diet: 'non-veg', price: 269, desc: 'Dry spiced egg preparation or scrambled eggs in rich curry sauce.', image: 'assets/images/dish-chicken-rara.jpg', badge: 'Egg Special', spice: 2 },

  // --- DAL DARBAR ---
  { id: 'dd1', name: 'Dal Virsa (Chef’s Secret Recipe)', category: 'dal-darbar', diet: 'veg', price: 259, desc: 'OUR CHEF’S SECRET RECIPE: Black lentils and kidney beans slow-cooked overnight with white butter.', image: 'assets/images/dish-dal-makhani.jpg', badge: 'Overnight Simmer', spice: 1 },
  { id: 'dd2', name: 'Dhuan Wali Dal (Must Try)', category: 'dal-darbar', diet: 'veg', price: 259, desc: 'Lentils delicacy smoked with glowing charcoal and desi ghee clove smoke. A must try!', image: 'assets/images/dish-dal-makhani.jpg', badge: 'Smoked Charcoal', spice: 1 },
  { id: 'dd3', name: 'Dal Tadka / Dal Fry', category: 'dal-darbar', diet: 'veg', price: 219, desc: 'Yellow lentils tempered with sizzling cumin, garlic, and dried chillies (Dal Fry: ₹199).', image: 'assets/images/dish-dal-makhani.jpg', badge: 'Desi Ghee', spice: 2 },

  // --- BASMATI RICE & CLAY POT BIRYANI ---
  { id: 'br1', name: 'Clay Pot Veg Biryani', category: 'biryani', diet: 'veg', price: 399, desc: 'Layers of aged basmati rice cooked with garden vegetables and saffron spices in an authentic clay pot.', image: 'assets/images/dish-biryani.jpg', badge: 'Clay Pot Dum', spice: 2 },
  { id: 'br2', name: 'Clay Pot Chicken Biryani', category: 'biryani', diet: 'non-veg', price: 499, desc: 'Marinated chicken pieces layered with aged basmati rice, sealed and cooked to dum perfection in clay pots.', image: 'assets/images/dish-biryani.jpg', badge: 'Clay Pot Special', spice: 2 },
  { id: 'br3', name: 'Clay Pot Mutton Biryani', category: 'biryani', diet: 'non-veg', price: 599, desc: 'Succulent mutton cuts layered with aromatic saffron rice and cooked slow in earthen clay pots.', image: 'assets/images/dish-biryani.jpg', badge: 'Royal Handi', spice: 2 },
  { id: 'br4', name: 'Caramelized Onion Rice / Jeera Rice', category: 'biryani', diet: 'veg', price: 219, desc: 'Fragrant basmati rice tossed with sweet browned onions or roasted cumin seeds (Jeera: ₹199).', image: 'assets/images/dish-biryani.jpg', badge: 'Basmati', spice: 1 },
  { id: 'br5', name: 'Kashmiri Pulao / Veg Pulao', category: 'biryani', diet: 'veg', price: 299, desc: 'Sweet pulao garnished with dry fruits, saffron, and fresh fruits, or garden vegetable pulao.', image: 'assets/images/dish-biryani.jpg', badge: 'Kashmiri Saffron', spice: 0 },
  { id: 'br6', name: 'Butter Dal Khichdi', category: 'biryani', diet: 'veg', price: 269, desc: 'Soulful comfort food: Rice and moong dal simmered with ghee, cumin and mild spices.', image: 'assets/images/dish-dal-makhani.jpg', badge: 'Comfort Food', spice: 1 },

  // --- BREAD TANDOOR SE ---
  { id: 'tb1', name: 'Cheese Garlic Naan', category: 'breads', diet: 'veg', price: 99, desc: 'Refined wheat bread filled with melting cheese and crusted with roasted garlic chips.', image: 'assets/images/dish-pizza.jpg', badge: 'Cheesy Garlic', spice: 0 },
  { id: 'tb2', name: 'Butter Naan / Plain Naan', category: 'breads', diet: 'veg', price: 79, desc: 'Clay oven baked teardrop Indian bread brushed with molten butter (Plain: ₹69).', image: 'assets/images/dish-pizza.jpg', badge: 'Tandoori', spice: 0 },
  { id: 'tb3', name: 'Garlic Butter Naan', category: 'breads', diet: 'veg', price: 89, desc: 'Topped with minced garlic and coriander, baked until blistering hot and buttered.', image: 'assets/images/dish-pizza.jpg', badge: 'Garlic Butter', spice: 0 },
  { id: 'tb4', name: 'Kashmiri Naan / Paneer Kulcha', category: 'breads', diet: 'veg', price: 119, desc: 'Sweet naan stuffed with nuts and cherries or savory kulcha stuffed with spiced cottage cheese.', image: 'assets/images/dish-pizza.jpg', badge: 'Stuffed Bread', spice: 0 },
  { id: 'tb5', name: 'Masala Kulcha / Aloo Kulcha', category: 'breads', diet: 'veg', price: 99, desc: 'Tandoor baked bread stuffed with spiced potato mash or herb mix.', image: 'assets/images/dish-pizza.jpg', badge: 'Kulcha', spice: 1 },
  { id: 'tb6', name: 'Lachha Paratha / Missi Roti', category: 'breads', diet: 'veg', price: 69, desc: 'Multilayered crisp wheat paratha or gram flour missi roti with onion and ajwain.', image: 'assets/images/dish-pizza.jpg', badge: 'Multi-layer', spice: 0 },
  { id: 'tb7', name: 'Jawari / Bajra / Makka Roti', category: 'breads', diet: 'veg', price: 39, desc: 'Wholesome gluten-free millet flatbreads cooked on tandoor.', image: 'assets/images/dish-pizza.jpg', badge: 'Millet Health', spice: 0 },
  { id: 'tb8', name: 'Rotiyon Ki Tokri (Assorted Basket)', category: 'breads', diet: 'veg', price: 199, desc: 'Assorted basket of Butter Naan, Lachha Paratha, Missi Roti, and Tandoori Roti.', image: 'assets/images/dish-pizza.jpg', badge: 'Bread Basket', spice: 0 },

  // --- DESSERTS & ARTISAN ICE CREAMS ---
  { id: 'ds1', name: 'Amrud Ice Cream (Guava)', category: 'desserts', diet: 'veg', price: 129, desc: 'Exquisite natural pink guava ice cream sprinkled with black salt and red chilli powder.', image: 'assets/images/dish-dessert.jpg', badge: 'Unique Sensation', spice: 0 },
  { id: 'ds2', name: 'Banarsi Meetha Paan Ice Cream', category: 'desserts', diet: 'veg', price: 129, desc: 'Refreshing ice cream infused with real betel leaf, gulkand, fennel, and silver varq.', image: 'assets/images/dish-dessert.jpg', badge: 'Paan Flavor', spice: 0 },
  { id: 'ds3', name: 'Cookie Dust Ice Cream / Kesar Thandai', category: 'desserts', diet: 'veg', price: 129, desc: 'Rich cookie crumble ice cream or saffron-pistachio thandai infused scoop.', image: 'assets/images/dish-dessert.jpg', badge: 'Specialty', spice: 0 },
  { id: 'ds4', name: 'Sizzling Brownie with Vanilla Scoop', category: 'desserts', diet: 'veg', price: 249, desc: 'Hot walnut chocolate brownie on sizzling iron skillet smothered in fudge sauce.', image: 'assets/images/dish-dessert.jpg', badge: 'Bestseller', spice: 0 },
  { id: 'ds5', name: 'Rabdi with Gulab Jamun', category: 'desserts', diet: 'veg', price: 119, desc: 'Warm syrup-soaked khoya gulab jamun served over chilled thickened saffron rabdi.', image: 'assets/images/dish-dessert.jpg', badge: 'Royal Mithai', spice: 0 },
  { id: 'ds6', name: 'Hot Gulab Jamun / with Ice Cream', category: 'desserts', diet: 'veg', price: 99, desc: 'Traditional warm gulab jamuns (2 Pcs) or paired with vanilla ice cream (with Ice Cream: ₹119).', image: 'assets/images/dish-dessert.jpg', badge: 'Classic', spice: 0 },
  { id: 'ds7', name: 'Parsi Kulfi', category: 'desserts', diet: 'veg', price: 199, desc: 'Authentic dense Parsi style condensed milk kulfi with almond and pistachio praline.', image: 'assets/images/dish-dessert.jpg', badge: 'Parsi Recipe', spice: 0 },
  { id: 'ds8', name: 'Moong Dal Halwa', category: 'desserts', diet: 'veg', price: 139, desc: 'Slow roasted yellow lentils simmered in pure desi ghee, milk, saffron, and nuts.', image: 'assets/images/dish-dessert.jpg', badge: 'Desi Ghee Halwa', spice: 0 },
  { id: 'ds9', name: 'Blueberry Cheese Cake', category: 'desserts', diet: 'veg', price: 199, desc: 'Rich New York style cream cheesecake topped with luscious wild blueberry compote.', image: 'assets/images/dish-dessert.jpg', badge: 'Pastry Chef Pick', spice: 0 }
];

let plateCart = {};

function initMenuSystem() {
  const menuGrid = document.getElementById('menuGrid');
  const searchInput = document.getElementById('menuSearchInput');
  const catPills = document.querySelectorAll('.category-pill');
  const dietBtns = document.querySelectorAll('.diet-filter-btn');

  let activeCategory = 'all';
  let activeDiet = 'all';
  let searchQuery = '';

  function renderMenu() {
    if (!menuGrid) return;

    const filtered = menuItems.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchDiet = activeDiet === 'all' || item.diet === activeDiet;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDiet && matchSearch;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--c-text-muted);">
          <i class="fas fa-utensils" style="font-size: 3rem; color: var(--c-gold-400); margin-bottom: 16px; display: block;"></i>
          <h3>No dishes found matching "${searchQuery}"</h3>
          <p>Please try a different category or search term.</p>
        </div>
      `;
      return;
    }

    menuGrid.innerHTML = filtered.map(item => `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
          <span class="menu-card-badge">${item.badge}</span>
          <div class="menu-card-diet">
            <span class="${item.diet === 'veg' ? 'badge-veg' : 'badge-nonveg'}" title="${item.diet === 'veg' ? 'Pure Vegetarian' : 'Non-Vegetarian'}"></span>
          </div>
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h4 class="menu-card-title">${item.name}</h4>
            <span class="menu-card-price">₹${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <div class="menu-spice-level">
              ${getSpiceIcons(item.spice)}
            </div>
            <button class="btn-add-plate" onclick="addToPlate('${item.id}')">
              <i class="fas fa-plus"></i> Add to Plate
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function getSpiceIcons(level) {
    if (level === 0) return '<span style="color:var(--c-text-muted); font-size:0.75rem;">Mild / Sweet</span>';
    let icons = '';
    for (let i = 0; i < level; i++) {
      icons += '<i class="fas fa-pepper-hot"></i> ';
    }
    const label = level === 1 ? 'Mild' : level === 2 ? 'Medium' : 'Spicy';
    return `${icons} <span style="font-size:0.75rem;">${label}</span>`;
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderMenu();
    });
  });

  dietBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dietBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDiet = btn.getAttribute('data-diet');
      renderMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  renderMenu();
  setupCartDrawer();
}

window.addToPlate = function(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;

  if (plateCart[itemId]) {
    plateCart[itemId].qty += 1;
  } else {
    plateCart[itemId] = { ...item, qty: 1 };
  }

  updateCartUI();
  showToast(`Added "${item.name}" to your dining plate!`, 'success');
};

function setupCartDrawer() {
  const drawer = document.getElementById('orderDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const toggleBtn = document.getElementById('cartToggleBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');

  if (toggleBtn && drawer && overlay) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('active');
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }

  const orderWhatsAppBtn = document.getElementById('drawerWhatsAppOrder');
  if (orderWhatsAppBtn) {
    orderWhatsAppBtn.addEventListener('click', () => {
      const itemsList = Object.values(plateCart);
      if (itemsList.length === 0) {
        showToast('Your dining plate is empty. Add some dishes first!', 'warning');
        return;
      }

      let message = `*Hello VIRSA Restro • Cafe, Amravati!*%0A%0AI would like to place an order / inquire about table reservation with these items:%0A`;
      let subtotal = 0;
      itemsList.forEach((it, idx) => {
        const itemTotal = it.price * it.qty;
        subtotal += itemTotal;
        message += `%0A${idx + 1}. *${it.name}* (x${it.qty}) - ₹${itemTotal}`;
      });
      const gst = Math.round(subtotal * 0.05);
      const grandTotal = subtotal + gst;
      message += `%0A%0A*Total Estimated Amount:* ₹${grandTotal} (incl. 5% GST)`;
      message += `%0A%0APlease let me know the table availability / preparation timing. Thank you!`;

      window.open(`https://wa.me/917022307566?text=${message}`, '_blank');
    });
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadge');
  const drawerBody = document.getElementById('drawerBody');
  const drawerSubtotal = document.getElementById('drawerSubtotal');
  const drawerTax = document.getElementById('drawerTax');
  const drawerTotal = document.getElementById('drawerTotal');

  const items = Object.values(plateCart);
  const totalQty = items.reduce((sum, it) => sum + it.qty, 0);

  if (cartBadge) {
    cartBadge.textContent = totalQty;
    cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
  }

  if (!drawerBody) return;

  if (items.length === 0) {
    drawerBody.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-concierge-bell"></i>
        <h4>Your plate is empty</h4>
        <p>Explore our royal menu and click "Add to Plate" to craft your dining feast!</p>
      </div>
    `;
    if (drawerSubtotal) drawerSubtotal.textContent = '₹0';
    if (drawerTax) drawerTax.textContent = '₹0';
    if (drawerTotal) drawerTotal.textContent = '₹0';
    return;
  }

  let subtotal = 0;
  drawerBody.innerHTML = items.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="drawer-item">
        <div class="drawer-item-info">
          <h5>${item.name}</h5>
          <span>₹${item.price} each</span>
        </div>
        <div class="drawer-item-qty">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + tax;

  if (drawerSubtotal) drawerSubtotal.textContent = `₹${subtotal}`;
  if (drawerTax) drawerTax.textContent = `₹${tax}`;
  if (drawerTotal) drawerTotal.textContent = `₹${grandTotal}`;
}

window.changeQty = function(id, delta) {
  if (!plateCart[id]) return;
  plateCart[id].qty += delta;
  if (plateCart[id].qty <= 0) {
    delete plateCart[id];
  }
  updateCartUI();
};

/* ==========================================================================
   4. MODALS & RESERVATIONS (TABLE & CANDLELIGHT ONLY)
   ========================================================================== */
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeButtons = document.querySelectorAll('.modal-close');

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  const tableForm = document.getElementById('tableReservationForm');
  if (tableForm) {
    tableForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('tableGuestName').value;
      const phone = document.getElementById('tableGuestPhone').value;
      const date = document.getElementById('tableDate').value;
      const time = document.getElementById('tableTime').value;
      const seating = document.getElementById('tableSeating').value;
      const ref = 'VIRSA-' + Math.floor(100000 + Math.random() * 900000);

      closeAllModals();
      showSuccessModal({
        title: 'Table Reserved Successfully!',
        ref: ref,
        message: `Namaste <strong>${name}</strong>! We look forward to hosting you on <strong>${date} at ${time}</strong> (${seating}).<br><br>A confirmation message has been recorded for <strong>${phone}</strong>.`
      });
    });
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

window.openTableModal = function(opts = {}) {
  closeAllModals();
  const modal = document.getElementById('tableModal');
  if (!modal) return;
  if (opts.date) {
    const el = document.getElementById('tableDate');
    if (el) el.value = opts.date;
  }
  if (opts.time) {
    const el = document.getElementById('tableTime');
    if (el) el.value = opts.time;
  }
  if (opts.guests) {
    const el = document.getElementById('tableGuests');
    if (el) el.value = opts.guests;
  }
  if (opts.seating) {
    const el = document.getElementById('tableSeating');
    if (el) el.value = opts.seating;
  }
  modal.classList.add('active');
};

window.openCandlelightModal = function(pkgName) {
  closeAllModals();
  openTableModal({ seating: 'Romantic Candlelight Cabana' });
  const requests = document.getElementById('tableSpecialRequests');
  if (requests) {
    requests.value = `Booking Experience: ${pkgName || 'Candlelight Special'}. Please arrange romantic setup with candles and rose petals.`;
  }
};

function showSuccessModal({ title, ref, message }) {
  const modal = document.getElementById('successModal');
  if (!modal) return;
  const titleEl = document.getElementById('successModalTitle');
  const refEl = document.getElementById('successModalRef');
  const messageEl = document.getElementById('successModalMessage');

  if (titleEl) titleEl.textContent = title;
  if (refEl) refEl.textContent = `Reference ID: ${ref}`;
  if (messageEl) messageEl.innerHTML = message;

  modal.classList.add('active');
}

/* ==========================================================================
   5. CONTACT & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const subject = document.getElementById('contactSubject').value;

    showToast(`Thank you ${name}! Your inquiry regarding "${subject}" has been received. Our team will contact you at ${phone}.`, 'success');
    contactForm.reset();
  });
}

/* ==========================================================================
   6. FLOATING ACTIONS & TOASTS
   ========================================================================== */
function initFloatingActions() {
  const topBtn = document.getElementById('scrollTopBtn');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fas fa-info-circle';
  if (type === 'success') icon = 'fas fa-check-circle';
  if (type === 'warning') icon = 'fas fa-exclamation-triangle';

  toast.innerHTML = `
    <i class="${icon}" style="color:var(--c-gold-400); font-size:1.1rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
