<template>
  <b-row>
    <b-col cols="12" lg="12">
      <b-card no-header>
      
        <ApolloQuery
          :query="
            gql => gql`
              query CheckUsers($id: ID) {
                users(where: { id: $id }) {
                  id
                  username
                  password
                  role
                  activated
                  points
                  genreTypes
                }
              }
            `
          "
          :variables="{ id: this.store.getters.user }"
        >
          <template v-slot="{ result: { loading, error, data } }">
            <!-- Loading -->
            <div v-if="loading" class="loading">
              <i class="fa fa-circle-o-notch fa-lg mt-4 fa-spin"></i>
            </div>
            <!-- Error -->
            <div v-else-if="error" class="error apollo">
             <b-alert show variant="danger">UnKnown Error</b-alert>
            </div>
            <!-- Result -->
            <div v-else-if="data && data.users.length > 0">
              <!-- Container End -->

              <template>
                <div v-for="user in data.users" :key="user.id">
                  <b-col md="12">
                    <b-card>
                      <div slot="header">Welcome {{ user.username }}</div>
                      <b-form id="user-form" @submit="UpdateProfile">
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text
                                ><i class="fa fa-user"></i
                              ></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                              type="text"
                              :value="user.username"
                              placeholder="Username"
                              disabled
                            ></b-form-input>
                          </b-input-group>
                        </b-form-group>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text
                                ><i class="fa fa-asterisk"></i
                              ></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                              type="password"
                              :value="user.password"
                              placeholder="Password"
                              autocomplete="current-password"
                              id="pass"
                              required
                            ></b-form-input>
                          </b-input-group>
                        </b-form-group>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Points</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                              type="text"
                              :value="user.points"
                              placeholder="Points"
                              disabled
                            ></b-form-input>
                          </b-input-group>
                        </b-form-group>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Role</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-select
                              :plain="true"
                              :options="[
                                'Please select Role',
                                'ADMIN',
                                'ASSISTANT'
                              ]"
                              :value="user.role"
                              disabled
                            >
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Activate</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-select
                              :plain="true"
                              :options="[
                                'Select User Accsess',
                                'true',
                                'false'
                              ]"
                              :value="user.activated"
                              disabled
                            >
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text>Type</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-select
                              :plain="true"
                              :multiple="true"
                              required
                              disabled
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
                              :value="user.genreTypes"
                            >
                            </b-form-select>
                          </b-input-group> </b-form-group
                        ><br />
                        <div class="form-group form-actions">
                          <b-button type="submit" size="md" variant="success"
                            >Save Changes</b-button
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
                   <b-modal 
                :title="'Deleting ' + user.username + ' Account!'" 
                variant="danger"
                header-bg-variant="danger"
                content-class="border-danger" 
                v-model="dangerModal" 
                @ok="[dangerModal = false, Delete(user.id)] " 
                ok-variant="danger"
                >
                Are You Sure Deleting <span style="color:green">{{user.username}}</span> Account ? <br>
                You Can UnActive It He won`t login too (Choose Cancel).
                </b-modal>
                </div>
              </template>
               
              <!-- No result -->
            </div>
            <div v-else class="no-result apollo">
                 <b-alert show variant="success">No Result</b-alert>
            </div>
          </template>
        </ApolloQuery>

        <template slot="footer">
          <b-button @click="goBack">Back</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
 const Edit_profile = gql`
  mutation UserEdit($id:ID,$pass:String!){
  updateUser(where:{id:$id}, data:{
    password:$pass,
  }){
    id
  }
}
 `;
export default {
  name: "Profile",
  data: () => {
    return {
      id: "",
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
    UpdateProfile(){
    this.check = true;
    var pass = document.getElementById("pass").value;
    this.$apollo.mutate({
     mutation: Edit_profile,
     variables: {
      id: this.store.getters.user,
      pass:pass,
     },
    }).then((data) => {
     this.ChangesDone = "Data Hass Been Updated Successfuly.";
      this.check = false;
    }).catch((error) => {
       this.ChangesError = error;
        this.check = false;
    });
    },
  }
};
</script>
