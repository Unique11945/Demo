document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Verify admin role
    if (currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    // Load moderators (in a real app, this would be from a database)
    loadModerators();
    
    // Form toggle
    const addModeratorBtn = document.getElementById('addModeratorBtn');
    const moderatorForm = document.getElementById('moderatorForm');
    const cancelModeratorBtn = document.getElementById('cancelModeratorBtn');
    
    addModeratorBtn.addEventListener('click', function() {
        moderatorForm.style.display = 'block';
        document.getElementById('moderatorFormElement').reset();
        document.getElementById('moderatorId').value = '';
    });
    
    cancelModeratorBtn.addEventListener('click', function() {
        moderatorForm.style.display = 'none';
    });
    
    // Form submission
    const moderatorFormElement = document.getElementById('moderatorFormElement');
    moderatorFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const moderatorId = document.getElementById('moderatorId').value;
        const name = document.getElementById('moderatorName').value;
        const email = document.getElementById('moderatorEmail').value;
        const phone = document.getElementById('moderatorPhone').value;
        const ward = document.getElementById('moderatorWard').value;
        const lga = document.getElementById('moderatorLGA').value;
        const username = document.getElementById('moderatorUsername').value;
        const password = document.getElementById('moderatorPassword').value;
        
        // In a real app, this would be an API call
        if (moderatorId) {
            // Update existing moderator
            const index = users.findIndex(u => u.id == moderatorId);
            if (index !== -1) {
                users[index] = {
                    ...users[index],
                    name,
                    email,
                    phone,
                    ward,
                    lga,
                    username,
                    password
                };
            }
        } else {
            // Add new moderator
            const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            users.push({
                id: newId,
                username,
                password,
                role: 'moderator',
                name,
                email,
                phone,
                ward,
                lga
            });
        }
        
        moderatorForm.style.display = 'none';
        loadModerators();
    });
});

