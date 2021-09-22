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
  // GLOBAL STATE & INIT
  var fields = window.fields;
  var urlSearchParams = new URLSearchParams(window.location.search);
  var query = Object.fromEntries(urlSearchParams.entries());

  var activeFiltersArr = [];
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

  $("#cols_order").sortable({
    placeholder: "drop-placeholder",
  });

  var activatedFilterPopovers = [];
  var hideAllPopovers = () => {
    $(".filter").popover("hide");
    $("#filters-state-button").popover("hide");
  };
  $("body").click(() => {
    hideAllPopovers();
  });

  // Displaying and Positioning columns according to positions
  (() => {
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
  })();

  // GRID load & render
  var data;
  (() => {
    $("#jsGrid").jsGrid({
      height: "auto",
      width: "auto",
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
  })();

  // Filter state popover init
  (() => {
    $("#filters-state-button").popover({
      html: true,
      template: `<div class="popover" id="filters-state-popover" role="tooltip">
            <div class="arrow"></div>
            <h3 class="popover-header filters-state-popover-header"></h3>
            <div class="popover-body filters-state-popover-body">Тест</div>
          </div>`,
    });

    $("#filters-state-button").click((event) => {
      event.stopPropagation();

      var popover = $(".filters-state-popover-body");
      popover.click((event) => {
        event.stopPropagation();
      });

      popover.append(
        '<p class="filters-state-popover-btn" id="clear-filters">Сбросить все фильтры</p>'
      );

      $("#clear-filters").click(() => {
        clearFiltersBadge();
        activeFiltersArr = [];
        activatedFilterPopovers = [];
        activeFiltersAmount = 0;
        $(".filter").removeClass("fas fa-filter").addClass("fal fa-filter");
        $("#jsGrid")
          .jsGrid("loadData", {})
          .done(function () {
            $("#jsGrid").jsGrid("refresh");
            localStorage.removeItem("filterParams");
          });
        hideAllPopovers();
      });

      popover.append(
        '<p class="filters-state-popover-btn" id="clear-sorting">Сбросить сортировку</p>'
      );
      if (activeFiltersAmount > 0) {
        popover.append(
          '<div class="filters-state-popover-titles-container"></div>'
        );
        activeFiltersArr.map((elem) => {
          var name = elem.name;
          $(".filters-state-popover-titles-container").append(
            `<div class="filters-state-popover-single-title-container" id="filter-container-${name}">
            <p class="filters-state-popover-filter-title">
              ${elem.title}
            </p>
            <i class="fal fa-times filters-state-popover-filter-delete" 
              id="delete-filter-${name}"></i>
            </div>`
          );
          $(`#delete-filter-${name}`).click(() => {
            var params = JSON.parse(localStorage.getItem("filterParams"));
            delete params[name];
            $("#jsGrid")
              .jsGrid("loadData", params)
              .done(function () {
                localStorage.setItem("filterParams", JSON.stringify(params));
                $("#jsGrid").jsGrid("refresh");
              });

            $(`#filter-${name}`).addClass("fal").removeClass("fas");
            changeFiltersBadge(-1);
            activeFiltersArr.filter((el) => el.name !== name);

            $(`#filter-${name}`).popover("hide");
            $(`#filter-container-${name}`).remove();
          });
        });
      }
    });
  })();

  // Single filter popover init
  (() => {
    var headers = $(".jsgrid-header-sortable");
    var initInputByField = (field) => {
      var name = field.name;
      var maybeParams = localStorage.getItem("filterParams");

      var excistingParams = maybeParams ? JSON.parse(maybeParams) : {};
      var initFilterButton = $(
        `<button class="btn mb-3 float-right">Применить</button>`
      );
      var popover = $(".popover-body-filter-single");
      console.log(popover);
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
            localStorage.setItem(
              "filterParams",
              JSON.stringify(excistingParams)
            );
            $("#jsGrid").jsGrid("refresh");
          });

        $(`#filter-${name}`)
          .removeClass("fal fa-filter")
          .addClass("fas fa-filter");
        changeFiltersBadge(+1);
        activeFiltersArr.push({ name, title: field.title });
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
                  <div class="popover-body popover-body-filter-single">Тест</div>
                </div>`,
      });
      filter_handle.click((event) => {
        event.stopPropagation();
        activatedFilterPopovers.map((popoverId) => {
          if (popoverId != `#filter-${el.name}`) $(popoverId).popover("hide");
        });
        activatedFilterPopovers = [`#filter-${el.name}`];
        initInputByField(el);
      });
    });
  })();

  var tableWidth = $("#jsGrid").width();
  $("#make-me-table-width").css("max-width", `${tableWidth + 32}px`);
});
