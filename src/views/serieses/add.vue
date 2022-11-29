<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> New Series</strong>
                    </div>
                    <!-- imdb  -->
                    <b-card>
                        <div slot="header">
                            <strong>Imdb</strong> Import
                        </div>
                        <b-form>
                            <b-form-group label="imdbId" label-for="imdbId" description="Please enter Series imdbId." :label-cols="3">
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
                            <b-form-group label="Title" label-for="title" description="Please enter movie title." :label-cols="3">
                                <b-form-input id="title" v-model="title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                            </b-form-group>
                            <b-form-group label="audience" label-for="audience" description="Please enter moive audience." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="audience" v-model="audience" :plain="true" :options="[
                                                'Please select Audience',
                                                'G',
                                                'PG',
                                                'PG13',
                                                'R',
                                                'NC17',
                                                'TV_MA',
                                                'Unrated',
                                              ]">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="ReleaseDate" label-for="releaseDate" description="Please enter movie ReleaseDate. (16 Feb 2018)" :label-cols="3">
                                <b-form-input id="releaseDate" v-model="releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Genre" label-for="Genre" description="Please Select movie Genres." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Genre" :plain="true" :multiple="true" required :options="GetGenres()" v-model="Genre">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Lang" label-for="Lang" description="Please Select movie Languages." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Lang" :plain="true" required :options="GetLang()" value="English">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="overview" label-for="overview" description="Please enter movie Overview." :label-cols="3">
                                <b-form-textarea id="overview" v-model="overview" type="text" placeholder="Enter Overview.." autocomplete="overview"></b-form-textarea>
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
                            <b-form-group label="Trailer Youtube ID" label-for="trailerPath" description="Please Movie Trailer Youtube ID. ( https://www.youtube.com/watch?v=ID )" :label-cols="3">
                                <b-form-input id="trailerPath" type="text" placeholder="Enter Movie Trailer Youtube ID.." autocomplete="trailerPath"></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card id="NewPosters">
                        <div slot="header">
                            <strong>Posters</strong>
                        </div>
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
                        <b-button @click="AddMovie()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                    </div>
                    <br>
                    <br>
                    <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                    <b-alert v-if="ChangesError.length > 0" show variant="danger">{{ChangesError}}</b-alert>
                    <b-col cols="6" sm="4" md="3" lg="2" v-if="check">
                        <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
                    </b-col>
                </b-card>

            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
const Add_Series = gql `
  mutation TvSeries($title:String!,$audience:Audience!,$Production:Production,$overview:String,$releaseDate:DateTime!,$trailerPath:String,$lang:String,$genres:[GenreWhereUniqueInput!],$posters:[ImageCreateInput!])
  {
  createTvSeries(
    data: {
    title:$title,
    slug:$title,
    trailerPath:$trailerPath,
    genres:{connect:$genres},
    Production:$Production,
    lang:{connect:{name:$lang}},
    posters:{
        create:$posters
        },
    audience:$audience,
    overview:$overview,
    seriesType:TV,
    releaseDate:$releaseDate,
    isPublished:false,
  }){
    id
  }
}
 `;
 const Add_Season = gql `
  mutation Season($title:String!,$user:ID,$releaseDate:DateTime!,$trailerPath:String,$posters:[ImageCreateInput!],$imdbId:String)
  {
  createSeason(
    data: {
    imdbId:$imdbId,
    title:$title,
    slug:$title,
    trailerPath:$trailerPath,
    posters:{
        create:$posters
        },
    releaseDate:$releaseDate,
    publisher:{connect:{id:$user}},
  }){
    id
  }
}
 `;
