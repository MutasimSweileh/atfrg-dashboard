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
                                    <c-table :table-data="genres" :fields="fields" :per-page=20 hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Movies"></c-table>                            </b-col>
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
import cTable from './genres-table.vue'
export default {
    name: 'list',
    components: {
        cTable
    },
    data() {
        return {
            columnDefs: [],
            genres: [],
            fields: [{
                    key: 'name',
                    label: 'Name'
                },
                {
                    key: 'Changes',
                    label: 'Changes'
                },
            ],
        }
    },
    apollo: {
        genres: {
            query: gql `query genres {
              genres {
                    id
                    name
                }
                }

              `,
        },
    },
    mounted() {
        if (this.store.getters.role != "ADMIN") {
                this.$router.push('/');
        }
    }

}
</script>
