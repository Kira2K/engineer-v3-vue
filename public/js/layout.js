/* globals $, Vue ,Vuex,dateonlypickerInitialisationFunction,httpVueLoader */

$(() => {
  $('[data-toggle="popover"]').popover()
  const store = new Vuex.Store({
    state: {
      count: 0,
      test: "teeeest",
      isFiltersManagerVisible: true,
      headerFields: {},
    },
    mutations: {
      increment(state) {
        state.count++
      },
      changeHeaderFields(state, newHeaderFields) {
        state.headerFields = newHeaderFields
      },
      toggleFiltersManagerVisibility(state) {
        state.isFiltersManagerVisible = !state.isFiltersManagerVisible
      },
    },
  })

  // eslint-disable-next-line no-unused-vars
  const vue = new Vue({
    el: "#vue-initter",
    store,
    components: {
      "my-component": httpVueLoader("/public/my-component.vue"),
    },
    mounted() {
      dateonlypickerInitialisationFunction()
      $(".select2").select2()
    },
  })
  window.store = store
  // - Menu init
  $("#firstMenuOpen").click(() => {
    $("#firstMenuOpenIcon").toggleClass("open")
  })
})
