import Hero from './components/hero/Hero'
import About from './components/about/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/projects/Projects'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main className="bg-dark-400">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}