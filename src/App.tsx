import { useState, useEffect, useRef } from 'react'
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
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activePage, setActivePage] = useState<'projects' | 'about' | 'resume'>('projects'); // NEW

  // Calculate max scroll distance
  useEffect(() => {
    const calculateMaxScroll = () => {
      if (projectsContainerRef.current) {
        const containerWidth = projectsContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const nameSpaceWidth = 200; // Space for name section
        setMaxScroll(Math.max(0, containerWidth - viewportWidth + nameSpaceWidth));
      }
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, []);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      
      setScrollX((prevScrollX) => {
        const scrollSpeed = 2; // Adjust this to control scroll sensitivity
        const newScrollX = prevScrollX + (event.deltaY * scrollSpeed);
        
        // Clamp between 0 and maxScroll
        return Math.max(0, Math.min(newScrollX, maxScroll));
      });
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [maxScroll]);

  // Calculate progress percentage
  const progressPercentage = maxScroll > 0 ? (scrollX / maxScroll) * 100 : 0;

  return (
    <div className="app">
      {/* Background Layer - Static */}
      <div className="background-layer">
        <div className="gradient-bg"></div>
      </div>

      {/* Projects Layer */}
      <div
        className={`middle-layer projects-layer${activePage === 'projects' ? ' visible' : ''}`}
      >
        <div 
          ref={projectsContainerRef}
          className="projects-container"
          style={{
            transform: `translateX(-${scrollX}px)`,
            paddingLeft: '700px',
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

      {/* About Layer */}
      <div
        className={`middle-layer about-layer${activePage === 'about' ? ' visible' : ''}`}
      >
        <div className="about-content">
          <img src="https://via.placeholder.com/200x200/aaa/fff?text=Emily+Xu" alt="Emily Xu" className="about-photo" />
          <div className="about-description">
            <h2>About Me</h2>
            <p>
              Hi! I'm Emily Xu, a passionate full-stack developer with a love for building beautiful, functional web experiences. I enjoy working with modern technologies and bringing creative ideas to life.
            </p>
          </div>
        </div>
      </div>

      {/* Resume Layer */}
      <div
        className={`middle-layer resume-layer${activePage === 'resume' ? ' visible' : ''}`}
      >
        <div className="resume-content">
          <h2>Resume</h2>
          <div className="resume-tiles">
            {/* Example vertical tiles */}
            <div className="resume-tile">
              <h3>Software Engineer</h3>
              <p>Company A, 2022-Present</p>
              <ul>
                <li>Worked on cool stuff</li>
              </ul>
            </div>
            <div className="resume-tile">
              <h3>Frontend Developer</h3>
              <p>Company B, 2020-2022</p>
              <ul>
                <li>Built awesome UIs</li>
              </ul>
            </div>
            {/* Add more tiles as needed */}
          </div>
        </div>
      </div>

      {/* Top Layer - Static UI */}
      <div className="top-layer">
        {/* Left side name */}
        <div className="name-section">
          <h1>Emily Xu</h1>
        </div>

        {/* Top navigation */}
        <nav className="navbar">

          <a
            href="#about"
            onClick={e => { e.preventDefault(); setActivePage('about'); }}
            className={activePage === 'about' ? 'active' : ''}
          >About</a>
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); setActivePage('projects'); }}
            className={activePage === 'projects' ? 'active' : ''}
          >Projects</a>
          <a
            href="#resume"
            onClick={e => { e.preventDefault(); setActivePage('resume'); }}
            className={activePage === 'resume' ? 'active' : ''}
          >Resume</a>

        </nav>
      </div>

      {/* Scroll indicator (only show on projects page) */}
      {activePage === 'projects' && (
        <div className="scroll-indicator">
          <div className="scroll-text">
            <span>Scroll to explore</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progressPercentage}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App