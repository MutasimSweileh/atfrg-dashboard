<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header"></div>
                    <div class="items-table">
                        <b-row>
                            <b-col sm="12">
                                <b-form>
                                    <b-form-group description="Please enter Movie Title." :label-cols="12">
                                        <b-form-input v-if="this.store.getters.role == 'ADMIN'" @keyup="Search" id="Search" type="text" v-model="title" placeholder="Enter Title.." autocomplete="imdbId"></b-form-input>
                                        <b-form-input v-else @keyup="GetUserMoviesSearch" id="Search" type="text" v-model="title" placeholder="Enter Title.." autocomplete="imdbId"></b-form-input>
                                    </b-form-group>
                                </b-form>
                                <div v-if="this.store.getters.role == 'ADMIN'">
                                    <c-table v-if="title.length == 0" :table-data="movies" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Movies"></c-table>
                                    <c-table v-else :table-data="movies2" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Movies"></c-table>
                                </div>
                                <div v-else>
                                    <c-table v-if="title.length == 0" :table-data="GetUserMovies" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Movies"></c-table>
                                    <c-table v-else :table-data="movies2" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Movies"></c-table>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>

import {
    AgGridVue
} from "ag-grid-vue";
import gql from 'graphql-tag';
import cTable from './mov-table.vue'
export default {
    name: 'list',
    components: {
        cTable
    },
    data() {
        return {
            columnDefs: [],
            moviesList: [],
            title: "",
            movies: [],
            movies2: [],
            UserMovies: [],
            fields: [{
                    key: 'title',
                    label: 'Title'
                },
                {
                    key: 'createdAt',
                    sortable: true
                },
                {
                    key: 'isPublished',
                    label: 'isPublished',
                    sortable: true
                },
                {
                    key: 'publisher',
                    label: 'publisher',
                    sortable: true
                },
                {
                    key: 'Changes',
                    label: 'Changes'
                },
            ],
        }
    },
    apollo: {
        movies: {
            query: gql `query GetMovies {
              movies(orderBy: createdAt_DESC) {
                id
                title
                audience
                releaseDate
                isPublished
                createdAt
                publisher{
                  id
                  username
                  role
                }
              }
            }

              `,
        },
    },
    methods: {
        Search() {
            this.movies2 = [];
            for (var i = 0; i < this.movies.length; i++) {
                if (this.movies[i].title.toLowerCase().includes(this.title.toLowerCase())) {
                    this.movies2.push(this.movies[i]);
                }
            }
        },
        GetUserMovies() {
            this.UserMovies = [];
            for (var i = 0; i < this.movies.length; i++) {
                if (this.movies[i].publisher != null) {
                    if (this.movies[i].publisher.id == this.store.getters.user) {
                        this.UserMovies.push(this.movies[i]);
                    }
                }

            }
            return this.UserMovies;
        },
        GetUserMoviesSearch() {
            this.movies2 = [];
            for (var i = 0; i < this.movies.length; i++) {
                if (this.movies[i].publisher != null) {
                    if (this.movies[i].publisher.id == this.store.getters.user) {
                        if (this.movies[i].title.toLowerCase().includes(this.title.toLowerCase())) {
                            this.movies2.push(this.movies[i]);
                        }
                    }
                }
            }
            return this.movies2;
        }

    },
    mounted() {
        if (this.store.getters.role != "ADMIN") {
            if (!(this.store.getters.genreTypes.includes("MOVIE"))) {
                this.$router.push('/');
            }
        }
    }

}
</script>
