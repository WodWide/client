import { shallowMount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import { expect } from "@jest/globals";
import Vuex from "vuex";
import HomePage from "./index.vue";
import { state } from "@/store/user";

describe("index.vue", () => {
  let stubs: any;
  let mocks: any;
  let localVue: any;
  let store: any;
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
    localVue = createLocalVue();
    localVue.use(Vuex);

    // eslint-disable-next-line import/no-named-as-default-member
    store = new Vuex.Store({ state, getters: { getters: jest.fn() } });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("when component is mounted", () => {
    test("should render nav tag", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks, store, localVue });
      expect(wrapper.find("#index-page-navbar")).toBeTruthy();
    });
    test("should render the page body", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks, store, localVue });
      expect(wrapper.find("#index-page-body")).toBeTruthy();
    });
    test("should render the correct page body text", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks, store, localVue });
      expect(wrapper.find("#index-page-description").text()).toBe(
        "A social platform for cross training athletes"
      );
    });
    test("should render all the nuxt links", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks, store, localVue });
      const nuxtLinkList = wrapper.findAllComponents(RouterLinkStub);
      expect(nuxtLinkList.length).toBe(8);
    });
    test("should render all BaseButton components", () => {
      const wrapper = shallowMount(HomePage, { stubs, mocks, store, localVue });
      const baseButtonList = wrapper.findAllComponents(stubs.BaseButton);
      expect(baseButtonList.length).toBe(3);
    });
  });
});
