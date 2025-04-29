document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    document.getElementById('imageInput').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('preview');

        if (file && file.type.startsWith('image/')) { 
            const reader = new FileReader();

            reader.onloadend = function () {
                const base64String = reader.result;
                sessionStorage.setItem('myImage', base64String);
                preview.src = base64String;
                preview.style.display = 'block';
            };

            reader.readAsDataURL(file);
        } else {
            preview.src = '';
            preview.style.display = 'none';
            if (file) {
                alert('Please upload a valid image file.');
            }
        }
    });
});

document.getElementById('openModalBtn').addEventListener('click', function () {
document.getElementById('market-modal').style.display = 'block';
});


document.querySelector('.close-btn').addEventListener('click', function () {
document.getElementById('market-modal').style.display = 'none';
});


document.getElementById('imageInput').addEventListener('change', function (e) {
const file = e.target.files[0];
const preview = document.getElementById('preview');

if (file && file.type.startsWith('image/')) {
const reader = new FileReader();

reader.onloadend = function () {
preview.src = reader.result;
preview.style.display = 'block';
};

reader.readAsDataURL(file);
} else {
preview.src = '';
preview.style.display = 'none';
if (file) {
alert('Please upload a valid image file.');
}
}
});


document.getElementById('add-market-form').addEventListener('submit', function (e) {
e.preventDefault();


const title = document.getElementById('market-title').value;
const description = document.getElementById('market-description').value;
const saleType = document.getElementById('market-sale-type').value;
const price = document.getElementById('market-price').value;
const imageSrc = document.getElementById('preview').src;


const marketplaceItems = document.getElementById('marketplace-items');
const item = document.createElement('div');
item.classList.add('marketplace-item');
item.innerHTML = `
<img src="${imageSrc}" alt="${title}" />
<h3>${title}</h3>
<p>${description}</p>
<p><strong>Type of Sale:</strong> ${saleType}</p>
<p class="price">$${price}</p>
<p><strong>Condition:</strong> ${document.getElementById('market-sale-condition').value}</p>
<button>Contact Seller</button>
`;


marketplaceItems.appendChild(item);


document.getElementById('add-market-form').reset();
document.getElementById('preview').src = '';
document.getElementById('preview').style.display = 'none';
document.getElementById('market-modal').style.display = 'none';
});