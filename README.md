# Assis-2: AI Chat Interface (Developer Guide)

This document provides a comprehensive overview of the Assis-2 project for developers. It covers the application's functionality, architecture, component structure, and technical trade-offs.

## 1. Overview

Assis-2 is a modern, responsive frontend for an AI chat application. It provides a clean user interface for interacting with a large language model (LLM), managing chat history, and attaching files. The project is built as a single-page application using React, TypeScript, and Vite, and is styled with Tailwind CSS and Material-UI icons.

**Note:** This is a frontend-only prototype. The backend and LLM responses are currently simulated for demonstration purposes.

## 2. Core Features

-   **Responsive Chat Interface:** A clean and modern UI that works on different screen sizes.
-   **Chat History:** View and navigate between past conversations using `react-router-dom`.
-   **File Attachments:** Attach images and other documents to messages with a drag-and-drop interface, file picker, and clipboard paste. Includes a popup for managing attached files before sending.
-   **Search:** A debounced search functionality in the sidebar to quickly filter past chats by title.
-   **Typewriter Effect:** LLM responses are rendered with a word-by-word typewriter effect for a more engaging user experience, powered by a custom `useTypewriter` hook.
-   **Collapsible Sidebar:** The sidebar containing chat history and navigation can be collapsed to maximize chat space.

## 3. Tech Stack & Key Libraries

-   **Framework:** [React](https://react.dev/) 19 with [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [Material-UI Icons](https://mui.com/material-ui/material-icons/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Linting:** ESLint
-   **Compiler:** The experimental `babel-plugin-react-compiler` is enabled via the Vite config.

## 4. Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd assis-2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 5. Project Structure

The `src` directory is organized as follows:

```
src/
├── assets/         # SVGs (Logos) and other static assets
├── components/     # Reusable React components
├── context/        # React Context for global state management
├── db/             # In-memory mock database for chat data
├── hooks/          # Custom React hooks (useTypewriter, useDebounce)
├── pages/          # Top-level page components (NewChat)
└── types/          # TypeScript type definitions (chatContext.types.ts)
```

## 6. Architecture Deep Dive

### State Management: `ChatContext`

Global state is managed using React's Context API to avoid prop drilling. This is a simple and effective solution for the current scale of the application.

-   **`context/chatProvider.tsx`**: This provider component holds all the core application state and logic.
-   **`context/chatContext.tsx`**: Defines the context and the `useChat` custom hook, which provides easy, typed access to the context's values.

-   **State exposed by `useChat()`:**
    -   `messages`: `Message[]` - The array of messages for the currently active chat.
    -   `typingMessage`: `Message | null` - Holds the message being typed by the typewriter effect.
    -   `recentChatData`: `{ id: string; title: string }[]` - The list of all chats for the sidebar.
    -   `isSidebarOpen`: `boolean` - Manages the visibility of the sidebar on mobile.
    -   `sendMessage(text, files)`: Function to send a message in an existing chat.
    -   `startNewChat(text, files)`: Function to create a new chat session.

### Component Breakdown

-   **`pages/newChat.tsx`**: The main page component. It uses the `useParams` hook from `react-router-dom` to get the `chatId`. Based on the `chatId`, it fetches the corresponding chat data from the `ChatContext` and sets the active messages and title. It renders the main layout (`Sidebar` and `ChatArea`).

-   **`components/sidebar.tsx`**: A stateful container for the sidebar. It manages the `isCollapsed` state for desktop view and renders `TopSidebar` and `BottomSidebar`, passing down the collapsed state.

-   **`components/topSidebar.tsx`**: A complex component responsible for the upper sidebar. It includes:
    -   The application logo and the collapse/expand button.
    -   A search input with a debounced filter (`useDebounce` hook) that shows a dropdown of results.
    -   The main navigation items (`Home`, `Library`, etc.).
    -   The `RecentChats` list component.

-   **`components/inputArea.tsx`**: This is the most complex component in the application. It manages its own local state for the text input and the list of attached `files`. It handles:
    -   Text input with auto-resizing.
    -   File selection via a hidden file input, camera input, drag-and-drop, and clipboard paste.
    -   Displaying a badge with the count of attached files on the attachment icon.
    -   Rendering the `FileAttachmentPopup` to manage staged files.
    -   Calling `sendMessage` or `startNewChat` from the context when the send button is clicked.

-   **Custom Hooks:**
    -   **`hooks/useTypewriter.tsx`**: Takes a string as input and returns the `displayedText` word by word, creating a typewriter effect.
    -   **`hooks/useDebounce.tsx`**: A generic hook that takes a value and a delay, and returns a new value that only updates after the specified delay has passed. Used in the search bar.

## 7. Trade-offs and Future Improvements

This project was built as a prototype, and several trade-offs were made for the sake of rapid development.

1.  **In-Memory Database & Simulated Backend:**
    -   **Trade-off:** The biggest trade-off is that the application is entirely frontend. Chat data is stored in a simple array in `src/db/chats.ts` and is lost on page refresh. LLM responses are hardcoded and simulated in the `ChatProvider`.
    -   **Improvement:** The clear next step is to build a backend service (e.g., using Node.js/Express or Python/FastAPI). This service would manage a persistent database (e.g., PostgreSQL, MongoDB) for users and chat history, and would integrate with a real LLM API (e.g., OpenAI API, Google Gemini API).

2.  **Context API for State Management:**
    -   **Trade-off:** While simple and effective for this project's scale, the Context API can lead to performance issues in larger applications, as components may re-render unnecessarily when any part of the context value changes.
    -   **Improvement:** For a larger-scale application, consider using a more optimized state management library like [Redux Toolkit](https://redux-toolkit.js.org/) or [Zustand](https://github.com/pmndrs/zustand), which provide more granular control over component re-renders.

3.  **Missing Accessibility & Advanced UX:**
    -   **Trade-off:** To speed up development, certain UX and accessibility features were not implemented. For example, the search results dropdown is not navigable with a keyboard, and there are no loading spinners for asynchronous actions (since everything is synchronous).
    -   **Improvement:** Add full keyboard support for all interactive elements (especially the search dropdown). Implement ARIA attributes to improve screen reader support. Add loading states and error boundaries for when a real backend is introduced.

4.  **No Testing Suite:**
    -   **Trade-off:** The project currently lacks any unit, integration, or end-to-end tests.
    -   **Improvement:** Implement a testing strategy using a framework like [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to ensure code quality, prevent regressions, and document component behavior.
