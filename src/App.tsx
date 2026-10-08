import { Cursor, GoTrail } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Stack } from "./components/Stack";
import { Projects } from "./components/Projects";
import { Journey } from "./components/Journey";
import { Contact } from "./components/Contact";
import { ParallaxField } from "./components/ParallaxField";
import { GopherDefs } from "./components/Gopher";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-paper text-ink">
      <ParallaxField />
      <GopherDefs />
      <Cursor />
      <GoTrail />
      <Nav />
      <div className="relative z-10">
        <main>
          <Hero />
          <About />
          <Stack />
          <Projects />
          <Journey />
        </main>
        <Contact />
      </div>
    </div>
  );
}
