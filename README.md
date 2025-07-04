# Multi-Layer Portfolio Website

A beautiful, interactive portfolio website built with React and TypeScript featuring a unique three-layer horizontal scrolling design.

## Features

- **Three-Layer Architecture:**
  - **Background Layer**: Static gradient background with animated colors
  - **Middle Layer**: Horizontal scrolling project carousel that moves as you scroll
  - **Top Layer**: Static navigation and name display

- **Interactive Elements:**
  - Smooth horizontal scrolling tied to vertical scroll position
  - Hover effects on project cards
  - Responsive design for mobile and desktop
  - Beautiful gradient animations

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 with animations
- Google Fonts (Playfair Display, Inter)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Main styles with three-layer layout
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## How It Works

- The website uses `position: fixed` layers to create the three-layer effect
- The middle layer transforms horizontally based on the scroll position
- The scroll spacer element enables vertical scrolling
- CSS animations create smooth transitions and hover effects

## Customization

To customize the portfolio:

1. **Update Projects**: Modify the `projects` array in `App.tsx`
2. **Change Colors**: Update the gradient colors in `App.css`
3. **Modify Layout**: Adjust the layer positioning and sizing
4. **Add Content**: Replace placeholder images with your actual project images

## Browser Support

This website uses modern CSS features including:
- CSS Grid and Flexbox
- CSS Transforms and Transitions
- Backdrop Filter (with fallbacks)
- CSS Custom Properties

Supported browsers: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+ 