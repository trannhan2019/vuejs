import "vuetify/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
// import {
//   VApp,
//   VMain,
//   VContainer,
//   VRow,
//   VCol,
//   VSheet,
//   VForm,
//   VTextField,
//   VCheckbox,
//   VDivider,
//   VHover,
//   VBtn,
// } from "vuetify/components";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: { fa },
  },
  // components: {
  //   VApp,
  //   VMain,
  //   VContainer,
  //   VRow,
  //   VCol,
  //   VSheet,
  //   VForm,
  //   VTextField,
  //   VCheckbox,
  //   VDivider,
  //   VHover,
  //   VBtn,
  // },
  components,
  directives,
});

export default vuetify;
