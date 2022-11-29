<template>
<keep-alive>
<router-view></router-view>
</keep-alive>
</template>

<script>
import gql from 'graphql-tag';
export default {
    name: 'app',

    mounted() {
        if(this.$route.path != "/login"){
            if (this.store.getters.user == "" && this.$readCookie("userId") == null) {
                this.$router.replace({
                    name: "login"
                });
            } else {
                if (this.$readCookie("userId") != null) {
                    this.store.commit('UpdateUser', this.$readCookie("userId"))
                    this.store.commit('UpdateRole', this.$readCookie("userRole"))
                    this.store.commit('UpdategenreTypese', this.$readCookie("genreTypes"))
                }
            }
        }
    },

}
</script>

<style lang="scss">
// CoreUI Icons Set
@import '~@coreui/icons/css/coreui-icons.min.css';
/* Import Font Awesome Icons Set */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome.scss';
/* Import Simple Line Icons Set */
$simple-line-font-path: '~simple-line-icons/fonts/';
@import '~simple-line-icons/scss/simple-line-icons.scss';
/* Import Flag Icons Set */
@import '~flag-icon-css/css/flag-icon.min.css';
/* Import Bootstrap Vue Styles */
@import '~bootstrap-vue/dist/bootstrap-vue.css';
/* Datatable */
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import '~ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham';
// Set the colors to blue and amber
$ag-primary-color: #2196F3; // blue-500
$ag-accent-color: #FFD740; // amber-A200

// Import the ag-Grid material theme
@import '~ag-grid-community/src/styles/ag-theme-material/sass/ag-theme-material';
// Import Main styles for this application
@import 'assets/scss/style';
</style>
