function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <section className="panel">
        <h2>Expenses</h2>
        <p className="empty">No expenses found. Add one to get started.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Expenses</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td>{item.notes || '-'}</td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="edit-btn" onClick={() => onEdit(item)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpenseList;