<template>
<AppHeader fixed>
  {{CheckUser()}}
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="#">
        Atfrg
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
    <b-navbar-nav class="d-md-down-none">
        <!-- <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item> -->
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAccnt />
    </b-navbar-nav>

    <!--<AsideToggler class="d-lg-none" mobile />-->
</AppHeader>
</template>

<script>
import {
    Header as AppHeader,
    SidebarToggler,
    AsideToggler
} from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
    name: 'DefaultHeader',
    components: {
        AsideToggler,
        AppHeader,
        DefaultHeaderDropdownAccnt,
        SidebarToggler
    },
        methods: {
        
        CheckUser() {
          // if (this.$user == " ") 
          // {
          //   if (this.$route.path != "/login") {
          //     this.$router.push('/login');
          //   } 
          // }
        },
    }
}
</script>
