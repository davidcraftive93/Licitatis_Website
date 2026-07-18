import { describe, it, expect } from "vitest";
import { cn, currentYear } from "@/lib/utils";

describe("cn", () => {
  it("une clases verdaderas y descarta las falsy", () => {
    expect(cn("a", false, "b", null, undefined, "c")).toBe("a b c");
  });

  it("devuelve cadena vacía sin clases", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("permite condicionales", () => {
    const active = true;
    const disabled = false;
    expect(cn("base", active && "active", disabled && "disabled")).toBe("base active");
  });
});

describe("currentYear", () => {
  it("devuelve un año razonable de cuatro cifras", () => {
    const year = currentYear();
    expect(year).toBeGreaterThanOrEqual(2024);
    expect(String(year)).toHaveLength(4);
  });
});
