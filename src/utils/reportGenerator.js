import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

export function generateReport(data, filter) {
// Create a new PDF document
  const doc = new jsPDF();

// Add title
  doc.setFontSize(14);
  doc.text(`${filter} Maintenance Report`, 10, 10);

  let table_data = []

// Prepare table headers
  table_data.push(['ID', 'Category', 'Status', 'Student', 'Date']);

// Populate table data
  data.forEach((item) => {
    table_data.push([
      item.id != null ? String(item.id) : '',
      item.category || '',
      item.status || '',
      item.student?.full_name || '',
      item.created_at ? new Date(item.created_at).toLocaleDateString() : ''
    ])
  })
//  Generate the table in the PDF
  autoTable(doc, {
    head: [table_data[0]],
    body: table_data.slice(1),
                 })

// Save the PDF with a dynamic filename
  const filename = filter ? `${String(filter).toLowerCase().replace(/[^a-z0-9-_]/g, '-')}-maintenance-report.pdf` : 'maintenance-report.pdf';
  doc.save(filename);
}
