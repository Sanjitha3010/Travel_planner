# Travel Planner ✈️

A modern, attractive, and responsive travel planning web application built using pure **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## 🌟 Features

- **Modern Travel-Inspired Design**: Styled with a clean sky blue, navy blue, white, and warm amber/coral accent palette with smooth animations, cards, and responsive layouts.
- **Popular & Explore Destinations**: Curated cards with photos, best travel timings, tags, and estimated budget ranges in INR (₹) for top destinations including **Ooty**, **Goa**, **Manali**, **Munnar**, **Jaipur**, **Bali**, **Ladakh**, **Varanasi**, and **Andaman Islands**.
- **One-Click "Plan This Trip"**: Automatically prefills the planning form from any destination card and smoothly scrolls to the form.
- **Search & Category Filtering**: Real-time keyword search and category tabs (*Mountains & Hills*, *Beaches & Islands*, *Nature*, *Heritage*, *International*).
- **Interactive Trip Planning Form**:
  - Starting location with quick datalist suggestions
  - Destination input with autofill support
  - Departure and return date picker with past-date prevention and return validation
  - Number of travellers stepper
  - Total budget in INR (₹)
  - Travel type selection (*Adventure*, *Relaxation*, *Family*, *Solo*, *Romantic*, *Cultural*)
  - Multi-select interests (*Nature*, *Beaches*, *Mountains*, *Historical Places*, *Temples*, *Food*, *Shopping*)
- **Day-by-Day Itinerary Generator**:
  - Detailed morning (🌅), afternoon (☀️), and evening (🌙) schedules with timings, activities, and recommended places.
  - Curated experiences for popular destinations plus a dynamic fallback activity engine for custom user destinations.
- **Budget Calculator & Expense Breakdown**:
  - Automatically calculates estimated costs across 4 categories: **Transportation**, **Accommodation**, **Food & Dining**, and **Activities**.
  - Dynamic comparison alert: Warns when estimated costs exceed user budget with helpful cost-saving recommendations; confirms savings when within budget.
- **My Trip Management**:
  - **Edit Details**: Jump back to the form with all values preserved.
  - **Regenerate**: Re-rolls activity themes for alternative schedules.
  - **Print / Save as PDF**: Formatted clean `@media print` layout that prints an official travel voucher.
  - **Clear Plan**: Resets the itinerary and clears stored data.
  - **Persistence**: Uses browser `localStorage` to retain the latest plan between page refreshes.

---

## 🚀 Getting Started

No installation, build tools, Node.js, databases, or API keys required.

### Option 1: Direct Browser Launch
Double-click `index.html` or open it with your browser:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and select **Open with Live Server**.

---

## 📁 Project Structure

```
travel_planner/
├── index.html     # Semantic page structure & templates
├── style.css      # Design tokens, layouts, responsive styles & print CSS
├── script.js      # Form validation, itinerary generator, budget engine & storage
├── README.md      # Project overview and documentation
└── .gitignore     # Git ignore configuration
```
