const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const additionalScroll = 50; // Ajusta esta cantidad según tus necesidades
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth + additionalScroll;
    });
});


const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const PriceElement = document.querySelector('#Price1').textContent.trim();
const PriceElement2 = document.querySelector('#Price2').textContent.trim();
const PriceElement3 = document.querySelector('#Price3').textContent.trim();
const PriceElement4 = document.querySelector('#Price4').textContent.trim();
const PriceElement5 = document.querySelector('#Price5').textContent.trim();
const PriceElement6 = document.querySelector('#Price6').textContent.trim();
console.log(PriceElement);

/* cart shopping */
const product = [
    {
        id: 1,
        Image: 'img/shoes1.jpg',
        Name: 'Nike Air Max 270',
        Price: PriceElement,
    },
    {
        id: 2,
        Image: 'img/shoes2.jpg',
        Name: 'Nike Air Max 270',
        Price: PriceElement2,
    },
    {
        id: 3,
        Image: 'img/shoes3.jpg',
        Name: 'Nike Air Max 270',
        Price: PriceElement3,
    },
    {
        id: 4,
        Image: 'img/shoes4.jpg',
        Name: 'Nike Air Max 270',
        Price: PriceElement4,
    },
    {
        id: 5,
        Image: 'img/shoes5.jpg',
        Name: 'Nike Air Max 270',
        Price: PriceElement5,
    },
    {
        id: 6,
        Image: 'img/shoes6.jpg',
        Name: 'Nike Air Max 270',
        Price: PriceElement6,
    },

];
const cartItemElements = document.querySelector('.cartItem');
const totalElement = document.querySelector("#total");
let cartTotal = 0;

const cart = [];

function addtocart(productId) {
    // Encuentra el producto seleccionado en la lista de productos
    const productToAdd = product.find((p) => p.id === productId);
  
    if (productToAdd) {
      // Verifica si el producto ya está en el carrito
      const existingCartItem = cart.find((item) => item.id === productToAdd.id);
  
      if (existingCartItem) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        existingCartItem.quantity += 1;
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        productToAdd.quantity = 1;
        cart.push(productToAdd);
      }
  
      cartTotal += parseFloat(productToAdd.Price.replace("$", "")); // Actualiza el total
  
      // Actualiza el contenido del carrito y el total
      updateCart();
      alert("Producto agregado al carrito");
    }
  }
  
  console.log(cart);
  function updateCart() {
    // Limpia el contenido del carrito
    cartItemElements.innerHTML = "";
  
    // Recorre el carrito y muestra cada producto con su cantidad
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      const priceWithoutDollar = parseFloat(item.Price.replace("$", ""));
      const totalPriceForItem = priceWithoutDollar * item.quantity;
      itemElement.textContent = `${item.Name} x ${item.quantity} - $${totalPriceForItem.toFixed(2)}`;
      cartItemElements.appendChild(itemElement);
    });
  
    // Actualiza el total
    totalElement.textContent = `$${cartTotal.toFixed(2)}`;
  }
  
  
