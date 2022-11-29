<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card v-for="series in tvSerieses" :key="series.id" header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> {{series.title}}</strong>
                        <span v-if="series.isPublished" style="color:green;margin:0 1rem;">Published</span>
                        <span v-else style="color:red;margin:0 1rem;">UnPublished</span>
                        <span v-if="store.getters.role == 'ADMIN'">
                            <b-button v-if="series.isPublished" @click="Unpublish(series.id)" style="float:right;margin: 0 0.5rem;" size="sm" variant="primary">UnPublish</b-button>
                            <b-button v-else @click="Publish(series.id)" size="sm" style="float:right;margin: 0 0.5rem;" variant="primary">Publish</b-button>
                            <b-button @click="dangerModal = true" style="float:right" size="sm" variant="danger">Delete</b-button>
                        </span>
                    </div>
                    <!-- imdb  -->
                    <b-card>
                        <div slot="header">
                            <strong>Imdb</strong> Import
                        </div>
                        <b-form>
                            <b-form-group label="imdbId" label-for="imdbId" description="Please enter series imdbId." :label-cols="3">
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
                            <b-form-group label="Title" label-for="title" description="Please enter series title." :label-cols="3">
                                <b-form-input v-if="title != ''" id="title" v-model="title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                <b-form-input id="title" v-else v-model="series.title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                            </b-form-group>
                            <b-form-group label="audience" label-for="audience" description="Please enter moive audience." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="audience" v-if="audience != ''" v-model="audience" :plain="true" :options="[
                                                'Please select Audience',
                                                'G',
                                                'PG',
                                                'PG13',
                                                'R',
                                                'NC17',
                                              ]">
                                    </b-form-select>
                                    <b-form-select id="audience" v-else v-model="series.audience" :plain="true" :options="[
                                                'Please select Audience',
                                                'G',
                                                'PG',
                                                'PG13',
                                                'R',
                                                'NC17',
                                                'TV_MA',
                                              ]">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="ReleaseDate" label-for="releaseDate" description="Please enter series ReleaseDate." :label-cols="3">
                                <b-form-input id="releaseDate" v-if="releaseDate != ''" v-model="releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                                <b-form-input id="releaseDate" v-else v-model="series.releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Genre" label-for="Genre" description="Please Select series Genres." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Genre" v-if="Genre.length > 0" :plain="true" :multiple="true" required :options="GetGenres()" v-model="Genre">
                                    </b-form-select>
                                    <b-form-select id="Genre" v-else :plain="true" :multiple="true" required :options="GetGenres()" :value="seriesDGenre">
                                    </b-form-select>

                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Lang" label-for="Lang" description="Please Select series Languages." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Lang" v-if="lang.length > 0" :plain="true" required :options="GetLang()" v-model="lang">
                                    </b-form-select>
                                    <b-form-select id="Lang" v-else :plain="true" required :options="GetLang()" :value="series.lang.name">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="overview" label-for="overview" description="Please enter series Overview." :label-cols="3">
                                <b-form-textarea id="overview" v-model="series.overview" type="text" placeholder="Enter Overview.." autocomplete="overview"></b-form-textarea>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Sub</strong> Information
                        </div>
                        <b-form>
                             <b-form-group label="Production" label-for="Production" description="Please Select Series Production." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Production" :plain="true" required :options="[
                                    'UNKNOWN',
                                    'MARVEL',
                                    'NETFLIX',
                                    'HBO',
                                    'BBC',
                                    'DISNEY',
                                    'FOX',
                                    'SONY',
                                    ]" value="UNKNOWN">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Trailer Youtube ID" label-for="trailerPath" description="Please series Trailer Youtube ID. ( https://www.youtube.com/watch?v=ID )" :label-cols="3">
                                <b-form-input id="trailerPath" :value="series.trailerPath" type="text" placeholder="Enter series Trailer Youtube ID.." autocomplete="trailerPath"></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Posters</strong>
                        </div>
                        <b-card v-for="(poster,index) in series.posters" :key="poster.id">
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
                        <b-button @click="SaveChanges(series)" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Save Changes</b-button>
                    </div>
                    <br>
                    <br>
                    <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                    <b-alert v-if="ChangesError.length > 0" show variant="danger">{{ChangesError}}</b-alert>
                    <b-col cols="6" sm="4" md="3" lg="2" v-if="check">
                        <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
                    </b-col>
                    <b-modal :title="'Deleting ' + series.title + ' series!'" variant="danger" header-bg-variant="danger" content-class="border-danger" v-model="dangerModal" @ok="[dangerModal = false, Deleteseries(series.id)] " ok-variant="danger">
                        Are You Sure Deleting <span style="color:green">{{series.title}}</span> series ? <br>
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
const Edit_Series = gql `
  mutation updateTvSeries($id:ID,$title:String!,$Production:Production,$audience:Audience!,$overview:String,$releaseDate:DateTime!,$trailerPath:String,$lang:String,$genres:[GenreWhereUniqueInput!],$posters:[ImageCreateInput!])
  {
  updateTvSeries(where:{id:$id}, data:{
    title:$title,
    slug:$title,
    Production:$Production,
    trailerPath:$trailerPath,
    genres:{set:$genres},
   lang:{connect:{name:$lang}},,
    posters:{
        create:$posters
        },
    audience:$audience,
    overview:$overview,
    releaseDate:$releaseDate,
    isPublished:false,
  }){
    id
  }
}
 `;
