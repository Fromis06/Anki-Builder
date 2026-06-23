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

