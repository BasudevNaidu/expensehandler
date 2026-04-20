import { useEffect, useMemo, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import Filters from './components/Filters';
import SummaryCards from './components/SummaryCards';
import ExpenseList from './components/ExpenseList';

const STORAGE_KEY = 'expense-tracker-expenses';

function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [month, setMonth] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());

    setExpenses((prev) => [{ ...expense, id }, ...prev]);
  };

  const updateExpense = (id, updated) => {
    setExpenses((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    setEditingExpense(null);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    if (editingExpense?.id === id) {
      setEditingExpense(null);
    }
  };

  const filteredExpenses = useMemo(() => {
    const text = search.trim().toLowerCase();

    let filtered = expenses.filter((item) => {
      const matchesSearch =
        text.length === 0 ||
        item.title.toLowerCase().includes(text) ||
        (item.notes || '').toLowerCase().includes(text);

      const matchesCategory = category === 'All' || item.category === category;

      const matchesMonth =
        month === 'All' ||
        new Date(item.date).toISOString().slice(0, 7) === month;

      return matchesSearch && matchesCategory && matchesMonth;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest') return a.amount - b.amount;
      return 0;
    });

    return filtered;
  }, [expenses, search, category, month, sortBy]);

  const uniqueMonths = useMemo(() => {
    const months = new Set(
      expenses.map((item) => new Date(item.date).toISOString().slice(0, 7))
    );
    return Array.from(months).sort((a, b) => (a < b ? 1 : -1));
  }, [expenses]);

  return (
    <main className="app-shell">
      <section className="top-section">
        <div>
          <h1>Expense Tracker</h1>
          <p className="subtitle">Track your daily spending with quick insights.</p>
        </div>
        <ExpenseForm
          key={editingExpense?.id || 'new'}
          onAddExpense={addExpense}
          onUpdateExpense={updateExpense}
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />
      </section>

      <SummaryCards expenses={expenses} filteredExpenses={filteredExpenses} />

      <Filters
        search={search}
        category={category}
        month={month}
        sortBy={sortBy}
        uniqueMonths={uniqueMonths}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onMonthChange={setMonth}
        onSortChange={setSortBy}
      />

      <ExpenseList
        expenses={filteredExpenses}
        onEdit={setEditingExpense}
        onDelete={deleteExpense}
      />
    </main>
  );
}

export default App;