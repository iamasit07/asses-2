# Asses-2: AI Chat Interface (Developer Guide)

This document serves as a comprehensive guide for developers working on the Asses-2 project. It covers the application's functionality, its architecture, component structure, and the technical decisions made during development.

## 1. Project Overview

Asses-2 is a modern, responsive frontend for an AI chat application. Its purpose is to provide a clean user interface for interacting with a large language model (LLM), managing chat history, and handling file attachments.

We built this as a single-page application using **React**, **TypeScript**, and **Vite**. Styling is handled by **Tailwind CSS** for its utility-first approach, supplemented with **Material-UI Icons**.

> **Important Note:** This is currently a **frontend-only prototype**. The backend service and all LLM responses are simulated for demonstration purposes.

## 2. Core Features

Here is a breakdown of the application's primary features:

- **Responsive Chat Interface:** A clean, modern UI designed to work across all screen sizes.
- **Chat History:** Users can view and navigate between past conversations. This is managed by `react-router-dom`.
- **File Attachments:** The interface supports attaching files via drag-and-drop, a standard file picker, and clipboard paste. A popup modal allows users to manage attached files before sending.
- **Search:** The sidebar includes a debounced search function to quickly filter past conversations by their title.
- **Typewriter Effect:** LLM responses are rendered with a word-by-word typewriter effect for a more dynamic user experience, powered by our custom `useTypewriter` hook.
- **Collapsible Sidebar:** The sidebar containing chat history can be collapsed to maximize the space for the main chat area.

## 3. Technology Stack

The project is built with the following technologies:

- **Framework:** **React** 19 with **Vite** (as the build tool and dev server)
- **Language:** **TypeScript**
- **Styling:** **Tailwind CSS** and **Material-UI Icons**
- **Routing:** **React Router**
- **Linting:** **ESLint**
- **Compiler:** We have enabled the experimental `babel-plugin-react-compiler` in the Vite configuration.

## 4. Getting Started

To run the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Asses-2
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 5. Project Structure

The `src` directory is organized to separate concerns clearly:

```
src/
├── assets/         # SVGs (Logos) and other static assets
├── components/     # Reusable React components
├── context/        # React Context for global state management
├── db/             # In-memory mock database for chat data
├── hooks/          # Custom React hooks (e.g., useTypewriter, useDebounce)
├── pages/          # Top-level page components (e.g., NewChat)
└── types/          # TypeScript type definitions
```

## 6. Architectural Overview

### State Management: `ChatContext`

We are using React's **Context API** for global state management. This approach was chosen for its simplicity and to avoid "prop drilling" at the current scale of the application.

- **`context/chatProvider.tsx`**: This provider component holds the core application state and logic (like functions to send messages).
- **`useChat()` Hook**: This custom hook (defined in `context/chatContext.tsx`) provides an easy, typed way for any component in the tree to access the context's values.

**State exposed by `useChat()`:**

- `messages`: The array of messages for the currently active chat.
- `typingMessage`: The message object being rendered by the typewriter effect.
- `recentChatData`: The list of all chats for the sidebar.
- `isSidebarOpen`: A boolean to manage the sidebar's visibility on mobile.
- `sendMessage(text, files)`: Function to send a message in an existing chat.
- `startNewChat(text, files)`: Function to create a new chat session.

### Key Component Breakdown

- **`pages/newChat.tsx`**: This is the main page component. It uses the `useParams` hook from `react-router-dom` to identify the current `chatId`. It then fetches the corresponding chat data from the `ChatContext` and renders the main layout (`Sidebar` and `ChatArea`).

- **`components/sidebar.tsx`**: This is a stateful container that manages the sidebar's `isCollapsed` state for the desktop view. It renders the `TopSidebar` and `BottomSidebar` components.

- **`components/inputArea.tsx`**: This is one of the most complex components. It manages its own local state for the text input and the array of attached `files`. Its responsibilities include:

  - Handling text input with auto-resizing.
  - Managing file input from multiple sources (file picker, drag-and-drop, paste).
  - Displaying a file count badge.
  - Rendering the `FileAttachmentPopup` to review files.
  - Calling the correct context function (`sendMessage` or `startNewChat`) on send.

- **Custom Hooks:**
  - **`hooks/useTypewriter.tsx`**: Takes a string and returns the `displayedText` word by word, creating the typewriter effect.
  - **`hooks/useDebounce.tsx`**: A generic hook that takes a value and a delay. It returns a new value that only updates after the specified delay has passed, which is perfect for the search bar.

## 7. Trade-offs and Future Improvements

This project was built as a prototype, which involved several intentional trade-offs for rapid development. Here’s a summary of those decisions and their potential upgrade paths.

| Area                   | Current Implementation (The Trade-off)                                                                                                                                                 | Future Improvement (Next Steps)                                                                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend & Data**     | The application is entirely frontend. All chat data is stored in a mock file (`src/db/chats.ts`) and is lost on refresh. LLM responses are hardcoded.                                  | Build a full backend service (e.g., Node.js/Express) with a persistent database (e.g., PostgreSQL, MongoDB) and integrate with a real LLM API (e.g., OpenAI, Gemini).                                |
| **State Management**   | We use the Context API. While simple, it can cause unnecessary re-renders in larger apps as any state change notifies all consumers.                                                   | For a larger application, migrate to a more optimized state management library like **Zustand** or **Redux Toolkit** for more granular control over renders.                                         |
| **Accessibility & UX** | Core functionality is present, but advanced accessibility and UX features were deferred. For example, the search dropdown isn't keyboard-navigable, and there are no loading spinners. | Implement full keyboard support for all interactive elements. Add ARIA attributes for screen reader support. Integrate loading states and error boundaries, especially once a real backend is added. |
| **Testing**            | The project currently lacks an automated testing suite (unit, integration, or E2E).                                                                                                    | Implement a testing strategy using a framework like **Vitest** and **React Testing Library** to ensure code quality, catch regressions, and document component behavior.                             |
