AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-in-out',
  delay: 0
});

/** ====== CONTACT INFO (edit here only) ====== **/
const CONTACT_INFO = {
  instagram: {
    label: "Instagram",
    value: "@chajoybd",
    url: "https://instagram.com/chajoybd"
  },
  facebook: {
    label: "Facebook",
    value: "ChaJoy Bangladesh",
    url: "https://www.facebook.com/p/ChaJoy-Bangladesh-61585587403077/"
  },
  phone: {
    label: "Phone",
    value: "01713-913227",
    url: "tel:+8801713913227"
  },
  email: {
    label: "Email",
    value: "hello@chajoybd.com",
    url: "mailto:hello@chajoybd.com"
  },
  whatsapp: {
    label: "WhatsApp",
    value: "ChaJoy Bangladesh",
    url: "https://wa.me/8801713913227"
  }
};

/** ====== MENU "DB" (edit here only) ====== **/
const MENU_DB = [
  {
    id: "icecream-signatures",
    title: "🍨 Ice Cream & Signatures",
    grid: { min: 280 },
    items: [
      {
        id: "icecream-original-matcha",
        name: "Original / Matcha Ice Cream",
        priceLabel: "BDT 80",
        basePrice: 80,
        options: {
          size: ["Small", "Regular"],
          sweetness: ["50%", "100%"],
          ice: ["Less", "Normal"],
        }
      },
      {
        id: "boba-brown-sugar-mt",
        name: "Brown Sugar Boba Milk Tea",
        priceLabel: "S: 120 | M: 180",
        variants: [
          { label: "S", price: 120 },
          { label: "M", price: 180 }
        ],
        options: {
          sweetness: ["50%", "100%"],
          ice: ["Less", "Normal"],
        }
      },
      {
        id: "lemon-green-tea",
        name: "Lemon Green Tea",
        priceLabel: "BDT 100",
        basePrice: 100,
        options: {
          sweetness: ["50%", "100%"],
          ice: ["Less", "Normal"],
        }
      }
    ]
  },

  {
    id: "sundae-series",
    title: "🍧 Sundae Series",
    grid: { min: 280 },
    items: [
      { id:"strawberry-sundae", name:"Strawberry Sundae", priceLabel:"BDT 200", basePrice:200 },
      { id:"blueberry-sundae", name:"Blueberry Sundae", priceLabel:"BDT 200", basePrice:200 },
      { id:"peach-sundae", name:"Peach Sundae", priceLabel:"BDT 200", basePrice:200 },
      { id:"brown-sugar-boba-sundae", name:"Brown Sugar Boba Sundae", priceLabel:"BDT 250", basePrice:250 },
      { id:"oreo-crumb-sundae", name:"Chocolate Oreo Crumb Sundae", priceLabel:"BDT 250", basePrice:250 },
      { id:"guava-cone-sundae", name:"Guava Crispy Cone Sundae", priceLabel:"BDT 250", basePrice:250 },
    ]
  },

  {
    id: "fruit-tea-series",
    title: "🍹 Fruit Tea Series",
    grid: { min: 280 },
    items: [
      { id:"ice-lemon-water", name:"Fresh Ice Lemon Water", priceLabel:"BDT 80", basePrice:80 },
      { id:"jasmine-green-tea", name:"Jasmine Green Tea", priceLabel:"BDT 100", basePrice:100 },
      { id:"lemon-black-tea", name:"Lemon Black Tea", priceLabel:"BDT 100", basePrice:100 },
      { id:"guava-iced-green-tea", name:"Guava Iced Green Tea", priceLabel:"BDT 210", basePrice:210 },
      { id:"shaken-peach-black-tea", name:"Shaken Peach Black Tea", priceLabel:"BDT 240", basePrice:240 },
      { id:"blueberry-granule-tea", name:"Blueberry Granule Green Tea", priceLabel:"BDT 220", basePrice:220 },
    ]
  },

  {
    id: "milk-tea-series",
    title: "🥛 Milk Tea Series",
    grid: { min: 280 },
    items: [
      { id:"classic-mt", name:"Classic Milk Tea", priceLabel:"S: 110 | M: 150", variants:[{label:"S",price:110},{label:"M",price:150}] },
      { id:"coconut-jelly-mt", name:"Coconut Jelly Milk Tea", priceLabel:"S: 110 | M: 160", variants:[{label:"S",price:110},{label:"M",price:160}] },
      { id:"strawberry-bobo-mt", name:"Strawberry Bobo Milk Tea", priceLabel:"S: 130 | M: 180", variants:[{label:"S",price:130},{label:"M",price:180}] },
    ]
  },

  {
    id: "extra-toppings",
    title: "➕ Extra Toppings",
    grid: { min: 150, compact: true },
    items: [
      { id:"topping-brown-pearl", name:"Brown Pearl", priceLabel:"BDT 30", basePrice:30, type:"topping" },
      { id:"topping-pudding", name:"Pudding", priceLabel:"BDT 30", basePrice:30, type:"topping" },
      { id:"topping-coconut-jelly", name:"Coconut Jelly", priceLabel:"BDT 30", basePrice:30, type:"topping" },
      { id:"topping-crystal-ball", name:"Crystal Ball", priceLabel:"BDT 30", basePrice:30, type:"topping" },
    ]
  }
];

