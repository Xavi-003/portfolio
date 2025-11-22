# Antony - Next Gen Portfolio

A visually stunning, interactive web developer portfolio featuring state-based morphing animations and a Gemini-powered AI assistant.

## Features

-   **Morphing UI**: Fluid state-based animations using Framer Motion.
-   **AI Assistant**: Integrated Gemini 2.5 powered chatbot ("MorphBot") to answer questions about skills and experience.
-   **Interactive Projects**: 3D tilt cards and detailed project showcases.
-   **Real-time Skills Visualization**: Animated pipeline visualization of the technical stack.
-   **Responsive Design**: Fully optimized for all devices with a mobile-first approach.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **AI**: Google Gemini API (`@google/genai`)
-   **Icons**: Lucide React

## Getting Started

### Prerequisites

-   Node.js (v20+ recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Xavi-003/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    -   Create a `.env` file in the root directory.
    -   Add your Gemini API key:
        ```env
        VITE_API_KEY=your_gemini_api_key_here
        ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## Deployment

This project is configured to deploy to **GitHub Pages** using GitHub Actions.

1.  Push your changes to the `main` branch.
2.  The GitHub Action defined in `.github/workflows/deploy.yml` will automatically build and deploy the site.
3.  Ensure your repository Settings > Pages source is set to **GitHub Actions**.

## License

MIT
