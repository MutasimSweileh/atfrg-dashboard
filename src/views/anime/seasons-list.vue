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
                                    <b-form-group description="Please enter Season Title." :label-cols="12">
                                        <b-form-input v-if="this.store.getters.role == 'ADMIN'" @keyup="Search" id="Search" type="text" v-model="title" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                        <b-form-input v-else @keyup="GetUsertvSeriesesSearch" id="Search" type="text" v-model="title" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                    </b-form-group>
                                </b-form>
                                 <div v-if="this.store.getters.role == 'ADMIN'">
                                    <c-table v-if="title.length == 0" :table-data="GetSeassons()" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Your Seasons"></c-table>
                                    <c-table v-else :table-data="seasons2" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Your Seasons"></c-table>
                                </div>
                                <div v-else>
                                    <c-table v-if="title.length == 0" :table-data="GetUsertvSerieses" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Your Seasons"></c-table>
                                    <c-table v-else :table-data="seasons2" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Your Seasons"></c-table>
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
import cTable from './seasons-table.vue'
export default {
    name: 'list',
    components: {
        cTable
    },
    data() {
        return {
            columnDefs: [],
            tvSerieses: [],
            seasons:[],
            seasons2:[],
            UsertvSerieses:[],
            title:"",
            fields: [{
                    key: 'title',
                    label: 'Title'
                },
                {
                    key: 'Series',
                    sortable: true
                },
                {
                    key: 'createdAt',
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
        tvSerieses: {
            query: gql `query GetSerieses{
                tvSerieses(orderBy:createdAt_DESC, where:{seriesType:ANIME}){
                    id
                    title
                    isPublished
                    seasons {
                        id
                        title
                        createdAt
                         publisher{
                        username
                        id
                    }
                    }
                   
                    createdAt
                }
                }
            `,
        },
    },
    methods: {
        GetSeassons() {
            var seasons = [];
            for (var i = 0; i < this.tvSerieses.length; i++) {
                for (var j = 0; j < this.tvSerieses[i].seasons.length; j++) {
                    seasons.push({
                        id: this.tvSerieses[i].seasons[j].id,
                        title: this.tvSerieses[i].seasons[j].title,
                        Series: this.tvSerieses[i],
                        createdAt:this.tvSerieses[i].seasons[j].createdAt,
                        publisher:this.tvSerieses[i].seasons[j].publisher

                    })
                }
            }
            return seasons;
        },
        Search() {
            this.seasons2 = [];
            var sea = this.GetSeassons();
            for (var i = 0; i < sea.length; i++) {
                if (sea[i].title.toLowerCase().includes(this.title.toLowerCase())) {
                    this.seasons2.push(sea[i]);
                }
            }
        },
        GetUsertvSerieses() {
            this.UsertvSerieses = [];
            var sea = this.GetSeassons();
            for (var i = 0; i < sea.length; i++) {
                if (sea[i].publisher != null) {
                    if (sea[i].publisher.id == this.store.getters.user) {
                        this.UsertvSerieses.push(sea[i]);
                    }
                }

            }
            return this.UsertvSerieses;
        },
        GetUsertvSeriesesSearch() {
            this.seasons2 = [];
            var sea = this.GetSeassons();
            for (var i = 0; i < sea.length; i++) {
                if (sea[i].publisher != null) {
                    if (sea[i].publisher.id == this.store.getters.user) {
                        if (sea[i].title.toLowerCase().includes(this.title.toLowerCase())) {
                            this.seasons2.push(sea[i]);
                        }
                    }
                }
            }
            return this.seasons2;
        }
    },
     mounted() {
        if (this.store.getters.role != "ADMIN") {
            if (!(this.store.getters.genreTypes.includes("ANIME"))) {
                this.$router.push('/');
            }
        }
    }
}
</script>
