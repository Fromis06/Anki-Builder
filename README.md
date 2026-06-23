# Anki Visual Builder

A visual desktop application designed for building Anki card layouts using a modern drag-and-drop interface. The application features recursive space splitting via a CSS Grid system, text attribute customization, independent visibility control for Front/Back card templates, and real-time HTML/CSS code compilation compatible with Anki Desktop.

The project is powered by Tauri (Rust) and React (Vite + Tailwind CSS).

---

## 1. Yêu cầu hệ thống (Prerequisites)

Trước khi cài đặt và chạy ứng dụng, hãy đảm bảo hệ thống của bạn đã cài đặt các công cụ phát triển cốt lõi sau:

### Windows
*   **Node.js**: Phiên bản LTS mới nhất (khuyến nghị v18 hoặc v20+).
*   **Rust Toolchain**:
    *   Tải xuống và chạy `rustup-init.exe` từ trang web chính thức của Rust.
    *   Tiến hành với tùy chọn cài đặt mặc định.
*   **C++ Build Tools**:
    *   Tauri yêu cầu Visual Studio C++ Build Tools để biên dịch mã Rust thành tệp nhị phân gốc trên Windows.
    *   Trong quá trình cài đặt hoặc thông qua Visual Studio Installer, chọn khối lượng công việc **Desktop development with C++**.

### macOS
*   **Node.js**: Phiên bản v18+.
*   **XCode Command Line Tools**: Chạy lệnh sau trong Terminal của bạn:
    ```bash
    xcode-select --install
    ```
*   **Rust**: Cài đặt thông qua trình cài đặt toolchain chính thức:
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

## 2. Cài đặt & Thiết lập

Sau khi đáp ứng các yêu cầu hệ thống, hãy làm theo các bước sau để thiết lập và khởi chạy dự án trong môi trường phát triển cục bộ của bạn:

1.  Khởi tạo Git và clone/tải xuống repository về máy cục bộ của bạn.

2.  Điều hướng đến thư mục gốc của dự án:
    ```bash
    cd Anki-Builder
    ```

3.  Cài đặt các dependency frontend (Node modules):
    ```bash
    npm install
    ```

4.  Khởi chạy ứng dụng trong môi trường phát triển Tauri:
    ```bash
    npm run tauri dev
    ```
    **Lưu ý**: Lần khởi chạy đầu tiên sẽ mất vài phút vì Cargo (trình quản lý gói của Rust) sẽ tải xuống các crate cốt lõi của Tauri và biên dịch tệp nhị phân ứng dụng gốc lần đầu tiên.

## 3. Công nghệ cốt lõi (Core Tech Stack)

*   **Framework**: Tauri v1 (Cho phép tạo các ứng dụng desktop đa nền tảng siêu nhẹ được xây dựng bằng Rust).
*   **Frontend**: React JS được đóng gói với Vite (Cung cấp tính năng Hot Module Replacement - HMR tức thì).
*   **Drag and Drop Engine**: `@dnd-kit/core` và `@dnd-kit/utilities` (Sử dụng kéo thả dựa trên tọa độ con trỏ thay vì HTML5 gốc, đảm bảo tương tác mượt mà bên trong các Webview của hệ thống).
*   **Styling & Layout**: Tailwind CSS (Tăng tốc độ lắp ráp giao diện người dùng và cung cấp cơ chế Grid/Flexbox phản hồi).

## 4. Các tính năng chính đã triển khai (Key Features Implemented)

*   **Kéo thả con trỏ hiện đại**: Tận dụng `@dnd-kit` để vượt qua các hạn chế kéo thả HTML5 gốc, loại bỏ các vấn đề khóa con trỏ và hộp cát bảo mật trên các Webview của hệ điều hành khác nhau.
*   **Hệ thống lưới đệ quy**: Sử dụng CSS Grid Templates để chia các khối thiết kế một cách đệ quy thành các tỷ lệ hình học 50/50 chính xác, giải quyết các lỗi bố cục kéo giãn nội dung phổ biến trong việc lồng ghép Flexbox.
*   **Bảng thuộc tính nâng cao**: Cung cấp các điều khiển trực tiếp, tương tác cho màu nền hộp, bán kính đường viền, kích thước phông chữ, màu văn bản, phông chữ hệ thống an toàn web, căn chỉnh văn bản, in đậm và in nghiêng.
*   **Kiểm soát hiển thị mặt thẻ**: Sử dụng hệ thống gắn thẻ thông minh cho phép người dùng cấu hình các khối bố cục cụ thể chỉ hiển thị trên Mặt trước (Front Template) hoặc Mặt sau (Back Template).
*   **Trình xuất đa tab**: Biên dịch cấu trúc bố cục thành các tab riêng biệt, gọn gàng cho HTML Mặt trước và HTML Mặt sau, cùng với trường CSS Styling được chia sẻ, được xây dựng để sao chép-dán trực tiếp vào Anki.