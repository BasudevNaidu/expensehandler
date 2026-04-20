import { useMemo, useState } from 'react';
import { categories } from '../data/categories';

function getTodayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

const defaultState = {
  title: '',
  amount: '',
  date: getTodayISO(),
  category: categories[0],
  notes: ''
};

function ExpenseForm({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState(() =>
    editingExpense
      ? {
          title: editingExpense.title,
          amount: String(editingExpense.amount),
          date: editingExpense.date,
          category: editingExpense.category,
          notes: editingExpense.notes || ''
        }
      : defaultState
  );

  const isEditing = useMemo(() => Boolean(editingExpense), [editingExpense]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const amount = Number(form.amount);

    if (!title || !form.date || Number.isNaN(amount) || amount <= 0) {
      return;
    }

    const payload = {
      title,
      amount,
      date: form.date,
      category: form.category,
      notes: form.notes.trim()
    };

    if (isEditing) {
      onUpdateExpense(editingExpense.id, payload);
      return;
    }

    onAddExpense(payload);
    setForm(defaultState);
  };

  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>

      <label>
        Title
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Groceries"
          required
        />
      </label>

      <div className="grid-2">
        <label>
          Amount
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={onChange}
            min="0.01"
            step="0.01"
            placeholder="0.00"
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            required
          />
        </label>
      </div>

      <label>
        Category
        <select name="category" value={form.category} onChange={onChange}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          placeholder="Optional details"
          rows={3}
        />
      </label>

      <div className="actions-row">
        <button type="submit" className="primary-btn">
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
        {isEditing && (
          <button type="button" className="secondary-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;