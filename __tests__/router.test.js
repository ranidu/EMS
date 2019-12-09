import router from "../src/router";
import config from "../config/local.json";

describe("Router tests", () => {
  it("Shuld return a router instance", () => {
    const r = router(config);

    expect(r.name).toBe("router");
    expect(typeof r).toBe("function");
  });
});
