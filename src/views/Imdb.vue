<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header">

                    </div>
                    <div class="items-table">
                        <b-row>
                            <b-col sm="12">
                                <b-form>
                                    <b-form-group description="Please enter Item Imdb ID." :label-cols="12">
                                        <b-form-input id="Search" type="text" v-model="imdb" placeholder="Enter Imdb ID.." autocomplete="imdbId"></b-form-input>
                                    </b-form-group>
                                </b-form>
                                <ApolloQuery v-if="imdb != null" :query="gql => gql`
                query SearchMovies ($imdb: String!) {
                movies (orderBy: createdAt_DESC,  where: { imdbId: $imdb}){
                        id
                        title
                }
                }
            `" :variables="{ imdb }">
                                    <template v-slot="{ result: { loading, error, data } }">
                                        <!-- Loading -->
                                        <div v-if="loading" class="loading apollo">Loading...</div>

                                        <!-- Error -->
                                        <div v-else-if="error" class="error apollo">
                                            <p> حاول البحث بكلمات اخري ..</p>
                                        </div>

                                        <!-- Result -->
                                        <div v-else-if="data != null" class="result apollo">
                                            <div class="Fast-Search">
                                                <ul class="search-result">
                                                    <li v-for="movie in data.movies" :key="movie.id">
                                                        <span class="title">{{ movie.title }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <!-- No result -->
                                        <div v-else class="no-result apollo">
                                            <div class="Fast-Search">
                                                <p> حاول البحث بكلمات اخري ..</p>
                                            </div>
                                        </div>
                                    </template>
                                </ApolloQuery>
                                <ApolloQuery v-if="imdb != null" :query="gql => gql`
                query SearchSerieses ($imdb: String!) {
                seasons (orderBy: createdAt_DESC, where: { imdbId: $imdb}){
                        id
                        title
                }
                }

            `" :variables="{ imdb }">
                                    <template v-slot="{ result: { loading, error, data } }">
                                        <!-- Loading -->
                                        <div v-if="loading" class="loading apollo">Loading...</div>

                                        <!-- Error -->
                                        <div v-else-if="error" class="error apollo">An error occurred</div>

                                        <!-- Result -->
                                        <div v-else-if="data != null" class="result apollo">
                                            <div class="Fast-Search">
                                                <ul class="search-result">
                                                    <li v-for="series in data.seasons" :key="series.id">
                                                        <span class="title">{{ series.title }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <!-- No result -->
                                        <div v-else class="no-result apollo">
                                            <div class="Fast-Search">
                                                <p> حاول البحث بكلمات اخري ..</p>
                                            </div>
                                        </div>
                                    </template>
                                </ApolloQuery>

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

export default {
    name: 'list',
    data() {
        return {
            columnDefs: [],
            moviesList: [],
            videoLinkses: [],
            imdb: "",
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


}
</script>
