# Easy-Access

Easy-Access is a fullstack web application designed to streamline the management of question papers and subjects, featuring AI-powered capabilities for enhanced productivity. The project consists of a Node.js/Express backend and a modern React frontend.

## Technology Stack

| Layer      | Technology / Library         | Purpose / Notes                                |
|------------|-----------------------------|-------------------------------------------------|
| Frontend   | React                       | UI library for building interactive interfaces  |
|            | Vite                        | Fast build tool and dev server                  |
|            | Tailwind CSS                | Utility-first CSS framework                     |
|            | DaisyUI                     | Tailwind CSS component library                  |
|            | Redux Toolkit               | State management                                |
| Backend    | Node.js                     | JavaScript runtime                              |
|            | Express                     | Web framework                                   |
|            | MongoDB                     | NoSQL database                                  |


## Special Features

- **AI-Powered Chatbot**: Integrated with Google Gemini LLM, users can ask academic questions directly in the app. Each user is limited to 3 questions per day for fair usage.
- **Fast Search & Smart Filters**: Instantly find question papers using advanced filters by subject, year, and department.
- **Organized Content**: All papers are neatly categorized, making it easy to browse and locate what you need.
- **One-Click PDF Downloads**: Download question papers instantly for offline access.
- **Secure Cloud Storage**: All uploaded files are stored securely using Cloudinary, supporting images and PDFs up to 10MB.
- **Automated Data Cleanup**: A daily scheduled job automatically cleans up old AI usage records to keep the system efficient.
- **Modern, Responsive UI**: Built with React, Tailwind CSS, and DaisyUI for a seamless experience on any device.

## Features
- User authentication and authorization
- Manage subjects and question papers
- AI-powered question answering (LLM integration)
- RESTful API
- Clean, responsive UI

## Project Structure
```
Easy-Access/
  qp-access-website/         # API collections (Bruno)
  question-paper-backend/    # Node.js/Express backend
  question-paper-frontend/   # React frontend (Vite)
```

### Why This File Structure?

**Backend (question-paper-backend):**
- Organized by feature and responsibility (controllers, services, models, routes, middleware, utils, config, cron jobs).
- Promotes separation of concerns: each folder has a clear purpose (e.g., `controller` for request handling, `service` for business logic, `model` for database schemas).
- Easier to maintain, test, and scale as the project grows.
- Middleware and utility functions are modular and reusable.
- Environment-specific configuration is isolated in the `config` folder.
- Scheduled jobs (e.g., cleanup) are kept in a dedicated `cron` folder for clarity.

**Frontend (question-paper-frontend):**
- Component-based structure: UI is split into reusable, focused components.
- `pages` for route-level views, `components` for shared UI, `services` for API calls, `controllers` for business logic.
- `contexts` and `store` for state management, following modern React best practices.
- Styles are centralized for consistency and easy theming.
- API endpoint paths are mapped in dedicated files for maintainability.
- Encourages scalability and collaboration by keeping concerns separated and code modular.

This structure follows industry best practices, making the codebase easier to navigate, extend, and onboard new contributors.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Easy-Access/question-paper-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables as needed (e.g., database, mailer, cloudinary, Gemini API key).
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Easy-Access/question-paper-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### API Collection
- The `qp-access-website` folder contains API request collections (e.g., for Bruno) to help you test and explore the backend endpoints.

## Usage
- Access the frontend at [http://localhost:5173](http://localhost:5173) (default Vite port).
- The backend runs on [http://localhost:3000](http://localhost:5000) by default.
- Register, log in, and start managing subjects and question papers.

## 🚦 Lighthouse Report

We ran a comprehensive Lighthouse audit across core pages of the Easy-Access application. The results reflect a well-optimized, accessible, and standards-compliant web experience.

### 📊 Average Scores

| Category           | Score   |
|--------------------|---------|
| 💨 Performance     | 0.49    |
| ♿ Accessibility   | 0.88    |
| ✅ Best Practices  | 1.00    |
| 🔍 SEO             | 0.91    |
| 📈 Overall Average | **81.96 / 100** |

### 📍 Pages Audited
- `/` (Home)
- `/login`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/dashboard`

### ✅ Highlights
- **100% Best Practices**: No critical issues; code follows modern web standards.
- **Strong Accessibility**: UI is usable for assistive technologies.
- **Excellent SEO**: Optimized for search engine discoverability.
- **Consistent Performance**: While performance can still be improved, the overall user experience is smooth.

> 💡 Tip: Further performance optimization can be achieved by lazy-loading non-critical assets, compressing images, and reducing main thread work.

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

