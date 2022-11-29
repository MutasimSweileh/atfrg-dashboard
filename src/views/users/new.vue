<template>
  <b-row>
    <b-col cols="12" lg="12">
      <b-card no-header>
        <template slot="header"> New User </template>
         <template>
                  <b-col md="12">
                    <b-card>
                      <div slot="header">New User</div>
                      <b-form id="user-form" @submit="Register">
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text
                                ><i class="fa fa-user"></i
                              ></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                              type="text"
                              placeholder="Username"
                              id="user"
                            ></b-form-input>
                          </b-input-group>                 
                        </b-form-group>
                        <b-alert v-if="UserValidation.length > 0" show variant="danger"> {{UserValidation}} </b-alert>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text
                                ><i class="fa fa-asterisk"></i
                              ></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                              type="password"
                              placeholder="Password"
                              autocomplete="current-password"
                              id="pass"
                            ></b-form-input>
                          </b-input-group>
                        </b-form-group>
                          <b-alert v-if="PassValidation.length > 0" show variant="danger"> {{PassValidation}} </b-alert>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Role</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-select
                              id="role"
                              :plain="true"
                            placeholder="Please select Role"
                              :options="[
                                'Please select Role',
                                'ADMIN',
                                'ASSISTANT'
                              ]"
                              value="Please select Role"
                            >
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                         <b-alert v-if="RoleValidation.length > 0" show variant="danger"> {{RoleValidation}} </b-alert>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Activate</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-select
                              id="active"
                              :plain="true"
                              :options="[
                                'Select User Accsess',
                                'true',
                                'false'
                              ]"
                              value="Select User Accsess"
                            >
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                          <b-alert v-if="ActivateValidation.length > 0" show variant="danger"> {{ActivateValidation}} </b-alert>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Type</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-select
                              id="types"
                              :plain="true"
                              :multiple="true"
                              :options="[
                                {
                                  text: 'Please select User Types',
                                  value: null
                                },
                                {
                                  text: 'Movie',
                                  value: 'MOVIE'
                                },
                                {
                                  text: 'TV',
                                  value: 'TV'
                                },
                                {
                                  text: 'Anime',
                                  value: 'ANIME'
                                }
                              ]"
                             :value="[null,'c']">
                            </b-form-select>
                          </b-input-group> </b-form-group
                        > <b-alert v-if="TypeValidation.length > 0" show variant="danger"> {{TypeValidation}} </b-alert><br />
                        <div class="form-group form-actions">
                          <b-button type="submit" size="md" variant="success"
                            >Add</b-button
                          >
                          <b-button
                            type="button"
                            variant="secondary"
                            style="margin:0 1rem;"
                            @click="cancel"
                            >Cancel</b-button
                          >
                        </div>
                        <div class="Erorres">
                                <b-alert v-if="ChangesDone.length > 0" show variant="success">{{ChangesDone}}</b-alert>
                                <b-alert v-if="ChangesError.length > 0" show variant="danger">{{ChangesError}}</b-alert>
                                 <b-col cols="6" sm="4" md="3" lg="2" v-if="check">
                                    <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
                                </b-col>
                        </div>
                      </b-form>
                    </b-card>
                  </b-col>
              </template>
        <template slot="footer">
          <b-button @click="goBack">Back</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
const Add_User = gql`
mutation createUser($username:String!,$pass:String!,$genreTypes:[GenreType!]!,$role:UserRole!,$activated:Boolean){
  createUser(
    data:{
    username:$username
    password:$pass,
    activated:$activated,
    genreTypes:{set:$genreTypes},
    role:$role
  })
  {
    id
  }
}
 `;
export default {
  name: "new",
  data: () => {
    return {
      id: "",
      UserValidation:"",
      PassValidation:"",
      RoleValidation:"",
      ActivateValidation:"",
      TypeValidation:"",
      ChangesDone:"",
      ChangesError:"",
      check:false,
      dangerModal:false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    cancel() {
      this.$router.go(this.$route.path);
    },
    Validation(){
        this.RestErrors();
        var username = document.getElementById("user").value;
        var pass = document.getElementById("pass").value;
        var role = document.getElementById("role").value;
        var active = document.getElementById("active").value;
        if(active == "true") { active = true; } else if (active == "false") { active = false }
        const selected = document.querySelectorAll('#types option:checked');
        var types = Array.from(selected).map(el => el.value);
        if(username.length == 0){
            this.UserValidation = 'Please Fill Username !';
            return false;
        } else if(pass.length == 0){
            this.PassValidation = 'Please Fill Password !';
            return false;
        } else if(role == "Please select Role"){
            this.RoleValidation = 'Please Choose Role !';
            return false;
        } else if(active == "Select User Accsess"){
            this.ActivateValidation = 'Please Choose Active Statue !';
            return false;
        } else if(types == ""){
            this.TypeValidation = 'Please Choose User Types !';
            return false;
        }
        else{
            return true;
        }
        

    },
    RestErrors(){
    this.UserValidation = "";
    this.PassValidation = "";
    this.RoleValidation = "";
    this.ActivateValidation = "";
    this.TypeValidation = "";
    },
    Register(){
    if(this.Validation() == true){
        this.check = true;
        var username = document.getElementById("user").value;
        var pass = document.getElementById("pass").value;
        var role = document.getElementById("role").value;
        var active = document.getElementById("active").value;
        if(active == "true") { active = true; } else { active = false }
        const selected = document.querySelectorAll('#types option:checked');
        var types = Array.from(selected).map(el => el.value);
        this.$apollo.mutate({
        mutation: Add_User,
        variables: {
        username: username,
        pass:pass,
        activated:active,
        genreTypes:types,
        role:role
        },
        }).then((data) => {
        this.ChangesDone = "User Hass Been Registerd Successfuly.";
        this.check = false;
        this.DoneEvent();
        }).catch((error) => {
        this.RestErrors();
        this.UserValidation = 'This Username already taken !';
        this.ChangesError = error;
        this.check = false;
        });
    }
    },
    Danger(message){
        return '<b-alert show variant="danger"> '+message+' </b-alert>'
    },
    DoneEvent(){
        var tt = this;
        setTimeout(function(){
        tt.$router.go(-1);
        }, 1000);
    }

  },
    mounted() {
        if (this.store.getters.role != "ADMIN") {
            this.$router.push('/');
        }
    }
};
</script>
