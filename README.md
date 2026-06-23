# Anki Visual Builder

A visual desktop application designed for building Anki card layouts using a modern drag-and-drop interface. The application features recursive space splitting via a CSS Grid system, text attribute customization, independent visibility control for Front/Back card templates, and real-time HTML/CSS code compilation compatible with Anki Desktop.

The project is powered by Tauri (Rust) and React (Vite + Tailwind CSS).

---

## 1. Prerequisites

Before installing and running the application, ensure your system has the following core development tools installed:

### Windows
*   **Node.js**: Latest LTS version (v18 or v20+ recommended).
*   **Rust Toolchain**:
    *   Download and run `rustup-init.exe` from the official Rust website.
    *   Proceed with the default installation option.
*   **C++ Build Tools**:
    *   Tauri requires the Visual Studio C++ Build Tools to compile Rust code into a native binary on Windows.
    *   During installation or via the Visual Studio Installer, select the **Desktop development with C++** workload.

### macOS
*   **Node.js**: Version v18+.
*   **XCode Command Line Tools**: Run the following command in your Terminal:
    ```bash
    xcode-select --install
    ```
*   **Rust**: Install via the official toolchain installer:
    ```bash
    xcode-select --install
    ```
*   **Rust**: Install via the official toolchain installer:
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

## 2. Installation & Setup

Once the prerequisites are met, follow these steps to set up and launch the project in your local development environment:

1.  Initialize Git and clone/download the repository to your local machine.

2.  Navigate to the project root directory:
    ```bash
    cd Anki-Builder
    ```

3.  Install the frontend dependencies (Node modules):
    ```bash
    npm install
    ```

4.  Launch the application within the Tauri development runtime:
    ```bash
    npm run tauri dev
    ```
    **Note**: The initial launch will take a few minutes as Cargo (Rust's package manager) downloads the Tauri core crates and compiles the native application binary for the first time.

## 3. Core Tech Stack

*   **Framework**: Tauri v1 (Enables ultra-lightweight cross-platform desktop applications built with Rust).
*   **Frontend**: React JS bundled with Vite (Provides instantaneous Hot Module Replacement - HMR).
*   **Drag and Drop Engine**: `@dnd-kit/core` and `@dnd-kit/utilities` (Utilizes pointer-coordinate-based dragging instead of native HTML5, ensuring smooth interactions inside system Webviews).
*   **Styling & Layout**: Tailwind CSS (Speeds up UI assembly and powers the responsive Grid/Flexbox mechanics).

## 4. Key Features Implemented

*   **Modern Pointer Drag-and-Drop**: Leverages `@dnd-kit` to bypass native HTML5 drag limitations, eliminating pointer lock and security-sandbox issues across different OS Webviews.
*   **Recursive Grid System**: Uses CSS Grid Templates to recursively split design blocks into exact 50/50 geometric ratios, resolving content-stretching layout bugs common in Flexbox sub-nesting.
*   **Advanced Property Panel**: Offers direct, interactive controls for box background colors, border radiuses, font sizes, text colors, web-safe system fonts, text alignment, bolding, and italics.
*   **Card Side Visibility Controls**: Uses an intelligent tagging system allowing users to configure specific layout blocks to render exclusively on the Front Template or the Back Template.
*   **Multi-Tab Exporter**: Compiles layout structures into separate, clean tabs for Front HTML and Back HTML, alongside a shared CSS Styling field, built for direct copy-pasting into Anki.