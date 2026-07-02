import { useCallback, useState } from "react";

/**
 * DPR adaptativo para cenas 3D: o PerformanceMonitor (drei) mede o fps real
 * do dispositivo e ajusta a resolução interna do canvas dentro de [min, max] —
 * GPUs com folga sobem até `max`, GPUs fracas descem até `min` em vez de
 * derrubar o frame rate. Uso: `<Canvas dpr={dpr}> … <PerformanceMonitor
 * onChange={onPerf} />`.
 */
export function useAdaptiveDpr(min: number, max: number) {
  // parte do meio da faixa: nem borrado nem pesado antes da 1ª medição
  const [dpr, setDpr] = useState(() => +((min + max) / 2).toFixed(2));

  const onPerf = useCallback(
    ({ factor }: { factor: number }) => setDpr(+(min + (max - min) * factor).toFixed(2)),
    [min, max],
  );

  return { dpr, onPerf };
}