/** ====== RENDERER (creates your same design) ====== **/
function renderMenu(db) {
  const root = document.getElementById("menuRoot");
  if (!root) return;

  root.innerHTML = "";

  db.forEach(cat => {
    // Category title
    const h3 = document.createElement("h3");
    h3.className = "category-title";
    h3.setAttribute("data-aos", "fade-right");
    h3.textContent = cat.title;
    root.appendChild(h3);

    // Product grid
    const grid = document.createElement("div");
    grid.className = "product-grid";

    // If it's the compact toppings grid
    if (cat.grid?.compact) {
      grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${cat.grid.min || 150}px, 1fr))`;
    }

    cat.items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Open order options for ${item.name}`);
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", (index * 50).toString());
      if (cat.grid?.compact) card.style.padding = "20px";

      // Store data on card for click handling
      card.dataset.itemId = item.id;
      card.dataset.itemName = item.name;
      card.dataset.priceLabel = item.priceLabel || "";
      card.dataset.catId = cat.id;

      card.innerHTML = `
        <h3>${escapeHtml(item.name)}</h3>
        <p class="item-price">${escapeHtml(item.priceLabel || "")}</p>
      `;

      card.addEventListener("click", () => {
        openOrderFromDB(item);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openOrderFromDB(item);
        }
      });

      grid.appendChild(card);
    });

    root.appendChild(grid);
  });

  // Re-init AOS after injecting DOM
  if (window.AOS) AOS.refresh();
}

/** ====== MODAL INTEGRATION ====== **/
let currentItem = null;
let orderTriggerEl = null;
let mapTriggerEl = null;

function getDefaultOption(options, preferred = []) {
  if (!options?.length) return "";
  const found = preferred.find((value) => options.includes(value));
  return found || options[0];
}

function getToppingItems() {
  const toppingsCategory = MENU_DB.find((cat) => cat.id === "extra-toppings");
  return toppingsCategory?.items || [];
}

function getActiveOption(key) {
  const group = document.querySelector(`.opt-group[data-option-key="${key}"]`);
  const active = group?.querySelector(".opt-btn.active");
  return active?.dataset.optionValue || active?.textContent || "";
}

function getCurrentPriceLabel(item) {
  if (!item) return "";
  const selectedSize = getActiveOption("size");
  if (item.variants?.length) {
    const selectedVariant = item.variants.find((v) => v.label === selectedSize) || item.variants[0];
    return `BDT ${selectedVariant.price}`;
  }
  return item.priceLabel || "";
}

function createSingleOptionGroup(label, key, options, defaultValue) {
  if (!options?.length) return "";
  const buttons = options.map((opt) => {
    const isActive = opt === defaultValue ? " active" : "";
    return `<button type="button" class="opt-btn${isActive}" data-option-key="${key}" data-option-value="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`;
  }).join("");

  return `
    <div class="opt-group" data-option-key="${key}" data-mode="single">
      <span>${label}</span>
      <div class="opt-flex">${buttons}</div>
    </div>
  `;
}

