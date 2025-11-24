let map;
let modoAdicionar = false;

const iconeLixeira = L.icon({
    iconUrl: "./img/pointlixeira.png",
    iconSize: [50, 50],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

function iniciarMapa() {
    map = L.map("map").setView([-30.0346, -51.2177], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
    }).addTo(map);

    carregarLixeirasSalvas();
}

iniciarMapa();

const iconeUsuario = L.icon({
    iconUrl: "./img/pointuser.png",
    iconSize: [50, 50],
    iconAnchor: [20, 40]
});

let marcadorUsuario;

map.whenReady(() => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                if (!marcadorUsuario) {
                    marcadorUsuario = L.marker([lat, lon], { icon: iconeUsuario })
                        .addTo(map)
                        .bindPopup("Você está aqui!");
                } else {
                    marcadorUsuario.setLatLng([lat, lon]);
                }

                map.setView([lat, lon], 17);
            },
            (err) => {
                console.log("Não foi possível obter localização:", err);
            },
            { enableHighAccuracy: true }
        );
    }
});

function AcharEnd() {
    const endereco = document.getElementById("endereco").value;

    if (!endereco) {
        alert("Digite um endereço!");
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                alert("Endereço não encontrado!");
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            map.setView([lat, lon], 18);

            L.marker([lat, lon]).addTo(map)
                .bindPopup("Você buscou aqui!")
                .openPopup();
        });
}

function ModoAdicionar() {
    modoAdicionar = !modoAdicionar;

    if (modoAdicionar) {
        alert("Clique no mapa para adicionar uma lixeira!");
        document.getElementById("addlixeira").innerText = "Cancelar";
    } else {
        document.getElementById("addlixeira").innerText = "Adicionar Lixeira no Mapa";
    }
}

map.on("click", function (e) {
    if (!modoAdicionar) return;

    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    adicionarLixeira(lat, lon);
    salvarLixeira(lat, lon);

    alert("Lixeira adicionada!");

    modoAdicionar = false;
    document.getElementById("addlixeira").innerText = "Adicionar Lixeira no Mapa";
});

function salvarLixeira(lat, lon) {
    let lixeiras = JSON.parse(localStorage.getItem("lixeiras")) || [];

    lixeiras.push({ lat, lon });

    localStorage.setItem("lixeiras", JSON.stringify(lixeiras));
}

function carregarLixeirasSalvas() {
    let lixeiras = JSON.parse(localStorage.getItem("lixeiras")) || [];

    lixeiras.forEach(l => {
        adicionarLixeira(l.lat, l.lon);
    });
}

function adicionarLixeira(lat, lon) {
    L.marker([lat, lon], { icon: iconeLixeira }).addTo(map)
        .bindPopup("Lixeira adicionada por outras pessoas");
}