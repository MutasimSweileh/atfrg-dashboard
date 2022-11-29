<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> New Episode</strong>
                    </div>
                    <!-- Main Information -->
                    <b-card>
                        <div slot="header">
                            <strong>Main</strong> Information
                        </div>
                        <b-form>
                            <b-form-group label="Title" label-for="title" description="Please enter Episode title. (الحلقة الاول - الحلقة الثانية)" :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="title" :plain="true" :options="[
                                    'الحلقة الاولي',
                                    'الحلقة الثانية',
                                    'الحلقة الثالثة',
                                    'الحلقة الرابعة',
                                    'الحلقة الخامسة',
                                    'الحلقة السادسة',
                                    'الحلقة السابعة',
                                    'الحلقة الثامنة',
                                    'الحلقة التاسعة',
                                    'الحلقة العاشرة',
                                    '11 الحلقة',
                                    '12 الحلقة',
                                    '13 الحلقة',
                                    '14 الحلقة',
                                    '15 الحلقة',
                                    '16 الحلقة',
                                    '17 الحلقة',
                                    '18 الحلقة',
                                    '19 الحلقة',
                                    '20 الحلقة',
                                    '21 الحلقة',
                                    '22 الحلقة',
                                    '23 الحلقة',
                                    '24 الحلقة',
                                    '25 الحلقة',
                                    '26 الحلقة',
                                    '27 الحلقة',
                                    '28 الحلقة',
                                    '29 الحلقة',
                                    '30 الحلقة',
                                    '31 الحلقة',
                                    '32 الحلقة',
                                    '33 الحلقة',
                                    '34 الحلقة',
                                    '35 الحلقة',

                                    ]" value="الحلقة الاولي 1">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Order" label-for="Order" description="Please enter Episode Order. ( ترتيب الحلقة)" :label-cols="3">
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
                                    '17',
                                    '18',
                                    '19',
                                    '20',
                                    '21',
                                    '22',
                                    '23',
                                    '24',
                                    '25',
                                    '26',
                                    '27',
                                    '28',
                                    '29',
                                    '30',
                                    '31',
                                    ]" value="1">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Series" label-for="Series" description="Please Choose Series." :label-cols="3">
                                <b-input-group>
                                    <b-form-select @keyup="GetSeasons()" v-model="Series" id="Series" :plain="true" :options="GetSerieses()">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Season" label-for="Season" description="Please Choose Season." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Season" :plain="true" :options="GetSeasons()">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="videoQualities" label-for="videoQualities" description="Please Select Episode videoQualities." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="videoQualities" :multiple="true" :options="[
                                    'Q144',
                                    'Q360',
                                    'Q480',
                                    'Q720',
                                    'Q1080',
                                    ]" v-model="videoQualities">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card id="NewSubtitles">
                        <div slot="header">
                            <strong>Subtitles</strong> لو مفيش ترجمة اكتب لغة الترجمة - اسم المترجم - سيب ال لينك فاضي
                        </div>
                        <div slot="footer">
                            <b-button @click="AddnewSubtitle" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> New Subtitle</b-button>
                        </div>
                        <!-- New -->
                        <b-card v-for="(subtitle,index) in newSubtitle" :key="index">
                            <div slot="header">
                                <strong>New</strong> Subtitle
                                <b-button @click="RemoveNewSubtitle(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Subtitle Lang" label-for="subtitleLangNew" description="Please Choose Subtitle Lang." :label-cols="3">
                                <b-input-group>
                                    <b-form-select :id="'SubtitleLangNew' + index" :plain="true" :options="GetLang()">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Subtitle Name" label-for="SubtitleNameNew" description="Please Enter Subtitle Name" :label-cols="3">
                                <b-form-input :id="'SubtitleNameNew' + index" type="text" placeholder="Please Enter Subtitle Name." autocomplete="SubtitleName"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Subtitle Path" label-for="SubtitlePathNew" description="Please Enter Subtitle Path" :label-cols="3">
                                <b-form-input :id="'SubtitlePathNew' + index" value="https://cdn.atfrg.online/" type="text" placeholder="Please Enter Subtitle Path." autocomplete="SubtitlePath"></b-form-input>
                            </b-form-group>
                        </b-card>
                    </b-card>
                    <b-card id="NewLinks">
                        <div slot="header">
                            <strong>Videos</strong> Information
                        </div>
                        <b-card v-for="(link ,index) in newLinks" :key="link.id">
                            <div slot="header">
                                <strong>{{link.quality}}</strong> Video Link
                                <b-button @click="RemoveNewLink(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Video Qualities 2" label-for="LinkvideoQualities" description="Please Select Episode videoQualities." :label-cols="3">
                                <b-input-group>
                                    <b-form-select :id="'LinkvideoQualitiesNew' + index" :plain="true" :options="[
                                    'Q144',
                                    'Q360',
                                    'Q480',
                                    'Q720',
                                    'Q1080',
                                    ]">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Video Path" label-for="VideoPath" description="Please Enter Video Path" :label-cols="3">
                                <b-form-input :id="'VideoPathNew' + index" type="text" value="https://cdn.atfrg.online/"  placeholder="Please Enter Video Path." autocomplete="PosterPath"></b-form-input>
                            </b-form-group>
                            <b-button @click="CheckLink('VideoPathNew' + index)" style="float:right" size="sm" variant="primary">تجربة ال لينك</b-button>
                        </b-card>
                        <div slot="footer">
                            <b-button @click="AddNewLink" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> New Link</b-button>
                        </div>
                    </b-card>
                    <div slot="footer">
                        <b-button @click="AddEpsiode()" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                    </div>
                    <br>
                    <br>
                    <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                    <b-button  v-if="ChangesDone.length > 0" @click="goLink()" size="sm" style="float:right;margin: 0 0.5rem;" variant="success">تجربة كاملة</b-button>
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
const Add_Epsiode = gql `
  mutation AddEpsiode($title:String!,$posters:[ImageCreateInput!],$links:[VideoLinksCreateInput!],$videoQualities:[VideoQuality!], $order:Int)
  {
  createEpisode(
    data: {
    title:$title,
    slug:$title,
    order:$order
    posters:{
        create:$posters
        },
    links:{
     create:$links
    },
    runtime:0,
    isPublished:false,
    videoQualities:{set:$videoQualities}
  }){
    id
  }
}
 `;
