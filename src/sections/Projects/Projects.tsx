import { useMemo, useState } from "react";
import { PROJECTS, type Project } from "@/constants/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import { ProjectModal } from "@/components/ProjectModal/ProjectModal";
import { Img } from "@/components/Img";
import styles from "./Projects.module.scss";

const ALL = "Todos";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    [],
  );
  const visible = filter === ALL ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.head}>
        <div>
          <Reveal>
            <p className={styles.eyebrow}>Selecionados</p>
          </Reveal>
          <h2>
            <SplitText text="Projetos" />
          </h2>
        </div>
        <Reveal delay={0.1}>
          <span className={styles.count}>{PROJECTS.length} obras · 2022—2024</span>
        </Reveal>
      </div>

      <div className={styles.filters} role="group" aria-label="Filtrar por categoria">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.chip} ${filter === c ? styles.chipActive : ""}`}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08} layout>
            <button
              type="button"
              className={styles.card}
              data-cursor="Ver Projeto"
              onClick={() => setActive(p)}
              aria-label={`Ver projeto ${p.title}, ${p.city}`}
            >
              <div className={styles.frame}>
                <Img src={p.image} alt={p.title} sizes="(max-width:768px) 92vw, 46vw" />
                <div className={styles.veil} />
                <span className={styles.cat}>{p.category}</span>
              </div>
              <div className={styles.info}>
                <div>
                  <h3>{p.title}</h3>
                  <p className={styles.place}>{p.city}</p>
                </div>
                <div className={styles.meta}>
                  <span>{p.year}</span>
                  <span>{p.area}</span>
                </div>
              </div>
              <div className={styles.rule} />
            </button>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
