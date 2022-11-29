<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card v-for="episode in episodes" :key="episode.id" header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> {{episode.title}}</strong>
                        <span v-if="episode.isPublished" style="color:green;margin:0 1rem;">Published</span>
                        <span v-else style="color:red;margin:0 1rem;">UnPublished</span>
                        <span v-if="store.getters.role == 'ADMIN'">
                            <b-button v-if="episode.isPublished" @click="Unpublish(episode.id)" style="float:right;margin: 0 0.5rem;" size="sm" variant="primary">UnPublish</b-button>
                            <b-button v-else @click="Publish(episode.id)" size="sm" style="float:right;margin: 0 0.5rem;" variant="primary">Publish</b-button>
                            <b-button @click="dangerModal = true" style="float:right" size="sm" variant="danger">Delete</b-button>
                        </span>
                        <b-button @click="goLink(episode.id)" size="sm" style="float:right;margin: 0 0.5rem;" variant="success">تجربة كاملة</b-button>
                    </div>
                    <!-- imdb  -->
                
                    <!-- Main Information -->
                    <b-card>
                        <div slot="header">
                            <strong>Main</strong> Information
                        </div>
                        <b-form>
                            <b-form-group label="Title" label-for="title" description="Please enter episode title. اطلب التعديل من الادمن" :label-cols="3">
                                <b-form-input v-if="store.getters.role == 'ADMIN'" id="title" v-model="episode.title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                <b-form-input v-else id="title" v-model="episode.title" type="text" placeholder="Enter Title.." autocomplete="title" disabled></b-form-input>
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
                                    ]" :value="episode.order">
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
                            <b-form-group label="videoQualities" label-for="videoQualities" description="Please Select episode videoQualities." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="videoQualities" :plain="true" :multiple="true" required :options="[
                                    'Q144',
                                    'Q360',
                                    'Q480',
                                    'Q720',
                                    'Q1080',
                                    ]" :value="episode.videoQualities">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-form>
                    </b-card>
                   
                    <b-card>
                        <div slot="header">
                            <strong>Subtitles</strong>
                        </div>
                        <b-card v-for="(subtitle,index) in episode.subtitles" :key="subtitle.id">
                            <div slot="header">
                                <strong>{{subtitle.name}}</strong> Subtitle
                                <b-button @click="RemoveSubtitle(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Subtitle Lang" label-for="SubtitleLang" description="Please Choose Subtitle Lang." :label-cols="3">
                                <b-input-group>
                                    <b-form-select :id="'SubtitleLang' + index" :value="subtitle.lang.name" :plain="true" :options="GetLang()">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Subtitle Name" label-for="SubtitleName" description="Please Enter Subtitle Name" :label-cols="3">
                                <b-form-input :id="'SubtitleName' + index" :value="subtitle.name" type="text" placeholder="Please Enter Subtitle Name." autocomplete="SubtitleName"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Subtitle Path" label-for="SubtitlePath" description="Please Enter Subtitle Path" :label-cols="3">
                                <b-form-input :id="'SubtitlePath' + index" :value="subtitle.path" type="text" placeholder="Please Enter Subtitle Path." autocomplete="SubtitlePath"></b-form-input>
                            </b-form-group>

                        </b-card>
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
                                <b-form-input :id="'SubtitlePathNew' + index" type="text" value="https://cdn.atfrg.online/" placeholder="Please Enter Subtitle Path." autocomplete="SubtitlePath"></b-form-input>
                            </b-form-group>
                        </b-card>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Videos</strong> Information
                        </div>
                        <b-card v-for="(link ,index) in episode.links" :key="link.id">
                            <div slot="header">
                                <strong>{{link.quality}}</strong> Video Link
                                <b-button @click="RemoveLink(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Video Qualities" label-for="LinkvideoQualities" description="Please Select episode videoQualities." :label-cols="3">
                                <b-input-group>
                                    <b-form-select :id="'LinkvideoQualities' + index" :value="link.quality" :plain="true" :options="[
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
                                <b-form-input :id="'VideoPath' + index" :value="link.path" type="text" placeholder="Please Enter Video Path." autocomplete="PosterPath"></b-form-input>
                            </b-form-group>
                             <b-button @click="CheckLink('VideoPath' + index)" style="float:right" size="sm" variant="primary">تجربة ال لينك</b-button>
                        </b-card>
                        <b-card v-for="(link ,index) in newLinks" :key="link.id">
                            <div slot="header">
                                <strong>{{link.quality}}</strong> Video Link
                                <b-button @click="RemoveNewLink(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Video Qualities" label-for="LinkvideoQualities" description="Please Select episode videoQualities." :label-cols="3">
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
                                <b-form-input :id="'VideoPathNew' + index" type="text" placeholder="Please Enter Video Path." autocomplete="PosterPath"></b-form-input>
                            </b-form-group>
                               <b-button @click="CheckLink('VideoPathNew' + index)" style="float:right" size="sm" variant="primary">تجربة ال لينك</b-button>
                        </b-card>
                        <div slot="footer">
                            <b-button @click="AddNewLink" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> New Link</b-button>
                        </div>
                    </b-card>
                    <div slot="footer">
                        <b-button @click="SaveChanges(episode)" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Save Changes</b-button>
                    </div>
                    <br>
                    <br>
                    <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                    <b-alert v-if="ChangesError.length > 0" show variant="danger">{{ChangesError}}</b-alert>
                    <b-col cols="6" sm="4" md="3" lg="2" v-if="check">
                        <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
                    </b-col>
                    <b-modal :title="'Deleting ' + episode.title + ' episode!'" variant="danger" header-bg-variant="danger" content-class="border-danger" v-model="dangerModal" @ok="[dangerModal = false, Deleteepisode(episode.id)] " ok-variant="danger">
                        Are You Sure Deleting <span style="color:green">{{episode.title}}</span> episode ? <br>
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
const Edit_episode = gql `
  mutation updateEpisode($id:ID,$title:String!,$videoQualities:[VideoQuality!],$links:[VideoLinksCreateInput!], $order:Int!)
  {
  updateEpisode(where:{id:$id}, data:{
    title:$title,
    slug:$title,
    runtime:0,
    isPublished:false,
    order:$order,
    links:{
     create:$links
    },
    videoQualities:{set:$videoQualities}

  }){
    id
  }
}
 `;