const Create_Subtitles = gql `
  mutation EpisodeEdit($id:ID,$Lang:String!,$Name:String!,$Path:String!)
  {
  updateEpisode(where:{id:$id}, data:{
      subtitles:{
      create:{
        name:$Name,
        path:$Path,
        lang:{connect:{name:$Lang}}
      }
    }
  }){
    id
  }
}
 `;
const updateTvSeries = gql `
  mutation updateSeason($id:ID!,$title:String!)
  {
  updateSeason(where:{slug:$title}, data:{
    episodes:{connect:{id:$id}}
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
            Series: "",
            imdpInfo: [],
            title: "",
            audience: [],
            imdbId: "",
            runtime: "",
            check: false,
            videoQualities: [],
            newSubtitle: [],
            newLinks: [],
            newPosters: [],
            ChangesDone: "",
            ChangesError: "",
            AllPosters: [],
            Allsubtitles: [],
            AllLinks: [],
            IMDPPoster: "",
            tvSerieses: [],
            newid:"",

        }
    },
    apollo: {
        tvSerieses: {
            query: gql `query TVSeries{
            tvSerieses(where:{seriesType:ANIME}){
                id
                title
                seasons {
                    id
                    title
                }
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
         goLink(){
            window.open('https://atfrg.online/episodetest/' + this.newid, '_blank');
        },
        AddEpsiode() {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                var title = document.getElementById("title").value;
                var Order = parseInt(document.getElementById("Order").value);
                var SeasonTitle = document.getElementById("Season").value;
                const videoQualitiesselected = document.querySelectorAll('#videoQualities option:checked');
                var videoQualities = Array.from(videoQualitiesselected).map(el => el.value);
                // Posters
                // Subtitles
                var subtitles = [];
                for (var i = 0; i < this.newSubtitle.length; i++) {
                    var lang = document.getElementById("SubtitleLangNew" + i + "").value;
                    var name = document.getElementById("SubtitleNameNew" + i + "").value;
                    var path = document.getElementById("SubtitlePathNew" + i + "").value;
                    //var key = movie.subtitles.length + i;
                    subtitles.push({
                        name: name,
                        lang: lang,
                        path: path,
                    })
                }
                // Links
                var links = [];
                for (var i = 0; i < this.newLinks.length; i++) {
                    var quality = document.getElementById("LinkvideoQualitiesNew" + i + "").value;
                    var path = document.getElementById("VideoPathNew" + i + "").value;
                    links.push({
                        quality: quality,
                        path: path,
                    })
                }

                // Push To Database
                this.$apollo.mutate({
                    mutation: Add_Epsiode,
                    variables: {
                        title: title,
                        videoQualities: videoQualities,
                        order: Order,
                        links: links,
                    },
                }).then((data) => {
                    this.ChangesError = "";
                    // Create ew Subtitles
                    var id = data.data.createEpisode.id;
                    for (var i = 0; i < subtitles.length; i++) {
                        var name = subtitles[i].name;
                        var langs = subtitles[i].lang;
                        var path = subtitles[i].path;
                        this.$apollo.mutate({
                            mutation: Create_Subtitles,
                            variables: {
                                id: id,
                                Name: name,
                                Lang: langs,
                                Path: path
                            }
                        });
                    }
                    // Add To Epis
                    this.$apollo.mutate({
                        mutation: updateTvSeries,
                        variables: {
                            title: SeasonTitle,
                            id: data.data.createEpisode.id,
                        }
                    });
                    this.ChangesDone = "Data Hass Been Added Successfuly.";
                    this.newid = data.data.createEpisode.id;
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
            if (document.getElementById("title").value.length == 0) {
                this.ErrorMessage("title");
                return false;
            } else if (document.getElementById("videoQualities").value.length == 0) {
                this.ErrorMessage("videoQualities");
                return false;
            } else if (document.getElementById("Order").value.length == 0) {
                this.ErrorMessage("Order");
                return false;
            }
            if (this.newLinks.length == 0) {
                this.ErrorMessage("NewLinks");
                return false;
            }
            // New Subtitle
            for (var i = 0; i < this.newSubtitle.length; i++) {
                if (document.getElementById("SubtitleLangNew" + i).value.length == 0) {
                    this.ErrorMessage("SubtitleLangNew" + i);
                    return false;
                } else if (document.getElementById("SubtitleNameNew" + i).value.length == 0) {
                    this.ErrorMessage("SubtitleNameNew" + i);
                    return false;
                } 
            }
            // New Liks
            for (var i = 0; i < this.newLinks.length; i++) {
                if (document.getElementById("LinkvideoQualitiesNew" + i).value.length == 0) {
                    this.ErrorMessage("LinkvideoQualitiesNew" + i);
                    return false;
                } else if (document.getElementById("VideoPathNew" + i).value.length == 0) {
                    this.ErrorMessage("VideoPathNew" + i);
                    return false;
                }
            }
            return true;
        },
        GetSerieses() {
            var ser = [];
            for (var i = 0; i < this.tvSerieses.length; i++) {
                ser.push(this.tvSerieses[i].title);
            }
            return ser;
        },
        GetSeasons() {
            var seasons = [];
            var title = this.Series;;
            for (var i = 0; i < this.tvSerieses.length; i++) {
                if (this.tvSerieses[i].title == title) {
                    for (var j = 0; j < this.tvSerieses[i].seasons.length; j++) {
                        seasons.push(this.tvSerieses[i].seasons[j].title);
                    }

                }

            }
            return seasons;
        },
        validLink(path) {
            var type = path.slice(-3).toLowerCase();
            path = path.substring(0, path.length - 3) + type
            return path;
        },
        LinkToken(path) {
            var crypto = require('crypto');
            var securityKey = '6ecb7c25-9744-498a-a49b-ae4c7980c861';
            var newpath = path.substring(24, path.length);
            // Set the time of expiry to one hour from now
            var expires = Math.round(Date.now() / 1000) + 43200;

            var hashableBase = securityKey + newpath + expires;
            // Generate and encode the token 
            var md5String = crypto.createHash("md5").update(hashableBase).digest("binary");
            var token = new Buffer(md5String, 'binary').toString('base64');
            token = token.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
            var url = 'https://atfrgonline.b-cdn.net' + newpath + '?token=' + token + '&expires=' + expires;
            return url;
        },
        CheckLink(id) {
            var link = document.getElementById(id).value;
            link = this.validLink(link);
            link = this.LinkToken(link);
            window.open(link, "_blank");
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

        AddnewSubtitle() {
            this.newSubtitle.push({});
        },
        RemoveNewSubtitle(id) {
            this.newSubtitle.splice(id, 1);
        },
        AddNewLink() {
            this.newLinks.push({});
        },
        RemoveNewLink(id) {
            this.newLinks.splice(id, 1);
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
                    this.runtime = res.Runtime;
                    this.IMDPPoster = res.Poster;
                });
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
