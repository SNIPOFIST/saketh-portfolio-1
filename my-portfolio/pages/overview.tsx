import { NextSeo } from "next-seo";
import { useState, useEffect, useRef } from "react";
import education from "@/data/education";
import experiences from "@/data/experience";
import projects from "@/data/projects";
import skillCategories from "@/data/skills";
import Link from "@/components/Shared/Link";

/* ── Nav sections ─────────────────────────────────────────── */
const NAV_SECTIONS = [
  { id: "skills",     label: "Skills",     badge: "Skill Tree" },
  { id: "experience", label: "Experience", badge: "Battle Log" },
  { id: "projects",   label: "Projects",   badge: "Pokédex" },
  { id: "education",  label: "Education",  badge: "Origin Story" },
  { id: "video",      label: "Video",      badge: "Broadcast" },
  { id: "blog",       label: "Blog",       badge: "Field Notes" },
  { id: "contact",    label: "Contact",    badge: "Send Message" },
];

/* ── Left sidebar nav ─────────────────────────────────────── */
function SideNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="hidden lg:flex flex-col sticky top-24 self-start w-44 shrink-0 space-y-1 pr-4">
      <p className="font-pokemon text-[0.4rem] text-poke-yellow/40 uppercase tracking-widest mb-3">
        ▶ Sections
      </p>
      {NAV_SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="text-left px-3 py-2 rounded-md transition-all duration-200 group"
            style={{
              background: isActive ? "rgba(255,215,0,0.07)" : "transparent",
              border: isActive ? "1px solid rgba(255,215,0,0.25)" : "1px solid transparent",
            }}
          >
            <span
              className="font-pokemon text-[0.5rem] uppercase tracking-widest transition-all duration-200 block"
              style={
                isActive
                  ? {
                      color: "#FFD700",
                      textShadow:
                        "0 0 6px #FFD700, 0 0 12px #FFD700, 0 0 24px rgba(255,215,0,0.5)",
                    }
                  : { color: "rgba(255,255,255,0.35)" }
              }
            >
              {s.label}
            </span>
            {isActive && (
              <span className="block h-px mt-1 rounded-full bg-gradient-to-r from-poke-yellow/60 to-transparent" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ── Reusable section header ─────────────────────────────── */
const SectionHeader = ({ badge, title }: { badge: string; title: string }) => (
  <div className="mb-6 flex items-center space-x-4">
    <span className="font-pokemon text-[0.5rem] text-poke-red tracking-widest uppercase">
      ▶ {badge}
    </span>
    <h2 className="font-pokemon text-lg text-poke-yellow">{title}</h2>
    <span className="h-px flex-1 bg-poke-yellow/20" />
  </div>
);

/* ── Blog helpers ─────────────────────────────────────────── */
const BlogH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-pokemon text-[0.65rem] text-poke-yellow mt-8 mb-3 leading-relaxed tracking-wide">
    {children}
  </h3>
);
const BlogH4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-pokemon text-[0.55rem] text-orange-400 mt-6 mb-2 leading-relaxed">
    {children}
  </h4>
);
const BlogP = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-300 leading-relaxed text-[0.92rem] mb-3">{children}</p>
);
const BlogLi = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 mb-2">
    <span className="text-poke-yellow mt-1 shrink-0">◆</span>
    <span className="text-gray-300 text-sm leading-relaxed">{children}</span>
  </li>
);

