import { useState } from "react";
import { InteractiveScene, type RoomId } from "@/three/InteractiveScene";
import { useInView } from "@/hooks/useInView";
import { Reveal } from "@/components/anim/Reveal";
import { SplitText } from "@/components/anim/SplitText";
import { SceneBoundary } from "@/components/SceneBoundary";
import { img } from "@/constants/site";
import styles from "./Interactive.module.scss";

const sceneFallback = (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${img("1600596542815-ffad4c1539a9", 1400)})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
);

const ROOMS: { id: RoomId; label: string }[] = [
  { id: "sala", label: "Sala" },
  { id: "quarto", label: "Quarto" },
  { id: "cozinha", label: "Cozinha" },
  { id: "piscina", label: "Piscina" },
];

export function Interactive() {
  const [room, setRoom] = useState<RoomId>("sala");
  const [ref, inView] = useInView<HTMLDivElement>("200px");

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <Reveal>
          <p className={styles.eyebrow}>Modelo interativo</p>
        </Reveal>
        <h2>
          <SplitText text="Gire a casa" />
        </h2>
        <Reveal delay={0.1}>
          <p>Arraste para girar · scroll para aproximar · escolha o ambiente.</p>
        </Reveal>
      </div>

      <div className={styles.stage}>
        <div
          ref={ref}
          className={styles.canvas}
          role="img"
          aria-label={`Modelo 3D da residência — ambiente em destaque: ${
            ROOMS.find((r) => r.id === room)?.label
          }.`}
        >
          <SceneBoundary fallback={sceneFallback}>
            <InteractiveScene room={room} active={inView} />
          </SceneBoundary>
        </div>
        <span className={styles.hint}>Arraste · Zoom</span>
        {/* anúncio de mudança de ambiente para leitores de tela */}
        <span aria-live="polite" className="sr-only">
          Ambiente selecionado: {ROOMS.find((r) => r.id === room)?.label}.
        </span>

        <div className={styles.rooms} role="tablist" aria-label="Ambientes">
          {ROOMS.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={room === r.id}
              className={room === r.id ? styles.active : ""}
              onClick={() => setRoom(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
