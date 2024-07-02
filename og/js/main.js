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


