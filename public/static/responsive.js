// Bỏ đi class "active" khi độ rộng màn hình tối đa là 1350px
window.addEventListener('resize', function() {
    document.querySelector('.sidebar').classList.toggle('active', window.innerWidth > 1350);
});

// Kiểm tra ban đầu
window.dispatchEvent(new Event('resize'));


////////////////////////////////
$(document).ready(function () {
    // Toggle class "active" cho sidebar-mobile và menu-mobile khi click vào menuToggle-mobile
    $(".menuToggle-mobile").click(function () {
        $(".sidebar-mobile, .menu-mobile").toggleClass("active");
    });

    // Sự kiện click cho phần còn lại của trang
    $(document).on("click", function (event) {
        // Kiểm tra xem phần tử được click có class là menuToggle-mobile không
        if (!$(event.target).closest('.menuToggle-mobile').length) {
            // Nếu không phải là menuToggle-mobile, xóa class "active" từ sidebar-mobile và menu-mobile
            $(".sidebar-mobile, .menu-mobile").removeClass("active");
        }
    });

    // Function to handle scrolling to a specific section
    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Add click event listeners to each mobile menu item
    var mobileMenuItems = document.querySelectorAll('.menu-mobile-container a');
    mobileMenuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function (event) {
            // Prevent the default behavior of the link
            event.preventDefault();

            // Get the target section's id from the href attribute
            var targetId = this.getAttribute('href').substring(1);

            // Scroll to the target section
            scrollToSection(targetId);

            // Optionally, close the mobile menu
            document.querySelector('.menuToggle-mobile').click();
        });
    });
});
