window.table_filter = (filter) => (row) =>
  window.fields.reduce((acc, field) => {
    var name = field.name;
    if (field.type == "number" || field.type == "date")
      return acc && (!filter[name] || `${row[name]}`.startsWith(filter[name]));
    return (
      acc &&
      (!filter[name] ||
        (row[name] || "").toLowerCase().includes(filter[name].toLowerCase()))
    );
  }, true);

$(() => {
  var fields = window.fields;
  var urlSearchParams = new URLSearchParams(window.location.search);
  var query = Object.fromEntries(urlSearchParams.entries());
  fields.map((el, id) => Object.assign(el, { pos: -1, id }));
  var cols = (query.cols || "").split(",").filter((el) => fields[el]);
  if (cols.length) {
    cols.map((i, n) => (fields[i].pos = +n));
    fields.sort((a, b) => a.pos > b.pos);
  } else {
    fields.map((el) => (el.pos = 1));
  }

  fields.map((el, n) =>
    $("#cols_order .hr")[el.pos > -1 ? "before" : "after"](
      `<li class="list-group-item item" data-n="${el.id}">${el.title}</li>`
    )
  );
  fields = fields.filter((el) => el.pos > -1);
  window.fields = fields;

  $("#cols_apply").click(() => {
    var order = [...$("#cols_order *")].map((el) => $(el).data("n"));
    order = order.slice(0, order.indexOf(undefined));
    urlSearchParams.set("cols", order);
    document.location.href = `/${
      window.table_url
    }?${urlSearchParams.toString()}`;
  });
  $("#cols_reset").click(() => {
    document.location.href = `/${window.table_url}`;
  });
  $("#cols_order").sortable({
    placeholder: "drop-placeholder",
  });

  var data;

  $("#jsGrid").jsGrid({
    height: "auto",
    width: "",
    editing: false,
    filtering: false,
    autoload: true,
    sorting: true,
    paging: true,
    loadMessage: "Загрузка...",
    noDataContent: "Нет данных",
    pagerContainer: "#externalPager",
    pageSize: 20,
    pageButtonCount: 15,
    pagerFormat:
      "Страницы: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} из {pageCount}",
    pagePrevText: "&#x23F4",
    pageNextText: "&#x23F5",
    pageFirstText: "&#x23EE",
    pageLastText: "&#x23ED",
    rowClick: function (args) {
      window.location.href = `/${window.table_url}/edit/${args.item.id}`;
    },
    controller: {
      loadData: (filter) => {
        var deferred = $.Deferred();
        if (data) {
          return data.filter(window.table_filter(filter));
        } else
          $.ajax({
            url: `${window.backend_addr}/api/${window.table_url}?range=%5B0%2C1000000%5D`,
            success: function (response) {
              deferred.resolve((data = response.map(window.table_formatter)));
            },
          });
        return deferred.promise();
      },
    },
    fields: window.fields,
  });
  var activeFiltersAmount = 0;
  var filtersBadge = $("#filters-count-badge");
  var changeFiltersBadge = (numberToAddOrReduce) => {
    activeFiltersAmount = activeFiltersAmount + numberToAddOrReduce;
    if (activeFiltersAmount <= 0) clearFiltersBadge();
    filtersBadge.text(activeFiltersAmount.toString());
    filtersBadge.removeClass("d-none");
  };
  var clearFiltersBadge = () => {
    activeFiltersAmount = 0;
    filtersBadge.addClass("d-none");
  };

  var localStorage = window.localStorage;
  localStorage.clear();
  $("body").click(() => {
    $(".filter").popover("hide");
  });

  $('[data-toggle="popover"]').popover();

  var activatedPopovers = [];
  $("#clear-filters").click(() => {
    clearFiltersBadge();
    $(".filter").removeClass("fas fa-filter").addClass("fal fa-filter");
    activatedPopovers = [];
    $("#jsGrid")
      .jsGrid("loadData", {})
      .done(function () {
        $("#jsGrid").jsGrid("refresh");
        localStorage.removeItem("filterParams");
      });
  });
  var headers = $(".jsgrid-header-sortable");
  var initInputByField = (field) => {
    var name = field.name;
    var maybeParams = localStorage.getItem("filterParams");

    var excistingParams = maybeParams ? JSON.parse(maybeParams) : {};
    var initFilterButton = $(
      `<button class="btn mb-3 float-right">Применить</button>`
    );
    var popover = $(".popover-body");
    popover.click((event) => {
      event.stopPropagation();
    });
    var initialValue = excistingParams[name] || "";

    var textInput = `<div class="form-group">
              <label for="key">
                <input class="form-control" id="input-${name}" name="input-${name}" type="text" placeholder="поиск по названию..."value="${initialValue}">
              </label>
            </div>`;

    $(initFilterButton).click(() => {
      var inputValue = $(`#input-${name}`).val();
      if (field.type == "number") inputValue = Number(inputValue);
      excistingParams[name] = inputValue;

      $("#jsGrid")
        .jsGrid("loadData", excistingParams)
        .done(function () {
          localStorage.setItem("filterParams", JSON.stringify(excistingParams));
          $("#jsGrid").jsGrid("refresh");
        });

      $(`#filter-${name}`)
        .removeClass("fal fa-filter")
        .addClass("fas fa-filter");
      changeFiltersBadge(+1);
      $(`#filter-${name}`).popover("hide");
    });
    $(popover).append(textInput);
    $(popover).append(initFilterButton);
  };

  window.fields.map((el, id) => {
    var filter_handle = $(
      `<i id= "filter-${el.name}" class="filter fal fa-filter p-1" data-toggle="popover" title=" " data-content=" " />`
    );

    $(headers[id]).append(filter_handle);

    filter_handle.popover({
      html: true,
      template: `<div class="popover" id="popover-${el.name}" role="tooltip">
                <div class="arrow"></div>
                <h3 class="popover-header">Фильтр для ${el.title}</h3>
                <div class="popover-body">Тест</div>
              </div>`,
    });

    filter_handle.click((event) => {
      event.stopPropagation();
      activatedPopovers.map((popoverId) => {
        if (popoverId != `#filter-${el.name}`) $(popoverId).popover("hide");
      });
      activatedPopovers = [`#filter-${el.name}`];
      initInputByField(el);
    });
  });
  var tableWidth = $("#jsGrid").width();
  $("#make-me-table-width").css("max-width", `${tableWidth + 32}px`);
});
