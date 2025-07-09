
document.querySelectorAll('.card-produk').forEach(card => {
    const input = card.querySelector('.quantity input');
    const minus = card.querySelector('.minus');
    const plus = card.querySelector('.plus');

    plus.addEventListener('click', () => {
        const harga = card.querySelector('.price');
        const nominalHarga = harga.textContent.match(/\d+/)[0];

        let value = parseInt(input.value);
        input.value = value + 1;

        harga.innerHTML = `$${(nominalHarga / value) * input.value}`
    });

    minus.addEventListener('click', () => {
        const harga = card.querySelector('.price');
        const nominalHarga = harga.textContent.match(/\d+/)[0];

        let value = parseInt(input.value);
        if (value > 1) {input.value = value - 1};

        harga.innerHTML = `$${(nominalHarga / value) * input.value}`
    });

    const harga = card.querySelector('.price');
    const nominalHargaAwal = harga.textContent.match(/\d+/)[0];

    input.addEventListener('input', () => {

        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
            input.value = 1;
        };

        harga.innerHTML = `$${(nominalHargaAwal) * input.value}`
    });
});



const inputKodePromo = document.querySelector('#kodePromo');

inputKodePromo.addEventListener('input', () => {

    inputKodePromo.value = inputKodePromo.value.toUpperCase().replace(/\s+/g, '');
});



const orderForm = document.querySelector('.order-section form');
const output = document.querySelector("#output");


orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    output.style.display = 'block';

    const outputList = document.querySelector("#output ol");
    outputList.innerHTML = '';

   
    let total = 0;
    document.querySelectorAll('.card-produk').forEach(card => {
        const judul = card.querySelector('h3').textContent;
        const qty = card.querySelector('.quantity input').value;
        const harga = card.querySelector('.price').textContent.match(/\d+/)[0];
        

        const li = document.createElement('li')
        li.innerHTML = `<p><span id="judulProduk">${judul}</span><span id="subtotalHarga">$${harga}</span><p>`
        outputList.appendChild(li);

    
        total += parseInt(harga);
    });

    
    const totalHargaAwal = document.querySelector('#totalHargaAwal');
    const totalHargaAkhir = document.querySelector('#totalHargaAkhir');

    totalHargaAwal.style.color = 'black';
    totalHargaAwal.style.textDecoration = 'none';
    totalHargaAkhir.style.display = 'none';

    totalHargaAwal.innerHTML = `$${total}`;

    const kodePromo = document.querySelector('#kodePromo').value;
    
    if(kodePromo) {
        totalHargaAkhir.style.display = 'block';
        totalHargaAwal.style.color = 'gray';
        totalHargaAwal.style.textDecoration = 'line-through';

        let diskon = 0;
        if(kodePromo === 'DISKON50'){diskon = 0.5}
        else if(kodePromo === 'DISKON20'){diskon = 0.0}
        else {
            totalHargaAwal.style.color = 'black';
            totalHargaAwal.style.textDecoration = 'none';
            totalHargaAkhir.style.display = 'none';
        };

        totalHargaAkhir.innerHTML = `$${total*(1-diskon)}`;
    };
});

$('#reset').click(() => {
    $('#output').css('display', 'none');

    $('.card-produk input').each((_, quantity) => {
        $(quantity).val(1);
    });
});