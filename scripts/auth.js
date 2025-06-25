// Sample user data (in a real app, this would be server-side)
const users = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "System Admin",
        email: "admin@system.com",
        phone: "08012345678",
        ward: "All",
        lga: "All"
    },
    {
        id: 2,
        username: "moderator1",
        password: "mod123",
        role: "moderator",
        name: "Moderator One",
        email: "mod1@system.com",
        phone: "08023456789",
        ward: "Ward 1",
        lga: "LGA 1"
    },
    {
        id: 3,
        username: "executive1",
        password: "exec123",
        role: "executive",
        name: "Executive One",
        email: "exec1@system.com",
        phone: "08034567890",
        ward: "Ward 1",
        lga: "LGA 1"
    }
];

// Personnel data
let personnel = [
    {
        id: 1,
        name: "Executive One",
        position: "Executive",
        ward: "Ward 1",
        email: "exec1@system.com",
        phone: "08034567890",
        lga: "LGA 1",
        addedBy: "moderator1"
    }
];

// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (window.location.pathname.includes('login.html') && currentUser) {
        redirectToDashboard(currentUser.role);
    } else if (!window.location.pathname.includes('login.html') && !currentUser) {
        window.location.href = 'login.html';
    }
});

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        
        const user = users.find(u => 
            u.username === username && 
            u.password === password && 
            u.role === role
        );
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            redirectToDashboard(user.role);
        } else {
            alert('Invalid credentials or role selection');
        }
    });
}

// Logout functionality
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Redirect based on role
function redirectToDashboard(role) {
    switch(role) {
        case 'admin':
            window.location.href = 'admin.html';
            break;
        case 'moderator':
            window.location.href = 'moderator.html';
            break;
        case 'executive':
            window.location.href = 'executive.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}


// Sidebar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const body = document.body;
    
    // Toggle Sidebar
    menuToggle.addEventListener('click', function() {
        body.classList.toggle('sidebar-open');
    });
    
    // Close Sidebar
    closeSidebar.addEventListener('click', function() {
        body.classList.remove('sidebar-open');
    });
    
    // Show/hide elements based on user role
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
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
        
        // Set active link
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && e.target !== menuToggle) {
            body.classList.remove('sidebar-open');
        }
    });
});