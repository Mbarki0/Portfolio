import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SystemScene = lazy(() => import('./components/SystemScene'))
const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`

const projects = [
  {
    number: '01',
    title: 'Assistant RAG UEFA',
    category: 'IA générative · Projet personnel',
    image: asset('assistant-rag-uefa.jpg'),
    description: "Pipeline complet d'ingestion de PDF, recherche sémantique et génération contextualisée avec un LLM local optimisé sous contrainte VRAM.",
    tags: ['LangChain', 'Zephyr-7B', 'ChromaDB', 'Gradio'],
  },
  {
    number: '02',
    title: 'SDIS 31 · Process Mining',
    category: 'Data Science & ML · Stage R&D',
    image: asset('sdis-process-mining.jpg'),
    description: "Modèles génératifs PyTorch pour simuler des données d'intervention, audit de 53 467 lignes réelles et co-développement d'un outil de Process Mining.",
    tags: ['PyTorch', 'Data Quality', '500k lignes', 'Process Mining'],
  },
  {
    number: '03',
    title: 'API REST Java',
    category: 'Génie logiciel · Projet M1',
    image: asset('api-rest-java.jpg'),
    description: "API de gestion conçue en Java avec spécifications OpenAPI et JSON, architecture maintenable et application des principes SOLID.",
    tags: ['Java', 'REST', 'OpenAPI', 'Maven'],
  },
  {
    number: '04',
    title: 'Chat multi-utilisateurs',
    category: 'Systèmes distribués · UPPA',
    image: asset('chat-multi-utilisateur.jpg'),
    description: "Architecture client–serveur temps réel sous Linux, développée en Java et C pour gérer des flux simultanés de manière robuste.",
    tags: ['Java / C', 'TCP / UDP', 'Multithreading', 'Linux'],
  },
  {
    number: '05',
    title: 'CartoRecherche',
    category: 'Recherche sémantique · Université Toulouse III',
    image: asset('carto-recherche.jpg'),
    description: "Plateforme distribuée de cartographie et de recherche des activités scientifiques, déployée sur un réseau local d'entreprise.",
    tags: ['Python', 'PHP', 'Vector Search', 'Data'],
  },
  {
    number: '06',
    title: 'Visualisation DMN',
    category: 'Application web · UPPA',
    image: asset('visualisation-dmn.jpg'),
    description: "Application web permettant de visualiser et d'explorer des modèles décisionnels DMN directement dans le navigateur.",
    tags: ['TypeScript', 'HTML / CSS', 'DMN', 'UML'],
  },
]

const skills = [
  { code: 'LANG', title: 'Software', items: 'Java · Python · TypeScript · PHP · SQL' },
  { code: 'ARCH', title: 'Architecture', items: 'SOLID · Design Patterns · REST · OpenAPI' },
  { code: 'DIST', title: 'Distributed', items: 'TCP/IP · WebSockets · Multithreading' },
  { code: 'GEN', title: 'Generative AI', items: 'RAG · LangChain · PyTorch · LLM locaux' },
  { code: 'DATA', title: 'Data', items: 'PostgreSQL · MySQL · ChromaDB · Pandas' },
  { code: 'OPS', title: 'Engineering', items: 'Linux · Docker · Git · CI/CD · Maven' },
]

const experiences = [
  { date: '2026 — 2027', org: 'Université de Montpellier', title: 'Master Informatique · Génie Logiciel', current: true },
  { date: '05 — 08 / 2025', org: 'SDIS 31 × IRIT · Toulouse', title: 'Stage Ingénieur R&D · Data Science & ML' },
  { date: '2024 — 2026', org: 'Université Toulouse III', title: 'Master Informatique · IAFA' },
  { date: '2022 — 2024', org: 'UPPA · Pau', title: 'Licence Informatique' },
  { date: '04 — 06 / 2022', org: 'CHU Mohammed VI · Oujda', title: 'Stage Développeur Full-Stack' },
]

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Logo() {
  return (
    <a className="logo-lockup" href="#home" aria-label="Accueil — Mohammed M'BARKI">
      <span className="logo-tile"><img src={asset('logo.png')} alt="Logo personnel MBK" /></span>
      <span className="logo-copy">Mohammed M'BARKI<small>Software Systems Engineer</small></span>
    </a>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      const sections = [...document.querySelectorAll('section[id]')]
      const marker = window.innerHeight * 0.4
      const current = sections.reverse().find(section => section.getBoundingClientRect().top <= marker)
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app">
      <div className="page-noise" aria-hidden="true" />
      <header className="navbar">
        <Logo />
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigation principale">
          {['home', 'about', 'work', 'experience', 'contact'].map((id, index) => (
            <a key={id} href={`#${id}`} onClick={closeMenu} className={active === id ? 'active' : ''}>
              <span>0{index + 1}</span>{id === 'home' ? 'Accueil' : id === 'about' ? 'Profil' : id === 'work' ? 'Projets' : id === 'experience' ? 'Parcours' : 'Contact'}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={asset('CV_Mohammed_MBARKI.pdf')} download>CV <span>↓</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
          <i /><i />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-copy">
            <motion.p className="hero-kicker" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <span /> Génie logiciel · API · IA générative
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              Construire des<br /><em>systèmes intelligents</em><br />qui fonctionnent.
            </motion.h1>
            <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
              Je suis <strong>Mohammed M'BARKI</strong>, étudiant en Master Génie Logiciel. Je conçois des architectures robustes à la rencontre du logiciel, des données et de l'intelligence artificielle.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <a className="button primary" href="#work">Découvrir mes projets <span>↘</span></a>
              <a className="button ghost" href="#contact">Me contacter <span>→</span></a>
            </motion.div>
            <div className="availability"><i /> Disponible pour un stage en 2027 · puis alternance</div>
          </div>
          <motion.div className="hero-canvas" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}>
            <Suspense fallback={<div className="scene-loader"><i /><span>Initialisation du système 3D</span></div>}>
              <SystemScene />
            </Suspense>
            <div className="canvas-label top">MBK / INTELLIGENT SYSTEMS</div>
            <div className="canvas-label bottom">Déplacez le curseur pour explorer</div>
          </motion.div>
          <a className="scroll-indicator" href="#about"><span>Scroll</span><i /></a>
        </section>

        <section className="about section" id="about">
          <div className="section-orbit orbit-one" aria-hidden="true" />
          <Reveal className="section-heading">
            <p><span>01.</span> Profil</p>
            <h2>Un développeur qui pense<br /><em>architecture complète.</em></h2>
          </Reveal>
          <div className="about-grid">
            <Reveal className="about-copy">
              <p className="lead">Mon parcours traverse le développement full-stack, l'ingénierie des données et la recherche appliquée.</p>
              <p>Je transforme cette polyvalence en une spécialité : intégrer l'IA dans des produits logiciels solides, lisibles et exploitables. Une bonne idée ne devient utile que lorsqu'elle repose sur une architecture claire.</p>
              <div className="metrics">
                <div><strong>500k</strong><span>lignes simulées</span></div>
                <div><strong>6+</strong><span>projets techniques</span></div>
                <div><strong>3</strong><span>domaines réunis</span></div>
              </div>
            </Reveal>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <Reveal className="skill-card" key={skill.code} delay={index * 0.06}>
                  <span>{skill.code}</span><div className="skill-icon">{index + 1}</div><h3>{skill.title}</h3><p>{skill.items}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="work section" id="work">
          <Reveal className="section-heading work-heading">
            <p><span>02.</span> Selected work</p>
            <h2>Des projets conçus<br />comme des <em>systèmes.</em></h2>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article className={`project-card project-${index + 1}`} key={project.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}>
                <div className="project-image">
                  <img src={project.image} alt={`Visuel du projet ${project.title}`} loading="lazy" />
                  <div className="project-overlay"><span>Voir le dossier</span><i>↗</i></div>
                </div>
                <div className="project-meta"><span>{project.number}</span><p>{project.category}</p></div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="experience-visual" aria-hidden="true"><div className="core-sphere"><span>MBK</span></div><i className="ring r1" /><i className="ring r2" /><i className="ring r3" /></div>
          <Reveal className="section-heading">
            <p><span>03.</span> Parcours</p>
            <h2>Apprendre. Construire.<br /><em>Connecter.</em></h2>
          </Reveal>
          <div className="timeline">
            {experiences.map((item, index) => (
              <Reveal className="timeline-row" key={item.date} delay={index * 0.05}>
                <time>{item.date}</time><i className={item.current ? 'current' : ''} /><div><span>{item.org}</span><h3>{item.title}</h3></div>
              </Reveal>
            ))}
          </div>
          <Reveal className="certifications">
            <span>Certifications / 2026</span>
            <p>Generative AI Applications with RAG & LangChain</p>
            <p>Python for Data Science, AI & Development · IBM</p>
          </Reveal>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-stars" aria-hidden="true" />
          <Reveal className="contact-content">
            <p className="contact-kicker">04. Démarrer une conversation</p>
            <h2>Un projet complexe ?<br /><em>Construisons-le ensemble.</em></h2>
            <p>Je recherche un stage en ingénierie logicielle, API ou IA générative à partir de 2027, avec l'objectif de poursuivre en alternance.</p>
            <a className="email-button" href="mailto:mohammedmbarki960@gmail.com"><span>mohammedmbarki960@gmail.com</span><i>↗</i></a>
            <div className="socials">
              <a href="https://www.linkedin.com/in/mohammed-m-barki/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/Mbarki0" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={asset('CV_Mohammed_MBARKI.pdf')} download>CV PDF ↓</a>
            </div>
          </Reveal>
          <footer><Logo /><p>© 2026 · Mohammed M'BARKI</p><a href="#home">Retour en haut ↑</a></footer>
        </section>
      </main>
    </div>
  )
}
