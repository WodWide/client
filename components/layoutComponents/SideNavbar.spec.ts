import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { expect } from "@jest/globals";
import SideNavbar from "./SideNavbar.vue";

describe("SideNavbar.vue", () => {
  let stubs: any;
  beforeEach(() => {
    stubs = {
      BaseButton: {
        name: "BaseButton",
        template: `<div class="base-button-template"><slot/></div>`,
      },
      NuxtLink: RouterLinkStub,
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("when component is mounted", () => {
    test("should display header slot content", () => {
      const slots = {
        header: "test_header",
      };
      const wrapper = shallowMount(SideNavbar, {
        slots,
        stubs,
      });
      expect(wrapper.find(".profile-card__header").text()).toBe("test_header");
    });
    test("should display body slot content", () => {
      const slots = {
        body: "test_body",
      };
      const wrapper = shallowMount(SideNavbar, {
        slots,
        stubs,
      });
      expect(wrapper.find(".profile-card__body").text()).toBe("test_body");
    });
  });
});
