    const textoEscondido = document.getElementById("texto-escondido");
    const div = document.getElementById("Quadrado-branco1");
  const btnLeiaMais = document.getElementById("leia-mais");
    

    //quando clica no botão leia mais
    btnLeiaMais.addEventListener("click",
        //cria uma função
        function(){;
            //se o display do texto escondido no css for "none"
            //quando clicar no botão irá se tornar "block", e denominará a div height como auto
           if(textoEscondido.style.display === "none"){;
            (textoEscondido.style.display = "block");
            (div.style.width = "400px");
            (btnLeiaMais.innerHTML ="leia menos" );
           }
           //senão, quando clicar no botão novamente, irá retomar tudo ao normal
           else{textoEscondido.style.display = "none";
           div.style.height = "440px"; 
           btnLeiaMais.innerHTML = "Leia mais";
           };
    })

    //nao sei por que nao está funcionando