const Delete_Posters = gql `
  mutation seriessEdit($id:ID)
  {
  updateTvSeries(where:{id:$id}, data:{
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
const Delete_Series = gql `
   mutation deleteTvSeries($id: ID) {
     deleteTvSeries(where: { id: $id }) {
       id
     }
   }
 `;

const UnPublish_Series = gql `
   mutation Series($id: ID) {
    updateTvSeries(where:{id:$id},data:{
    isPublished:false
    })
    {
        id
    }
    }
 `;
const Publish_Series = gql `
   mutation Series($id: ID) {
    updateTvSeries(where:{id:$id},data:{
    isPublished:true
    })
    {
        id
    }
    }
 `;
export default {
    data() {
        return {
            loaded: false,
            genres: [],
            languages: [],
            imdpInfo: [],
            title: "",
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
            tvSerieses: [],
            IMDPPoster: "",

        }
    },
    apollo: {
        tvSerieses: {
            query: gql ` query tvSerieses($id:ID) {
                      tvSerieses(where:{id:$id}) {
                        id
                        audience
                        genres {
                          id
                          name
                        }
                        title
                        overview
                        releaseDate
                        isPublished
                        trailerPath
                        posters {
                          id
                          size
                          path
                        }
                        lang {
                          id
                          name
                        }
                        seasons {
                          id
                          title
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
        Deleteseries(id) {
            this.$apollo.mutate({
                mutation: Delete_Series,
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
        
        SaveChanges(series) {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                var imdbId = document.getElementById("imdbId").value;
                var title = document.getElementById("title").value;
                var Production = document.getElementById("Production").value;
                var audience = document.getElementById("audience").value;
                if (document.getElementById("releaseDate").value != this.series().releaseDate) {
                    var releaseDate1 = document.getElementById("releaseDate").value + " 00:00 UTC";
                    var dateobj = new Date(releaseDate1);
                    var releaseDate = dateobj.toISOString();
                } else {
                    var releaseDate = this.series().releaseDate;
                }
                const Genreselected = document.querySelectorAll('#Genre option:checked');
                var Genre = Array.from(Genreselected).map(el => el.value);
                // Genre
                var Genres = [];
                for (var i = 0; i < Genre.length; i++) {
                    var name = Genre[i];
                    Genres.push({
                        name: name,
                    })
                }
                var Lang = document.getElementById("Lang").value;
                var overview = document.getElementById("overview").value;
                var trailerPath = document.getElementById("trailerPath").value;
                // Posters
                var posters = [];
                for (var i = 0; i < this.series().posters.length; i++) {
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
                    mutation: Edit_Series,
                    variables: {
                        id: this.$route.params.id,
                        genres: Genres,
                        title: title,
                        lang: Lang,
                        audience: audience,
                        releaseDate: releaseDate,
                        overview: overview,
                        trailerPath: trailerPath,
                        posters: posters,
                        Production:Production,
                    },
                }).then((data) => {
                    this.ChangesError = "";
                    // Delete Posters
                    this.$apollo.mutate({
                        mutation: Delete_Posters,
                        variables: {
                            id: this.$route.params.id,
                        }
                    });
                    this.$apollo.mutate({
                        mutation: Edit_Series,
                        variables: {
                            id: this.$route.params.id,
                            genres: Genres,
                            title: title,
                            lang: Lang,
                            audience: audience,
                            releaseDate: releaseDate,
                            overview: overview,
                            trailerPath: trailerPath,
                            posters: posters,
                            Production:Production,
                        },
                    }).then((data) => {
                        this.ChangesDone = "Data Hass Been Updated Successfuly.";
                        this.check = false;
                    });     
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
            } else if (document.getElementById("audience").value.length == 0) {
                this.ErrorMessage("audience");
                return false;
            } else if (document.getElementById("releaseDate").value.length == 0) {
                this.ErrorMessage("releaseDate");
                return false;
            } else if (document.getElementById("Genre").value.length == 0) {
                this.ErrorMessage("Genre");
                return false;
            } else if (document.getElementById("overview").value.length == 0) {
                this.ErrorMessage("overview");
                return false;
            } else if (document.getElementById("trailerPath").value.length == 0) {
                this.ErrorMessage("trailerPath");
                return false;
            }
            for (var i = 0; i < this.series().posters.length; i++) {
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
        Unpublish(id) {
            this.$apollo.mutate({
                mutation: UnPublish_Series,
                variables: {
                    id: id,
                },
            }).then((data) => {
                // this.isPublished = false;
                this.series().isPublished = false;
            }).catch((error) => {
                this.ChangesError = "Erorr Shown In Console!.";
                this.check = false;
            });
        },
        Publish(id) {
            this.$apollo.mutate({
                mutation: Publish_Series,
                variables: {
                    id: id,
                },
            }).then((data) => {
                // this.isPublished = true;
                this.series().isPublished = true;
            }).catch((error) => {
                this.ChangesError = "Erorr Shown In Console!.";
                this.check = false;
            });
        },
        AddnewPoster() {
            this.newPosters.push({});
        },
        RemoveNewPoster(id) {
            this.newPosters.splice(id, 1);
        },
        RemovePoster(id) {
            this.series().posters.splice(id, 1);
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
                    if (res.Rated == "PG-13") {
                        this.audience = "PG13";
                    } else if (res.Rated == "NC-17") {
                        this.audience = "NC17";
                    } else if (res.Rated == "TV-MA") {
                        this.audience = "TV_MA";
                    } else {
                        this.audience = res.Rated;
                    }
                    this.releaseDate = res.Released;
                    var gen = res.Genre;
                    var sp = gen.split(', ');
                    for (var i = 0; i < sp.length; i++) {
                        this.Genre.push(sp[i]);
                    }
                    var lang = res.Language;
                    var la = lang.split(', ');;
                    this.lang = la[0];
                    if (this.lang == "") {
                        this.lang = "English";
                    }
                    this.IMDPPoster = res.Poster;
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
        LoadData() {
            if (this.seriess.length > 0) {
                var series = this.seriess[0];
                this.title = series.title;
                this.audience = series.audience;
                this.imdbId = series.imdbId;
                this.releaseDate = series.releaseDate;
                for (var i = 0; i < series.genres.length; i++) {
                    this.Genre.push(series.genres[i].name);
                }
                // this.lang = this.GetLangVal(series.lang);
                this.runtime = series.runtime;

                return true;
            }
            return false;
        },
        series() {
            return this.tvSerieses[0];
        },
        seriesGenre() {
            var gen = [];
            for (var i = 0; i < this.tvSerieses[0].genres.length; i++) {
                gen.push(this.tvSerieses[0].genres[i].name);
            }
            return gen;
        },
        seriesLang() {
            return this.series().lang[0].name;
        },
        GetVideoQ(Quality) {
            var Q = [];
            Q.push(Quality);
            return Q;
        }

    },
    computed: {
        seriesDGenre: function () {
            var gee = [];
            for (var i = 0; i < this.series().genres.length; i++) {
                gee.push(this.series().genres[i].name);
            }
            return gee;
        },
        getlangs: function () {
            var lan = [];
            if (this.series().lang.name.length > 0) {
                lan.push(this.series().lang.name);
            }

            return lan;
        },
        isPublished: function () {
            if (this.series.isPublished == true) {
                return true
            } else {
                return false;
            }
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