function loadModerators() {
    const moderatorsTableBody = document.getElementById('moderatorsTableBody');
    moderatorsTableBody.innerHTML = '';
    
    const moderators = users.filter(u => u.role === 'moderator');
    
    moderators.forEach(moderator => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${moderator.name}</td>
            <td>Moderator</td>
            <td>${moderator.ward}</td>
            <td>${moderator.email}</td>
            <td>${moderator.phone}</td>
            <td>${moderator.lga}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${moderator.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${moderator.id}">Delete</button>
            </td>
        `;
        
        moderatorsTableBody.appendChild(row);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const moderatorId = this.getAttribute('data-id');
            editModerator(moderatorId);
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const moderatorId = this.getAttribute('data-id');
            deleteModerator(moderatorId);
        });
    });
}

function editModerator(id) {
    const moderator = users.find(u => u.id == id);
    if (moderator) {
        document.getElementById('moderatorId').value = moderator.id;
        document.getElementById('moderatorName').value = moderator.name;
        document.getElementById('moderatorEmail').value = moderator.email;
        document.getElementById('moderatorPhone').value = moderator.phone;
        document.getElementById('moderatorWard').value = moderator.ward;
        document.getElementById('moderatorLGA').value = moderator.lga;
        document.getElementById('moderatorUsername').value = moderator.username;
        document.getElementById('moderatorPassword').value = moderator.password;
        
        document.getElementById('moderatorForm').style.display = 'block';
    }
}

function deleteModerator(id) {
    if (confirm('Are you sure you want to delete this moderator?')) {
        const index = users.findIndex(u => u.id == id);
        if (index !== -1) {
            users.splice(index, 1);
            loadModerators();
        }
    }
}





document.addEventListener('DOMContentLoaded', function() {
    // Sample data (in production, this would come from an API)
    let moderators = [
      {
        id: 1,
        name: "John Doe",
        position: "Moderator",
        ward: "Ward 1",
        email: "john@example.com",
        phone: "08012345678",
        lga: "Main City",
        username: "john.doe",
        password: "temp123"
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Moderator",
        ward: "Ward 3",
        email: "jane@example.com",
        phone: "08023456789",
        lga: "North District",
        username: "jane.smith",
        password: "temp123"
      }
    ];
  
    // DOM Elements
    const moderatorsTableBody = document.getElementById('moderatorsTableBody');
    const moderatorForm = document.getElementById('moderatorForm');
    const moderatorFormElement = document.getElementById('moderatorFormElement');
    const addModeratorBtn = document.getElementById('addModeratorBtn');
    const cancelModeratorBtn = document.getElementById('cancelModeratorBtn');
  
    // Load moderators on page load
    loadModerators();
  
    // Add Moderator Button Click
    addModeratorBtn.addEventListener('click', function() {
      moderatorForm.style.display = 'block';
      moderatorFormElement.reset();
      document.getElementById('moderatorId').value = '';
      document.getElementById('moderatorPosition').value = 'Moderator';
    });
  
    // Cancel Button Click
    cancelModeratorBtn.addEventListener('click', function() {
      moderatorForm.style.display = 'none';
    });
  
    // Form Submission
    moderatorFormElement.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const moderatorId = document.getElementById('moderatorId').value;
      const moderatorData = {
        name: document.getElementById('moderatorName').value,
        position: document.getElementById('moderatorPosition').value,
        ward: document.getElementById('moderatorWard').value,
        email: document.getElementById('moderatorEmail').value,
        phone: document.getElementById('moderatorPhone').value,
        lga: document.getElementById('moderatorLGA').value,
        username: document.getElementById('moderatorUsername').value,
        password: document.getElementById('moderatorPassword').value
      };
  
      if (moderatorId) {
        // Update existing moderator
        const index = moderators.findIndex(m => m.id == moderatorId);
        if (index !== -1) {
          moderators[index] = { ...moderators[index], ...moderatorData };
        }
      } else {
        // Add new moderator
        const newId = moderators.length > 0 ? Math.max(...moderators.map(m => m.id)) + 1 : 1;
        moderators.push({ id: newId, ...moderatorData });
      }
  
      moderatorForm.style.display = 'none';
      loadModerators();
      showAlert('Moderator saved successfully!', 'success');
    });
  
    // Load Moderators into Table
    function loadModerators() {
      moderatorsTableBody.innerHTML = '';
      
      moderators.forEach(moderator => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td>${moderator.name}</td>
          <td>${moderator.position}</td>
          <td>${moderator.ward}</td>
          <td>${moderator.email}</td>
          <td>${moderator.phone}</td>
          <td>${moderator.lga}</td>
          <td>
            <button class="btn btn-sm btn-warning edit-moderator" data-id="${moderator.id}">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger delete-moderator" data-id="${moderator.id}">
              <i class="fas fa-trash"></i> Delete
            </button>
          </td>
        `;
        
        moderatorsTableBody.appendChild(row);
      });
  
      // Add event listeners to edit buttons
      document.querySelectorAll('.edit-moderator').forEach(btn => {
        btn.addEventListener('click', function() {
          const moderatorId = this.getAttribute('data-id');
          editModerator(moderatorId);
        });
      });
  
      // Add event listeners to delete buttons
      document.querySelectorAll('.delete-moderator').forEach(btn => {
        btn.addEventListener('click', function() {
          const moderatorId = this.getAttribute('data-id');
          deleteModerator(moderatorId);
        });
      });
    }
  
    // Edit Moderator
    function editModerator(id) {
      const moderator = moderators.find(m => m.id == id);
      if (moderator) {
        document.getElementById('moderatorId').value = moderator.id;
        document.getElementById('moderatorName').value = moderator.name;
        document.getElementById('moderatorPosition').value = moderator.position;
        document.getElementById('moderatorEmail').value = moderator.email;
        document.getElementById('moderatorPhone').value = moderator.phone;
        document.getElementById('moderatorWard').value = moderator.ward;
        document.getElementById('moderatorLGA').value = moderator.lga;
        document.getElementById('moderatorUsername').value = moderator.username;
        document.getElementById('moderatorPassword').value = moderator.password;
        
        moderatorForm.style.display = 'block';
        window.scrollTo({ top: moderatorForm.offsetTop, behavior: 'smooth' });
      }
    }
  
    // Delete Moderator
    function deleteModerator(id) {
      if (confirm('Are you sure you want to delete this moderator?')) {
        moderators = moderators.filter(m => m.id != id);
        loadModerators();
        showAlert('Moderator deleted successfully!', 'success');
      }
    }
  
    // Show Alert Message
    function showAlert(message, type) {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type}`;
      alertDiv.textContent = message;
      
      const container = document.querySelector('.container');
      container.prepend(alertDiv);
      
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    }
  });



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