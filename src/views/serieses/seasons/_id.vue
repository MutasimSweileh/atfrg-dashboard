<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card v-for="season in seasons" :key="season.id" header-tag="header" footer-tag="footer">
                    <b-button @click="ShowSeasons = !ShowSeasons" size="sm" style="float:right" variant="primary">عرض الحلقات</b-button>
                    <br> <br>
                    <c-table v-if="ShowSeasons" :table-data="season.episodes" :per-page=20 :fields="fields" hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> Season Episode"></c-table>

                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> {{season.title}}</strong>
                        <span v-if="store.getters.role == 'ADMIN'">
                            <b-button @click="dangerModal = true" style="float:right" size="sm" variant="danger">Delete</b-button>
                        </span>
                    </div>
                    <!-- imdb  -->
                    <b-card>
                        <div slot="header">
                            <strong>Imdb</strong> Import
                        </div>
                        <b-form>
                            <b-form-group label="imdbId" label-for="imdbId" description="Please enter season imdbId." :label-cols="3">
                                <b-form-input id="imdbId" type="text" v-model="imdbId" placeholder="Enter imdbId.." autocomplete="imdbId"></b-form-input>

                            </b-form-group>
                        </b-form>
                        <div slot="footer">
                            <b-button @click="GetImdp()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Get Information</b-button>
                        </div>
                    </b-card>
                    <!-- Main Information -->
                    <b-card>
                        <div slot="header">
                            <strong>Main</strong> Information
                        </div>
                        <b-form>
                            <b-form-group label="Title" label-for="title" description="Please enter season title. اطلب التعديل من الادمن" :label-cols="3">

                                <b-form-input v-if="store.getters.role == 'ADMIN'" id="title" v-model="season.title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                <b-form-input v-else id="title" v-model="season.title" type="text" placeholder="Enter Title.." autocomplete="title" disabled></b-form-input>
                            </b-form-group>
                                <b-form-group label="Order" label-for="Order" description="Please enter Season Order. ( ترتيب الموسم)" :label-cols="3">
                                   <b-input-group>
                                    <b-form-select id="Order" :plain="true" :options="[
                                    '1',
                                    '2',
                                    '3',
                                    '4',
                                    '5',
                                    '6',
                                    '7',
                                    '8',
                                    '9',
                                    '10',
                                    '11',
                                    '12',
                                    '13',
                                    '14',
                                    '15',
                                    '16',
                                    ]" :value="season.order">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="ReleaseDate" label-for="releaseDate" description="Please enter season ReleaseDate." :label-cols="3">
                                <b-form-input id="releaseDate" v-if="releaseDate != ''" v-model="releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                                <b-form-input id="releaseDate" v-else v-model="season.releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Sub</strong> Information
                        </div>
                        <b-form>
                            <b-form-group label="Trailer Youtube ID" label-for="trailerPath" description="Please season Trailer Youtube ID. ( https://www.youtube.com/watch?v=ID )" :label-cols="3">
                                <b-form-input id="trailerPath" :value="season.trailerPath" type="text" placeholder="Enter season Trailer Youtube ID.." autocomplete="trailerPath"></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Posters</strong>
                        </div>
                        <b-card v-for="(poster,index) in season.posters" :key="poster.id">
                            <div slot="header">
                                <strong>{{poster.size}}</strong> Poster
                                <b-button @click="RemovePoster(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Poster Size" label-for="Postersize" description="Please Choose Poster Size." :label-cols="3">
                                <b-input-group>
                                    <b-form-select :id="'Postersize'+ index" :value="poster.size" :plain="true" :options="[
                                                'Please select Quality',
                                                'THUMBNAIL',
                                                'WIDE',
                                                'FULL_SCREEN',
                                            ]">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Poster Path" label-for="PosterPath" description="Please Enter Poster Path" :label-cols="3">
                                <b-form-input :id="'PosterPath'+ index" :value="poster.path" type="text" placeholder="Please Enter Poster Path." autocomplete="PosterPath"></b-form-input>
                            </b-form-group>
                        </b-card>
                        <b-card v-for="(poster,index) in newPosters" :key="poster.id">
                            <div slot="header">
                                <strong>{{poster.size}}</strong> Poster
                                <b-button @click="RemoveNewPoster(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Poster Size" label-for="Postersize" description="Please Choose Poster Size." :label-cols="3">
                                <b-input-group>
                                    <b-form-select :id="'PostersizeNew'+ index" :plain="true" :options="[
                                                'Please select Quality',
                                                'THUMBNAIL',
                                                'WIDE',
                                                'FULL_SCREEN',
                                              ]" value="THUMBNAIL">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Poster Path" label-for="PosterPath" description="Please Enter Poster Path" :label-cols="3">
                                <b-form-input v-if="IMDPPoster.length > 0" :value="IMDPPoster" :id="'PosterPathNew'+ index" type="text" placeholder="Please Enter Poster Path." autocomplete="PosterPath"></b-form-input>
                                <b-form-input v-else :id="'PosterPathNew'+ index" type="text" placeholder="Please Enter Poster Path." autocomplete="PosterPath"></b-form-input>
                            </b-form-group>
                        </b-card>
                        <div slot="footer">
                            <b-button @click="AddnewPoster" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> New Poster</b-button>
                        </div>
                    </b-card>
                    <div slot="footer">
                        <b-button @click="SaveChanges(season)" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Save Changes</b-button>
                    </div>
                    <br>
                    <br>
                    <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                    <b-alert v-if="ChangesError.length > 0" show variant="danger">{{ChangesError}}</b-alert>
                    <b-col cols="6" sm="4" md="3" lg="2" v-if="check">
                        <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
                    </b-col>
                    <b-modal :title="'Deleting ' + season.title + ' season!'" variant="danger" header-bg-variant="danger" content-class="border-danger" v-model="dangerModal" @ok="[dangerModal = false, Deleteseason(season.id)] " ok-variant="danger">
                        Are You Sure Deleting <span style="color:green">{{season.title}}</span> season ? <br>
                        You Can UnPublish It (Choose Cancel).
                    </b-modal>

                </b-card>

            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import cTable from './ep-table.vue'