/* ── Main page ────────────────────────────────────────────── */
export default function OverviewPage() {
  const [titleHovered, setTitleHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("skills");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to top of viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <NextSeo
        title="Overview"
        description="Saketh Kilaru — Applied Data Science journey, projects, skills, and experience."
      />
      <div className="flex flex-col pt-10 pb-20 space-y-10">

        {/* ════════ PAGE HEADER ════════ */}
        <div>
          <div className="mb-3 flex items-center space-x-3">
            <span className="h-px w-8 bg-poke-yellow/40" />
            <span className="font-pokemon text-[0.45rem] text-poke-yellow/60 tracking-widest uppercase">
              Trainer Dossier
            </span>
          </div>
          <h1
            className="font-pokemon text-2xl md:text-3xl leading-relaxed transition-all duration-200"
            style={{
              color: "#f0f0f0",
              textShadow: titleHovered
                ? "0 0 7px #fff,0 0 10px #fff,0 0 21px #fff,0 0 42px #f97316,0 0 82px #f97316,0 0 92px #ea580c,0 0 102px #dc2626"
                : "0 0 6px rgba(255,215,0,0.15)",
            }}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
          >
            🔥 Overview
          </h1>
          <p className="mt-3 text-gray-400 max-w-xl">
            A complete look at Saketh Kilaru — skills, experience, projects, education, and a
            reflection on the Applied Data Science journey at Syracuse University.
          </p>
        </div>

        {/* ════════ QUICK STATS ════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Years Exp", value: "2" },
            { label: "Projects",  value: "10+" },
            { label: "Tools",     value: "25+" },
            { label: "GPA",       value: "3.9" },
          ].map((s) => (
            <div key={s.label} className="poke-card p-4 text-center">
              <p className="font-pokemon text-xl text-poke-yellow">{s.value}</p>
              <p className="font-pokemon text-[0.42rem] text-gray-500 mt-1 uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ════════ MAIN LAYOUT (sidebar + content) ════════ */}
        <div className="flex gap-8 items-start">
          {/* Left sidebar nav */}
          <SideNav active={activeSection} />

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-20">

            {/* ── SKILLS ── */}
            <section id="skills">
              <SectionHeader badge="Skill Tree" title="Skills" />
              <div className="grid gap-4 md:grid-cols-2">
                {skillCategories.map((cat) => (
                  <div key={cat.category} className="poke-card p-5">
                    <p className="font-pokemon text-[0.48rem] text-poke-yellow/70 uppercase tracking-widest mb-3">
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-sm border border-poke-yellow/15 bg-poke-dark/60 px-2.5 py-0.5 text-xs text-gray-400 font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── EXPERIENCE ── */}
            <section id="experience">
              <SectionHeader badge="Battle Log" title="Experience" />
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="poke-card p-5">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="font-pokemon text-[0.6rem] text-white">{exp.company}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">{exp.role}</p>
                      </div>
                      <span className="font-pokemon text-[0.4rem] text-gray-600 shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="text-poke-yellow mt-0.5">◆</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PROJECTS ── */}
            <section id="projects">
              <SectionHeader badge="Pokedex" title="Projects" />
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} noGradientUnderline>
                    <div className="poke-card p-4 h-full group">
                      <div className="text-2xl mb-2">{p.iconEmoji}</div>
                      <h3 className="font-pokemon text-[0.55rem] text-white group-hover:text-poke-yellow transition-colors leading-snug mb-2">
                        {p.name}
                      </h3>
                      <p className="text-xs text-gray-500">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── EDUCATION ── */}
            <section id="education">
              <SectionHeader badge="Origin Story" title="Education" />
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="poke-card p-5">
                    <div className="flex flex-col md:flex-row md:justify-between gap-1">
                      <div>
                        <h3 className="font-pokemon text-[0.6rem] text-poke-yellow">
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-gray-400 mt-0.5">{edu.degree}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-pokemon text-[0.4rem] text-gray-600">
                          {edu.period}
                        </span>
                        {edu.gpa && (
                          <p className="font-pokemon text-[0.48rem] text-poke-yellow mt-0.5">
                            GPA {edu.gpa}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── VIDEO ── */}
            <section id="video">
              <SectionHeader badge="Broadcast" title="Video" />
              <div className="poke-card overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-poke-red via-poke-yellow/40 to-transparent" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📺</span>
                    <h3 className="font-pokemon text-[0.6rem] text-poke-yellow leading-snug">
                      Saketh Kilaru — Featured Video
                    </h3>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      overflow: "hidden",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,215,0,0.2)",
                    }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/M3uK4MBPbqQ"
                      title="Saketh Kilaru — Featured Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── BLOG ── */}
            <section id="blog">
              <SectionHeader badge="Field Notes" title="Blog" />

              <article className="poke-card overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-poke-red via-orange-400 to-poke-yellow" />

                <div className="p-8">
                  {/* Blog title */}
                  <div className="mb-8 border-b border-poke-yellow/15 pb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">🔥</span>
                      <span className="font-pokemon text-[0.45rem] text-poke-red tracking-widest uppercase">
                        Field Notes
                      </span>
                    </div>
                    <h2
                      className="font-pokemon text-base md:text-lg leading-relaxed fire-glow"
                      style={{ color: "#fff" }}
                    >
                      My Journey Through the Applied Data Science Program
                    </h2>
                    <p className="mt-3 text-sm text-gray-500">
                      A reflection on the courses, projects, and how thinking about data science
                      evolved during the MSADS program at Syracuse University.
                    </p>
                  </div>

                  {/* Introduction */}
                  <BlogH3>Introduction</BlogH3>
                  <BlogP>
                    When I first joined the Master&apos;s program in Applied Data Science at Syracuse
                    University, I had a clear goal: become a data scientist who could build meaningful,
                    real-world solutions. I was particularly interested in machine learning and AI, but
                    at the time my understanding centered around building models and achieving good
                    accuracy. I assumed that being a strong data scientist meant being good at coding
                    and understanding algorithms.
                  </BlogP>
                  <BlogP>
                    Over the course of the program, my perspective evolved significantly. I began to
                    understand that data science is not just about models — it is about solving
                    problems, communicating insights, and creating systems that can drive real
                    decisions. This blog reflects on that journey.
                  </BlogP>

                  {/* Why AI + NLP */}
                  <BlogH3>Why I Chose the AI and NLP Track</BlogH3>
                  <BlogP>
                    One of the most important decisions I made was selecting the Artificial
                    Intelligence and Natural Language Processing tracks. I was fascinated by how
                    machines can learn patterns from data and generate intelligent outputs. NLP stood
                    out because of its relevance in modern applications — chatbots, recommendation
                    systems, large language models.
                  </BlogP>
                  <BlogP>
                    Tools like GPT and transformer-based models were rapidly gaining popularity, and I
                    wanted to understand how they worked under the hood. I also saw NLP as a field with
                    strong real-world applications: improving user experience, automating workflows,
                    and extracting insights from unstructured data.
                  </BlogP>
                  <BlogP>
                    The coursework in NLP pushed me to experiment with tokenization, embedding spaces,
                    and sequence-to-sequence models. I built a Named Entity Recognition system and
                    experimented with fine-tuning BERT for classification tasks — experiences that
                    fundamentally shaped how I think about text data today.
                  </BlogP>

                  {/* PLOs */}
                  <BlogH3>Program Learning Outcomes — How I Achieved Them</BlogH3>
                  <BlogP>
                    The Applied Data Science program emphasizes several core learning outcomes. Here
                    is how I developed each through coursework and projects.
                  </BlogP>

                  <BlogH4>1. Data Collection, Storage, and Access</BlogH4>
                  <BlogP>
                    In many projects the data was messy, incomplete, or spread across multiple
                    sources. In my fire dashboard project I worked with datasets requiring significant
                    cleaning, transformation, and integration. I learned to use Python, SQL, and data
                    processing libraries to collect and structure data efficiently — skills that became
                    critical during my Amazon internship where I worked with large-scale operational
                    data.
                  </BlogP>
                  <BlogP>
                    I also explored database design and query optimization — understanding that
                    retrieving data efficiently is just as important as storing it correctly.
                    Working with relational and NoSQL systems gave me a well-rounded perspective on
                    data storage trade-offs.
                  </BlogP>

                  <BlogH4>2. Generating Actionable Insights</BlogH4>
                  <BlogP>
                    In the SU Hoops SAIL project, the goal was not just to build a model — it was to
                    provide insights that coaches could use to reduce injuries. By identifying patterns
                    in muscle imbalance, we defined a &quot;safe zone&quot; and highlighted players at
                    risk. This taught me how to translate technical results into actionable
                    recommendations.
                  </BlogP>

                  <BlogH4>3. Visualization and Predictive Modeling</BlogH4>
                  <BlogP>
                    I worked on classification, regression, and time-series tasks. I learned to
                    evaluate models on accuracy, precision, recall, and ROC-AUC — and how to avoid
                    pitfalls like overfitting. But I also learned that models alone are not enough.
                    In the fire dashboard project, interactive visualizations made patterns accessible
                    to stakeholders without technical expertise.
                  </BlogP>

                  <BlogH4>4. Programming for Data Science</BlogH4>
                  <BlogP>
                    The program strengthened proficiency in Python and R. I became comfortable with
                    Pandas, NumPy, scikit-learn, and PyTorch. More importantly I learned to write
                    clean, modular, reproducible code — critical in collaborative projects and
                    internships.
                  </BlogP>

                  <BlogH4>5. Communication of Insights</BlogH4>
                  <BlogP>
                    Early in the program I focused heavily on technical details and often struggled to
                    explain work clearly to non-technical audiences. Over time I learned to structure
                    explanations around problem, approach, and impact. The DataThon26 competition
                    required presenting findings to judges in an accessible way — a skill I carry
                    forward.
                  </BlogP>

                  <BlogH4>6. Ethics in Data Science</BlogH4>
                  <BlogP>
                    Ethical considerations became increasingly important as I worked on more complex
                    projects. Data privacy, bias, and transparency are critical in real-world
                    applications. In predictive models, I had to consider whether data might contain
                    biases and how they could affect results — and the importance of being transparent
                    about model limitations.
                  </BlogP>

                  {/* Key projects */}
                  <BlogH3>Key Projects and Their Impact</BlogH3>

                  <div className="space-y-4">
                    {[
                      {
                        emoji: "🏀",
                        title: "SU Hoops SAIL Project",
                        body: "Predicted injury risk in basketball players using physiological and performance data. By analyzing muscle imbalance we identified patterns indicating higher injury risk. This project taught me the importance of domain knowledge and how combining it with data science leads to meaningful, actionable insights.",
                      },
                      {
                        emoji: "🔥",
                        title: "Fire Risk Dashboard",
                        body: "Built an interactive dashboard to visualize fire risk data. The goal was to make complex geospatial and temporal data accessible and actionable. This improved my skills in data visualization and user experience design — showing how presentation of data is just as important as the analysis itself.",
                      },
                      {
                        emoji: "🏆",
                        title: "DataThon26",
                        body: "Built predictive models under time constraints. Required quick decision-making, efficient feature engineering, and effective teamwork. This experience taught me how to prioritize tasks and deliver results under pressure — and reinforced that feature engineering is decisive in real-world competitions.",
                      },
                      {
                        emoji: "⚙️",
                        title: "Predictive Maintenance",
                        body: "Predicted machine failures using sensor data. Involved handling imbalanced datasets and building robust XGBoost and Random Forest models. This reinforced real-world challenges in machine learning and the importance of choosing the right evaluation metrics (precision, recall, F1).",
                      },
                      {
                        emoji: "🤖",
                        title: "RAG-based Personal Assistant",
                        body: "Built a Retrieval-Augmented Generation system that answers questions over a custom knowledge base. This project deepened my understanding of vector databases, embedding models, and how LLMs can be grounded with factual context — a powerful pattern for enterprise AI applications.",
                      },
                      {
                        emoji: "📧",
                        title: "Email Spam Detection",
                        body: "Developed a supervised learning pipeline to classify emails as spam or legitimate. Combined TF-IDF vectorization with ensemble classifiers and deployed the model as a live Flask web application — end-to-end from dataset to production-ready service.",
                      },
                    ].map((proj) => (
                      <div
                        key={proj.title}
                        className="flex items-start gap-4 rounded-lg border border-poke-yellow/10 bg-poke-dark/40 p-4"
                      >
                        <span className="text-2xl shrink-0">{proj.emoji}</span>
                        <div>
                          <p className="font-pokemon text-[0.55rem] text-poke-yellow mb-1">
                            {proj.title}
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed">{proj.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Internship */}
                  <BlogH3>Internship and Real-World Experience</BlogH3>
                  <BlogP>
                    My internship at Amazon was a major highlight of the program. I worked on
                    analyzing large-scale data and building AI-powered systems to improve operational
                    efficiency.
                  </BlogP>
                  <ul className="mb-4">
                    <BlogLi>
                      Reduced information lookup time from over 15 minutes to under 1 minute — a
                      significant productivity improvement.
                    </BlogLi>
                    <BlogLi>
                      Contributed to reducing L1 workload by approximately 25% through automated
                      analysis pipelines.
                    </BlogLi>
                    <BlogLi>
                      Demonstrated how data science can create tangible, measurable business impact.
                    </BlogLi>
                    <BlogLi>
                      Collaborated with cross-functional teams to integrate data pipelines into
                      existing workflows — experience that sharpened both my technical and
                      communication skills.
                    </BlogLi>
                    <BlogLi>
                      Gained hands-on experience with AWS services including S3, Glue, and Athena,
                      reinforcing cloud-native data engineering practices.
                    </BlogLi>
                  </ul>

                  {/* Tools & Technologies */}
                  <BlogH3>Tools and Technologies That Shaped Me</BlogH3>
                  <BlogP>
                    Every course and project introduced new tools. Over time I developed a personal
                    stack that I reach for regularly:
                  </BlogP>
                  <div className="grid gap-3 md:grid-cols-3 mb-4">
                    {[
                      { cat: "Data Engineering", tools: "Python · SQL · Apache Spark · Airflow · dbt" },
                      { cat: "Machine Learning", tools: "scikit-learn · XGBoost · PyTorch · HuggingFace" },
                      { cat: "Cloud & Infra",    tools: "AWS (S3, Glue, Athena) · Docker · Git" },
                      { cat: "NLP",              tools: "BERT · spaCy · NLTK · LangChain · FAISS" },
                      { cat: "Visualization",    tools: "Tableau · Plotly · Matplotlib · Seaborn" },
                      { cat: "Databases",        tools: "PostgreSQL · MySQL · MongoDB · Snowflake" },
                    ].map((item) => (
                      <div
                        key={item.cat}
                        className="rounded-lg border border-poke-yellow/10 bg-poke-dark/40 p-3"
                      >
                        <p className="font-pokemon text-[0.45rem] text-poke-yellow mb-1.5 uppercase tracking-widest">
                          {item.cat}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.tools}</p>
                      </div>
                    ))}
                  </div>

                  {/* Favourite class */}
                  <BlogH3>My Favorite Class — IST 688: Human-Centered AI</BlogH3>
                  <div className="rounded-lg border border-poke-yellow/25 bg-poke-dark/50 p-5 mb-4"
                    style={{ boxShadow: "0 0 18px rgba(255,215,0,0.06)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <p className="font-pokemon text-[0.55rem] text-poke-yellow leading-snug">
                          IST 688 — Human-Centered Artificial Intelligence
                        </p>
                        <p className="font-pokemon text-[0.42rem] text-gray-600 mt-0.5 uppercase tracking-widest">
                          School of Information Studies · Syracuse University
                        </p>
                      </div>
                    </div>
                    <BlogP>
                      Out of every course in the program, IST 688 — Human-Centered Artificial Intelligence
                      — stands out as my absolute favorite. What made it different from every other class
                      was the lens it used: instead of asking &quot;how do we build a more accurate
                      model?&quot; it asked &quot;how do we build AI that actually serves people?&quot;
                      That shift in framing changed how I think about every technical decision I make.
                    </BlogP>
                    <BlogP>
                      The course pushed me to think beyond benchmarks and into the real-world consequences
                      of AI systems — who they affect, how they can fail, and what responsibilities
                      designers and engineers carry. We explored topics like explainability, fairness,
                      transparency, and trust. I learned that a model that scores 95% accuracy can still
                      be deeply harmful if it encodes bias or if its users can&apos;t understand or
                      challenge its decisions.
                    </BlogP>
                    <BlogP>
                      One of the most valuable things I took away was the practice of thinking about
                      stakeholders before writing a single line of code. Who will use this system? What
                      do they need to trust it? What happens when it gets it wrong? These questions now
                      come naturally to me at the start of every project.
                    </BlogP>
                    <BlogP>
                      The course also introduced me to participatory design and human-in-the-loop systems —
                      the idea that AI should augment human judgment, not replace it. In a world moving
                      fast toward automation, that principle feels more important than ever. HCAI gave me
                      the vocabulary and the ethical framework to build AI I&apos;m proud of — not just
                      AI that works.
                    </BlogP>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Explainability", "Fairness & Bias", "Human-in-the-Loop", "Trust in AI", "Participatory Design", "AI Ethics"].map((tag) => (
                        <span key={tag} className="rounded-sm border border-poke-yellow/15 bg-poke-dark/60 px-2.5 py-0.5 text-xs text-gray-400 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best parts of the program */}
                  <BlogH3>The Best Parts of the Program</BlogH3>
                  <div className="space-y-3 mb-4">
                    {[
                      {
                        emoji: "🔬",
                        label: "Project-First Learning",
                        body: "Almost every course was built around real projects, not just exams. That meant the knowledge stuck because it was applied — to real datasets, real problems, real stakeholders.",
                      },
                      {
                        emoji: "🤝",
                        label: "Collaborative Environment",
                        body: "Working alongside peers from diverse backgrounds — engineering, business, social sciences — gave every project a richer perspective. The best insights always came from the conversations, not the code.",
                      },
                      {
                        emoji: "🏢",
                        label: "Industry Connections",
                        body: "The program created pathways to real-world experience. My Amazon internship came directly out of relationships and preparation built through the iSchool — proof that the program invests in your career, not just your GPA.",
                      },
                      {
                        emoji: "🧠",
                        label: "Breadth Across the Data Stack",
                        body: "From raw data collection and SQL to deep learning and NLP — the curriculum covered the full stack of data science. I left knowing not just one slice of the field but how the pieces connect.",
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-4 rounded-lg border border-poke-yellow/10 bg-poke-dark/40 p-4">
                        <span className="text-xl shrink-0">{item.emoji}</span>
                        <div>
                          <p className="font-pokemon text-[0.52rem] text-poke-yellow mb-1">{item.label}</p>
                          <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* What surprised me */}
                  <BlogH3>Biggest Surprises</BlogH3>
                  <div className="grid gap-3 md:grid-cols-2 mb-4">
                    {[
                      {
                        label: "Communication matters as much as code",
                        body: "I initially thought technical skills were the most important. I quickly realized the ability to explain insights clearly to stakeholders is just as critical.",
                      },
                      {
                        label: "Real-world data is messy",
                        body: "Many projects required significant cleaning and preprocessing before any analysis could be done. Data quality work is often the majority of the effort.",
                      },
                      {
                        label: "Feature engineering beats model complexity",
                        body: "In every competition and project, well-crafted features consistently outperformed switching to a more complex model. Understanding your data deeply is the real competitive edge.",
                      },
                      {
                        label: "Deployment is a different skill set",
                        body: "Building a model is one thing — making it reliably available in production is another. MLOps, monitoring, and system design became topics I deeply care about.",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-poke-yellow/15 bg-poke-dark/40 p-4"
                      >
                        <p className="font-pokemon text-[0.48rem] text-orange-400 mb-2">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-500">{item.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Lessons learned */}
                  <BlogH3>Lessons I Would Tell My Past Self</BlogH3>
                  <ul className="mb-4">
                    <BlogLi>
                      Spend more time on exploratory data analysis before jumping to modeling — the
                      insights you discover will define the quality of everything that follows.
                    </BlogLi>
                    <BlogLi>
                      Version control everything, not just code. Track experiments, hyperparameters,
                      and data versions from day one.
                    </BlogLi>
                    <BlogLi>
                      Build in public. Sharing work through GitHub and writing about projects
                      creates opportunities and deepens understanding.
                    </BlogLi>
                    <BlogLi>
                      Collaborate more. The best insights in every group project came from
                      conversations, not solo work.
                    </BlogLi>
                    <BlogLi>
                      Learn the business context. A technically perfect model that doesn&apos;t
                      align with business goals creates no value.
                    </BlogLi>
                  </ul>

                  {/* How thinking evolved */}
                  <BlogH3>How My Perspective Has Changed</BlogH3>
                  <BlogP>
                    At the beginning I approached data science as a purely technical discipline —
                    algorithms, models, performance metrics. Now I see it as a problem-solving
                    discipline that requires technical skills, critical thinking, and communication
                    together. I have learned to think more about the impact of my work and how it can
                    support real decisions.
                  </BlogP>
                  <BlogP>
                    I have also developed a much greater appreciation for data infrastructure. Knowing
                    how to build a model is valuable, but knowing how to build systems that reliably
                    collect, store, and serve data at scale is what separates engineers who can
                    prototype from those who can ship production systems.
                  </BlogP>

                  {/* Future */}
                  <BlogH3>Future Goals</BlogH3>
                  <ul className="mb-4">
                    <BlogLi>
                      Continue building systems that leverage AI and ML to solve real-world problems
                      at scale.
                    </BlogLi>
                    <BlogLi>
                      Work with large language models and develop applications that improve
                      productivity and user experience.
                    </BlogLi>
                    <BlogLi>
                      Deepen understanding of scalable data systems, data engineering, and MLOps.
                    </BlogLi>
                    <BlogLi>
                      Contribute to open-source tools in the data and AI ecosystem.
                    </BlogLi>
                    <BlogLi>
                      Pursue applied research at the intersection of NLP and knowledge representation.
                    </BlogLi>
                  </ul>

                  {/* Conclusion */}
                  <BlogH3>Conclusion</BlogH3>
                  <BlogP>
                    The Applied Data Science program at Syracuse University has been a transformative
                    experience. It strengthened technical skills while helping me develop a broader
                    perspective on what it means to be a data scientist. Through coursework, projects,
                    and internships, I gained the skills and confidence to tackle complex problems and
                    create meaningful impact.
                  </BlogP>
                  <BlogP>
                    Data science is not a destination — it is an ongoing practice of curiosity,
                    learning, and building. Every project teaches something new, every dataset
                    reveals a surprise, and every deployment surfaces a lesson. I&apos;m excited to
                    keep learning and applying these skills in new and challenging contexts.
                  </BlogP>

                  {/* Sign-off */}
                  <div className="mt-8 border-t border-poke-yellow/10 pt-6 flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-pokemon text-[0.5rem] text-poke-yellow">Saketh Kilaru</p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        MS Applied Data Science · Syracuse University · 2026
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            {/* ── CONTACT ── */}
            <section id="contact">
              <SectionHeader badge="Send Message" title="Contact" />
              <div className="poke-card p-6 flex flex-wrap gap-4">
                <Link
                  href="mailto:srkilaru@syr.edu"
                  noExternalLinkIcon
                  noGradientUnderline
                  className="poke-btn rounded px-4 py-2 text-white"
                >
                  srkilaru@syr.edu
                </Link>
                <Link
                  href="https://www.linkedin.com/in/sakethkil/"
                  noExternalLinkIcon
                  noGradientUnderline
                  className="rounded border border-poke-yellow/40 bg-poke-dark/60 px-4 py-2 font-pokemon text-[0.55rem] text-poke-yellow hover:border-poke-yellow/80 transition-colors"
                >
                  LinkedIn ↗
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
