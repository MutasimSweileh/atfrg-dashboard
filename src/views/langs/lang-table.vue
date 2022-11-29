<template>
  <b-card>
    <div slot="header" v-html="caption"></div>
    <b-table :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="captions" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
       <template slot="Changes" slot-scope="data">
       <b-button @click="Delete(data.item.id)"  size="sm" variant="danger">Delete</b-button>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>
<style lang="scss" scoped="">
.card-body{
  text-align:center;
  a{
    margin:0 10px;
    .fa-close{
      color:red
    }
  }
}

</style>
<script>
import gql from "graphql-tag";
 const deleteLanguage = gql`
   mutation delete_todos($id: ID) {
     deleteLanguage(where: { id: $id }) {
       id
     }
   }
 `;
export default {
  name: 'c-table',
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      currentPage: 1,
    }
  },
  
  computed: {
    items: function() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.fields }
  },
  methods: {
    getRowCount: function () {
      return this.items.length
    },
    rowClicked (item) {
      this.$emit('row-clicked', item)
    },
       Delete(id) {
            this.$apollo.mutate({
                mutation: deleteLanguage,
                variables: {
                    id: id,
                },
            }).then((data) => {
                window.location.href =  "#";
            }).catch((error) => {
                console.log(error);
            });
        },
  }
}
</script>
