# Careology UI

Careology UI is a task management web application built with React and TypeScript.

## Features

- User authentication (login and registration)
- Create, edit, and delete tasks
- Assign due dates and tags to tasks
- Search functionality to find tasks quickly
- Responsive design with Tailwind CSS
- Weather integration based on city names in tasks

## Technologies Used

- React + Vite + TypeScript
- Axios
- React Router
- Tailwind CSS
- Flowbite React
- React Query

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- docker (optional)

### Installation

1. Clone the repository:

```bash
git clone <repo_url>
```

2. Navigate to the project directory:

```bash
cd careology_ui
```

3. Install the dependencies:
   If you have docker installed run `docker-compose up -d` to load up the project with the given env

```bash
npm install
# or
yarn install
```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` to see the app.

## Project Structure

- `src/` - Main source code
  - `components/` - Reusable components
  - `hooks/` - Custom hooks
  - `interfaces/` - TypeScript interfaces
  - `layouts/` - Layout components
  - `pages/` - Page components
  - `utils/` - Utility functions
- `router.tsx` - Routing configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.ts` - Vite configuration

## Environment Variables

Create a `.env` file in the root directory and add:

```
VITE_API_URL=http://localhost:3000
```

Replace with your API URL if different.
