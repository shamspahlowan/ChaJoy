const WHATSAPP_NUMBER = "8801713913227";
const SERVICE_FEE = 20;

const MENU_DATA = [
  {
    id: "sundae",
    label: "Sundae Series",
    items: [
      { id: "sun-strawberry", name: "Strawberry Sundae", basePrice: 200, type: "fixed" },
      { id: "sun-blueberry", name: "Blueberry Sundae", basePrice: 200, type: "fixed" },
      { id: "sun-peach", name: "Peach Sundae", basePrice: 200, type: "fixed" },
      { id: "sun-brown", name: "Brown Sugar Boba Sundae", basePrice: 250, type: "fixed" },
      { id: "sun-oreo", name: "Chocolate Oreo Crumb Sundae", basePrice: 250, type: "fixed" }
    ]
  },
  {
    id: "ice",
    label: "Ice Cream",
    items: [
      { id: "ic-original", name: "Original Ice Cream", basePrice: 80, type: "fixed" },
      { id: "ic-matcha", name: "Matcha Ice Cream", basePrice: 80, type: "fixed" }
    ]
  },
  {
    id: "fruit",
    label: "Fruit Tea Series",
    items: [
      { id: "ft-lemon-water", name: "Fresh Ice Lemon Water", basePrice: 80, type: "fixed" },
      { id: "ft-jasmine", name: "Jasmine Green Tea", basePrice: 100, type: "fixed" },
      { id: "ft-lemon-black", name: "Lemon Black Tea", basePrice: 100, type: "fixed" },
      { id: "ft-guava", name: "Guava Iced Green Tea", basePrice: 210, type: "fixed" },
      { id: "ft-peach", name: "Shaken Peach Black Tea", basePrice: 240, type: "fixed" },
      { id: "ft-blueberry", name: "Blueberry Granule Green Tea", basePrice: 220, type: "fixed" }
    ]
  },
  {
    id: "milk",
    label: "Milk Tea Series",
    items: [
      {
        id: "mt-classic",
        name: "Classic Milk Tea",
        type: "sized",
        sizes: [
          { label: "S", price: 110 },
          { label: "M", price: 150 },
          { label: "L", price: 180 }
        ]
      },
      {
        id: "mt-coconut",
        name: "Coconut Jelly Milk Tea",
        type: "sized",
        sizes: [
          { label: "S", price: 110 },
          { label: "M", price: 160 },
          { label: "L", price: 190 }
        ]
      },
      {
        id: "mt-strawberry",
        name: "Strawberry Bobo Milk Tea",
        type: "sized",
        sizes: [
          { label: "S", price: 130 },
          { label: "M", price: 180 },
          { label: "L", price: 210 }
        ]
      }
    ]
  },
  {
    id: "shake",
    label: "Milkshake Series",
    items: [
      { id: "ms-strawberry", name: "Strawberry Shake", basePrice: 100, type: "fixed" },
      { id: "ms-peach", name: "Peach Shake", basePrice: 100, type: "fixed" },
      { id: "ms-brown", name: "Brown Sugar Shake", basePrice: 120, type: "fixed" }
    ]
  }
];

const state = {
  cart: [],
  search: ""
};

const refs = {
  sizeSelect: document.getElementById("sizeSelect"),
  sugarSelect: document.getElementById("sugarSelect"),
  iceSelect: document.getElementById("iceSelect"),
  searchInput: document.getElementById("searchInput"),
  menuSections: document.getElementById("menuSections"),
  cartItems: document.getElementById("cartItems"),
  subtotal: document.getElementById("subtotal"),
  service: document.getElementById("service"),
  grandTotal: document.getElementById("grandTotal"),
  customerName: document.getElementById("customerName"),
  customerPhone: document.getElementById("customerPhone"),
  pickupBranch: document.getElementById("pickupBranch"),
  orderNotes: document.getElementById("orderNotes"),
  generateBtn: document.getElementById("generateBtn"),
  clearBtn: document.getElementById("clearBtn"),
  orderText: document.getElementById("orderText"),
  copyBtn: document.getElementById("copyBtn"),
  waBtn: document.getElementById("waBtn")
};

function formatBDT(value) {
  return `BDT ${value}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getItemPrice(item, size) {
  if (item.type === "sized") {
    const option = item.sizes.find((x) => x.label === size) || item.sizes[0];
    return option.price;
  }
  return item.basePrice;
}

function renderMenuBoard() {
  const keyword = state.search.toLowerCase();
  refs.menuSections.innerHTML = "";

  MENU_DATA.forEach((section) => {
    const filtered = section.items.filter((item) => !keyword || item.name.toLowerCase().includes(keyword));
    if (!filtered.length) return;

    const box = document.createElement("section");
    box.className = "section-box";

    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML = `<h3>${escapeHtml(section.label)}</h3><span>${filtered.length} items</span>`;

    const grid = document.createElement("div");
    grid.className = "items-grid";

    filtered.forEach((item) => {
      const selectedSize = refs.sizeSelect.value;
      const currentPrice = getItemPrice(item, selectedSize);
      const priceText = item.type === "sized"
        ? `${formatBDT(currentPrice)} (${selectedSize})`
        : formatBDT(currentPrice);

      const card = document.createElement("article");
      card.className = "item-card";
      card.innerHTML = `
        <p class="item-name">${escapeHtml(item.name)}</p>
        <p class="item-price">${escapeHtml(priceText)}</p>
        <button type="button" class="btn-solid item-add">Add To Tray</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        addLine(item);
      });

      grid.appendChild(card);
    });

    box.appendChild(head);
    box.appendChild(grid);
    refs.menuSections.appendChild(box);
  });

  if (!refs.menuSections.children.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No menu item found for this search.";
    refs.menuSections.appendChild(empty);
  }
}

