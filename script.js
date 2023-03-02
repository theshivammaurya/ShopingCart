const form = document.querySelector('form');
const imageContainer = document.querySelector('#imageContainer');
const cartContainer = document.querySelector('#cartContainer');
let itemId = 0;
let cart = [];

form.addEventListener('submit', function(event) {
	event.preventDefault();

	const image = document.querySelector('#image').files[0];
	const title = document.querySelector('#title').value;
	const description = document.querySelector('#description').value;
    const price = document.querySelector('#price').value;

	if (!image || !title || !description || !price) {
		const error = document.createElement('div');
		error.setAttribute('id', 'error');
		error.textContent = 'Please fill out all fields.';
		form.insertBefore(error, form.firstChild);
		return;
	}

	const reader = new FileReader();
	reader.onload = function(event) {

		const newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'items'+ itemId ); // add ID attribute

		const img = document.createElement('img');

		img.setAttribute('src', event.target.result);
		img.setAttribute('alt', title);
		newDiv.appendChild(img);

		const imgTitle = document.createElement('h2');
		imgTitle.textContent = title;
		newDiv.appendChild(imgTitle);

		const imgDesc = document.createElement('p');
		imgDesc.textContent = description;
		newDiv.appendChild(imgDesc);

		const imgPrice = document.createElement('h4');
		imgPrice.textContent = price;
		newDiv.appendChild(imgPrice);

		const addButton = document.createElement('button');
		addButton.textContent = 'Add to Cart';
		addButton.addEventListener('click', function() {
			const item = {
				id: itemId,
				title,
				description,
				price,
				image: event.target.result
			};
			// check if item with same id is already in the cart
			if (!cart.some(function(cartItem) { return cartItem.image=== item.image })) {
				cart.push(item);
				renderCart();
			} else {
				alert('This item is already in your cart.');
			}
		});
		newDiv.appendChild(addButton);

		// newDiv.style.border = '3px solid black';
		// newDiv.style.borderRadius = '7px';
		imageContainer.appendChild(newDiv);

		itemId++;
		form.reset();
	}
	reader.readAsDataURL(image);
});

function renderCart() {
    cartContainer.innerHTML = '';
    cart.forEach(function(item) {
        const newDiv = document.createElement('div');
		newDiv.setAttribute('id', `items${itemId}`);

        const img = document.createElement('img');
        img.setAttribute('src', item.image);
        img.setAttribute('alt', item.title);
        newDiv.appendChild(img);

        const imgTitle = document.createElement('h2');
        imgTitle.textContent = item.title;
        newDiv.appendChild(imgTitle);

        const imgDesc = document.createElement('p');
        imgDesc.textContent = item.description;
        newDiv.appendChild(imgDesc);

        const imgPrice = document.createElement('h4');
        imgPrice.textContent = item.price;
        newDiv.appendChild(imgPrice);

        const payButton = document.createElement('button');
        payButton.textContent = 'Pay';
        payButton.addEventListener('click', function() {
            const index = cart.findIndex(function(cartItem) { return cartItem.image === item.image});
            cart.splice(index, 1);
            renderCart();
          
           // get the item div from the index page by its id and remove it
           const itemDiv = document.querySelector(`#items${item.id}`);
           itemDiv.remove();
        });

        
        newDiv.appendChild(payButton);

        newDiv.style.border = '3px solid black';
        newDiv.style.borderRadius = '7px';
        cartContainer.appendChild(newDiv);
    });
}

