const $clients = Array.from(document.querySelectorAll("[data-name='client']"));
const $reviews = Array.from(document.querySelectorAll("[data-name='review']"));
const $pointer = document.getElementById("pointer");
const $container_reviews = document.getElementById("container-reviews");

const $stats = document.getElementById("stats");
const $customer = document.getElementById("customer");
const $years = document.getElementById("years");
const $projects = document.getElementById("projects");

$customer.innerHTML="0+";
$years.innerHTML="0+";
$projects.innerHTML="0+";

let counter;
let count = 0;
let finish = 0;

const options = {
    root: null, // null significa que usa el viewport
    rootMargin: '0px', // Margen alrededor del root
    threshold: 0.15 // Umbral: 50% del elemento debe ser visible
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        // Acción cuando el elemento es visible
            counter = setInterval(increaseNumber,70)
        } else {
        // Acción cuando el elemento no es visible
        }
    });
};

// Crear el observer
const observer = new IntersectionObserver(observerCallback, options);
observer.observe($stats);



const increaseNumber=()=>{
    count++;
    if(Number($customer.getAttribute("data-value")>=count))
        $customer.innerHTML=`${count}+`
    if(Number($years.getAttribute("data-value")>=count))
        $years.innerHTML=`${count}+`
    if(Number($projects.getAttribute("data-value")>=count))
        $projects.innerHTML=`${count}+`
    if(Number($customer.getAttribute("data-value")<count) && Number($projects.getAttribute("data-value")<count) && Number($years.getAttribute("data-value")<count)){
        clearInterval(counter)
    }
}




let new_client;
let old_client;

const resetcostumers = () => {
    $clients.forEach(item => {
        if(item.matches(".active-client")){
            item.classList.remove("active-client");
            if(window.innerWidth >= 992)
                item.addEventListener('transitionend', handleTransitionEnd2);
            else
                new_client.classList.add("active-client");
            old_client = item;
        }
    });
}

const changeReview = (num) => {
    let pos = num * 100 * -1;
    $reviews.forEach(element => element.style.translate = `${pos}% 0%`);
};

const handleTransitionEnd2 = (e) => {
    if(e.propertyName === "max-width"){
        new_client.classList.add("active-client");
        old_client.removeEventListener('transitionend', handleTransitionEnd2);
    }
};

const movePointer=()=>{
    let offsetpointer = $container_reviews.getBoundingClientRect().left;
    if(new_client==undefined){
        new_client = $clients[0]
    }
    let imgRect = new_client.children[0].getBoundingClientRect();
    let pointerRect = $pointer.getBoundingClientRect();
    let pos = imgRect.right - (imgRect.width/2) - (pointerRect.width/2) - offsetpointer
    $pointer.style.left = pos;
}

const handleTransitionEnd = (e) => {
    if(e.propertyName === "max-width"){
        movePointer()
        new_client.removeEventListener('transitionend', handleTransitionEnd);
    }
};

document.addEventListener('click', (e) =>{
    if(e.target.matches("[data-name='client'] img") && !(e.target.matches(".active-client img"))){
        let num_review = Number(e.target.getAttribute("data-number"));
        new_client = e.target.parentElement;
        changeReview(num_review);
        resetcostumers();
        if(window.innerWidth >= 992)
            new_client.addEventListener('transitionend', handleTransitionEnd);
        else
            movePointer()
    }
    if(e.target.id=="menu-button")
        e.target.classList.toggle("show")
});

screen.orientation.addEventListener("change", () => movePointer());
window.addEventListener('resize', () => movePointer());

movePointer()