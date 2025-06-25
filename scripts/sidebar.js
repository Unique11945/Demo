document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    // Toggle Sidebar
    function toggleSidebar() {
        body.classList.toggle('sidebar-open');
        sidebarOverlay.classList.toggle('active');
    }
    
    // Event Listeners
    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking on nav links (mobile)
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                toggleSidebar();
            }
        });
    });
    
    // Show/hide elements based on user role
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { role: 'guest' };
    
    // Hide elements not for current user role
    if (currentUser.role !== 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    if (currentUser.role === 'executive') {
        document.querySelectorAll('.moderator-only').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Initialize sidebar state based on screen size
    function handleResize() {
        if (window.innerWidth >= 992) {
            body.classList.add('sidebar-open');
            sidebarOverlay.classList.remove('active');
        } else {
            body.classList.remove('sidebar-open');
        }
    }
    
    // Set initial state
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
});