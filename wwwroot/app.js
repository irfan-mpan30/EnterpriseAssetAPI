const apiUrl = 'http://localhost:0000/api/Assets'; 
let currentAssets = []; 

let currentPage = 1;
let rowsPerPage = 5;

async function loadAssets() {
    const statusBadge = document.getElementById('apiStatusBadge');

    try {
        const response = await fetch(apiUrl);
        currentAssets = await response.json();
        
        statusBadge.className = "badge bg-success-subtle text-success border border-success-subtle pb-2";
        statusBadge.innerHTML = '<i class="bi bi-wifi me-1"></i> API Connected';

        renderTable(); 
    } catch (error) {
        statusBadge.className = "badge bg-danger-subtle text-danger border border-danger-subtle pb-2";
        statusBadge.innerHTML = '<i class="bi bi-wifi-off me-1"></i> API Disconnected';

        document.getElementById('assetTableBody').innerHTML = `<tr><td colspan="6" class="text-danger fw-bold py-4">Gagal memuat data API. Pastikan server .NET berjalan.</td></tr>`;
        
        document.getElementById('paginationControls').innerHTML = '';
        document.getElementById('pageInfo').innerText = 'Menunggu koneksi server...';
    }
}

function renderTable() {
    const tableBody = document.getElementById('assetTableBody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedAssets = currentAssets.slice(startIndex, endIndex);

    paginatedAssets.forEach(asset => {
        let statusColor = asset.status === 'Active' ? 'success' : 
                          asset.status === 'In Repair' ? 'warning' : 'danger';
        
        let icon = 'bi-pc-display';
        if(asset.category === 'Network Infrastructure') icon = 'bi-router';
        if(asset.category === 'Facility Infrastructure') icon = 'bi-building-gear';
        if(asset.category === 'Vehicle') icon = 'bi-car-front';

        const row = `
            <tr>
                <td class="text-muted fw-semibold">#${asset.id}</td>
                <td class="text-start fw-bold text-dark">
                    <i class="bi ${icon} text-primary me-2 fs-5 align-middle"></i> ${asset.name}
                </td>
                <td><span class="text-secondary"><i class="bi bi-tags me-1"></i>${asset.category}</span></td>
                <td><code class="serial-box">${asset.serialNumber}</code></td>
                <td><span class="badge bg-${statusColor}-subtle text-${statusColor} border border-${statusColor}-subtle">${asset.status}</span></td>
                <td>
                    <button class="btn btn-outline-warning btn-action me-1" onclick="openEditModal(${asset.id})" title="Edit Data">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-action" onclick="deleteAsset(${asset.id})" title="Hapus Data">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    renderPaginationControls();
}

function renderPaginationControls() {
    const totalPages = Math.ceil(currentAssets.length / rowsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    const pageInfo = document.getElementById('pageInfo');
    
    paginationControls.innerHTML = '';

    if (currentAssets.length === 0) {
        pageInfo.innerText = "Tidak ada data.";
        return;
    }

    const startData = (currentPage - 1) * rowsPerPage + 1;
    const endData = Math.min(currentPage * rowsPerPage, currentAssets.length);
    pageInfo.innerHTML = `Menampilkan <span class="fw-bold text-dark">${startData}-${endData}</span> dari total <span class="fw-bold text-dark">${currentAssets.length}</span> aset`;

    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    paginationControls.innerHTML += `<li class="page-item ${prevDisabled}"><a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">&laquo; Prev</a></li>`;

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = currentPage === i ? 'active' : '';
        paginationControls.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a></li>`;
    }

    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    paginationControls.innerHTML += `<li class="page-item ${nextDisabled}"><a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next &raquo;</a></li>`;
}

function changePage(page) {
    const totalPages = Math.ceil(currentAssets.length / rowsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
    }
}

function changeRowsPerPage() {
    rowsPerPage = parseInt(document.getElementById('rowsPerPageSelect').value);
    currentPage = 1;
    renderTable();
}


document.getElementById('addAssetForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const newAsset = {
        name: document.getElementById('inputName').value,
        category: document.getElementById('inputCategory').value,
        serialNumber: document.getElementById('inputSerial').value,
        status: document.getElementById('inputStatus').value
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset)
    });

    this.reset();
    bootstrap.Modal.getInstance(document.getElementById('addAssetModal')).hide();
    loadAssets();
});

function openEditModal(id) {
    const asset = currentAssets.find(a => a.id === id); 
    if (asset) {
        document.getElementById('editId').value = asset.id;
        document.getElementById('editName').value = asset.name;
        document.getElementById('editCategory').value = asset.category;
        document.getElementById('editSerial').value = asset.serialNumber;
        document.getElementById('editStatus').value = asset.status;
        
        new bootstrap.Modal(document.getElementById('editAssetModal')).show();
    }
}

document.getElementById('editAssetForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const updatedAsset = {
        id: parseInt(id),
        name: document.getElementById('editName').value,
        category: document.getElementById('editCategory').value,
        serialNumber: document.getElementById('editSerial').value,
        status: document.getElementById('editStatus').value
    };

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAsset)
    });

    bootstrap.Modal.getInstance(document.getElementById('editAssetModal')).hide();
    loadAssets();
});

async function deleteAsset(id) {
    if (confirm(`Yakin ingin menghapus aset dengan ID ${id}?`)) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        loadAssets(); 
    }
}

loadAssets();