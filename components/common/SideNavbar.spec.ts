import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import SideNavbar from "./SideNavbar.vue";

describe("SideNavbar", () => {
  let wrapper;
  let stubs;
  let computed;
  let directives;

  beforeEach(() => {
    stubs = {
      BaseButton: {
        name: "BaseButton",
        template: `<div class="base-button-stub"><slot/></div>`,
      },
      NuxtLink: RouterLinkStub,
      FontAwesomeIcon: {
        name: "Font-Awesome-Icon",
        template: `<div class="font-awesome-icon-stub"></div>`,
      },
    };
    computed = {
      isMobile: () => {
        return false;
      },
    };
    directives = {
      tooltip: () => {},
    };
    wrapper = shallowMount(SideNavbar, { stubs, computed, directives });
  });

  it("should render component", () => {
    expect(wrapper.find(".side-navbar")).toBeTruthy();
  });

  it("renders nuxt link component", () => {
    expect(wrapper.findComponent(stubs.NuxtLink).exists()).toBeTruthy();
  });

  it("renders the BaseButton components", () => {
    const baseButtons = wrapper.findAllComponents(stubs.BaseButton);
    expect(baseButtons.exists()).toBeTruthy();
    expect(baseButtons.length).toBe(6);
  });
});
