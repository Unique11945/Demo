document.addEventListener('DOMContentLoaded', function() {
    // Sample data (in production, this would come from an API)
    let executives = [
        {
            id: 1,
            name: "Alex Brown",
            position: "Executive",
            ward: "Ward 1",
            email: "alex@example.com",
            phone: "08011112222",
            lga: "Main City",
            addedBy: "moderator1"
        },
        {
            id: 2,
            name: "Chris Lee",
            position: "Executive",
            ward: "Ward 1",
            email: "chris@example.com",
            phone: "08022223333",
            lga: "Main City",
            addedBy: "moderator1"
        }
    ];

    // DOM Elements
    const executivesTableBody = document.getElementById('executivesTableBody');
    const executiveForm = document.getElementById('executiveForm');
    const executiveFormElement = document.getElementById('executiveFormElement');
    const addExecutiveBtn = document.getElementById('addExecutiveBtn');
    const cancelExecutiveBtn = document.getElementById('cancelExecutiveBtn');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Load executives on page load
    loadExecutives();

    // Set ward field to moderator's ward
    if (currentUser) {
        document.getElementById('executiveWard').value = currentUser.ward;
        document.getElementById('executiveLGA').value = currentUser.lga;
    }

    // Add Executive Button Click
    addExecutiveBtn.addEventListener('click', function() {
        executiveForm.style.display = 'block';
        executiveFormElement.reset();
        document.getElementById('executiveId').value = '';
        document.getElementById('executivePosition').value = 'Executive';
        document.getElementById('executiveWard').value = currentUser.ward;
        document.getElementById('executiveLGA').value = currentUser.lga;
    });

    // Cancel Button Click
    cancelExecutiveBtn.addEventListener('click', function() {
        executiveForm.style.display = 'none';
    });

    // Form Submission
    executiveFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const executiveId = document.getElementById('executiveId').value;
        const executiveData = {
            name: document.getElementById('executiveName').value,
            position: document.getElementById('executivePosition').value,
            ward: document.getElementById('executiveWard').value,
            email: document.getElementById('executiveEmail').value,
            phone: document.getElementById('executivePhone').value,
            lga: document.getElementById('executiveLGA').value,
            addedBy: currentUser.username
        };

        if (executiveId) {
            // Update existing executive
            const index = executives.findIndex(e => e.id == executiveId);
            if (index !== -1) {
                executives[index] = { ...executives[index], ...executiveData };
            }
        } else {
            // Add new executive
            const newId = executives.length > 0 ? Math.max(...executives.map(e => e.id)) + 1 : 1;
            executives.push({ id: newId, ...executiveData });
        }

        executiveForm.style.display = 'none';
        loadExecutives();
        updateDashboardCounts();
        showAlert('Executive saved successfully!', 'success');
    });

    // Load Executives into Table
    function loadExecutives() {
        executivesTableBody.innerHTML = '';
        
        // Filter executives by current moderator's ward
        const wardExecutives = executives.filter(e => e.addedBy === currentUser.username);
        
        wardExecutives.forEach(executive => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${executive.name}</td>
                <td>${executive.position}</td>
                <td>${executive.ward}</td>
                <td>${executive.email}</td>
                <td>${executive.phone}</td>
                <td>${executive.lga}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-executive" data-id="${executive.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger delete-executive" data-id="${executive.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            
            executivesTableBody.appendChild(row);
        });

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-executive').forEach(btn => {
            btn.addEventListener('click', function() {
                const executiveId = this.getAttribute('data-id');
                editExecutive(executiveId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-executive').forEach(btn => {
            btn.addEventListener('click', function() {
                const executiveId = this.getAttribute('data-id');
                deleteExecutive(executiveId);
            });
        });
    }

    // Edit Executive
    function editExecutive(id) {
        const executive = executives.find(e => e.id == id);
        if (executive) {
            document.getElementById('executiveId').value = executive.id;
            document.getElementById('executiveName').value = executive.name;
            document.getElementById('executivePosition').value = executive.position;
            document.getElementById('executiveEmail').value = executive.email;
            document.getElementById('executivePhone').value = executive.phone;
            document.getElementById('executiveWard').value = executive.ward;
            document.getElementById('executiveLGA').value = executive.lga;
            
            executiveForm.style.display = 'block';
            window.scrollTo({ top: executiveForm.offsetTop, behavior: 'smooth' });
        }
    }

    // Delete Executive
    function deleteExecutive(id) {
        if (confirm('Are you sure you want to delete this executive?')) {
            executives = executives.filter(e => e.id != id);
            loadExecutives();
            updateDashboardCounts();
            showAlert('Executive deleted successfully!', 'success');
        }
    }

    // Update Dashboard Counts
    function updateDashboardCounts() {
        const wardExecutives = executives.filter(e => e.addedBy === currentUser.username);
        document.getElementById('executivesCount').textContent = wardExecutives.length;
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

    // Initialize dashboard counts
    updateDashboardCounts();
});