// Funkcija za prebacivanje selekcije
function toggleSelectProduct(element) {
    element.classList.toggle('selected'); // Prebacivanje selekcije
    updateSelectedItems(); // Ažuriranje liste imena izabranih proizvoda
}

// Funkcija za ažuriranje broja selektovanih proizvoda


// Funkcija za ažuriranje liste imena izabranih proizvoda i ukupnog iznosa
function updateSelectedItems() {
    const selectedProducts = document.querySelectorAll('.product.selected'); // Svi izabrani proizvodi
    
    // Uzimanje imena proizvoda
    const productNames = Array.from(selectedProducts).map(product => {
        const h2Element = product.querySelector('h2'); // Pristupamo <h2>
        return h2Element.getAttribute('name'); // Uzimamo ime iz atributa 'name'
    });

    // Izračunavanje ukupne cene
    const productPrices = Array.from(selectedProducts).map(product => {
        const cenaElement = product.querySelector('.cena'); // Pristupamo ceni
        const priceName = cenaElement.getAttribute('name'); // Dobijamo vrednost iz 'name'
        return parseFloat(priceName); // Pretvaramo u broj
    });

    const total = productPrices.reduce((sum, price) => sum + price, 0); // Izračunavanje ukupnog iznosa

    const namesElement = document.getElementById('selected-items'); // Element za prikaz
    namesElement.textContent = `${total} RSD`; // Ažuriranje ukupnog iznosa

    // Ažuriranje liste izabranih proizvoda
    const listElement = document.querySelector('.w-list-unstyled'); // Lista za imena proizvoda
    listElement.innerHTML = ""; // Očistimo listu
    
    productNames.forEach(productName => {
        const listItem = document.createElement("li"); // Kreiranje nove stavke
        listItem.textContent = productName; // Dodamo ime proizvoda
        listElement.appendChild(listItem); // Dodajemo u listu
    });
}

// Funkcija koja dobija nazive selektovanih proizvoda i zbir cena
function getSelectedProductsInfo() {
    const selectedProducts = document.querySelectorAll('.product.selected'); // Svi izabrani proizvodi
    
    const productNames = Array.from(selectedProducts).map(product => {
        const h2Element = product.querySelector('h2'); // Pristupamo <h2>
        return h2Element.getAttribute('name'); // Uzimamo ime
    });

    const totalPrice = Array.from(selectedProducts).reduce((sum, product) => {
        const cenaElement = product.querySelector('.cena'); // Pristupamo ceni
        const price = parseFloat(cenaElement.getAttribute('name')); // Izračunavanje
        return sum + price; // Kumulativni zbir
    }, 0);

    return { productNames, totalPrice }; // Vrati nazive proizvoda i ukupni iznos
}

// Dodavanje događaja na dugme za porudžbinu
document.querySelector('.button').addEventListener('click', function() {
    const selectedProducts = document.querySelectorAll('.product.selected'); // Svi selektovani proizvodi
    
    if (selectedProducts.length === 0) {
        alert("Molimo vas da izaberete barem jedan proizvod pre nego što nastavite."); // Upozorenje ako nema selektovanih proizvoda
        return;
    }

    const { productNames, totalPrice } = getSelectedProductsInfo(); // Informacije o izabranim proizvodima
    const query = `products=${productNames.join(',')}&totalPrice=${totalPrice}`; // Query parametar
    window.location.href = `FinishOrder.html?${query}`; // Preusmeravanje
});
