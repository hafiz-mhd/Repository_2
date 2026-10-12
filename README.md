# A R Hafiz Muhammed — Premium Cinematic Portfolio

A modern, cinematic, high-performance personal portfolio website built with **pure HTML5, CSS3, and vanilla JavaScript (zero frameworks, zero dependencies)**.

Designed with **luxury technology aesthetics**, **4D perspective depth**, layered ambient lighting, and an interactive **3D horizontal project slider**.

---

## 📂 Project Structure

```text
Portfolio_devops/
├── index.html        # Complete semantic HTML5 structure & content
├── style.css         # CSS custom properties, 4D transforms, glassmorphism, responsive styles
├── script.js         # Interactive canvas particles, 3D tilt, project slider, modal, validation
└── README.md         # Documentation, customization guide, and test checklist
```

---

## 🚀 How to Run the Website Locally

You can run this portfolio in any modern browser without installing any build tools or packages.

### Method 1: Double-Click (Direct Launch)
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Brave, Safari).

### Method 2: Python Local Server (Recommended)
Open a terminal in the project directory and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Method 3: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click `index.html` and click **"Open with Live Server"**.

---

## 🎨 Customization Guide

Every section has clear comment markers in the code so you can quickly tailor it:

### 1. Changing Name, Headline & Roles
- In [index.html](file:///e:/my%20files/Portfolio_devops/index.html):
  - Line 12: `<title>` tag.
  - Line 29-32: Monogram (`HM`) and brand logo (`Hafiz.dev`).
  - Line 60-70: Hero greeting (`Hi, I'm Ar Hafiz Muhammed`), headline, and bio summary.
  - Line 110-140: Hero profile monogram and caption.

### 2. Changing the Colour Theme
- In [style.css](file:///e:/my%20files/Portfolio_devops/style.css):
  - Lines 12–28 (`:root` block):
    ```css
    --bg-deep-navy: #080B16;      /* Primary deep midnight background */
    --bg-graphite: #111522;       /* Secondary dark graphite */
    --accent-blue: #5B8CFF;       /* Premium electric blue */
    --accent-violet: #8B5CF6;     /* Subtle violet accent */
    --text-white: #F5F7FC;        /* Soft white text */
    --text-silver: #C5CAD5;       /* Muted silver text */
    ```
  - Changing these tokens updates the whole site simultaneously.

### 3. Adding Your Real Profile Photo
- In [index.html](file:///e:/my%20files/Portfolio_devops/index.html#L115-L135), replace the `<div class="profile-avatar-art">...</div>` with your image:
  ```html
  <img src="profile.jpg" alt="Ar Hafiz Muhammed" class="profile-img" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
  ```

### 4. Updating Projects & Architecture Deep Dive
- In [index.html](file:///e:/my%20files/Portfolio_devops/index.html#L280-L470): Update project titles, tags, and GitHub / live demo links.
- In [script.js](file:///e:/my%20files/Portfolio_devops/script.js#L25-L95): Update the `ProjectDetailsData` array to adjust modal dialog details.

### 5. Connecting the Contact Form to Real Email
- Currently, the form opens a prefilled email draft via `mailto:` to `hafizmuhammedar123@gmail.com`.
- To receive messages directly in your inbox without any backend, sign up at [Formspree](https://formspree.io) (free) and set the form's `action` in [index.html](file:///e:/my%20files/Portfolio_devops/index.html#L615):
  ```html
  <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ```

---

## 🧪 Testing Checklist

- [x] **Desktop (1920x1080 / 1440x900)**: 
  - Verified 3D cards tilt smoothly on mouse move.
  - Ambient mouse spotlight follows cursor.
  - Interactive constellation canvas floats without lag.
  - 3D horizontal slider shows active center slide with angled previous/next slides.
- [x] **Tablet (768px - 1024px)**:
  - Balanced 2-column to 1-column responsive layout.
  - Touch slider supports left/right swipe gestures.
- [x] **Mobile (320px - 767px)**:
  - Animated mobile navigation toggle opens smoothly.
  - No horizontal overflow (`overflow-x: hidden`).
  - Touch buttons and links have ample tapping space.
- [x] **Keyboard Navigation & Accessibility**:
  - `Tab` navigates through all interactive links and buttons.
  - `ArrowLeft` / `ArrowRight` cycles through project slider.
  - `Escape` key closes the architecture modal dialog.
  - All form fields have linked `<label>` and error states.
- [x] **Motion Sensitivity**:
  - Fully respects `@media (prefers-reduced-motion: reduce)` by disabling canvas particles, 3D tilts, and autoplay.
