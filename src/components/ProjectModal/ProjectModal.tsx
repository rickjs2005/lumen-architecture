import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import type { Project } from "@/constants/site";
import { EASE } from "@/constants/anim";
import { Img } from "@/components/Img";
import styles from "./ProjectModal.module.scss";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const open = project !== null;
  const [imgIndex, setImgIndex] = useState(0);
  const images = project ? [project.image, ...project.gallery] : [];

  // ESC fecha + trava scroll do body enquanto aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // volta para a imagem de capa sempre que um novo projeto é aberto
  useEffect(() => {
    setImgIndex(0);
  }, [project?.id]);

  return (
    <AnimatePresence>
      {project && (
        <m.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <m.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Fechar"
              data-cursor="Fechar"
            >
              <span aria-hidden>&times;</span>
            </button>

            <div className={styles.frame}>
              <Img
                src={images[imgIndex] ?? project.image}
                alt={`${project.title} — imagem ${imgIndex + 1} de ${images.length}`}
                sizes="(max-width:760px) 92vw, 46vw"
              />
              <span className={styles.cat}>{project.category}</span>

              {images.length > 1 && (
                <div className={styles.thumbs} role="tablist" aria-label="Imagens do projeto">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      role="tab"
                      aria-selected={i === imgIndex}
                      aria-label={`Ver imagem ${i + 1}`}
                      className={`${styles.thumb} ${i === imgIndex ? styles.thumbActive : ""}`}
                      onClick={() => setImgIndex(i)}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.body}>
              <h3 id="project-modal-title">{project.title}</h3>
              <p className={styles.place}>{project.city}</p>

              <dl className={styles.meta}>
                <div>
                  <dt>Ano</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>Área</dt>
                  <dd>{project.area}</dd>
                </div>
                <div>
                  <dt>Categoria</dt>
                  <dd>{project.category}</dd>
                </div>
              </dl>

              <p className={styles.blurb}>{project.blurb}</p>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
