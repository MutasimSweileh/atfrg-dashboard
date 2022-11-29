<template>
<div class="wrapper">
    <div class="animated fadeIn">
        <b-row>
            <b-col cols="12">
                <b-card v-for="movie in movies" :key="movie.id" header-tag="header" footer-tag="footer">
                    <div slot="header">
                        <i class="fa fa-align-justify"></i><strong> {{movie.title}}</strong>
                        <span v-if="movie.isPublished" style="color:green;margin:0 1rem;">Published</span>
                        <span v-else style="color:red;margin:0 1rem;">UnPublished</span>
                        <span v-if="store.getters.role == 'ADMIN'">
                            <b-button v-if="movie.isPublished" @click="Unpublish(movie.id)" style="float:right;margin: 0 0.5rem;" size="sm" variant="primary">UnPublish</b-button>
                            <b-button v-else @click="Publish(movie.id)" size="sm" style="float:right;margin: 0 0.5rem;" variant="primary">Publish</b-button>
                            <b-button @click="dangerModal = true" style="float:right" size="sm" variant="danger">Delete</b-button>
                        </span>
                          <b-button @click="goLink(movie.title)" size="sm" style="float:right;margin: 0 0.5rem;" variant="success">تجربة كاملة</b-button>
                    </div>
                    <!-- imdb  -->
                    <b-card>
                        <div slot="header">
                            <strong>Imdb</strong> Import
                        </div>
                        <b-form>
                            <b-form-group label="imdbId" label-for="imdbId" description="Please enter movie imdbId." :label-cols="3">
                                <b-form-input id="imdbId" type="text" v-model="imdbId" placeholder="Enter imdbId.." autocomplete="imdbId"></b-form-input>
                                <span v-if="movie.imdbId.length > 0">Current : {{movie.imdbId}}</span>

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
                                <b-form-input v-if="title != ''" id="title" v-model="title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
                                <b-form-input id="title" v-else v-model="movie.title" type="text" placeholder="Enter Title.." autocomplete="title"></b-form-input>
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
                                                 'Unrated',
                                              ]">
                                    </b-form-select>
                                    <b-form-select id="audience" v-else v-model="movie.audience" :plain="true" :options="[
                                                'Please select Audience',
                                                'G',
                                                'PG',
                                                'PG13',
                                                'R',
                                                'NC17',
                                                'Unrated',
                                              ]">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="ReleaseDate" label-for="releaseDate" description="Please enter movie ReleaseDate." :label-cols="3">
                                <b-form-input id="releaseDate" v-if="releaseDate != ''" v-model="releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                                <b-form-input id="releaseDate" v-else v-model="movie.releaseDate" type="datetime" placeholder="Enter ReleaseDate.." autocomplete="releaseDate"></b-form-input>
                            </b-form-group>
                            <b-form-group label="runtime" label-for="runtime" description="Please enter movie Runtime." :label-cols="3">
                                <b-form-input id="runtime" v-if="runtime !=''" v-model="runtime" type="text" placeholder="Enter Runtime.." autocomplete="runtime"></b-form-input>
                                <b-form-input id="runtime" v-else v-model="movie.runtime" type="text" placeholder="Enter Runtime.." autocomplete="runtime"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Genre" label-for="Genre" description="Please Select movie Genres." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Genre" v-if="Genre.length > 0" :plain="true" :multiple="true" required :options="GetGenres()" v-model="Genre">
                                    </b-form-select>
                                    <b-form-select id="Genre" v-else :plain="true" :multiple="true" required :options="GetGenres()" :value="movieDGenre">
                                    </b-form-select>

                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Lang" label-for="Lang" description="Please Select movie Languages." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Lang" v-if="lang.length > 0" :plain="true" required :options="GetLang()" v-model="lang">
                                    </b-form-select>
                                    <b-form-select id="Lang" v-else :plain="true" required :options="GetLang()" :value="movie.lang.name">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="overview" label-for="overview" description="Please enter movie Overview." :label-cols="3">
                                <b-form-textarea id="overview" v-model="movie.overview" type="text" placeholder="Enter Overview.." autocomplete="overview"></b-form-textarea>
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
                                <b-form-input id="trailerPath" :value="movie.trailerPath" type="text" placeholder="Enter Movie Trailer Youtube ID.." autocomplete="trailerPath"></b-form-input>
                            </b-form-group>
                            <b-form-group label="Quality" label-for="Quality" description="Please enter moive Quality." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="Quality" :value="movie.movieQuality" :plain="true" :options="[
                                                'Please select Quality',
                                                'HDCAM',
                                                'BLURAY',
                                                'WEB_DL',
                                                'DVDRIP',
                                                'DVDSCR',
                                                'HDRIP',
                                                'HDTS',
                                                'HDTV',
                                              ]">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="videoQualities" label-for="videoQualities" description="Please Select movie videoQualities." :label-cols="3">
                                <b-input-group>
                                    <b-form-select id="videoQualities" :plain="true" :multiple="true" required :options="[
                                    'Q144',
                                    'Q360',
                                    'Q480',
                                    'Q720',
                                    'Q1080',
                                    ]" :value="movie.videoQualities">
                                    </b-form-select>
                                </b-input-group>
                            </b-form-group>
                        </b-form>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Posters</strong>
                        </div>
                        <b-card v-for="(poster,index) in movie.posters" :key="poster.id">
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
                    <b-card>
                        <div slot="header">
                            <strong>Subtitles</strong>
                        </div>
                        <b-card v-for="(subtitle,index) in movie.subtitles" :key="subtitle.id">
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
                                <b-form-input :id="'SubtitlePathNew' + index" type="text" placeholder="Please Enter Subtitle Path." autocomplete="SubtitlePath"></b-form-input>
                            </b-form-group>
                        </b-card>
                    </b-card>
                    <b-card>
                        <div slot="header">
                            <strong>Videos</strong> Information
                        </div>
                        <b-card v-for="(link ,index) in movie.links" :key="link.id">
                            <div slot="header">
                                <strong>{{link.quality}}</strong> Video Link
                                <b-button @click="RemoveLink(index)" style="float:right" size="sm" variant="danger">Delete</b-button>
                            </div>
                            <b-form-group label="Video Qualities" label-for="LinkvideoQualities" description="Please Select movie videoQualities." :label-cols="3">
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
                            <b-form-group label="Video Qualities" label-for="LinkvideoQualities" description="Please Select movie videoQualities." :label-cols="3">
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
                                <b-form-input :id="'VideoPathNew' + index" value="https://cdn.atfrg.online/" type="text" placeholder="Please Enter Video Path." autocomplete="PosterPath"></b-form-input>
                            </b-form-group>
                             <b-button @click="CheckLink('VideoPathNew' + index)" style="float:right" size="sm" variant="primary">تجربة ال لينك</b-button>
                        </b-card>
                        <div slot="footer">
                            <b-button @click="AddNewLink" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> New Link</b-button>
                        </div>
                    </b-card>
                    <div slot="footer">
                        <b-button @click="SaveChanges(movie)" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Save Changes</b-button>
                    </div>
                    <br>
                    <br>
                    <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                    <b-alert v-if="ChangesError.length > 0" show variant="danger">{{ChangesError}}</b-alert>
                    <b-col cols="6" sm="4" md="3" lg="2" v-if="check">
                        <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
                    </b-col>
                    <b-modal :title="'Deleting ' + movie.title + ' Movie!'" variant="danger" header-bg-variant="danger" content-class="border-danger" v-model="dangerModal" @ok="[dangerModal = false, DeleteMovie(movie.id)] " ok-variant="danger">
                        Are You Sure Deleting <span style="color:green">{{movie.title}}</span> Movie ? <br>
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
const Edit_movie = gql `
  mutation MoviesEdit($id:ID,$title:String!,$Production:Production,$audience:Audience!,$imdbId:String,$overview:String,$releaseDate:DateTime!,$trailerPath:String,$runtime:Int!,$lang:String,$genres:[GenreWhereUniqueInput!],$posters:[ImageCreateInput!],$links:[VideoLinksCreateInput!],$movieQuality:MovieQuality!,$videoQualities:[VideoQuality!])
  {
  updateMovie(where:{id:$id}, data:{
    imdbId:$imdbId,
    title:$title,
    trailerPath:$trailerPath,
    genres:{set:$genres},
    Production:$Production,
    lang:{connect:{name:$lang}},
    posters:{
        create:$posters
        },
    links:{
     create:$links
    },
    audience:$audience,
    movieQuality:$movieQuality,
    overview:$overview,
    releaseDate:$releaseDate,
    runtime:$runtime,
    isPublished:false,
    videoQualities:{set:$videoQualities}
  }){
    id
  }
}
 `;
