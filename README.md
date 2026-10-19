# WPP Amendment QC Dashboard

An AI-assisted quality control and amendment validation web dashboard for WPP creative campaigns and brand assets.

## Overview

The **WPP Amendment QC Dashboard** enables brand teams, art directors, and production designers to validate campaign artwork amendments automatically against stakeholder comments and brand guidelines.

### Features

- **Full-Viewport Enterprise UI**: Built for desktop viewports with responsive sidebar, navigation, and header controls.
- **Three-Panel File Ingestion**:
  - `Original V1` (`Campaign_V1.pdf`)
  - `Orchestra Comments` (`BM_Comments.pdf`)
  - `Revised File` (`Campaign_Amended.pdf`)
- **Direct Comparison Area**: Side-by-side high-resolution inspection of campaign artwork amendments.
- **QC Results & AI Validation Breakdown**:
  - Circular progress ring (`4/5 Comments completed`)
  - Status summary counters (Completed, Missed, Unintended changes, Needs review)
  - Interactive amendment comment verification list
- **Full Report Modal**: Detailed line-by-line validation audit log with confidence scores and PDF export.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: Pure Modern CSS with custom tokens and Inter typography
- **Icons**: Custom lightweight SVG vector system

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/zain-atif-khan/wpp-qc.git
cd wpp-qc

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```
