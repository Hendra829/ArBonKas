// Transaction data storage
let transactions = [];

// Load transactions from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();
    
    // Set today's date as default
    document.getElementById('date').valueAsDate = new Date();
    
    // Form submission
    document.getElementById('transactionForm').addEventListener('submit', addTransaction);
});

// Load transactions from localStorage
function loadTransactions() {
    const stored = localStorage.getItem('arbonkas_transactions');
    if (stored) {
        transactions = JSON.parse(stored);
    }
    updateDisplay();
}

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem('arbonkas_transactions', JSON.stringify(transactions));
}

// Add new transaction
function addTransaction(e) {
    e.preventDefault();
    
    const transaction = {
        id: Date.now(),
        type: document.getElementById('type').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value
    };
    
    transactions.push(transaction);
    saveTransactions();
    updateDisplay();
    
    // Reset form
    document.getElementById('transactionForm').reset();
    document.getElementById('date').valueAsDate = new Date();
    
    // Show success message
    alert('Transaksi berhasil ditambahkan!');
}

// Delete transaction
function deleteTransaction(id) {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveTransactions();
        updateDisplay();
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Apakah Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan!')) {
        transactions = [];
        saveTransactions();
        updateDisplay();
        alert('Semua data berhasil dihapus!');
    }
}

// Update display
function updateDisplay() {
    updateSummary();
    updateTable();
}

// Update summary cards
function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(t => {
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);
    document.getElementById('balance').textContent = formatCurrency(balance);
}

// Update transaction table
function updateTable() {
    const tbody = document.getElementById('transactionBody');
    tbody.innerHTML = '';
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    sortedTransactions.forEach((t, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatDate(t.date)}</td>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td class="income-row">${t.type === 'income' ? formatCurrency(t.amount) : '-'}</td>
            <td class="expense-row">${t.type === 'expense' ? formatCurrency(t.amount) : '-'}</td>
            <td><button onclick="deleteTransaction(${t.id})" class="btn btn-delete">Hapus</button></td>
        `;
    });
}

// Format currency
function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Calculate totals
function calculateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(t => {
        if (t.type === 'income') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    });
    
    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
    };
}

// Export to PDF (using print to PDF functionality)
function exportToPDF() {
    // Create a new window with the report
    const printWindow = window.open('', '_blank');
    const totals = calculateTotals();
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Laporan Kas ArBonKas</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                .summary {
                    margin: 20px 0;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 5px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #667eea;
                    color: white;
                }
                .income {
                    color: #0d8050;
                    font-weight: bold;
                }
                .expense {
                    color: #c41e3a;
                    font-weight: bold;
                }
                @media print {
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>LAPORAN KAS ARBONKAS</h1>
            <p style="text-align: center;">Tanggal: ${new Date().toLocaleDateString('id-ID')}</p>
            
            <div class="summary">
                <h2>Ringkasan</h2>
                <p><strong>Total Pemasukan:</strong> ${formatCurrency(totals.totalIncome)}</p>
                <p><strong>Total Pengeluaran:</strong> ${formatCurrency(totals.totalExpense)}</p>
                <p><strong>Saldo:</strong> ${formatCurrency(totals.balance)}</p>
            </div>
            
            <h2>Detail Transaksi</h2>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Keterangan</th>
                        <th>Kategori</th>
                        <th>Pemasukan</th>
                        <th>Pengeluaran</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((t, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${formatDate(t.date)}</td>
                                <td>${t.description}</td>
                                <td>${t.category}</td>
                                <td class="income">${t.type === 'income' ? formatCurrency(t.amount) : '-'}</td>
                                <td class="expense">${t.type === 'expense' ? formatCurrency(t.amount) : '-'}</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
            
            <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Print / Save as PDF
            </button>
            <button onclick="window.close()" style="margin-top: 20px; margin-left: 10px; padding: 10px 20px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Close
            </button>
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
}

// Export to Excel (CSV format)
function exportToExcel() {
    const totals = calculateTotals();
    
    // Create CSV content
    let csvContent = 'LAPORAN KAS ARBONKAS\n';
    csvContent += 'Tanggal: ' + new Date().toLocaleDateString('id-ID') + '\n\n';
    csvContent += 'RINGKASAN\n';
    csvContent += 'Total Pemasukan,' + totals.totalIncome + '\n';
    csvContent += 'Total Pengeluaran,' + totals.totalExpense + '\n';
    csvContent += 'Saldo,' + totals.balance + '\n\n';
    csvContent += 'DETAIL TRANSAKSI\n';
    csvContent += 'No,Tanggal,Keterangan,Kategori,Pemasukan,Pengeluaran\n';
    
    // Add transactions
    transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((t, index) => {
            csvContent += `${index + 1},"${formatDate(t.date)}","${t.description}","${t.category}",`;
            csvContent += `${t.type === 'income' ? t.amount : ''},${t.type === 'expense' ? t.amount : ''}\n`;
        });
    
    // Create and download file
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'laporan-kas-arbonkas.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export to Word (HTML format)
function exportToWord() {
    const totals = calculateTotals();
    
    // Create HTML content for Word
    let htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Laporan Kas ArBonKas</title></head>
        <body>
            <h1 style='text-align: center;'>LAPORAN KAS ARBONKAS</h1>
            <p style='text-align: center;'>Tanggal: ${new Date().toLocaleDateString('id-ID')}</p>
            
            <h2>Ringkasan</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 50%;'>
                <tr>
                    <td><strong>Total Pemasukan</strong></td>
                    <td>${formatCurrency(totals.totalIncome)}</td>
                </tr>
                <tr>
                    <td><strong>Total Pengeluaran</strong></td>
                    <td>${formatCurrency(totals.totalExpense)}</td>
                </tr>
                <tr>
                    <td><strong>Saldo</strong></td>
                    <td>${formatCurrency(totals.balance)}</td>
                </tr>
            </table>
            
            <h2>Detail Transaksi</h2>
            <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%;'>
                <thead>
                    <tr style='background-color: #667eea; color: white;'>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Keterangan</th>
                        <th>Kategori</th>
                        <th>Pemasukan</th>
                        <th>Pengeluaran</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((t, index) => {
            htmlContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${formatDate(t.date)}</td>
                    <td>${t.description}</td>
                    <td>${t.category}</td>
                    <td>${t.type === 'income' ? formatCurrency(t.amount) : '-'}</td>
                    <td>${t.type === 'expense' ? formatCurrency(t.amount) : '-'}</td>
                </tr>
            `;
        });
    
    htmlContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    // Convert to blob and download
    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'laporan-kas-arbonkas.doc');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export to PowerPoint (HTML presentation format)
