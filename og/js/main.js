// function debounce(func, delay) {
//     let timeoutId;
//     return function() {
//         const context = this;
//         const args = arguments;
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(function() {
//             func.apply(context, args);
//         }, delay);
//     };
// }
//
// // Применение
// const input = document.getElementById('search');
// input.addEventListener('input', debounce(function() {
//     console.log('Input event');
// }, 300));

// let clickCount = 0;

alert('Without document ready');

$(document).ready(function () {
    alert('Document ready');

    let sliderPerRow = 5;
    let slider = $('.main-slider__inner');

    $('.main-slider__pagination-item').on('click', function() {
        let index = $(this).index();

        let marginLeft = -index * 100;
        slider.css('margin-left', `${marginLeft}%`);
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.movies_slider').each(function(index, element) {
        let marginLeft = 0;
        let sliderContent = $(element).find('.slider-content');

        let sliderItems = sliderContent.children();
        let sliderItemsCount = sliderItems.length;
        let sliderMaxMovesCount = sliderItemsCount / sliderPerRow - 1;

        $(element).find('.prev_btn').on('click', function() {
            if (marginLeft === 0) return;

            marginLeft += 100;
            sliderContent.css('margin-left', `${marginLeft}%`);
        });

        $(element).find('.next_btn').on('click', function() {
            if (marginLeft === -(sliderMaxMovesCount * 100)) return;

            marginLeft -= 100;
            sliderContent.css('margin-left', `${marginLeft}%`);
        });

    });
});