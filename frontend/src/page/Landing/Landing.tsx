import { Link } from "react-router-dom";
import { Mail, ArrowRight, Send, Users, Zap } from "lucide-react";

function Landing() {
  return (
    <div className="bes-shell min-h-screen flex flex-col">
      {/* Nav */}
      <header className="max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 grid place-items-center shadow-lg shadow-violet-500/30">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">Sendly</span>
        </div>
        <nav className="hidden sm:flex items-center gap-7 text-sm text-[var(--bes-text-muted)]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <Link to="/compose" className="bes-btn bes-btn-primary text-sm">
          Get started <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-xs text-violet-300 mb-6">
            <Zap className="w-3.5 h-3.5" />
            New — dynamic variables & JSON export
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Bulk email,
            <br />
            <span className="text-[var(--bes-text-muted)]">made simple.</span>
          </h1>

          <p className="mt-6 text-lg text-[var(--bes-text-muted)] max-w-xl mx-auto">
            Compose once, personalize for everyone. A clean five-step composer to send
            beautiful emails to your whole list in minutes.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/compose" className="bes-btn bes-btn-primary">
              <Send className="w-4 h-4" /> Start composing
            </Link>
            <a href="#features" className="bes-btn">See how it works</a>
          </div>

          <p className="mt-4 text-xs text-[var(--bes-text-dim)]">
            No credit card · Free for your first 100 sends
          </p>

          {/* Tiny feature row */}
          <div
            id="features"
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left"
          >
            <Feature
              icon={<Users className="w-4 h-4" />}
              title="Recipient lists"
              desc="Paste, type, or import — chip-based, fast."
            />
            <Feature
              icon={<Zap className="w-4 h-4" />}
              title="Dynamic fields"
              desc="Personalize with {{name}}, {{company}}, anything."
            />
            <Feature
              icon={<Send className="w-4 h-4" />}
              title="Review & dispatch"
              desc="One click to send. Copy the JSON if you'd rather."
            />
          </div>
        </section>
      </main>

      <footer className="text-center text-xs text-[var(--bes-text-dim)] py-8">
        © Sendly — quiet email tools
      </footer>
    </div>
  );
}

export default Landing;

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bes-card p-5">
      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-violet-300 mb-3">
        {icon}
      </div>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-[var(--bes-text-muted)] mt-1 leading-relaxed">{desc}</div>
    </div>
  );
}
