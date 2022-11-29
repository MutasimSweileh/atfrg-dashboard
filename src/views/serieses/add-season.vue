<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> New Season</strong>
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
                            <b-form-group label="Title" label-for="title" description="Please enter Season title. ( الموسم الاول - الموسم الثاني )" :label-cols="3">
                                   <b-input-group>
                                    <b-form-select id="title" :plain="true" :options="[
                                    'الموسم الاول',
                                    'الموسم الثاني',
                                    'الموسم الثالت',
                                    'الموسم الرابع',
                                    'الموسم الخامس',
                                    'الموسم السادس',
                                    'الموسم السابع',
                                    'الموسم الثامن',
                                    'الموسم التاسع',
                                    'الموسم العاشر',
                                    'الموسم الحادي عشر 11',
                                    'الموسم الثاني عشر 12',
                                    'الموسم الثالث عشر 13',
                                    'الموسم الرابع عشر 14',
                                    'الموسم الخامس عشر 15',
                                    'الموسم السادس عشر 16',
                                    '17 الموسم السابع عشر',
                                    'الموسم الثامن عشر 18',
                                    'الموسم التاسع عشر 19',
                                    'الموسم العشرين 20',
                                    ]" value="الموسم الاول">
                                    </b-form-select>
                                </b-input-group>
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
                                    ]" value="1">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="ReleaseDate" label-for="releaseDate" description="Please enter Season ReleaseDate." :label-cols="3">
                                <b-form-input id="releaseDate" v-model="releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Series" label-for="Series" description="Please Choose Series." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Series"  :plain="true" :options="GetSerieses()" value="Choose Series">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Sub</strong> Information
                        </div>
                        <b-form>
                            <b-form-group label="Trailer Youtube ID" label-for="trailerPath" description="Please Season Trailer Youtube ID. ( https://www.youtube.com/watch?v=ID )" :label-cols="3">
                                <b-form-input id="trailerPath" type="text" placeholder="Enter Season Trailer Youtube ID.." autocomplete="trailerPath"></b-form-input>
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
                        <b-button @click="AddSeason()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
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
const Add_Season = gql `
  mutation Season($title:String!,$user:ID,$releaseDate:DateTime!,$trailerPath:String,$posters:[ImageCreateInput!],$imdbId:String,$order:Int)
  {
  createSeason(
    data: {
    imdbId:$imdbId,
    title:$title,
    order:$order
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
            tvSerieses: [],
            imdpInfo: [],
            title: "",
            imdbId: "",
            releaseDate: "",
            check: false,
            IMDPPoster: "",
            newPosters: [],
            ChangesDone: "",
            ChangesError: "",
            AllPosters: [],

        }
    },
    apollo: {
        tvSerieses: {
            query: gql `query TVSeries{
            tvSerieses(where:{seriesType:TV}){
                id
                title
            }
            }`,
        },
    },
    methods: {
        AddSeason() {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                var imdbId = document.getElementById("imdbId").value;
                var SeriesTitle = document.getElementById("Series").value;
                var title = document.getElementById("title").value;
                title = SeriesTitle + " " + title;
                var releaseDate1 = document.getElementById("releaseDate").value + " 00:00 UTC";
                var dateobj = new Date(releaseDate1);
                var releaseDate = dateobj.toISOString();
                var trailerPath = document.getElementById("trailerPath").value;
                // Posters
                var Order = parseInt(document.getElementById("Order").value);
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
                        order:Order,
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
                    this.ChangesDone = "Data Hass Been Added Successfuly.";
                    this.check = false;
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
            if (document.getElementById("imdbId").value.length == 0) {
                this.ErrorMessage("imdbId");
                return false;
            } else if (document.getElementById("title").value.length == 0) {
                this.ErrorMessage("title");
                return false;
            }  else if (document.getElementById("Order").value.length == 0) {
                this.ErrorMessage("Order");
                return false;
            } else if (document.getElementById("releaseDate").value.length == 0) {
                this.ErrorMessage("releaseDate");
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
        GetSerieses(){
            var ser = [];
            for(var i =0; i< this.tvSerieses.length; i++){
                ser.push(this.tvSerieses[i].title);
            }
            return ser;
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
                    this.releaseDate = res.Released;
                    this.IMDPPoster = res.Poster;

                });
        }
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
