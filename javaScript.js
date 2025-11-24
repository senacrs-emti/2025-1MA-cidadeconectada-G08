   //crio uma variável para cada elemento
   const textoEscondido = document.getElementById("texto-escondido");
    const div = document.getElementById("Quadrado-branco1");
    const btnLeiaMais = document.getElementById("leia-mais");
    

    //quando clica no botão leia mais
    btnLeiaMais.addEventListener("click",
        //cria uma função
        function(){;
            //se o display do texto escondido no css for "none"
            //quando clicar no botão irá se tornar "block", e denominará a div height como 600px
           if(textoEscondido.style.display === "none"){;
            (textoEscondido.style.display = "block");
            (div.style.height = "600px");
            (btnLeiaMais.innerHTML ="leia menos" );
           }
           //senão, quando clicar no botão novamente, irá retomar tudo ao normal
           else{textoEscondido.style.display = "none";
           div.style.height = "440px"; 
           btnLeiaMais.innerHTML = "Leia mais";
           };
    })


    const textoEscondido2 = document.getElementById("texto-escondido2")
    const div2 = document.getElementById("Quadrado-branco2")
    const btnLeiaMais2 = document.getElementById("leia-mais2")

    btnLeiaMais2.addEventListener("click", function(){
        if (textoEscondido2.style.display === "none")
        (textoEscondido2.style.display = "block")
        (div2.style.height = "600px")
        (btnLeiaMais2.innerHTML = "Leia menos");

        else(textoEscondido2.style.display = "none");
        (div2.style.height = "440px" )
        (btnLeiaMais2.innerHTML = "Leia mais")
    }
)
