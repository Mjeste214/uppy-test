require('./bootstrap');
import Vue from 'vue';


Vue.component("crop-upload", require("./components/UppyUploader").default);

const app = new Vue({
    el: '#app',
});
