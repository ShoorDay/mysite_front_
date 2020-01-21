import Card from "./Card.vue";
import LoadingIcon from "./LoadingIcon.vue";

const components = [Card, LoadingIcon];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
