import { $fetch, setup } from "@nuxt/test-utils/e2e";
import { describe, expect, it } from "vitest";

describe("example e2e test", async () => {
  await setup();

  it("renders the index page", async () => {
    const html = await $fetch("/");
    expect(html).toContain("ガラスの向こう側");
  });
});
