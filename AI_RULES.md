### Tech Stack Overview

This application is built using a traditional web stack, prioritizing simplicity and direct browser execution.

*   **Frontend:** Standard HTML5 for structuring content, CSS3 for styling, and vanilla JavaScript for all interactive elements.
*   **Backend:** A lightweight Node.js server (`server.js`) is used to serve static files.
*   **Styling:** Custom CSS (`style.css`) is used extensively, leveraging CSS variables for a consistent theme (dark/light mode) and responsive design via media queries.
*   **Interactivity:** All client-side logic, including DOM manipulation, event handling, form processing, and calculations, is implemented using vanilla JavaScript (`script.js`, `dados.js`).
*   **Animations:** The `particles.js` library (`particles.min.js`, `app-particles.js`) provides dynamic and interactive background animations.
*   **Dependencies (Backend):** `express`, `cors`, and `body-parser` are listed in `package.json`, indicating their availability for future server-side enhancements, although they are not actively used in the current `server.js` implementation.
*   **Fonts:** The `Orbitron` font is imported from Google Fonts to give the application a futuristic aesthetic.

### Library Usage Rules

To maintain the current architecture's consistency, simplicity, and performance, please adhere to the following guidelines when developing or modifying the application:

*   **Core Frontend (HTML, CSS, JavaScript):**
    *   **HTML:** Use semantic HTML5 elements for clear structure.
    *   **CSS:** All styling should continue to be managed within `style.css`. Utilize CSS variables for theme management and responsive design. Avoid introducing external CSS frameworks (e.g., Tailwind CSS) for existing components.
    *   **JavaScript:** All client-side logic must be written in vanilla JavaScript. Do not introduce frontend frameworks (e.g., React, Vue, Angular) or TypeScript unless a complete architectural migration is explicitly requested.
*   **Background Animation:**
    *   The `particles.js` library is already integrated. Any modifications to the particle effects should be done by adjusting the configuration in `app-particles.js`.
*   **Backend (Node.js):**
    *   The `server.js` file provides basic static file serving. If new server-side functionality is required, `express`, `cors`, and `body-parser` are available in `package.json` and can be integrated into `server.js` or a new server file as needed.
*   **New Features/Components:**
    *   When implementing new interactive elements or features, prioritize solutions using vanilla JavaScript and existing CSS patterns.
    *   If a new third-party JavaScript library is deemed essential, it must be proposed with a clear justification for its benefits and a plan to minimize its impact on the existing codebase.
*   **UI Component Libraries:** Do not introduce UI component libraries such as `shadcn/ui` or `Radix UI`. All user interface elements should be crafted using custom HTML and CSS to maintain the project's current styling approach.
*   **Routing:** The application uses traditional HTML links for navigation. Do not introduce client-side routing libraries (e.g., React Router).
*   **File Structure:** Maintain the current flat file structure. Avoid introducing component-based directory structures (e.g., `src/components`, `src/pages`) unless a full migration to a component-based framework is requested.