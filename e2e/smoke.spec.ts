import { test, expect } from "@playwright/test";

test("home carrega com o headline e as seções principais", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("luz e matéria")).toBeVisible();
  await expect(page.getByRole("link", { name: "Projetos" }).first()).toBeVisible();
});

test("abrir e fechar o modal de projeto", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Ver projeto/i }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
