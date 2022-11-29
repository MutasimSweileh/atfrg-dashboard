<template>
<div class="app">
    <DefaultHeader />
    <div class="app-body">
        <AppSidebar fixed>
            <SidebarHeader />
            <SidebarForm />
            <SidebarNav v-if="users.length > 0" :navItems="UserNav"></SidebarNav>

            <SidebarFooter />
            <SidebarMinimizer />
        </AppSidebar>
        <main class="main">
            <Breadcrumb :list="list" />
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </main>
        <AppAside fixed>
            <!--aside-->
            <DefaultAside />
        </AppAside>
    </div>
    <DefaultFooter />
</div>
</template>

<script>
import nav from '@/_nav'
import {
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    Aside as AppAside,
    Breadcrumb
} from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import gql from "graphql-tag";
export default {
    name: 'DefaultContainer',
    components: {
        AppSidebar,
        AppAside,
        Breadcrumb,
        DefaultAside,
        DefaultHeaderDropdownAccnt,
        SidebarForm,
        SidebarFooter,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer,
        DefaultFooter,
        DefaultHeader
    },
    apollo: {
        users: {
            query: gql `query CheckUsers($id:ID){
            users(orderBy:points_DESC,where:{id:$id}){
              id
              username
              password
              role
              activated
              points
              genreTypes
            }
          }
            `,
            variables() {
                return {
                    id: this.store.getters.user
                }
            }
        },
    },
    data() {
        return {
            nav: nav.items,
            nav2: [],
            users: [],
            navload: false,
        }
    },

    computed: {
        name() {
            return this.$route.name
        },
        list() {
            return this.$route.matched.filter((route) => route.name || route.meta.label)
        },
        UserNav() {
            if (this.navload == false) {
                var nav = this.nav;
                if (this.store.getters.role == "ADMIN") {
                    return nav;
                } else {
                   
                    var types = [];
                    for (var i = 0; i < this.users[0].genreTypes.length; i++) {
                        types.push(this.users[0].genreTypes[i]);
                    }
                    for (var i = 0; i < nav.length; i++) {
                        if(nav[i].admin != null){
                            nav.splice(nav.indexOf(nav.find(row => row.admin == true)), 1);
                        }
                    }
                    if (types == ["MOVIE", "TV", "ANIME"]) {
                        this.navload = true;
                        return nav;
                    }
                    else if (types.includes("TV") && types.includes("ANIME")) {
                        nav.splice(nav.indexOf(nav.find(row => row.movies == true)), 1);
                        this.navload = true;
                        return nav;
                    }
                    else if (types.includes("MOVIE") && types.includes("TV")) {
                        nav.splice(nav.indexOf(nav.find(row => row.anime == true)), 1);
                        this.navload = true;
                        return nav;
                    }
                    else if (types.includes("MOVIE") && types.includes("ANIME")) {
                        nav.splice(nav.indexOf(nav.find(row => row.Series == true)), 1);
                        this.navload = true;
                        return nav;
                    }
                    if (types.includes("MOVIE")) {
                        nav.splice(nav.indexOf(nav.find(row => row.anime == true)), 1);
                        nav.splice(nav.indexOf(nav.find(row => row.Series == true)), 1);
                    }
                    if (types.includes("TV")) {
                        nav.splice(nav.indexOf(nav.find(row => row.movies == true)), 1);
                        nav.splice(nav.indexOf(nav.find(row => row.anime == true)), 1);
                    }
                    if (types.includes("ANIME")) {
                        nav.splice(nav.indexOf(nav.find(row => row.movies == true)), 1);
                        nav.splice(nav.indexOf(nav.find(row => row.Series == true)), 1);
                    }
                    this.navload = true;
                    return nav;
                }
            }
        }
    },
}
</script>
