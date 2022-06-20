let cat = document.querySelector('.cat');
let items = document.querySelectorAll('.cat-item');
let clones = [];
let disableScroll = false;
let scrollheight = 0;
let scrollpos = 0;
let clonesHeight = 0;


function getScrollPos(){
    return cat. scrollTop; // Amount window scrolled
}

function setScrollPos(pos) {
    cat.scrollTop = pos;
}

function getClonesHeight(){
    clonesHeight = 0;

    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight; // offsetHeight returns height of element in px
    })

    return clonesHeight;
}


// Recalculates dimensions when screen is resized
function reCalc(){
    scrollpos = getScrollPos();
    scrollheight = cat.scrollHeight; // Height of an elements content, including content not visible in screen
    clonesHeight = getClonesHeight();

    if(scrollpos <= 0){
        setScrollPos(1); // Initial set at 1px to enable upwards scrolling
    }
}

function scrollUpdate(){
    if(!disableScroll){
        scrollpos = getScrollPos();
        if(clonesHeight + scrollpos >= scrollheight){
            // Scroll back to the top when we reach the bottom
            setScrollPos(1);
            disableScroll = true;
        }else if (scrollpos <= 0){
            //Scroll to bottom when we reach the top
            setScrollPos(scrollheight - clonesHeight);
            disableScroll = true;
        }
    }
    if(disableScroll){
        // Disable scroll-jumping for a short period to avoid flickering

        window.setTimeout(()=>{
            disableScroll = false;
        }, 40);
    }
}

function onLoad(){
    items.forEach(item => {
        const clone = item.cloneNode(true);
        cat.appendChild(clone);
        clone.classList.add('js-clone');
    });

    clones = cat.querySelectorAll('.js-clone');

    reCalc();

    cat.addEventListener('scroll', () => {
        window.requestAnimationFrame(scrollUpdate)
    }, false);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame (reCalc);
    }, false)
}

window.onload = onLoad();

const menuItems = [...document.querySelectorAll('.cat-item')];

menuItems.forEach(item => {
    let word = item.children[0].children[0].innerText.split('');
    item.children[0].innerHTML = '';
    word.forEach((letter, idx) => {
        item.children[0].innerHTML += `<span style="--index: ${idx};">${letter}</span>`;
    })
    
    let cloneDiv = item.children[0].cloneNode(true);
    cloneDiv.style.position = 'relative';
    cloneDiv.style.left = '20%';
    cloneDiv.style.top = '10%';
    item.appendChild(cloneDiv);
})

$('.hover-01').on('mouseenter', function(){ 
    $('#hover-change').css('background-image', 'url("/img/botanicals/still/1.jpg")');
    });
$('.hover-01').on('mouseleave', function(){
    $('#hover-change').css('background-color', 'white');
    });

$('.hover-02').on('mouseenter', function(){ 
    $('#hover-change').css('background-image', 'url("/img/candy/1.jpg")');
    });
$('.hover-02').on('mouseleave', function(){
    $('#hover-change').css('background-color', 'white');
    });