function addLine(item) {
  const size = item.type === "sized" ? refs.sizeSelect.value : "Regular";
  const sugar = refs.sugarSelect.value;
  const ice = refs.iceSelect.value;
  const unitPrice = getItemPrice(item, size);

  const existing = state.cart.find((line) => line.itemId === item.id && line.size === size && line.sugar === sugar && line.ice === ice);

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      lineId: `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      itemId: item.id,
      name: item.name,
      size,
      sugar,
      ice,
      unitPrice,
      qty: 1
    });
  }

  renderCart();
}

function subtotal() {
  return state.cart.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
}

function renderCart() {
  refs.cartItems.innerHTML = "";

  if (!state.cart.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Tray is empty. Tap an item to add.";
    refs.cartItems.appendChild(empty);
  } else {
    state.cart.forEach((line) => {
      const card = document.createElement("article");
      card.className = "cart-item";
      card.innerHTML = `
        <div class="cart-item-top">
          <div>
            <p class="cart-item-name">${escapeHtml(line.name)}</p>
            <p class="cart-item-meta">${escapeHtml(line.size)} | Sugar ${escapeHtml(line.sugar)} | Ice ${escapeHtml(line.ice)}</p>
          </div>
          <strong>${formatBDT(line.unitPrice * line.qty)}</strong>
        </div>
        <div class="qty-row">
          <button type="button" aria-label="Decrease">-</button>
          <span class="qty">${line.qty}</span>
          <button type="button" aria-label="Increase">+</button>
          <button type="button" class="remove-btn">Remove</button>
        </div>
      `;

      const actions = card.querySelectorAll("button");
      actions[0].addEventListener("click", () => adjustQty(line.lineId, -1));
      actions[1].addEventListener("click", () => adjustQty(line.lineId, 1));
      actions[2].addEventListener("click", () => removeLine(line.lineId));

      refs.cartItems.appendChild(card);
    });
  }

  const sub = subtotal();
  const service = state.cart.length ? SERVICE_FEE : 0;
  refs.subtotal.textContent = formatBDT(sub);
  refs.service.textContent = formatBDT(service);
  refs.grandTotal.textContent = formatBDT(sub + service);
}

function adjustQty(lineId, change) {
  const line = state.cart.find((x) => x.lineId === lineId);
  if (!line) return;

  line.qty += change;
  if (line.qty <= 0) {
    state.cart = state.cart.filter((x) => x.lineId !== lineId);
  }
  renderCart();
}

function removeLine(lineId) {
  state.cart = state.cart.filter((x) => x.lineId !== lineId);
  renderCart();
}

function generateOrder() {
  if (!state.cart.length) {
    alert("Add at least one item first.");
    return;
  }

  const customer = refs.customerName.value.trim();
  const phone = refs.customerPhone.value.trim();

  if (!customer || !phone) {
    alert("Please fill customer name and phone.");
    return;
  }

  const orderId = `CJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateText = new Date().toLocaleString();
  const sub = subtotal();
  const service = state.cart.length ? SERVICE_FEE : 0;
  const total = sub + service;

  const lines = [];
  lines.push("ChaJoy Order");
  lines.push(`Order ID: ${orderId}`);
  lines.push(`Date: ${dateText}`);
  lines.push("");
  lines.push(`Customer: ${customer}`);
  lines.push(`Phone: ${phone}`);
  lines.push(`Branch: ${refs.pickupBranch.value}`);
  if (refs.orderNotes.value.trim()) {
    lines.push(`Notes: ${refs.orderNotes.value.trim()}`);
  }
  lines.push("");
  lines.push("Items:");

  state.cart.forEach((line, index) => {
    lines.push(`${index + 1}. ${line.name} x${line.qty} (${line.size}, Sugar ${line.sugar}, Ice ${line.ice}) - ${formatBDT(line.unitPrice * line.qty)}`);
  });

  lines.push("");
  lines.push(`Subtotal: ${formatBDT(sub)}`);
  lines.push(`Service: ${formatBDT(service)}`);
  lines.push(`Grand Total: ${formatBDT(total)}`);

  const message = lines.join("\n");
  refs.orderText.value = message;
  refs.waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

async function copyOrder() {
  const text = refs.orderText.value.trim();
  if (!text) {
    alert("Generate order text first.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    refs.copyBtn.textContent = "Copied";
    setTimeout(() => {
      refs.copyBtn.textContent = "Copy";
    }, 1200);
  } catch (error) {
    alert("Copy failed. Please copy manually.");
  }
}

function clearTray() {
  state.cart = [];
  refs.orderText.value = "";
  refs.waBtn.href = "#";
  renderCart();
}

refs.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  renderMenuBoard();
});

refs.sizeSelect.addEventListener("change", renderMenuBoard);
refs.generateBtn.addEventListener("click", generateOrder);
refs.copyBtn.addEventListener("click", copyOrder);
refs.clearBtn.addEventListener("click", clearTray);

renderMenuBoard();
renderCart();