const Delete_Posters = gql `
  mutation episodesEdit($id:ID)
  {
  updateEpisode(where:{id:$id}, data:{
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
const Delete_episode = gql `
   mutation deleteTvepisode($id: ID) {
     deleteEpisode(where: { id: $id }) {
       id
     }
   }
 `;
const Delete_Subtitles = gql `
  mutation EpisodeEdit($id:ID)
  {
  updateEpisode(where:{id:$id}, data:{
    subtitles:{
         deleteMany:{
         path_not_in:" "
        }
        }
  }){
    id
  }
}
 `;
const Create_Subtitles = gql `
  mutation Episode($id:ID,$Lang:String!,$Name:String!,$Path:String!)
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
const Delete_Links = gql `
  mutation EpisodeEdit($id:ID)
  {
  updateEpisode(where:{id:$id}, data:{
    links:{
         deleteMany:{
         path_not_in:" "
        }
        }
  }){
    id
  }
}
 `;
const UnPublish_Episode = gql `
   mutation Episode($id: ID) {
    updateEpisode(where:{id:$id},data:{
    isPublished:false
    })
    {
        id
    }
    }
 `;
const Publish_Episode = gql `
   mutation Episode($id: ID) {
    updateEpisode(where:{id:$id},data:{
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
            IMDPPoster: "",
            episodes: [],

        }
    },
    apollo: {
        episodes: {
            query: gql ` query episodes($id:ID) {
                      episodes(where:{id:$id}) {
                        id
                        title
                        slug
                        runtime
                        order
                        isPublished
                        posters{
                            size
                            path
                        }
                        videoQualities
                        subtitles {
                            id
                            path
                            name
                            lang{
                                name
                                id
                            }
                        }
                         links {
                        id
                        path
                        quality
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
        goLink(id){
            window.open('https://atfrg.online/episodetest/' + id, '_blank');
        },
        Deleteepisode(id) {
            this.$apollo.mutate({
                mutation: Delete_episode,
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
        SaveChanges(episode) {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                // var imdbId = document.getElementById("imdbId").value;
                var title = document.getElementById("title").value;
                var Order = parseInt(document.getElementById("Order").value);

                const videoQualitiesselected = document.querySelectorAll('#videoQualities option:checked');
                var videoQualities = Array.from(videoQualitiesselected).map(el => el.value);
                
                // Subtitles
                var subtitles = [];
                for (var i = 0; i < this.episode().subtitles.length; i++) {
                    var lang = document.getElementById("SubtitleLang" + i + "").value;
                    var name = document.getElementById("SubtitleName" + i + "").value;
                    var path = document.getElementById("SubtitlePath" + i + "").value;
                    lang = lang;
                    subtitles.push({
                        lang: lang,
                        name: name,
                        path: path,
                    });
                    this.Allsubtitles.push({
                        lang: lang,
                        name: name,
                        path: path,
                    });
                }
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
                for (var i = 0; i < this.episode().links.length; i++) {
                    var quality = document.getElementById("LinkvideoQualities" + i + "").value;
                    var path = document.getElementById("VideoPath" + i + "").value;
                    links.push({
                        quality: quality,
                        path: path,
                    });
                    this.AllLinks.push({
                        quality: quality,
                        path: path,
                    });
                }
                for (var i = 0; i < this.newLinks.length; i++) {
                    var quality = document.getElementById("LinkvideoQualitiesNew" + i + "").value;
                    var path = document.getElementById("VideoPathNew" + i + "").value;
                    links.push({
                        quality: quality,
                        path: path,
                    })
                }

                this.$apollo.mutate({
                    mutation: Edit_episode,
                    variables: {
                        id: this.$route.params.id,
                        title: title,
                        videoQualities: videoQualities,
                        links: links,
                        order:Order,
                    },
                }).then((data) => {
                    // Delete Links
                    this.$apollo.mutate({
                        mutation: Delete_Links,
                        variables: {
                            id: this.$route.params.id,
                        }
                    });
                    // Delete Subtitles
                    this.$apollo.mutate({
                        mutation: Delete_Subtitles,
                        variables: {
                            id: this.$route.params.id,
                        }
                    }).then((data) => {
                        // Create ew Subtitles
                        for (var i = 0; i < subtitles.length; i++) {
                            var name = subtitles[i].name;
                            var langs = subtitles[i].lang;
                            var path = subtitles[i].path;
                            this.$apollo.mutate({
                                mutation: Create_Subtitles,
                                variables: {
                                    id: this.$route.params.id,
                                    Name: name,
                                    Lang: langs,
                                    Path: path
                                }
                            });
                        }
                        this.$apollo.mutate({
                        mutation: Edit_episode,
                        variables: {
                            id: this.$route.params.id,
                            title: title,
                            videoQualities: videoQualities,
                            links: links,
                            order:Order,
                        }})
                        this.ChangesError = "";
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
            } else if (document.getElementById("videoQualities").value.length == 0) {
                this.ErrorMessage("videoQualities");
                return false;
            }
     
            for (var i = 0; i < this.episode().subtitles.length; i++) {
                if (document.getElementById("SubtitleLang" + i).value.length == 0) {
                    this.ErrorMessage("SubtitleLang" + i);
                    return false;
                } else if (document.getElementById("SubtitleName" + i).value.length == 0) {
                    this.ErrorMessage("SubtitleName" + i);
                    return false;
                } 
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
            for (var i = 0; i < this.episode().links.length; i++) {
                if (document.getElementById("LinkvideoQualities" + i).value.length == 0) {
                    this.ErrorMessage("LinkvideoQualities" + i);
                    return false;
                } else if (document.getElementById("VideoPath" + i).value.length == 0) {
                    this.ErrorMessage("VideoPath" + i);
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
                mutation: UnPublish_Episode,
                variables: {
                    id: id,
                },
            }).then((data) => {
                // this.isPublished = false;
                this.episode().isPublished = false;
            }).catch((error) => {
                this.ChangesError = "Erorr Shown In Console!.";
                this.check = false;
            });
        },
        Publish(id) {
            this.$apollo.mutate({
                mutation: Publish_Episode,
                variables: {
                    id: id,
                },
            }).then((data) => {
                // this.isPublished = true;
                this.episode().isPublished = true;
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
            this.episode().posters.splice(id, 1);
        },
        AddnewSubtitle() {
            this.newSubtitle.push({});
        },
        RemoveNewSubtitle(id) {
            this.newSubtitle.splice(id, 1);
        },
        RemoveSubtitle(id) {
            this.episode().subtitles.splice(id, 1);
        },
        AddNewLink() {
            this.newLinks.push({});
        },
        RemoveNewLink(id) {
            this.newLinks.splice(id, 1);
        },
        RemoveLink(id) {
            this.episode().links.splice(id, 1);
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

        episode() {
            return this.episodes[0];
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