const updateTvSeries = gql `
  mutation Season($id:ID!,$title:String!)
  {
  updateTvSeries(where:{slug:$title}, data:{
    seasons:{connect:{id:$id}}
  }){
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
            audience: "Unrated",
            overview: "",
            imdbId: "",
            releaseDate: "",
            Genre: [],
            lang: [],
            check: false,
            IMDPPoster:"",
            newPosters: [],
            ChangesDone: "",
            ChangesError: "",
            AllPosters: [],

        }
    },
    apollo: {
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

        AddMovie(mvie) {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                var imdbId = document.getElementById("imdbId").value;
                var title = document.getElementById("title").value;
                var audience = document.getElementById("audience").value;

                var releaseDate1 = document.getElementById("releaseDate").value + " 00:00 UTC";
                var dateobj = new Date(releaseDate1);
                var releaseDate = dateobj.toISOString();
                var Production = document.getElementById("Production").value;
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
                for (var i = 0; i < this.newPosters.length; i++) {
                    var size = document.getElementById("PostersizeNew" + i + "").value;
                    var path = document.getElementById("PosterPathNew" + i + "").value;
                    posters.push({
                        size: size,
                        path: path,
                    })
                }
                // Push To Database
                this.$apollo.mutate({
                    mutation: Add_Series,
                    variables: {
                        genres: Genres,
                        title: title,
                        lang: Lang,
                        Production:Production,
                        audience: audience,
                        releaseDate: releaseDate,
                        overview: overview,
                        trailerPath: trailerPath,
                        posters: posters,
                    },
                }).then((data) => {
                    this.ChangesError = "";
                    // Create ew Subtitles
                    this.ChangesDone = "Data Hass Been Added Successfuly.";
                    this.AddSeason();
                    this.check = false;
                }).catch((error) => {
                    this.ChangesDone = "";
                    this.ChangesError = "Erorr Shown In Console!. راجع اسم الايتم او تأكد من وجودة مسبقا";
                    console.log(error);
                    this.check = false;
                });
            }
        },
         AddSeason() {
                var imdbId = document.getElementById("imdbId").value;
                var SeriesTitle = document.getElementById("title").value;
                var title = "الموسم الاول";
                title = SeriesTitle + " " + title;
                var releaseDate1 = document.getElementById("releaseDate").value + " 00:00 UTC";
                var dateobj = new Date(releaseDate1);
                var releaseDate = dateobj.toISOString();
                var trailerPath = document.getElementById("trailerPath").value;
                // Posters
                var posters = [];
                for (var i = 0; i < this.newPosters.length; i++) {
                    var size = document.getElementById("PostersizeNew" + i + "").value;
                    var path = document.getElementById("PosterPathNew" + i + "").value;
                    posters.push({
                        size: size,
                        path: path,
                    })
                }
                // Push To Database
                this.$apollo.mutate({
                    mutation: Add_Season,
                    variables: {
                        title: title,
                        imdbId: imdbId,
                        releaseDate: releaseDate,
                        trailerPath: trailerPath,
                        posters: posters,
                        user: this.store.getters.user,
                    },
                }).then((data) => {
                    this.ChangesError = "";
                    // Add To Series
                    this.$apollo.mutate({
                    mutation: updateTvSeries,
                    variables: {
                        title: SeriesTitle,
                        id: data.data.createSeason.id,
                    }});
                    this.ChangesDone = "تم اضافة الموسم الاول الان ابدأ بأضافة الحلقة الاولي";
                    this.check = false;
                }).catch((error) => {
                    this.ChangesDone = "";
                    this.ChangesError = "Erorr Shown In Console!.";
                    console.log(error);
                    this.check = false;
                });
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
            if (this.newPosters.length == 0) {
                this.ErrorMessage("NewPosters");
                return false;
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
                    } else if(res.Rated == "TV-MA"){
                        this.audience = "TV_MA";
                    } else {
                        this.audience = res.Rated;
                    }
                    this.releaseDate = res.Released;
                    this.overview = res.Plot;
                    var gen = res.Genre;
                    var sp = gen.split(', ');
                    for (var i = 0; i < sp.length; i++) {
                        this.Genre.push(sp[i]);
                    }
                    var lang = res.Language;
                    var la = lang.split(', ');;
                    this.lang = la[0];
                     if(this.lang == ""){
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
