document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const systemMessage = document.getElementById('systemMessage');
    let dataId = 0;
    let editingRow = null;

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(dataForm);
        let isValid = true;

        formData.forEach((value) => {
            if (!value) {
                isValid = false;
            }
        });

        if (!isValid) {
            showMessage('Please fill out all fields.', '#dc3545'); 
            return;
        }

        if (editingRow) {
            // Update existing row
            const cells = editingRow.getElementsByTagName('td');
            let index = 1; // Skip the ID cell
            formData.forEach((value) => {
                cells[index].textContent = value;
                index++;
            });
            showMessage('Data edited successfully!', '#ffc107'); 
            editingRow = null;
        } else {
            // Add new row
            const newRow = dataTable.insertRow();
            const idCell = newRow.insertCell(0);
            idCell.textContent = ++dataId;

            formData.forEach((value, key) => {
                const cell = newRow.insertCell();
                cell.textContent = value;
            });

            const actionsCell = newRow.insertCell();
            actionsCell.className = 'actions-cell';
            actionsCell.innerHTML = '<button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>';

            showMessage('Data stored successfully!', '#28a745'); 

            const editBtn = actionsCell.querySelector('.edit-btn');
            const deleteBtn = actionsCell.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => {
                editRow(newRow);
            });

            deleteBtn.addEventListener('click', () => {
                deleteRow(newRow);
            });
        }

        dataForm.reset();
    });

    function showMessage(message, bgColor) {
        systemMessage.textContent = message;
        systemMessage.style.backgroundColor = bgColor;
        systemMessage.style.display = 'block';
        setTimeout(() => {
            systemMessage.style.display = 'none';
        }, 3000);
    }

    function editRow(row) {
        const cells = row.getElementsByTagName('td');
        document.getElementById('level').value = cells[1].textContent;
        document.getElementById('university').value = cells[2].textContent;
        document.getElementById('address').value = cells[3].textContent;
        document.getElementById('board').value = cells[4].textContent;
        document.getElementById('gpa').value = cells[5].textContent;
        document.getElementById('passedYear').value = cells[6].textContent;

        editingRow = row; 
    }

    function deleteRow(row) {
        row.remove();
        showMessage('Data deleted successfully!', '#dc3545'); 
        if (editingRow === row) {
            editingRow = null;
        }
    }
});
