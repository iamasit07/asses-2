# Assis-2 - A Modern Chat Application

Hello! This is **Assis-2**, a modern chat application I built from scratch.

My goal for this project was to demonstrate my ability to build a full-featured, responsive, and high-performance web app using a modern tech stack (React, TypeScript, and Vite). I focused not only on creating a clean and intuitive UI but also on architecting a smart, scalable solution "under the hood," paying special attention to state management.

## What It Does: Key Features

This application provides a seamless and feature-rich conversational experience. Here’s a quick look at what you can do:

- **Modern Chat Interface:** A clean, responsive, and intuitive UI for a great user experience on any device, from mobile to desktop.
- **Persistent Chat History:** A collapsible sidebar keeps all your past conversations handy, making it easy to find and continue them later.
- **Flexible File Attachments:** You can attach files in multiple ways—by clicking a button, dragging and dropping them onto the app, or even pasting directly from your clipboard.
- **Model Selection:** A simple dropdown allows you to switch between different (simulated) chat models.
- **Seamless Navigation:** Built with `react-router-dom` to handle navigation instantly, letting you switch between new chats and old ones without a full page reload.

## Tech Stack

I built this project using an industry-standard, modern tech stack:

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (for rapid, utility-first design)
- **Icons:** [Material-UI](https://mui.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Linting:** [ESLint](https://eslint.org/)

## Getting Started

Want to run it locally? You'll just need [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/iamasit07/asses-2.git
    cd asses-2
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1. To run the application in development mode, execute the following command. This will start the Vite development server.

   ```sh
   npm run dev
   ```

## Architectural Spotlight: A Smart Approach to State Management

One of the biggest challenges in a complex app like this is state management. How do you keep everything in sync (the chat window, the history sidebar, the UI state) without the app becoming slow and laggy?

A common (but less performant) solution is to put everything in one giant, global state using a single context. The problem? **Any time _any_ piece of state changes** (even just toggling the sidebar), the **entire application re-renders**. This is incredibly inefficient.

To solve this, I implemented a **multi-context pattern** using React's Context API.

Instead of one big state, I divided it into three logical, independent parts:

1.  **`UIContext`**: Manages only the global UI state (e.g., "Is the sidebar currently open?").
2.  **`ChatHistoryContext`**: Manages just the list of past chat sessions.
3.  **`ChatSessionContext`**: Manages only the state of the _currently active_ chat.

### Why This Matters

This approach has huge benefits:

- **Performance:** The app is significantly faster. When you send a message, only the components related to the `ChatSessionContext` update. When you toggle the sidebar, only the `UIContext` consumers re-render. This eliminates countless unnecessary re-renders and keeps the UI snappy.
- **Maintainability:** This "separation of concerns" makes the code so much cleaner. It's easier to understand, debug, and add new features. If I want to change how the chat history works, I can do so in its own context without worrying about breaking the main chat window.

This approach does introduce a little more boilerplate code, but it's a small price to pay for the massive gains in performance and scalability.

## Project Structure

I organized the project with a clear, component-based architecture to keep things organized and maintainable:

- `src/components`: Contains all the reusable UI components (`Header`, `Sidebar`, `InputArea`, etc.).
- `src/pages`: Contains the main page components (e.g., `NewChat`).
- `src/context`: The heart of the state management, containing the multi-context setup.
- `src/hooks`: Contains custom hooks for easily accessing the different contexts.
- `src/assets`: Stores static assets like SVGs and fonts.
- `src/db`: Includes mock data to simulate chat history and responses.
- `src/types`: Holds shared TypeScript type definitions to ensure type safety.
