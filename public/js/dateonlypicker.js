/* globals $, moment */
const dateonlypickerInitialisationFunction = () => {
  $('.dateonlypicker_help').hide()
  const initDataonlypicker = (el) => {
    const required = $(el).attr('required')
    /* eslint no-nested-ternary: "off" */
    const localValue = $(el).val()
      ? $(el).val().includes('-')
        ? moment($(el).val()).format('DD.MM.YYYY')
        : $(el).val()
      : ''
    const hiddenInput = $(
      el.outerHTML
        .replace(/dateonlypicker/, 'dateonlypicker_value')
        .replace(/type=.text./, 'type="hidden"')
    )

    $(el).attr('name', '')
    $(el).after(hiddenInput)
    $(el).val(localValue)

    $(el).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      cancelButtonClasses: required ? 'd-none' : '',
      locale: {
        format: 'DD.MM.YYYY',
        weekLabel: 'Н',
        applyLabel: 'Применить',
        cancelLabel: 'Очистить',
        daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        firstDay: 1,
      },
    })
    $(el).on('apply.daterangepicker', (ev, picker) => {
      hiddenInput.val(picker.startDate.format('YYYY-MM-DD'))
    })
    $(el).on('cancel.daterangepicker', function () {
      $(this).val('')
      hiddenInput.val('')
    })
  }

  $('.dateonlypicker').map((i, el) => {
    if ($(el).val()) return initDataonlypicker(el)
    let init

    return $(el).focus(() => {
      if (init) return
      initDataonlypicker(el)
      init = true
    })
  })
}

$(() => {
  dateonlypickerInitialisationFunction()
})
