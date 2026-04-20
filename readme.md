# Expense Tracker (React Frontend)

A complete frontend Expense Tracker built with React + Vite.

## Features

- Add new expenses with title, amount, date, category, and notes
- Edit and delete existing expenses
- Filter by search text, category, and month
- Sort by newest, oldest, highest amount, or lowest amount
- Summary cards for total spent, current month, filtered total, and top category
- Data persistence using browser `localStorage`
- Responsive UI for desktop and mobile

## Run Locally

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

4. Preview production build
```bash
npm run preview
```

## Project Structure

- `src/App.jsx` - main state and expense logic
- `src/components/ExpenseForm.jsx` - add/edit form
- `src/components/Filters.jsx` - filter/sort controls
- `src/components/SummaryCards.jsx` - dashboard totals
- `src/components/ExpenseList.jsx` - expenses table and actions
- `src/data/categories.js` - category options
- `src/styles.css` - app styling