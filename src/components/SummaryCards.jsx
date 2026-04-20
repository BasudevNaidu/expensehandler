function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
}

function SummaryCards({ expenses, filteredExpenses }) {
  const totalAll = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalFiltered = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  const now = new Date();
  const monthKey = now.toISOString().slice(0, 7);
  const monthlyTotal = expenses
    .filter((item) => new Date(item.date).toISOString().slice(0, 7) === monthKey)
    .reduce((sum, item) => sum + item.amount, 0);

  const topCategory = Object.entries(
    expenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0];

  return (
    <section className="summary-grid">
      <article className="summary-card">
        <p>Total Spent</p>
        <h3>{formatCurrency(totalAll)}</h3>
      </article>
      <article className="summary-card">
        <p>Current Month</p>
        <h3>{formatCurrency(monthlyTotal)}</h3>
      </article>
      <article className="summary-card">
        <p>Filtered Total</p>
        <h3>{formatCurrency(totalFiltered)}</h3>
      </article>
      <article className="summary-card">
        <p>Top Category</p>
        <h3>{topCategory ? `${topCategory[0]} (${formatCurrency(topCategory[1])})` : 'N/A'}</h3>
      </article>
    </section>
  );
}

export default SummaryCards;