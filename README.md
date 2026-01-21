# CryptoPlace - Cryptocurrency Tracker

A real-time cryptocurrency dashboard built with **React 19** and **Vite**. This application allows users to track live market data, view price trends through interactive charts, and explore detailed insights for various cryptocurrencies.

## 🚀 Key Features

* **Live Market Data:** Real-time fetching of cryptocurrency prices, market cap, and 24h changes using the **CoinGecko API**.
* **Dynamic Currency Support:** Switch between different currencies (e.g., USD, EUR, INR) to view prices in your preferred local denomination.
* **Interactive Price Charts:** Visual representation of historical price data using **React Google Charts**.
* **Search Functionality:** Quickly find specific coins from the market list.
* **Detailed Coin Pages:** In-depth views for individual cryptocurrencies, including market statistics and descriptions.

## 🛠️ Tech Stack

**Frontend:**
* **React 19:** For building a modern, component-based user interface.
* **Vite:** High-performance build tool and development server.
* **React Router DOM:** Managing navigation between the Home dashboard and Coin detail pages.
* **Context API:** Centralized state management for global coin data and currency settings.

**External APIs & Libraries:**
* **CoinGecko API:** The primary source for all cryptocurrency market data.
* **React Google Charts:** Powering the analytical price trend graphs.

## 📋 Prerequisites

* Node.js (v18 or higher)
* npm or yarn

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/extreme2475/crypto-money.git](https://github.com/extreme2475/crypto-money.git)
    cd crypto-money/cr
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

* `src/context/Coincontext.jsx`: Handles global state and API integration with CoinGecko.
* `src/pages/Home/`: The main dashboard displaying the top coins market list.
* `src/pages/Coin/`: Individual coin detail pages with historical charts.
* `src/components/Navbar/`: Currency selector and navigation links.

## 📄 License
This project is licensed under the ISC License.
