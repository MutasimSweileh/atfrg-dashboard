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
                                    <b-form-group description="Please enter Series Title." :label-cols="12">
                                        <b-form-input @keyup="Search" id="Search" type="text" v-model="title" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                    </b-form-group>
                                </b-form>
                                    <c-table v-if="title.length == 0" :table-data="tvSerieses" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Serieses"></c-table>
                                    <c-table v-else :table-data="tvSerieses2" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Serieses"></c-table>
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
import cTable from './series-table.vue'
export default {
    name: 'list',
    components: {
        cTable
    },
    data() {
        return {
            columnDefs: [],
            tvSerieses:[],
            tvSerieses2:[],
            UsertvSerieses:[],
            title:"",
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
                    key: 'Changes',
                    label: 'Changes'
                },
            ],
        }
    },
     apollo: {
          tvSerieses: {
              query: gql`query GetSerieses{
                tvSerieses(orderBy:createdAt_DESC, where:{seriesType:ANIME}){
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
        Search() {
            this.tvSerieses2 = [];
            for (var i = 0; i < this.tvSerieses.length; i++) {
                if (this.tvSerieses[i].title.toLowerCase().includes(this.title.toLowerCase())) {
                    this.tvSerieses2.push(this.tvSerieses[i]);
                }
            }
        },

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
