document.addEventListener('DOMContentLoaded', function() {

    var accordions = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", ()=>{  

                console.log(accordions[i]);

                accordions[i].classList.toggle("active");
                var panel = accordions[i].nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
    }
);