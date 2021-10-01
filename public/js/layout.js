/* globals $, Vue ,Vuex,dateonlypickerInitialisationFunction */

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
    mounted() {
      dateonlypickerInitialisationFunction()
    },
  })
  window.store = store
  $(".select2").select2()

  // - dateonlypickerCalendarInit
  $(".dateonlypicker").map((i, el) => {
    const parent = $(el).parent()
    const t = $(parent).children()
    console.log($(t))
    $(parent)
      .children()
      .map((_i, child) => {
        if ($(child).attr("class") == "input-group-append") {
          $(child).click(() => {
            el.click()
          })
        }
      })
  })
  // - Menu init

  $("#firstMenuOpen").click(() => {
    $("#firstMenuOpenIcon").toggleClass("open")
  })
})
