<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <h2>UnPublished Items :  <span style="color:red">{{GetCount()}}</span></h2>
                    </div>
                    <div class="items-table" v-if="this.store.getters.role == 'ADMIN'">
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
                             <b-col sm="12">
                                 <b-form>
                                    <b-form-group description="Please enter Season Title." :label-cols="12">
                                        <b-form-input v-if="this.store.getters.role == 'ADMIN'" @keyup="Search2" id="Search" type="text" v-model="title2" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                        <b-form-input v-else @keyup="GetUsertvSeriesesSearch" id="Search" type="text" v-model="title2" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                    </b-form-group>
                                </b-form>
                                 <c-table2 v-if="title.length == 0" :table-data="tvSerieses" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Serieses"></c-table2>
                                <c-table2 v-else :table-data="tvSerieses2" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Serieses"></c-table2>
                                <c-table3 :table-data="episodes" :per-page=20 :fields="fields" hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Episodes"></c-table3>

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
import cTable from './movies/mov-table2.vue'
import cTable2 from './serieses/series-table2.vue'
import cTable3 from './serieses/seasons/ep-table2.vue'
export default {
    name: 'list',
    components: {
        cTable,
        cTable2,
        cTable3
    },
    data() {
        return {
            columnDefs: [],
            moviesList: [],
            title: "",
            title2: "",
            movies: [],
            movies2: [],
            UserMovies: [],
            seasons:[],
            seasons2:[],
            tvSerieses:[],
            tvSerieses2:[],
            UsertvSerieses:[],
            episodes:[],
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
              movies(orderBy: createdAt_DESC, where:{isPublished:false}) {
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
        tvSerieses: {
              query: gql`query GetSerieses{
                tvSerieses(orderBy:createdAt_DESC, where:{isPublished:false}){
                    id
                    title
                    isPublished
                    createdAt
                }
                }
              `,
          },
           episodes: {
              query: gql`query GetSerieses{
                episodes(orderBy:createdAt_DESC, where:{isPublished:false}){
                    id
                    title
                    isPublished
                    createdAt
                }
                }
              `,
          },
    },
    methods: {
         Search2() {
            this.tvSerieses2 = [];
            for (var i = 0; i < this.tvSerieses.length; i++) {
                if (this.tvSerieses[i].title.toLowerCase().includes(this.title2.toLowerCase())) {
                    this.tvSerieses2.push(this.tvSerieses[i]);
                }
            }
        },
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
        },
        GetCount(){
            var count = 0;
              for (var i = 0; i < this.movies.length; i++) {
                  count++;
              }
             for (var i = 0; i < this.tvSerieses.length; i++) {
                  count++;
              }
              for (var i = 0; i < this.episodes.length; i++) {
                  count++;
              }
              return count;
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
