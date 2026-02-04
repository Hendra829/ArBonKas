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

// Export to PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Laporan Kas ArBonKas', 14, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.text('Tanggal: ' + new Date().toLocaleDateString('id-ID'), 14, 28);
    
    // Add summary
    const totals = calculateTotals();
    doc.setFontSize(12);
    doc.text('Ringkasan:', 14, 38);
    doc.setFontSize(10);
    doc.text('Total Pemasukan: ' + formatCurrency(totals.totalIncome), 14, 45);
    doc.text('Total Pengeluaran: ' + formatCurrency(totals.totalExpense), 14, 52);
    doc.text('Saldo: ' + formatCurrency(totals.balance), 14, 59);
    
    // Prepare table data
    const tableData = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((t, index) => [
            index + 1,
            formatDate(t.date),
            t.description,
            t.category,
            t.type === 'income' ? formatCurrency(t.amount) : '-',
            t.type === 'expense' ? formatCurrency(t.amount) : '-'
        ]);
    
    // Add table
    doc.autoTable({
        head: [['No', 'Tanggal', 'Keterangan', 'Kategori', 'Pemasukan', 'Pengeluaran']],
        body: tableData,
        startY: 70,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [102, 126, 234] }
    });
    
    // Save PDF
    doc.save('laporan-kas-arbonkas.pdf');
}

// Export to Excel
function exportToExcel() {
    const totals = calculateTotals();
    
    // Prepare summary data
    const summaryData = [
        ['LAPORAN KAS ARBONKAS'],
        ['Tanggal: ' + new Date().toLocaleDateString('id-ID')],
        [],
        ['RINGKASAN'],
        ['Total Pemasukan', formatCurrency(totals.totalIncome)],
        ['Total Pengeluaran', formatCurrency(totals.totalExpense)],
        ['Saldo', formatCurrency(totals.balance)],
        [],
        ['DETAIL TRANSAKSI'],
        ['No', 'Tanggal', 'Keterangan', 'Kategori', 'Pemasukan', 'Pengeluaran']
    ];
    
    // Prepare transaction data
    const transactionData = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((t, index) => [
            index + 1,
            formatDate(t.date),
            t.description,
            t.category,
            t.type === 'income' ? t.amount : '-',
            t.type === 'expense' ? t.amount : '-'
        ]);
    
    // Combine all data
    const excelData = [...summaryData, ...transactionData];
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 5 },  // No
        { wch: 20 }, // Tanggal
        { wch: 30 }, // Keterangan
        { wch: 15 }, // Kategori
        { wch: 15 }, // Pemasukan
        { wch: 15 }  // Pengeluaran
    ];
    
    XLSX.utils.book_append_sheet(wb, ws, 'Laporan Kas');
    XLSX.writeFile(wb, 'laporan-kas-arbonkas.xlsx');
}

// Export to Word
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
    
    saveAs(blob, 'laporan-kas-arbonkas.doc');
}

// Export to PowerPoint
function exportToPPT() {
    const pptx = new PptxGenJS();
    const totals = calculateTotals();
    
    // Slide 1: Title
    let slide1 = pptx.addSlide();
    slide1.background = { color: '667eea' };
    slide1.addText('LAPORAN KAS ARBONKAS', {
        x: 1,
        y: 2,
        w: '80%',
        h: 1.5,
        fontSize: 44,
        bold: true,
        color: 'FFFFFF',
        align: 'center'
    });
    slide1.addText('Tanggal: ' + new Date().toLocaleDateString('id-ID'), {
        x: 1,
        y: 4,
        w: '80%',
        fontSize: 18,
        color: 'FFFFFF',
        align: 'center'
    });
    
    // Slide 2: Summary
    let slide2 = pptx.addSlide();
    slide2.addText('Ringkasan Keuangan', {
        x: 0.5,
        y: 0.5,
        fontSize: 32,
        bold: true,
        color: '333333'
    });
    
    const summaryRows = [
        ['Kategori', 'Jumlah'],
        ['Total Pemasukan', formatCurrency(totals.totalIncome)],
        ['Total Pengeluaran', formatCurrency(totals.totalExpense)],
        ['Saldo', formatCurrency(totals.balance)]
    ];
    
    slide2.addTable(summaryRows, {
        x: 1.5,
        y: 1.5,
        w: 6,
        h: 2.5,
        fontSize: 18,
        border: { pt: 1, color: '667eea' },
        fill: { color: 'F7F7F7' },
        color: '333333',
        align: 'center',
        valign: 'middle'
    });
    
    // Slide 3: Transactions
    let slide3 = pptx.addSlide();
    slide3.addText('Detail Transaksi', {
        x: 0.5,
        y: 0.3,
        fontSize: 28,
        bold: true,
        color: '333333'
    });
    
    const transactionRows = [
        ['No', 'Tanggal', 'Keterangan', 'Kategori', 'Pemasukan', 'Pengeluaran']
    ];
    
    transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10) // Limit to 10 transactions for better visibility
        .forEach((t, index) => {
            transactionRows.push([
                (index + 1).toString(),
                formatDate(t.date),
                t.description,
                t.category,
                t.type === 'income' ? formatCurrency(t.amount) : '-',
                t.type === 'expense' ? formatCurrency(t.amount) : '-'
            ]);
        });
    
    slide3.addTable(transactionRows, {
        x: 0.3,
        y: 1.0,
        w: 9.4,
        colW: [0.4, 1.5, 2.5, 1.5, 1.5, 1.5],
        fontSize: 10,
        border: { pt: 1, color: '667eea' },
        fill: { color: 'F7F7F7' },
        color: '333333',
        align: 'center',
        valign: 'middle'
    });
    
    if (transactions.length > 10) {
        slide3.addText(`Menampilkan 10 dari ${transactions.length} transaksi`, {
            x: 0.5,
            y: 5.2,
            fontSize: 12,
            color: '666666',
            italic: true
        });
    }
    
    // Save PowerPoint
    pptx.writeFile({ fileName: 'laporan-kas-arbonkas.pptx' });
}
