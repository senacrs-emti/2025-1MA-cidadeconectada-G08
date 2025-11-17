let h2 = document.querySelector('h2');
var map;
console.log(map)

function success(pos){
    console.log(pos.coords.latitude, pos.coords.longitude);

    var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 18);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Você está aqui!!')
        .openPopup();
}

function error(err){
    console.log(err)
}
 
var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});

async function procurarEndereco() {
    const endereco = document.getElementById("endereco").value;

    if (!endereco) {
        alert("Digite um endereço!");
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;

    const resposta = await fetch(url, {
        headers: {
            'User-Agent': 'SeuApp/1.0'  // recomendado pelo Nominatim
        }
    });

    const dados = await resposta.json();

    if (dados.length === 0) {
        alert("Endereço não encontrado!");
        return;
    }

    const lat = dados[0].lat;
    const lon = dados[0].lon;

    map.setView([lat, lon], 17);

    L.marker([lat, lon])
     .addTo(map)
     .bindPopup("Endereço encontrado!")
     .openPopup();
}