<template>
  <b-card>
    <div slot="header" v-html="caption"></div>
    <b-table :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="captions" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
       <template slot="Changes" slot-scope="data">
        <router-link :to="'./' + data.item.id"><i class='fa fa-edit'></i></router-link>
      </template>
      <template slot="createdAt" slot-scope="data">
      <b-badge :variant="updateReleaseDate(data.item.createdAt)">{{updateReleaseDate(data.item.createdAt)}}</b-badge>
    </template>
      <template slot="publisher" slot-scope="data">
      <b-badge v-if="data.item.publisher != null" :variant="data.item.publisher.username"><router-link :to="'/users/'+ data.item.publisher.id">{{data.item.publisher.username}}</router-link></b-badge>
    </template>
      <template slot="isPublished" slot-scope="data">
        <b-badge :variant="getBadge(data.item.isPublished)">{{data.item.isPublished}}</b-badge>
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
 const REMOVE_TODO = gql`
   mutation delete_todos($id: ID) {
     deleteMovie(where: { id: $id }) {
       title
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
  updateReleaseDate(date) {
          var currentTime = new Date(date);
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
        var date = day + "/" + month + "/" + year;
        return date;
    },
    getBadge (status) {
      return status === 'true' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'false' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount: function () {
      return this.items.length
    },
    rowClicked (item) {
      this.$emit('row-clicked', item)
    },
  }
}
</script>