const Edit_season = gql `
  mutation updateSeason($id:ID,$title:String!,$releaseDate:DateTime!,$trailerPath:String,$posters:[ImageCreateInput!],$order:Int)
  {
  updateSeason(where:{id:$id}, data:{
    title:$title,
    trailerPath:$trailerPath,
    order:$order
    slug:$title
    posters:{
        create:$posters
        },
    releaseDate:$releaseDate,

  }){
    id
  }
}
 `;
const Delete_Posters = gql `
  mutation seasonsEdit($id:ID)
  {
  updateSeason(where:{id:$id}, data:{
    posters:{
         deleteMany:{
         path_not_in:" "
        }
        }
  }){
    id
  }
}
 `;
const Delete_season = gql `
   mutation deleteTvseason($id: ID) {
     deleteSeason(where: { id: $id }) {
       id
     }
   }
 `;

export default {
    components: {
        cTable
    },
    data() {
        return {
            loaded: false,
            genres: [],
            languages: [],
            imdpInfo: [],
            title: "",
            ShowSeasons: false,
            audience: [],
            imdbId: "",
            releaseDate: "",
            runtime: "",
            Genre: [],
            lang: [],
            check: false,
            newSubtitle: [],
            newLinks: [],
            newPosters: [],
            ChangesDone: "",
            ChangesError: "",
            AllPosters: [],
            Allsubtitles: [],
            AllLinks: [],
            dangerModal: false,
            IMDPPoster: "",
            seasons: [],
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
        seasons: {
            query: gql ` query seasons($id:ID) {
                      seasons(where:{id:$id}) {
                        id
                        title
                        slug
                        imdbId
                        order
                        posters{
                            size
                            path
                        }
                        trailerPath
                        releaseDate
                        episodes(orderBy: order_ASC) {
                            id
                            createdAt
                            title
                            isPublished
                         }
                      }
                    }

              `,
            variables() {
                return {
                    id: this.$route.params.id
                }
            }
        },
        genres: {
            query: gql `query GetGenres{
            genres{
              id
              name
            }
          }`,
        },
        languages: {
            query: gql `query GetLang{
          languages{
            id
            name
          }
        }`,
        }
    },
    methods: {
        GetEpis() {
            var ep = [];
            for (var i = 0; i < this.seasons[0].episodes.length; i++) {
                ep.push({
                    title: this.seasons[0].episodes[i].title,
                    createdAt: this.seasons[0].episodes[i].createdAt,
                    isPublished: this.seasons[0].episodes[i].isPublished,

                })
            }
            console.log(ep);
            return ep;
        },
        Deleteseason(id) {
            this.$apollo.mutate({
                mutation: Delete_season,
                variables: {
                    id: id,
                },
            }).then((data) => {
                this.$router.go(-1);
            }).catch((error) => {
                this.ChangesError = "Erorr Shown In Console!.";
                this.check = false;
            });
        },
        SaveChanges(season) {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                var imdbId = document.getElementById("imdbId").value;
                var title = document.getElementById("title").value;
                var Order = parseInt(document.getElementById("Order").value);
                if (document.getElementById("releaseDate").value != this.season().releaseDate) {
                    var releaseDate1 = document.getElementById("releaseDate").value + " 00:00 UTC";
                    var dateobj = new Date(releaseDate1);
                    var releaseDate = dateobj.toISOString();
                } else {
                    var releaseDate = this.season().releaseDate;
                }

                var trailerPath = document.getElementById("trailerPath").value;
                // Posters
                var posters = [];
                for (var i = 0; i < this.season().posters.length; i++) {
                    var size = document.getElementById("Postersize" + i + "").value;
                    var path = document.getElementById("PosterPath" + i + "").value;
                    posters.push({
                        size: size,
                        path: path,
                    });
                    this.AllPosters.push({
                        size: size,
                        path: path,
                    });
                }
                for (var i = 0; i < this.newPosters.length; i++) {
                    var size = document.getElementById("PostersizeNew" + i + "").value;
                    var path = document.getElementById("PosterPathNew" + i + "").value;
                    posters.push({
                        size: size,
                        path: path,
                    })
                }

                this.$apollo.mutate({
                    mutation: Edit_season,
                    variables: {
                        id: this.$route.params.id,
                        title: title,
                        releaseDate: releaseDate,
                        order:Order,
                        trailerPath: trailerPath,
                        posters: posters,
                    },
                }).then((data) => {

                    // Delete Posters
                    this.$apollo.mutate({
                        mutation: Delete_Posters,
                        variables: {
                            id: this.$route.params.id,
                        }
                    });
                    this.$apollo.mutate({
                        mutation: Edit_season,
                        variables: {
                            id: this.$route.params.id,
                            title: title,
                            releaseDate: releaseDate,
                            trailerPath: trailerPath,
                            posters: posters,
                        },
                    }).then((data) =>{
                         this.ChangesError = "";
                    this.ChangesDone = "Data Hass Been Updated Successfuly.";
                    this.check = false;
                    })
                }).catch((error) => {
                    this.ChangesDone = "";
                    this.ChangesError = "Erorr Shown In Console!.";
                    console.log(error);
                    this.check = false;
                });
            }
        },
        Valadation() {
            this.RemoveErrors();
            if (document.getElementById("title").value.length == 0) {
                this.ErrorMessage("title");
                return false;
            } else if (document.getElementById("releaseDate").value.length == 0) {
                this.ErrorMessage("releaseDate");
                return false;
            } else if (document.getElementById("trailerPath").value.length == 0) {
                this.ErrorMessage("trailerPath");
                return false;
            }
            for (var i = 0; i < this.season().posters.length; i++) {
                if (document.getElementById("Postersize" + i).value == "Please select Quality" || document.getElementById("Postersize" + i).value.length == 0) {
                    this.ErrorMessage("Postersize" + i);
                    return false;
                } else if (document.getElementById("PosterPath" + i).value.length == 0) {
                    this.ErrorMessage("PosterPath" + i);
                    return false;
                }
            }
            // New Posters
            for (var i = 0; i < this.newPosters.length; i++) {
                if (document.getElementById("PostersizeNew" + i).value == "Please select Quality" || document.getElementById("PostersizeNew" + i).value.length == 0) {
                    this.ErrorMessage("PostersizeNew" + i);
                    return false;
                } else if (document.getElementById("PosterPathNew" + i).value.length == 0) {
                    this.ErrorMessage("PosterPathNew" + i);
                    return false;
                }
            }
            return true;
        },
        RemoveErrors() {
            var className = "alert-danger";
            var elements = document.getElementsByClassName(className);
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        },
        ErrorMessage(ele) {
            var div = document.getElementById(ele);
            var message = document.createElement('div'); // create new textarea
            message.setAttribute('role', 'alert');
            message.setAttribute('class', 'alert alert-danger');
            message.setAttribute('style', 'margin:0.5rem 0;width:100%;');
            message.innerHTML = "Please Fill The Field";

            div.parentNode.insertBefore(message, div.nextSibling);
            div.parentElement.scrollIntoView(true);
        },

        AddnewPoster() {
            this.newPosters.push({});
        },
        RemoveNewPoster(id) {
            this.newPosters.splice(id, 1);
        },
        RemovePoster(id) {
            this.season().posters.splice(id, 1);
        },
        updateReleaseDate(date) {
            var currentTime = new Date(date);
            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
            var day = ("0" + currentTime.getDate()).slice(-2);
            var year = currentTime.getFullYear();
            var date = day + "/" + month + "/" + year;
            return date;
        },
        GetImdp() {
            this.imdpInfo = [];
            fetch('https://www.omdbapi.com/?i=' + this.imdbId + '&apikey=527f9c9a')
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    this.imdpInfo = res;
                    this.title = res.Title;
                    this.IMDPPoster = res.Poster;
                    this.releaseDate = res.Released;
                    // this.lang = res.lang[0];

                });
        },
        GetGenres() {
            var ge = [];
            for (var i = 0; i < this.genres.length; i++) {
                ge.push({
                        key: i,
                        value: this.genres[i].name,
                        text: this.genres[i].name
                    }

                );
            }
            return ge;
        },
        GetLang() {
            var lan = [];
            for (var i = 0; i < this.languages.length; i++) {
                lan.push({
                        value: this.languages[i].name,
                        text: this.languages[i].name
                    }

                );
            }
            return lan;
        },

        season() {
            return this.seasons[0];
        },

    },
    mounted() {
        if (this.store.getters.role != "ADMIN") {
            if (!(this.store.getters.genreTypes.includes("TV"))) {
                this.$router.push('/');
            }
        }
    }

}
</script>