function renderOrderOptions(item) {
  const root = document.getElementById("orderOptions");
  if (!root) return;

  const sizeOptions = item.variants?.length
    ? item.variants.map((v) => v.label)
    : (item.options?.size || []);
  const sweetnessOptions = item.options?.sweetness || [];
  const iceOptions = item.options?.ice || [];

  const groups = [];

  if (sizeOptions.length) {
    groups.push(createSingleOptionGroup("SIZE", "size", sizeOptions, getDefaultOption(sizeOptions, ["M", "Regular", "Small"])));
  }
  if (sweetnessOptions.length) {
    groups.push(createSingleOptionGroup("SWEETNESS", "sweetness", sweetnessOptions, getDefaultOption(sweetnessOptions, ["100%", "70%"])));
  }
  if (iceOptions.length) {
    groups.push(createSingleOptionGroup("ICE", "ice", iceOptions, getDefaultOption(iceOptions, ["Normal", "Less"])));
  }

  const toppings = getToppingItems();
  if (toppings.length && item.type !== "topping") {
    const chips = toppings.map((t) => {
      return `<button type="button" class="topping-chip" data-topping-name="${escapeHtml(t.name)}" data-topping-price="${t.basePrice || 0}">
        <span>${escapeHtml(t.name)}</span>
        <small>+BDT ${t.basePrice || 0}</small>
      </button>`;
    }).join("");

    groups.push(`
      <div class="opt-group" data-option-key="toppings" data-mode="multi">
        <span>EXTRA TOPPINGS</span>
        <div class="toppings-flex">${chips}</div>
      </div>
    `);
  }

  root.innerHTML = groups.join("");
}

function openOrderFromDB(item) {
  currentItem = item;
  orderTriggerEl = document.activeElement;

  document.getElementById("m-name").innerText = item.name;
  renderOrderOptions(item);
  document.getElementById("m-price").innerText = getCurrentPriceLabel(item);

  document.getElementById("orderModal").style.display = "flex";
  const closeBtn = document.querySelector(".modal-close-btn");
  if (closeBtn) closeBtn.focus();
}

function closeOrder() {
  document.getElementById("orderModal").style.display = "none";
  if (orderTriggerEl && typeof orderTriggerEl.focus === "function") {
    orderTriggerEl.focus();
  }
}

function confirmOrder() {
  if (!currentItem) return;

  const selected = getSelectedOptions();
  const msg = buildOrderMessage(currentItem, selected);

  // Extract WhatsApp number from CONTACT_INFO
  const whatsappUrl = CONTACT_INFO.whatsapp.url;
  const phone = whatsappUrl.replace("https://wa.me/", "");
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");

  closeOrder();
}

/** ====== Helpers ====== **/
function getSelectedOptions() {
  const picked = {};
  const groups = document.querySelectorAll(".opt-group[data-mode=\"single\"]");

  groups.forEach((group) => {
    const key = group.dataset.optionKey;
    const active = group.querySelector(".opt-btn.active");
    if (key && active) picked[key] = active.dataset.optionValue || active.textContent.trim();
  });

  const toppings = Array.from(document.querySelectorAll(".topping-chip.active")).map((chip) => ({
    name: chip.dataset.toppingName || "",
    price: Number(chip.dataset.toppingPrice || 0)
  }));

  picked.toppings = toppings;
  return picked;
}

