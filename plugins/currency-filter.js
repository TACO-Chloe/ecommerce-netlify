import Vue from "vue"

Vue.filter("dollar", function(value) {
  // Using a template literal here, that's why there are two dollar signs.
  // The first is an actual dollar.
  return `￥${parseFloat(value).toFixed(2)}`
})
