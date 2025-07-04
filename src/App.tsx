import { useState, useEffect } from 'react'
import './App.css'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    image: "https://via.placeholder.com/400x300/667eea/ffffff?text=E-Commerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "https://via.placeholder.com/400x300/f093fb/ffffff?text=Task+Manager",
    technologies: ["React", "Firebase", "TypeScript", "Material-UI"]
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with location-based forecasts",
    image: "https://via.placeholder.com/400x300/4facfe/ffffff?text=Weather+App",
    technologies: ["React", "OpenWeather API", "CSS3", "Chart.js"]
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media performance tracking",
    image: "https://via.placeholder.com/400x300/43e97b/ffffff?text=Analytics",
    technologies: ["React", "D3.js", "Express", "PostgreSQL"]
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A responsive portfolio website with modern design",
    image: "https://via.placeholder.com/400x300/38bdf8/ffffff?text=Portfolio",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  }
];

function App() {
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      setScrollX((prevScrollX) => prevScrollX + event.deltaY);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  // Calculate horizontal offset based on scroll position
  const horizontalOffset = scrollX * 0.5;

  return (
    <div className="app">
      {/* Background Layer - Static */}
      <div className="background-layer">
        <div className="gradient-bg"></div>
      </div>

      {/* Middle Layer - Moving Projects */}
      <div className="middle-layer">
        <div 
          className="projects-container"
          style={{
            transform: `translateX(-${horizontalOffset}px)`
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Layer - Static UI */}
      <div className="top-layer">
        {/* Left side name */}
        <div className="name-section">
          <h1>Portfolio</h1>
        </div>

        {/* Top navigation */}
        <nav className="navbar">
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>

      {/* Scroll spacer to enable scrolling */}
      <div className="scroll-spacer"></div>
    </div>
  )
}

export default App 