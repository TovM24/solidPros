document.addEventListener("DOMContentLoaded", function() {
    let navigation = document.querySelector('.sidebar');
    let list = document.querySelectorAll('.list-item');
    let menuToggle = document.querySelector('.menuToggle');

    // Hàm xử lý sự kiện khi một mục danh sách được nhấp vào
    function activeLink() {
        list.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
    }

    // Gán sự kiện click cho mỗi mục danh sách
    list.forEach((item) => item.addEventListener('click', activeLink));

    // Sự kiện click cho nút menu
    menuToggle.onclick = function () {
        navigation.classList.toggle('active');
    };

    // Hàm cuộn đến phần tử có id tương ứng và đánh dấu mục danh sách là active
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    } 

    // Hàm đánh dấu mục danh sách là active khi cuộn đến phần tử tương ứng
    function setActiveLink(sectionId) {
        let navigation = document.querySelector('navigation');

        let list = document.querySelectorAll('.list-item');
        function activeLink() {
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
        }

        list.forEach((item) => item.addEventListener('click', activeLink));
    }

    // Xử lý sự kiện cuộn trang
    function handleScroll() {
        let scrollPosition = window.scrollY;
        let offset = 100;

        list.forEach((item) => {
            const sectionId = item.getAttribute('onclick').match(/'(.*?)'/)[1];
            const section = document.getElementById(sectionId);

            if (section) {
                const sectionTop = section.offsetTop - offset;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setActiveLink(sectionId);
                }
            }
        });
    }

    // Gán sự kiện click cho mỗi mục danh sách
    list.forEach((item) => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/'(.*?)'/)[1];
            scrollToSection(sectionId);
            setActiveLink(sectionId);
        });
    });   

    // Gán sự kiện cuộn trang
    window.addEventListener('scroll', handleScroll);

    // Mặc định hiển thị nội dung của mục home khi trang web được tải
    scrollToSection('demo1');
    setActiveLink('demo1');
});


// document.addEventListener("DOMContentLoaded", function() {
//     let navigation = document.querySelector('.sidebar');
//     let list = document.querySelectorAll('.list-item');
//     let contentSections = document.querySelectorAll('.content > div');
//     let menuToggle = document.querySelector('.menuToggle');

//     // Hàm xử lý sự kiện khi một mục danh sách được nhấp vào
//     function activeLink() {
//         list.forEach((item) => item.classList.remove('active'));
//         this.classList.add('active');
//     }

//     // Gán sự kiện click cho mỗi mục danh sách
//     list.forEach((item) => item.addEventListener('click', activeLink));

//     // Sự kiện click cho nút menu
//     menuToggle.onclick = function () {
//         navigation.classList.toggle('active');
//     };

//     // Hàm cuộn đến phần tử có id tương ứng và đánh dấu mục danh sách là active
//     function scrollToSection(sectionId) {
//         const section = document.getElementById(sectionId);
//         if (section) {
//             section.scrollIntoView({ behavior: 'smooth' });
//         }
//     } 

//     // Hàm đánh dấu mục danh sách là active khi cuộn đến phần tử tương ứng
//     function setActiveLink(sectionId) {
//         list.forEach((item) => item.classList.remove('active'));
//         document.querySelector(`[onclick="scrollToSection('${sectionId}')"]`).classList.add('active');
//     }

//     // Xử lý sự kiện cuộn trang
//     function handleScroll() {
//         let scrollPosition = window.scrollY;

//         contentSections.forEach(section => {
//             const sectionId = section.id;
//             const sectionTop = section.offsetTop - 200; // Số 200 là độ trễ bạn muốn, bạn có thể điều chỉnh nó tùy ý

//             if (scrollPosition >= sectionTop) {
//                 setActiveLink(sectionId);
//             }
//         });
//     }

//     // Gán sự kiện cuộn trang
//     window.addEventListener('scroll', handleScroll);

//     // Mặc định hiển thị nội dung của mục home khi trang web được tải
//     scrollToSection('demo1');
//     setActiveLink('demo1');
// });







// let navigation = document.querySelector('navigation');

// let list = document.querySelectorAll('.list-item');
// function activeLink() {
//     list.forEach((item) => item.classList.remove('active'));
//     this.classList.add('active');
// }

// list.forEach((item) => item.addEventListener('click', activeLink));



//add
const box = document.getElementById('home-add');

