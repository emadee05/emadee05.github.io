import { useState, useEffect, useRef } from 'react'
import './App.css'

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  url?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Hand Gesture Classifier",
    description: "A hand gesture classifier using a custom-built 6x6 photodiode array and neural network model. Built using trans-impedence amplifier and Arduino Micro, modeled and verified TIA circuit using LTSpice, optimized signal fidelity.",
    image: "/assets/circuit.jpg",
    technologies: ["Fritzing", "Python", "Arduino"],
    url: "https://github.com/emadee05/hand-gesture"
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
  const [activePage, setActivePage] = useState<'projects' | 'about' | 'resume'>('projects');

  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const [resumeScrollX, setResumeScrollX] = useState(0);
  const [resumeMaxScroll, setResumeMaxScroll] = useState(0);

  useEffect(() => {
    const calculateMaxScroll = () => {
      if (projectsContainerRef.current) {
        const containerWidth = projectsContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const nameSpaceWidth = 200;
        setMaxScroll(Math.max(0, containerWidth - viewportWidth + nameSpaceWidth));
      }
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, []);

  useEffect(() => {
    const calculateResumeScroll = () => {
      if (resumeContainerRef.current) {
        const containerWidth = resumeContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const nameOffset = 200;
        setResumeMaxScroll(Math.max(0, containerWidth - viewportWidth + nameOffset));
      }
    };

    calculateResumeScroll();
    window.addEventListener('resize', calculateResumeScroll);
    return () => window.removeEventListener('resize', calculateResumeScroll);
  }, []);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      setScrollX(prev => Math.max(0, Math.min(prev + event.deltaY * 2, maxScroll)));
    };
    if (activePage === 'projects') {
      window.addEventListener('wheel', handleScroll, { passive: false });
      return () => window.removeEventListener('wheel', handleScroll);
    }
  }, [maxScroll, activePage]);

  useEffect(() => {
    const handleResumeScroll = (event: WheelEvent) => {
      if (activePage !== 'resume') return;
      event.preventDefault();
      setResumeScrollX(prev => Math.max(0, Math.min(prev + event.deltaY * 2, resumeMaxScroll)));
    };
    window.addEventListener('wheel', handleResumeScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleResumeScroll);
  }, [resumeMaxScroll, activePage]);

  const progressPercentage = maxScroll > 0 ? (scrollX / maxScroll) * 100 : 0;
  const resumeProgress = resumeMaxScroll > 0 ? (resumeScrollX / resumeMaxScroll) * 100 : 0;

  const experiences = [
    { title: 'Software Engineer', company: 'Company A', time: '2022–Present', bullets: ['Worked on cool stuff'] },
    { title: 'Frontend Developer', company: 'Company B', time: '2020–2022', bullets: ['Built awesome UIs'] },
    { title: 'Research Assistant', company: 'Caltech', time: 'Summer 2024', bullets: ['Explored autonomous driving'] },
    { title: 'Course Assistant', company: 'CS 156a', time: '2024–2025', bullets: ['Held machine learning office hours'] }
  ];

  return (
    <div className="app">
      <div className="background-layer">
        <div className="gradient-bg"></div>
      </div>

      <div className={`middle-layer projects-layer${activePage === 'projects' ? ' visible' : ''}`}>
        <div 
          ref={projectsContainerRef}
          className="projects-container"
          style={{ transform: `translateX(-${scrollX}px)`, paddingLeft: '1200px' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => project.url && window.open(project.url, '_blank', 'noopener,noreferrer')}
              style={{ cursor: project.url ? 'pointer' : 'default' }}
            >
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

      <div className={`middle-layer about-layer${activePage === 'about' ? ' visible' : ''}`}>
        <div className="about-content">
          <div className="about-photo">
            <img src="/assets/me_picture.jpg" alt="Emily Xu" />
          </div>
          <div className="about-description">
            <h2>About Me</h2>
            <p>
              Hi! I'm Emily Xu, a passionate full-stack developer with a love for building beautiful, functional web experiences. I enjoy working with modern technologies and bringing creative ideas to life.
            </p>
          </div>
        </div>
      </div>

      <div className={`middle-layer resume-layer${activePage === 'resume' ? ' visible' : ''}`}>
        <div className="resume-content">
          <div className="resume-scroll-container" ref={resumeContainerRef} style={{ transform: `translateX(-${resumeScrollX}px)` }}>
            <div className="resume-horizontal">
              {experiences.map((exp, idx) => (
                <div className="resume-tile" key={idx}>
                  <h3>{exp.title}</h3>
                  <p>{exp.company}, {exp.time}</p>
                  <ul>{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="awards-container">
            <h3>Awards</h3>
            <ul>
              <li>Award 1: Description</li>
              <li>Award 2: Description</li>
              {/* Add more awards as needed */}
            </ul>
          </div>
        </div>
      </div>

      <div className="top-layer">
        <div className="resume-button">
        <a href="/Emily_Xu_Resume.pdf" onClick={e => { e.preventDefault(); window.open('/Emily_Xu_Resume.pdf', '_blank', 'noopener,noreferrer'); }} className="navbar-button">Resume</a>
        </div>
        
        <div className="name-section">
          <h1>Emily Poop</h1>
        </div>
        <nav className="navbar">
          <a href="#about" onClick={e => { e.preventDefault(); setActivePage('about'); }} className={activePage === 'about' ? 'active' : ''}>About</a>
          <a href="#projects" onClick={e => { e.preventDefault(); setActivePage('projects'); }} className={activePage === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#experience" onClick={e => { e.preventDefault(); setActivePage('resume'); }} className={activePage === 'resume' ? 'active' : ''}>Experience</a>
        </nav>
      </div>

      {activePage === 'projects' && (
        <div className="scroll-indicator">
          <div className="scroll-text"><span>Scroll to explore</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progressPercentage}%` }} /></div>
        </div>
      )}
      {activePage === 'resume' && (
        <div className="scroll-indicator">
          <div className="scroll-text"><span>Scroll to explore</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${resumeProgress}%` }} /></div>
        </div>
      )}
    </div>
  );
}
// redeploy
export default App;
