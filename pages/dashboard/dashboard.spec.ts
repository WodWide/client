import { shallowMount } from "@vue/test-utils";
import Dashboard from "./index.vue";

describe("Dashboard", () => {
  let wrapper;
  let stubs;

  beforeEach(() => {
    stubs = {
      Nuxt: {
        name: "Nuxt",
        template: `<div class="nuxt-stub"></div>`,
      },
    };
    wrapper = shallowMount(Dashboard, { stubs });
  });

  it("should render the component", () => {
    expect(wrapper.find(".dashboard-page")).toBeTruthy();
  });

  it("should render the Nuxt layout component", () => {
    expect(wrapper.findComponent(stubs.Nuxt).exists()).toBe(true);
  });
});
