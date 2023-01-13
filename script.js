let open_item     = document.querySelectorAll(".button");
let container  = document.querySelector(".container");
let background = document.querySelector(".background");

// open_item.addEventListener("click", ()=>{
//     container.classList.toggle("show-image");
// });

function toggleClass(element, cls){
    return element.classList.toggle(cls);
}

for (var i = 0; i < open_item .length; i++){
    open_item[i].addEventListener("click", (e)=>{
        let buttonParent = e.target.parentElement;

        toggleClass(buttonParent, "show-image");
    });
}