const Delete_Posters = gql `
  mutation MoviesEdit($id:ID)
  {
  updateMovie(where:{id:$id}, data:{
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
const Delete_Subtitles = gql `
  mutation MoviesEdit($id:ID)
  {
  updateMovie(where:{id:$id}, data:{
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
  mutation MoviesEdit($id:ID,$Lang:String!,$Name:String!,$Path:String!)
  {
  updateMovie(where:{id:$id}, data:{
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
const Delete_Movie = gql `
   mutation deleteMovie($id: ID) {
     deleteMovie(where: { id: $id }) {
       id
     }
   }
 `;
const Delete_Links = gql `
  mutation MoviesEdit($id:ID)
  {
  updateMovie(where:{id:$id}, data:{
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
const UnPublish_Movie = gql `
   mutation Movie($id: ID) {
    updateMovie(where:{id:$id},data:{
    isPublished:false
    })
    {
        id
    }
    }
 `;
const Publish_Movie = gql `
   mutation Movie($id: ID) {
    updateMovie(where:{id:$id},data:{
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
            movies: [],
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

        }
    },
    apollo: {
        movies: {
            query: gql ` query getMoviestwo($id:ID) {
                      movies(where:{id:$id}) {
                        id
                        audience
                        genres {
                          id
                          name
                        }
                        imdbId
                        title
                        overview
                        releaseDate
                        runtime
                        isPublished
                        posters {
                          id
                          size
                          path
                        }
                        trailerPath
                        lang {
                          id
                          name
                        }
                        subtitles {
                          id
                          lang{
                              id
                              name
                          }
                          path
                          name
                        }
                        links {
                          id
                          path
                          quality
                        }
                        slug
                        keywords
                        watchCount
                        movieQuality
                        videoQualities
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
         goLink(title){
            window.open('https://atfrg.online/movtest/' + title, '_blank');
        },
        DeleteMovie(id) {
            this.$apollo.mutate({
                mutation: Delete_Movie,
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
          validLink(path) {      
            var type = path.slice(-3).toLowerCase();
            path = path.substring(0, path.length - 3) + type
            return path;
        },
          LinkToken(path){
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
        CheckLink(id){
            var link = document.getElementById(id).value;
            link = this.validLink(link);
            link = this.LinkToken(link);
              window.open(link, "_blank");   
        },
        SaveChanges(movie) {
            // Values
            if (this.Valadation() == true) {
                this.check = true;
                var imdbId = document.getElementById("imdbId").value;
                if (imdbId.length == 0) {
                    imdbId = this.movie().imdbId;
                }
                var title = document.getElementById("title").value;
                var Production = document.getElementById("Production").value;
                var audience = document.getElementById("audience").value;
                if (document.getElementById("releaseDate").value != this.movie().releaseDate) {
                    var releaseDate1 = document.getElementById("releaseDate").value + " 00:00 UTC";
                    var dateobj = new Date(releaseDate1);
                    var releaseDate = dateobj.toISOString();
                } else {
                    var releaseDate = this.movie().releaseDate;
                }
                var runtime = parseInt(document.getElementById("runtime").value);
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
                var LangSub = document.getElementById("Lang").value;
                var overview = document.getElementById("overview").value;
                var trailerPath = document.getElementById("trailerPath").value;
                var Quality = document.getElementById("Quality").value;
                const videoQualitiesselected = document.querySelectorAll('#videoQualities option:checked');
                var videoQualities = Array.from(videoQualitiesselected).map(el => el.value);
                // Posters
                var posters = [];
                for (var i = 0; i < this.movie().posters.length; i++) {
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
                // Subtitles
                var subtitles = [];
                for (var i = 0; i < this.movie().subtitles.length; i++) {
                    var lang = document.getElementById("SubtitleLang" + i + "").value;
                    var name = document.getElementById("SubtitleName" + i + "").value;
                    var path = document.getElementById("SubtitlePath" + i + "").value;
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
                for (var i = 0; i < this.movie().links.length; i++) {
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

                // Push To Database
                this.$apollo.mutate({
                    mutation: Edit_movie,
                    variables: {
                        id: this.$route.params.id,
                        genres: Genres,
                        title: title,
                        lang: LangSub,
                        imdbId: imdbId,
                        audience: audience,
                        releaseDate: releaseDate,
                        runtime: runtime,
                        Production:Production,
                        overview: overview,
                        trailerPath: trailerPath,
                        movieQuality: Quality,
                        videoQualities: videoQualities,
                        posters: posters,
                        links: links,
                    },
                }).then((data) => {
                    // Delete Posters
                    this.$apollo.mutate({
                        mutation: Delete_Posters,
                        variables: {
                            id: this.$route.params.id,
                        }
                    });
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
                    });
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
                                    mutation: Edit_movie,
                                    variables: {
                                        id: this.$route.params.id,
                                        genres: Genres,
                                        title: title,
                                        lang: LangSub,
                                        imdbId: imdbId,
                                        Production:Production,
                                        audience: audience,
                                        releaseDate: releaseDate,
                                        runtime: runtime,
                                        overview: overview,
                                        trailerPath: trailerPath,
                                        movieQuality: Quality,
                                        videoQualities: videoQualities,
                                        posters: posters,
                                        links: links,
                                    },
                                });        
            
                    this.ChangesError = "";
                    this.ChangesDone = "Data Hass Been Updated Successfuly.";
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
            } else if (document.getElementById("runtime").value.length == 0) {
                this.ErrorMessage("runtime");
                return false;
            } else if (document.getElementById("trailerPath").value.length == 0) {
                this.ErrorMessage("trailerPath");
                return false;
            } else if (document.getElementById("Quality").value.length == 0) {
                this.ErrorMessage("Quality");
                return false;
            } else if (document.getElementById("videoQualities").value.length == 0) {
                this.ErrorMessage("videoQualities");
                return false;
            }
            for (var i = 0; i < this.movie().posters.length; i++) {
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
            for (var i = 0; i < this.movie().subtitles.length; i++) {
                if (document.getElementById("SubtitleLang" + i).value.length == 0) {
                    this.ErrorMessage("SubtitleLang" + i);
                    return false;
                } else if (document.getElementById("SubtitleName" + i).value.length == 0) {
                    this.ErrorMessage("SubtitleName" + i);
                    return false;
                } else if (document.getElementById("SubtitlePath" + i).value.length == 0) {
                    this.ErrorMessage("SubtitlePath" + i);
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
                } else if (document.getElementById("SubtitlePathNew" + i).value.length == 0) {
                    this.ErrorMessage("SubtitlePathNew" + i);
                    return false;
                }
            }
            for (var i = 0; i < this.movie().links.length; i++) {
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
                mutation: UnPublish_Movie,
                variables: {
                    id: id,
                },
            }).then((data) => {
                // this.isPublished = false;
                this.movie().isPublished = false;
            }).catch((error) => {
                this.ChangesError = "Erorr Shown In Console!.";
                this.check = false;
            });
        },
        Publish(id) {
            this.$apollo.mutate({
                mutation: Publish_Movie,
                variables: {
                    id: id,
                },
            }).then((data) => {
                // this.isPublished = true;
                this.movie().isPublished = true;
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
            this.movie().posters.splice(id, 1);
        },
        AddnewSubtitle() {
            this.newSubtitle.push({});
        },
        RemoveNewSubtitle(id) {
            this.newSubtitle.splice(id, 1);
        },
        RemoveSubtitle(id) {
            this.movie().subtitles.splice(id, 1);
        },
        AddNewLink() {
            this.newLinks.push({});
        },
        RemoveNewLink(id) {
            this.newLinks.splice(id, 1);
        },
        RemoveLink(id) {
            this.movie().links.splice(id, 1);
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
                    } else {
                        this.audience = res.Rated;
                    }
                    this.releaseDate = res.Released;
                    this.runtime = res.Runtime;
                    var gen = res.Genre;
                    var sp = gen.split(', ');
                    for (var i = 0; i < sp.length; i++) {
                        this.Genre.push(sp[i]);
                    }
                    var lang = res.Language;
                    var la = lang.split(', ');;
                    this.lang = la[0];
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
            if (this.movies.length > 0) {
                var movie = this.movies[0];
                this.title = movie.title;
                this.audience = movie.audience;
                this.imdbId = movie.imdbId;
                this.releaseDate = movie.releaseDate;
                for (var i = 0; i < movie.genres.length; i++) {
                    this.Genre.push(movie.genres[i].name);
                }
                // this.lang = this.GetLangVal(movie.lang);
                this.runtime = movie.runtime;

                return true;
            }
            return false;
        },
        movie() {
            return this.movies[0];
        },
        movieGenre() {
            var gen = [];
            for (var i = 0; i < this.movies[0].genres.length; i++) {
                gen.push(this.movies[0].genres[i].name);
            }
            return gen;
        },
        movieLang() {
            return this.movie().lang[0].name;
        },
        GetVideoQ(Quality) {
            var Q = [];
            Q.push(Quality);
            return Q;
        }

    },
    computed: {
        movieDGenre: function () {
            var gee = [];
            for (var i = 0; i < this.movie().genres.length; i++) {
                gee.push(this.movie().genres[i].name);
            }
            return gee;
        },
        getlangs: function () {
            var lan = [];
            if (this.movie().lang.name.length > 0) {
                lan.push(this.movie().lang.name);
            }

            return lan;
        },
        isPublished: function () {
            if (this.movie.isPublished == true) {
                return true
            } else {
                return false;
            }
        }
    },
    mounted() {
        if (this.store.getters.role != "ADMIN") {
            if (!(this.store.getters.genreTypes.includes("MOVIE"))) {
                this.$router.push('/');
            }
        }
    }
}
</script>
