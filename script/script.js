document.querySelectorAll('.card-produk').forEach(card => {
    const input = card.querySelector('.quantity input');
    const minus = card.querySelector('.minus');
    const plus = card.querySelector('.plus');
    const harga = card.querySelector('.price');
    const nominalHargaAwal = parseInt(harga.textContent.match(/\d+/)[0]);

    plus.addEventListener('click', () => {
        let value = parseInt(input.value);
        input.value = value + 1;
        harga.innerHTML = `$${nominalHargaAwal * input.value}`;
    });

    minus.addEventListener('click', () => {
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
        harga.innerHTML = `$${nominalHargaAwal * input.value}`;
    });

    input.addEventListener('input', () => {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
            input.value = 1;
        }
        harga.innerHTML = `$${nominalHargaAwal * input.value}`;
    });

    
    const inputKodePromo = document.querySelector('#kodepromo');
    inputKodePromo.value = inputKodePromo.value.toUpperCase().replace(/\s+/g, '');
});

const orderForm = document.querySelector('.order-section form');
const output = document.querySelector('#output');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    output.style.display = 'block';

    const outputList = document.querySelector("#output ol");
    outputList.innerHTML = '';

    let total = 0;
    document.querySelectorAll('.card-produk').forEach(card => {
        const judul = card.querySelector('h2').textContent;
        const qty = parseInt(card.querySelector('.quantity input').value);
        const harga = parseInt(card.querySelector('.price').textContent.match(/\d+/)[0]);
        const li = document.createElement('li');

        li.innerHTML = `<p><span id="judulProduk">${judul}</span> - <span id="subtotalHarga">$${harga}</span></p>`;
        outputList.appendChild(li);

        total += harga;
    });

    const totalHargaAwal = document.querySelector('#totalHargaAwal');
    const totalHargaAkhir = document.querySelector('#totalHargaAkhir');

    totalHargaAwal.style.color = 'black';
    totalHargaAkhir.style.color = 'none';
    totalHargaAkhir.style.display = 'none';
    totalHargaAwal.innerHTML = `$${total}`;

    const kodepromo = document.querySelector('#kodepromo').value.toUpperCase();

    if (kodepromo) {
        let diskon = 0;

        if (kodepromo === 'DISKON50') {
            diskon = 0.5;
        } else if (kodepromo === 'DISKON20') {
            diskon = 0.0;
        }

        if (diskon > 0) {
            totalHargaAkhir.style.display = 'block';
            totalHargaAkhir.style.color = 'red';
            totalHargaAwal.style.color = 'gray';
            totalHargaAwal.style.textDecoration = 'line-through';
            totalHargaAkhir.innerHTML = `$${(total * (1 - diskon)).toFixed(2)}`;
        } else {
            totalHargaAkhir.style.display = 'none';
            totalHargaAwal.style.color = 'black';
            totalHargaAwal.style.textDecoration = 'none';
        }
    }
});


$('#reset').click(() => {
    $('#output').css('display', 'none');
    $('.card-produk input').each((_, quantity) => {
        $(quantity).val(1);
    });
});