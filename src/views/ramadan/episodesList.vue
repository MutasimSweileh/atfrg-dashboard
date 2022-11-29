

            <template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header">جميع الحلقات</div>
                     <ApolloQuery :query='gql => gql`
                     query GetSerieses {
                      tvSerieses(orderBy: updatedAt_DESC,  where: { isPublished: true, lang: {name:"Arabic"}, seriesType: TV , seasons_some:{episodes_some:{id_gt:1}, }}) {
                        id
                        title
                        posters {
                          size
                          path
                        }
                        audience
                        releaseDate
                        genres {
                          name
                        }
                        seasons {
                          id
                          imdbId
                          episodes(orderBy: order_DESC){
                              id
                              title
                              isPublished
                              order
                          }
                        }
                      }
                    }
                    `'>
              <template v-slot="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div
                  v-if="loading"
                  class="loading"
                >
                  
                </div>
                <!-- Error -->
             
                <!-- Result -->
                <div
                  v-else-if="data && data.tvSerieses.length > 0"
                  class="Slider-block"
                >
                  <!-- Container End -->
                
                      <div
                        v-for="series in data.tvSerieses"
                        :key="series.id"
                        :class="[{ poster_over : overId == series.id } ]"
                        @mouseover="itemOver(series.id)"
                        @mouseleave="itemNotOver"
                      >
                      <c-table :table-data="series.seasons[0].episodes" :per-page=20 :fields="fields" hover striped bordered small fixed :caption="series.title"></c-table>          
                      </div>  
                  <!-- No result -->
                </div>
                <div
                  v-else
                  class="no-result apollo"
                > 
                </div>
              </template>
            </ApolloQuery>
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
// import cTable from './series-table.vue'
import cTable from './ep-table.vue'
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
                tvSerieses(orderBy:createdAt_DESC, where:{seriesType:TV}){
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
}
</script>