function exportToPPT() {
    const totals = calculateTotals();
    
    // Create HTML content
    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Laporan Kas ArBonKas</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .slide {
                    width: 960px;
                    height: 720px;
                    padding: 40px;
                    page-break-after: always;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    margin: 20px auto;
                }
                .slide-1 {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .slide-1 h1 {
                    font-size: 48px;
                    margin-bottom: 20px;
                }
                .slide-2, .slide-3 {
                    background: white;
                }
                h2 {
                    color: #667eea;
                    border-bottom: 3px solid #667eea;
                    padding-bottom: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                th {
                    background-color: #667eea;
                    color: white;
                }
                .income {
                    color: #0d8050;
                    font-weight: bold;
                }
                .expense {
                    color: #c41e3a;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="slide slide-1">
                <h1>LAPORAN KAS ARBONKAS</h1>
                <p style="font-size: 24px;">Tanggal: ${new Date().toLocaleDateString('id-ID')}</p>
            </div>
            
            <div class="slide slide-2">
                <h2>Ringkasan Keuangan</h2>
                <table>
                    <tr>
                        <th>Kategori</th>
                        <th>Jumlah</th>
                    </tr>
                    <tr>
                        <td><strong>Total Pemasukan</strong></td>
                        <td class="income">${formatCurrency(totals.totalIncome)}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Pengeluaran</strong></td>
                        <td class="expense">${formatCurrency(totals.totalExpense)}</td>
                    </tr>
                    <tr>
                        <td><strong>Saldo</strong></td>
                        <td><strong>${formatCurrency(totals.balance)}</strong></td>
                    </tr>
                </table>
            </div>
            
            <div class="slide slide-3">
                <h2>Detail Transaksi</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Keterangan</th>
                            <th>Kategori</th>
                            <th>Pemasukan</th>
                            <th>Pengeluaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 8)
                            .map((t, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${formatDate(t.date)}</td>
                                    <td>${t.description}</td>
                                    <td>${t.category}</td>
                                    <td class="income">${t.type === 'income' ? formatCurrency(t.amount) : '-'}</td>
                                    <td class="expense">${t.type === 'expense' ? formatCurrency(t.amount) : '-'}</td>
                                </tr>
                            `).join('')}
                    </tbody>
                </table>
                ${transactions.length > 8 ? `<p style="margin-top: 10px; font-style: italic;">Menampilkan 8 dari ${transactions.length} transaksi</p>` : ''}
            </div>
            
            <script>
                setTimeout(() => window.print(), 500);
            </script>
        </body>
        </html>
    `;
    
    // Open in new window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
}
