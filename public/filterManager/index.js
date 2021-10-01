/* globals $, Vue */
Vue.component("filter-manager", {
  template: "#filter-manager-template",
  data() {
    return { checked: false, title: "Check me" }
  },
  methods: {
    clearFilters() {
      console.log("work")
      $(".filter").removeClass("fas fa-filter").addClass("fal fa-filter")
    },
  },
})
