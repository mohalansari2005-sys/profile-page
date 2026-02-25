import About from "./components/about/About";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground antialiased">
      {/* Subtle radial glow behind content */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, hsla(243, 75%, 59%, 0.08) 0%, transparent 70%)",
        }}
      />
      <About />
    </main>
  );
}

export default App;
