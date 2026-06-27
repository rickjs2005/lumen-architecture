import type { ComponentPropsWithoutRef } from "react";

const WIDTHS = [480, 768, 1200, 1800];
const withWidth = (src: string, w: number) =>
  src.replace(/([?&])w=\d+/, `$1w=${w}`);

type Props = ComponentPropsWithoutRef<"img"> & { src: string };

/**
 * Imagem responsiva (Unsplash): gera srcSet em várias larguras, `sizes`,
 * `decoding="async"` e `loading="lazy"`. Drop-in para `<img>` — não envolve
 * em wrapper, então o CSS existente continua valendo.
 */
export function Img({
  src,
  sizes = "(max-width: 768px) 92vw, 46vw",
  alt = "",
  ...rest
}: Props) {
  const srcSet = WIDTHS.map((w) => `${withWidth(src, w)} ${w}w`).join(", ");
  return (
    <img
      src={withWidth(src, 1200)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
