$(() => {
  $('.dateonlypicker_help').hide()
  const init_dataonlypicker = (el) => {
    const required = $(el).attr('required')
    console.log({required})
    const local_value = $(el).val() ? $(el).val().includes('-') ? moment($(el).val()).format('DD.MM.YYYY') : $(el).val() : ''
    console.log({required, local_value}, $(el).val())
    const hidden_input = $(el.outerHTML.replace(/dateonlypicker/, 'dateonlypicker_value').replace(/type=.text./, 'type="hidden"'))
    $(el).attr('name', '')
    $(el).after(hidden_input)
    $(el).val(local_value)

    $(el).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoApply: !!required,
      locale: {
        format: 'DD.MM.YYYY',
        weekLabel: 'Н',
        applyLabel: 'Применить',
        cancelLabel: 'Очистить',
        daysOfWeek: [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
        ],
        monthNames: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        firstDay: 1,
      }
    })
    $(el).on('apply.daterangepicker', function(ev, picker) {
      hidden_input.val(picker.startDate.format('YYYY-MM-DD'))
    })
    $(el).on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('')
      hidden_input.val('')
    })
  }

  $('.dateonlypicker').map((i, el) => {
    if ($(el).val()) return init_dataonlypicker(el)
    var init
    $(el).focus(function() {
      if (init) return
      init_dataonlypicker(el)
      init = true
    })
  })

})
