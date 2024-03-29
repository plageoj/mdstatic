(function () {
  "use strict";
  var pageTitle = "Your site name";
  angular
    .module("app", ["ngRoute", "ngAnimate", "mdTOC"])
    .config([
      "$routeProvider",
      "$locationProvider",
      function (n, t) {
        n.when("/", { redirectTo: "/home" }).when("/:id*", {
          templateUrl: function (n) {
            return (
              (document.title = pageTitle),
              "md/" + angular.lang + "/" + n.id + ".md"
            );
          },
          controller: "pageCtrl",
        });
        t.hashPrefix("x");
      },
    ])
    .controller("pageCtrl", [
      "$scope",
      function (n) {
        n.$on("$routeChangeSuccess", function () {
          setTimeout(function () {
            var n = document.getElementsByTagName("h2")[0];
            document.title = (n ? n.innerText + " - " : "") + pageTitle;
          }, 500);
        });
        n.$on("$routeChangeError", function () {
          location.href = "#x/err/404";
        });
      },
    ])
    .controller("mainCtrl", [
      "$scope",
      "$http",
      function (n, t) {
        var e = new Date();
        (function (a) {
          n.year = e.getFullYear();
          var o = function () {
            try {
              return (
                navigator.browserLanguage ||
                navigator.language ||
                navigator.userLanguage
              ).substr(0, 2);
            } catch (n) {
              return "ja";
            }
          };
          var r = localStorage.getItem("lang") || o();
          console.log(r);
          (document.body.lang = r),
            (angular.lang = r),
            localStorage.setItem("lang", r),
            t.get("trans/" + r + ".json").then(function (t) {
              (n.trans = t.data), a();
            }, a());
        })(function () {
          (n.t = function (t) {
            return n.trans ? n.trans[t] : t.replace(/_/g, " ");
          }),
            t.get("menu.json").then(function (t) {
              (n.menu = t.data[angular.lang].m),
                (n.lang = []),
                angular.forEach(t.data, function (t, e) {
                  n.lang.push({ s: e, c: t.c });
                });
            }, null);
        });
        (n.temp = function () {
          return (
            location.hash.replace(/#x\//, "md/" + angular.lang + "/") + ".md"
          );
        }),
          (n.setLang = function (n) {
            localStorage.setItem("lang", n), location.reload();
          }),
          (n.size = function () {
            n.ss = window.innerWidth + " x " + window.innerHeight;
          }),
          n.size();
      },
    ]);
  angular
    .module("mdTOC", [])
    .directive("twLoad", function () {
      return {
        restrict: "A",
        scope: {},
        controller: function () {
          if (twttr) twttr.widgets.load();
        },
      };
    })
    .directive("markdown", function () {
      return {
        restrict: "A",
        link: function (s, e) {
          e[0].innerHTML = marked.marked(e[0].innerHTML, {
            smartLists: true,
          });
        },
      };
    });
})();
