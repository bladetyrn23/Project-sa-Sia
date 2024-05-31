// Sample data
let data = [
    { name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
];

// Function to display data in the table
function displayData() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = item.email;
        row.appendChild(emailCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = item.phone;
        row.appendChild(phoneCell);

        const actionsCell = document.createElement('td');

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.addEventListener('click', () => viewData(index));
        actionsCell.appendChild(viewButton);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => updateData(index));
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => showDeleteModal(index));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

// Function to display a message
function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}

// Modal related functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Function to insert data
function insertData() {
    const modal = document.getElementById('insertModal');
    const form = document.getElementById('insertForm');
    const closeBtn = modal.querySelector('.close');

    modal.style.display = 'block';

    closeBtn.onclick = function () {
        modal.style.display = 'none';
        form.reset();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            form.reset();
        }
    };

    form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    data.push({ name, email, phone });
    displayData();

    const modal = document.getElementById('insertModal');
    modal.style.display = 'none';
    const form = document.getElementById('insertForm');
    form.reset();

    displayMessage('Data inserted successfully!');
}

// Function to view data
function viewData(index) {
    const modal = document.getElementById('viewModal');
    const viewTableBody = document.querySelector('#viewTable tbody');
    viewTableBody.innerHTML = '';

    const item = data[index];
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
    `;
    viewTableBody.appendChild(row);

    modal.style.display = 'block';

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Function to update data
function updateData(index) {
    const modal = document.getElementById('updateModal');
    const form = document.getElementById('updateForm');
    const closeBtn = modal.querySelector('.close');

    // Pre-fill form fields with existing data
    const item = data[index];
    document.getElementById('updateName').value = item.name;
    document.getElementById('updateEmail').value = item.email;
    document.getElementById('updatePhone').value = item.phone;

    modal.style.display = 'block';

    closeBtn.onclick = function () {
        modal.style.display = 'none';
        form.reset();
    }

    form.onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('updateName').value;
        const email = document.getElementById('updateEmail').value;
        const phone = document.getElementById('updatePhone').value;

        // Update data in the array based on form data
        data[index] = { name, email, phone };

        // Refresh displayed data
        displayData();
        modal.style.display = 'none';
        form.reset();
        displayMessage('Data updated successfully!');
    };
}


// Function to show delete confirmation modal
function showDeleteModal(index) {
    const modal = document.getElementById('deleteModal');
    const confirmBtn = document.getElementById('confirmDelete');
    const cancelBtn = document.getElementById('cancelDelete');

    modal.style.display = 'block';

    confirmBtn.onclick = function () {
        deleteData(index);
        modal.style.display = 'none';
    }

    cancelBtn.onclick = function () {
        modal.style.display = 'none';
    }

    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Function to delete data
function deleteData(index) {
    data.splice(index, 1);
    displayData();
    displayMessage('Data deleted successfully!');
}

// Event listeners
function setupEventListeners() {
    document.getElementById('insertBtn').addEventListener('click', insertData);
    document.getElementById('viewBtn').addEventListener('click', () => showModal('viewModal'));
    document.getElementById('updateBtn').addEventListener('click', () => showModal('updateModal'));

    const insertBtn = document.getElementById('insertBtn');
    insertBtn.addEventListener('click', insertData);

    const insertForm = document.getElementById('insertForm');
    insertForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        insertData(); // Call insertData function when form is submitted
    });
}

// Display initial data
displayData();
setupEventListeners();

document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebar');
    var menuToggle = document.getElementById('menuToggle');
    var closeBtn = document.getElementById('closeBtn');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show'); // Toggle the 'show' class
    });

    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('show'); // Remove the 'show' class
    });

    window.addEventListener('click', function(event) {
        if (event.target == sidebar) {
            sidebar.classList.remove('show'); // Remove the 'show' class
        }
    });
});


