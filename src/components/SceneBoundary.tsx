import { Component, type ReactNode } from "react";

/**
 * Captura falhas do WebGL/R3F e mostra um fallback elegante, sem derrubar a
 * página inteira (degradação graciosa em navegadores sem WebGL).
 */
export class SceneBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