box.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - box.offsetLeft;
    const mouseY = e.clientY - box.offsetTop;

    const centerX = box.clientWidth / 2;
    const centerY = box.clientHeight / 2;

    const offsetX = centerX - mouseX;
    const offsetY = centerY - mouseY;

    const offsetXPercentage = (offsetX / centerX) * 2;
    const offsetYPercentage = (offsetY / centerY) * 2;

    box.style.transform = `rotateX(${offsetYPercentage}deg) rotateY(${-offsetXPercentage}deg) translateZ(5px)`;
    box.style.boxShadow = `${offsetX / 30}px ${offsetY / 30}px 10px rgba(0, 0, 0, 0.1)`;
});

box.addEventListener('mouseleave', () => {
    box.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    box.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
});


// upload image
$(document).ready(function() {
    // Call the handleOCRResult function when the page loads
    handleOCRResult();

    // Thêm sự kiện change cho input file để xử lý khi người dùng chọn file
    var fileInput = document.getElementById('upload-input');
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];

        // Kiểm tra xem file có tồn tại không
        if (file) {
            var formData = new FormData();
            formData.append('file', file);

            // Gửi ảnh đến máy chủ Flask bằng AJAX
            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Xử lý kết quả từ server
                handleOCRResult(data);

                if (data.success) {
                    console.log("Quá trình nhập hình ảnh thành công!");
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const imageDataUrl = reader.result;
                        updateImageSrc(imageDataUrl);
                        // Thực hiện các hành động khác khi nhập hình ảnh thành công
                        showDemo1();
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.log("Quá trình nhập hình ảnh không thành công!");
                }
            })
            .catch(error => {
                console.error("Error uploading file: ", error);
                // Xử lý khi gặp lỗi
                handleOCRResult();
            });
        } else {
            // Xử lý khi không có file
            console.log('No file selected');
            handleOCRResult();
        }
    });

    // Thêm sự kiện click để mở rộng đoạn văn bản khi click vào displayText
    var displayTextElement = document.getElementById("displayText");
    displayTextElement.addEventListener('click', function () {
        // Đặt thuộc tính để đánh dấu rằng người dùng đã click vào thẻ p
        this.dataset.clicked = "true";

        // Kiểm tra xem đã có kết quả OCR hay chưa
        if (displayTextElement.textContent !== initialOCRResult) {
            // Nếu đã có, thì hiển thị kết quả OCR
            displayTextElement.textContent = initialOCRResult;
        }
        // Nếu chưa có, không thay đổi gì
    });

    // gioi han ky tu
    var maxCharacters = 900; // Số ký tự tối đa

    // Lấy nội dung và độ dài
    var textContent = displayTextElement.textContent;
    var textLength = textContent.length;

    // Kiểm tra xem có cần thêm dấu ba chấm hay không
    if (textLength > maxCharacters) {
        var truncatedText = textContent.substring(0, maxCharacters) + '...';
        displayTextElement.textContent = truncatedText;

        // Thêm sự kiện click để mở rộng đoạn văn bản
        displayTextElement.addEventListener('click', function () {
            this.textContent = textContent; // Hiển thị toàn bộ nội dung khi click
        });
    }
});

// Khai báo biến global để lưu kết quả OCR ban đầu
var initialOCRResult = "The text will be displayed here";

function handleOCRResult(response) {
    console.log(response);

    var displayTextElement = document.getElementById("displayText");

    if (response && response.success) {
        // Lưu kết quả OCR
        initialOCRResult = response.ocr_result;

        // Nếu người dùng chưa click vào thẻ p, hiển thị kết quả OCR mới
        if (displayTextElement.dataset.clicked !== "true") {
            displayTextElement.textContent = initialOCRResult;
        }
    } else {
        // Hiển thị nội dung OCR ban đầu nếu có lỗi hoặc không có kết quả OCR
        displayTextElement.textContent = initialOCRResult;
        console.error('Error during OCR or invalid response');
    }
}

function updateImageSrc(imageDataUrl) {
    const imageElement = document.getElementById('upload-image-preview');
    imageElement.src = imageDataUrl;
}

function showDemo1() {
    // Lấy tất cả các phần tử có class "demo1"
    const demo1Elements = document.querySelectorAll('.demo1');
    
    // Hiển thị mỗi phần tử
    demo1Elements.forEach(element => {
        element.style.display = 'block';
    });
}


////////////////////////
var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('update_display', function(data) {
    // Cập nhật nội dung hiển thị khi nhận được kết quả mới từ server
    $('#displayText').text(data.result);
});




