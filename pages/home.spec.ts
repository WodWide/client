import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { expect } from "@jest/globals";
import HomePage from "./index.vue";

describe("index.vue", () => {
  let stubs: any;
  let mocks: any;
  beforeEach(() => {
    stubs = {
      BaseButton: {
        name: "BaseButton",
        template: `<div class="base-button-template"><slot/></div>`,
      },
      NuxtLink: RouterLinkStub,
    };
    mocks = {
      $breakpoints: {},
    };
  });
  describe("when component is mounted", () => {
    test("should render nav tag", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks });
      expect(wrapper.find("#index-page-navbar")).toBeTruthy();
    });
    test("should render the page body", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks });
      expect(wrapper.find("#index-page-body")).toBeTruthy();
    });
    test("should render the correct page body text", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks });
      expect(wrapper.find("#index-page-description").text()).toBe(
        "A social platform for cross training athletes"
      );
    });
    test("should render all the nuxt links", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks });
      const nuxtLinkList = wrapper.findAllComponents(RouterLinkStub);
      expect(nuxtLinkList.length).toBe(8);
    });
    test("should render all BaseButton components", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks });
      const baseButtonList = wrapper.findAllComponents(stubs.BaseButton);
      expect(baseButtonList.length).toBe(3);
    });
  });
});
