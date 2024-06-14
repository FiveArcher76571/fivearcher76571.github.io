var button = document.getElementById("totop");

window.onscroll = function() {whenscroll()};

function whenscroll() {

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.classList.add("show");
    }
    else {
        button.classList.remove("show");
    }

}

document.querySelector("#totop").addEventListener("click", function() {window.scroll(0, 0);});