
const $navbar = document.getElementById("navbar");
const $navBarButton = document.getElementById("menu-button");
const $menu = document.getElementById("menu");
const $logo = document.getElementById("logo");

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

let posicionY = 0;

let counter;
let count = 0;
let finish = 0;

let new_client;
let old_client;

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counter = setInterval(increaseNumber,70)
        } 
    });
};

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

const endTransitionMenu = (e) =>{
    if(e.target == $menu && e.propertyName == "transform"){
        $navbar.classList.add("bg-[rgb(0,0,0,.8)]","backdrop-blur-2xl")
        $logo.classList.replace("opacity-0","opacity-100")
        $menu.removeEventListener("transitionend", endTransitionMenu)
    }
}

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
    if(e.target == $navBarButton){
        $navBarButton.classList.toggle("active")
        $menu.classList.toggle("translate-y-0")
        if($navBarButton.matches(".active")){
            $navbar.classList.remove("bg-[rgb(0,0,0,.8)]","backdrop-blur-2xl")
            $logo.classList.replace("opacity-100","opacity-0")
        }
        else if(scrollY!=0){
            $menu.addEventListener("transitionend", endTransitionMenu)
        }
    }
});

document.addEventListener('scroll', (e) => {
    if (posicionY > scrollY) { //subiendo
        if(!$navBarButton.matches(".active")){
            if(scrollY==0){
                $navbar.classList.add("absolute")
                $navbar.classList.remove("bg-[rgb(0,0,0,.8)]","backdrop-blur-2xl","transition-all");
                $logo.classList.replace("opacity-100","opacity-0")
            }else{
                $navbar.classList.add("translate-y-0","transition-all");
                $navbar.classList.remove("-translate-y-full");
            }
        }
    }
    else if(posicionY < scrollY){  //bajando
        if(!$navBarButton.matches(".active")){
            if (posicionY > 60) {
                $navbar.classList.add("fixed","-translate-y-full","bg-[rgb(0,0,0,.8)]","backdrop-blur-2xl");
                $navbar.classList.remove("absolute","translate-y-0")
                $logo.classList.replace("opacity-0","opacity-100")
            }
        }
    }
    posicionY = scrollY;
})

screen.orientation.addEventListener("change", () => movePointer());
window.addEventListener('resize', () => movePointer());

movePointer()