function buildOrderMessage(item, selected) {
  const basePrice = getCurrentPriceLabel(item);
  const optionLines = [];
  if (selected.size) optionLines.push(`- Size: ${selected.size}`);
  if (selected.sweetness) optionLines.push(`- Sweetness: ${selected.sweetness}`);
  if (selected.ice) optionLines.push(`- Ice: ${selected.ice}`);

  if (selected.toppings?.length) {
    const toppingText = selected.toppings.map((t) => `${t.name} (+BDT ${t.price})`).join(", ");
    optionLines.push(`- Extra Toppings: ${toppingText}`);
  } else {
    optionLines.push("- Extra Toppings: None");
  }

  return `Hello ChaJoy Bangladesh! I want to order:
- Item: ${item.name}
- Item Price: ${basePrice}
${optionLines.join("\n")}

Pickup location: Mirpur, Dhaka.`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

window.onclick = function(e) {
  if (e.target == document.getElementById("orderModal")) closeOrder();
  if (e.target == document.getElementById("mapModal")) closeMapModal();
};

/** ====== MAP MODAL ====== **/
const LAT = 23.79360082800227;
const LNG = 90.38810785352571;
const ZOOM = 17;

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${LAT},${LNG}&z=${ZOOM}&output=embed`;

function renderMapDirectionsButton() {
  const footer = document.getElementById("mapModalFooter");
  if (!footer) return;

  footer.innerHTML = `
    <a href="https://www.google.com/maps?q=${LAT},${LNG}" target="_blank" class="map-directions-btn">GET DIRECTIONS ↗</a>
  `;
}

function openMapModal() {
  mapTriggerEl = document.activeElement;
  const iframe = document.getElementById("mapModalIframe");
  if (!iframe.src || iframe.src === "about:blank") {
    iframe.src = MAP_EMBED_SRC;
  }
  document.getElementById("mapModal").classList.add("active");
  const closeBtn = document.querySelector(".map-modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeMapModal() {
  document.getElementById("mapModal").classList.remove("active");
  if (mapTriggerEl && typeof mapTriggerEl.focus === "function") {
    mapTriggerEl.focus();
  }
}

/** ====== CONTACT INFO RENDERER ====== **/
function renderContactInfo() {
  const container = document.getElementById("contactLinksContainer");
  if (!container) return;

  container.innerHTML = "";

  Object.values(CONTACT_INFO).forEach(contact => {
    const link = document.createElement("a");
    link.href = contact.url;
    link.className = "contact-link";
    if (contact.url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    link.innerHTML = `
      <span class="contact-label">${contact.label}</span>
      <span class="contact-value">${contact.value}</span>
    `;

    container.appendChild(link);
  });
}

function renderNavSocials() {
  const container = document.getElementById("navSocialsContainer");
  if (!container) return;

  const socialIcons = {
    facebook: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>`,
    instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>`
  };

  container.innerHTML = "";

  // Only show Facebook and Instagram in nav
  ["facebook", "instagram"].forEach(platform => {
    const contact = CONTACT_INFO[platform];
    if (!contact) return;

    const link = document.createElement("a");
    link.href = contact.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "nav-social-link";
    link.setAttribute("aria-label", contact.label);
    link.innerHTML = socialIcons[platform];

    container.appendChild(link);
  });
}

function setupOrderModalInteractions() {
  const optionsRoot = document.getElementById("orderOptions");
  if (!optionsRoot) return;

  optionsRoot.addEventListener("click", (e) => {
    const singleBtn = e.target.closest(".opt-btn");
    if (singleBtn) {
      const group = singleBtn.closest(".opt-group");
      if (!group) return;
      group.querySelectorAll(".opt-btn").forEach((btn) => btn.classList.remove("active"));
      singleBtn.classList.add("active");
      if (group.dataset.optionKey === "size" && currentItem) {
        document.getElementById("m-price").innerText = getCurrentPriceLabel(currentItem);
      }
      return;
    }

    const toppingChip = e.target.closest(".topping-chip");
    if (toppingChip) {
      toppingChip.classList.toggle("active");
    }
  });
}

function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeNav();
      return;
    }
    nav.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("nav-open")) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeNav();
  });
}

function setupA11yInteractions() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const orderOpen = document.getElementById("orderModal").style.display === "flex";
      const mapOpen = document.getElementById("mapModal").classList.contains("active");
      if (orderOpen) closeOrder();
      if (mapOpen) closeMapModal();
    }
  });
}

function setupHeroParallax() {
  const hero = document.querySelector(".hero");
  const logo = document.querySelector(".hero-logo");
  if (!hero) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || window.innerWidth <= 768) return;
  let logoParallaxOffset = 0;

  function updateParallax() {
    const rect = hero.getBoundingClientRect();
    const viewportH = window.innerHeight || 1;
    const progress = Math.max(-1, Math.min(1, (viewportH - rect.top) / (viewportH + rect.height)));

    const bgOffset = Math.round((progress - 0.5) * 36);
    hero.style.backgroundPosition = `center calc(50% + ${bgOffset}px)`;

    if (logo) {
      logoParallaxOffset = Math.round((progress - 0.5) * 18);
    }
  }

  if (logo) {
    const floatStartMs = 1300; // starts after initial fade-down
    const startAt = performance.now() + floatStartMs;

    function renderLogoFloat(now) {
      const floatOffset = now >= startAt ? Math.sin((now - startAt) / 850) * 4 : 0;
      const y = Math.round((logoParallaxOffset + floatOffset) * 100) / 100;
      logo.style.transform = `translateY(${y}px)`;
      window.requestAnimationFrame(renderLogoFloat);
    }

    window.requestAnimationFrame(renderLogoFloat);
  }

  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);
}

/** ====== Run ====== **/
renderMenu(MENU_DB);
renderContactInfo();
renderNavSocials();
renderMapDirectionsButton();
setupMobileNav();
setupA11yInteractions();
setupOrderModalInteractions();
setupHeroParallax();
