let map;
let marcador;

function success(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    if (!map) {
        map = L.map('map').setView([lat, lon], 16);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }

    if (marcador) {
        map.removeLayer(marcador);
    }

    marcador = L.marker([lat, lon])
        .addTo(map)
        .bindPopup("Você está aqui!!")
        .openPopup();
        L.marker([-30.034, -51.230]).addTo(map);
        L.marker([-30.040, -51.220]).addTo(map);
        L.marker([-30.050, -51.210]).addTo(map);
        
}

function error(err) {
    console.log("Erro ao pegar localização:", err);
}

navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000
});

async function AcharEnd() {
    const endereco = document.getElementById("endereco").value;

    if (!endereco) {
        alert("Digite um endereço!");
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;

    try {
        const resposta = await fetch(url, {
            headers: {
                "User-Agent": "BioPonto/1.0" 
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

        if (marcador) {
            map.removeLayer(marcador);
        }

        marcador = L.marker([lat, lon])
            .addTo(map)
            .bindPopup("Endereço encontrado!")
            .openPopup();

    } catch (e) {
        console.log("Erro ao buscar endereço:", e);
        alert("Erro ao buscar endereço.");
    }
}
