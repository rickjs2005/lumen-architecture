import { describe, it, expect } from "vitest";
import { img, PROJECTS, STATS } from "./site";

describe("img()", () => {
  it("monta a URL Unsplash com largura e qualidade", () => {
    const url = img("abc123", 800);
    expect(url).toBe(
      "https://images.unsplash.com/photo-abc123?auto=format&fit=crop&w=800&q=80",
    );
  });

  it("usa 1400 de largura por padrão", () => {
    expect(img("x")).toContain("w=1400");
  });
});

describe("dados do site", () => {
  it("todo projeto tem os campos do card e o blurb do modal", () => {
    for (const p of PROJECTS) {
      expect(p.title).toBeTruthy();
      expect(p.city).toBeTruthy();
      expect(p.blurb.length).toBeGreaterThan(20);
    }
  });

  it("tem 4 estatísticas", () => {
    expect(STATS).toHaveLength(4);
  });
});
