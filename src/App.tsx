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
    title: "Infinite Vertical Platformer Video Game",
    description: "A doodle-jump inspired infinite vertical platformer game with custom physics enginebuilt from scratch in C. The player can jump to avoid obstacles and collect power-ups. The game is built using the POSIX API and the SDL2 library.",
    image: "/assets/beaver_jump.jpg",
    technologies: ["C", "POSIX API", "SDL", "Physics Engine"],
    url: "https://emadee05.github.io/beaver-jump/"
  },
  {
    id: 3,
    title: "LLM Stock Market Analysis Tool",
    description: "Full-stack stock market analysis web app with Flask and PostgreSQL. Enables real-time data visualization via Plotly based on user-input tickers and date ranges.",
    image: "/assets/tracker.png",
    technologies: ["Python", "BeautifulSoup", "Docker", "PostgreSQL", "Flask", "Plotly"],
    url: "https://github.com/emadee05/tracker/"
  },
  {
    id: 4,
    title: "ABEL Implementation of CPU",
    description: "An 8-bit Harvard architecture CPU implemented in ABEL, a hardware description language. Designed a 16-bit instruction register with decoding logic and state machien for multi-cycle instructions.",
    image: "/assets/ee10a_block.png",
    technologies: ["ABEL"],
    url: "https://drive.google.com/drive/u/0/folders/1IW7x9k5_Rk9Q2UsXXnLtLVG3HTW88-KF"
  },
];

function App() {
  const [scrollX, setScrollX] = useState(0);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activePage, setActivePage] = useState<'projects' | 'about' | 'resume'>('about');

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
    { title: 'Software Engineer/Machine Learning Intern', company: 'hireEZ', time: '2025–Present', bullets: ['ML for job matching'] },
    { title: 'Undergraduate Researcher', company: 'Autonomous Robotics and Control Lab', time: '2025–Present', bullets: ['ML for the Indy Autonomous Challenge'] },
    { title: 'Undergraduate Researcher', company: 'Golwala Group', time: '2023-2024', bullets: ['Circuits for dark matter detection'] },
    { title: 'Canadian Team Captain', company: 'International Young Physicists Tournament', time: '2022', bullets: ['Thesis-defense style research competition'] },

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
          style={{ transform: `translateX(-${scrollX}px)` }}
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
              Hi! I'm Emily Xu, a rising junior at Caltech studying Electrical Engineering with a focus in Intelligent Systems. I have experience in physics, robotics, and machine learning. I'm interested in software engineering, machine learning, quantitative trading, and robotics.
            </p>
            <div className="about-buttons">
              <a href="https://github.com/emadee05" target="_blank" rel="noopener noreferrer" className="about-link-button">
                GitHub
              </a>
              <a href="mailto:exu@caltech.edu" className="about-link-button">
                Email
              </a>
              <a href="https://linkedin.com/in/emilyyhxu" target="_blank" rel="noopener noreferrer" className="about-link-button">
                LinkedIn
              </a>
            </div>
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
              <li>NASA Big Idea Challenge Finalist 2024</li>
              <li>International Young Physicists' Tournament Bronze 2022</li>
              <li>Carnegie Mellon Womens Mathematics Competition 2022</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="top-layer">
        <div className="resume-button">
        <a href="/Emily_Xu_2025_Resume.pdf" onClick={e => { e.preventDefault(); window.open('/Emily_Xu_2025_Resume.pdf', '_blank', 'noopener,noreferrer'); }} className="navbar-button">Resume</a>
        </div>
        
        <div className="name-section">
          <h1>Emily Xu</h1>
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
