// // scrollCnt.js

// // Hàm kiểm tra xem một phần tử có nằm trong tầm nhìn của trình duyệt hay không
// function isElementInViewport(el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }

// // Hàm xử lý sự kiện khi cuộn trang
// function handleScroll() {
//     const listItems = document.querySelectorAll('.list-item');

//     listItems.forEach((item) => {
//         // Lấy sectionId từ thuộc tính onclick của .list-item
//         const sectionId = item.getAttribute('onclick').match(/'(.*?)'/)[1];
//         const section = document.getElementById(sectionId);

//         // Kiểm tra xem section có tồn tại và nằm trong tầm nhìn không
//         if (section && isElementInViewport(section)) {
//             // Loại bỏ lớp active khỏi tất cả các .list-item
//             listItems.forEach((li) => li.classList.remove('active'));
//             // Thêm lớp active cho phần tử đang được nhìn thấy
//             item.classList.add('active');
//         }
//     });
// }



// // Gán sự kiện cuộn trang
// window.addEventListener('scroll', handleScroll);

// // Thực thi hàm handleScroll khi trang web được tải lần đầu
// document.addEventListener('DOMContentLoaded', handleScroll);



// // scrollCnt.js

// // Hàm kiểm tra xem một phần tử có nằm trong tầm nhìn của trình duyệt hay không
// function isElementInViewport(el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }

// // Hàm xử lý sự kiện khi cuộn trang
// function handleScroll() {
//     const listItems = document.querySelectorAll('.list-item');
//     const homeSection = document.getElementById('home'); // Lấy phần tử home

//     listItems.forEach((item) => {
//         // Lấy sectionId từ thuộc tính onclick của .list-item
//         const sectionId = item.getAttribute('onclick').match(/'(.*?)'/)[1];
//         const section = document.getElementById(sectionId);

//         // Kiểm tra xem section có tồn tại và nằm trong tầm nhìn không
//         if (section && isElementInViewport(section)) {
//             // Loại bỏ lớp active khỏi tất cả các .list-item
//             listItems.forEach((li) => li.classList.remove('active'));
//             // Thêm lớp active cho phần tử đang được nhìn thấy
//             item.classList.add('active');
//         }
//     });

//     // Kiểm tra khi cuộn lên đầu trang và thêm lớp active cho phần tử home
//     if (window.scrollY === 0) {
//         homeSection.classList.add('active');
//     } else {
//         homeSection.classList.remove('active');
//     }
// }

// // Gán sự kiện cuộn trang
// window.addEventListener('scroll', handleScroll);

// // Thực thi hàm handleScroll khi trang web được tải lần đầu
// document.addEventListener('DOMContentLoaded', handleScroll);



function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const topVisible = rect.top <= windowHeight - 400;
    const bottomVisible = rect.bottom >= 400;
    
    return topVisible && bottomVisible;
}

function handleScroll() {
    const listItems = document.querySelectorAll('.list-item');
    const homeSection = document.getElementById('home');

    listItems.forEach((li) => li.classList.remove('active'));

    listItems.forEach((item) => {
        const sectionId = item.getAttribute('onclick').match(/'(.*?)'/)[1];
        const section = document.getElementById(sectionId);

        if (section && isElementInViewport(section)) {
            item.classList.add('active');
        }
    });

    if (window.scrollY === 0) {
        homeSection.classList.add('active');
    } else {
        homeSection.classList.remove('active');
    }
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', handleScroll);
