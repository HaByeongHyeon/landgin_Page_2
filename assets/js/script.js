// alert("연결 됐나?")

$(function () {
    function scrollAnimation() {
        let winTop = $(window).scrollTop();
        let winHeight = $(window).height();
        $(".sec-1, .sec-2").each(function () {
            let sectionTop = $(this).offset().top;
            if (winTop + winHeight * 0.8 > sectionTop) {
                $(this).addClass("show");
            }
        });
    }
    scrollAnimation();
    $(window).on("scroll", function () {
        scrollAnimation();
    });
});


// section 04 ================================================

const viewport = document.querySelector(".case-viewport");
const track = document.querySelector(".case-wrap");
const cards = [...document.querySelectorAll(".sec-4-case")];
const prevBtn = document.querySelector(".case-btn.prev");
const nextBtn = document.querySelector(".case-btn.next");
const currentPage = document.querySelector(".page-current");
const totalPage = document.querySelector(".page-total");

let current = 0;

totalPage.textContent = cards.length;

function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const moveX = current * (cardWidth + gap);
    const center = (viewport.offsetWidth - cardWidth) / 2;
    track.style.transform = `translateX(${center - moveX}px)`;

    cards.forEach((card, index) => {
        card.classList.toggle("active", index === current);
    });

    currentPage.textContent = current + 1;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cards.length - 1;

    const control = document.querySelector(".case-control");
    control.style.width = `${cardWidth + 200}px`;
}

nextBtn.addEventListener("click", () => {
    if (current < cards.length - 1) {
        current++;
        updateSlider();
    }
});

prevBtn.addEventListener("click", () => {
    if (current > 0) {
        current--;
        updateSlider();
    }
});

window.addEventListener("resize", updateSlider);

updateSlider();


// section 06 ================================================

const slider = document.querySelector(".step-slider");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
});

window.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});



// section 07 ================================================

$(function () {
    const $viewport = $(".gallery-viewport");
    const $track = $(".gallery-track");
    const $items = $(".gallery-item");

    const $prev = $(".gallery-prev");
    const $next = $(".gallery-next");

    const $current = $(".gallery-current");
    const $total = $(".gallery-total");

    const gap = 40;
    let current = 0;

    $total.text(String($items.length).padStart(2, "0"));

    function updateGallery() {
        $items.removeClass("active");
        $items.eq(current).addClass("active");
        $current.text(String(current + 1).padStart(2, "0"));
        const viewportWidth = $viewport.innerWidth();
        const itemWidth = $items.eq(0).outerWidth();
        // 현재 아이템의 가운데 위치
        const itemCenter =
            (itemWidth + gap) * current + itemWidth / 2;

        // viewport 가운데와 맞춤
        const move =
            itemCenter - viewportWidth / 2;

        $track.css(
            "transform",
            `translateX(${-move}px)`
        );
    }

    $next.on("click", function () {
        current++;
        if (current >= $items.length) {
            current = 0;
        }
        updateGallery();
    });

    $prev.on("click", function () {
        current--;
        if (current < 0) {
            current = $items.length - 1;
        }
        updateGallery();
    });

    $(window).on("resize", function () {
        updateGallery();
    });
    updateGallery();
});


// section 08 ================================================

$(".btn-answer").click(function () {

    const $button = $(this);
    const $answer = $button.closest(".ques").next(".answer");

    // 이미 열려있는 경우
    if ($button.hasClass("active")) {

        $button.removeClass("active");
        $answer.stop(true, true).slideUp(300);
        return;
    }

    // 다른 FAQ 모두 닫기
    $(".btn-answer").removeClass("active");
    $(".answer").stop(true, true).slideUp(300);

    // 현재 FAQ 열기
    $button.addClass("active");
    $answer.stop(true, true).slideDown(300);

});