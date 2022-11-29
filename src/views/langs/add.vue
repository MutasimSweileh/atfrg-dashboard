<template>
  <b-row>
    <b-col cols="12" lg="12">
      <b-card no-header>
        <template slot="header"> New language </template>
         <template>
                  <b-col md="12">
                    <b-card>
                      <div slot="header">New language</div>
                      <b-form id="user-form" @submit="Addlanguage">
                        <b-form-group>
                          <b-input-group>
                            <b-input-group-prepend>
                              <b-input-group-text
                                >Name</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input
                              type="text"
                              placeholder="language Name"
                              id="name"
                            ></b-form-input>
                          </b-input-group>                 
                        </b-form-group>
                        <b-alert v-if="NameValidation.length > 0" show variant="danger"> {{NameValidation}} </b-alert>
                     <br />
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
const Add_Lang  = gql`
mutation createLanguage($name:String!){
  createLanguage(
    data:{
    name:$name
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
      NameValidation:"",
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
        var name = document.getElementById("name").value;
        if(name.length == 0){
            this.NameValidation = 'Please Fill Username !';
            return false;
        }
        else{
            return true;
        }
        

    },
    RestErrors(){
    this.NameValidation = "";
    },
    Addlanguage(){
    if(this.Validation() == true){
        this.check = true;
        var name = document.getElementById("name").value;
            this.$apollo.mutate({
            mutation: Add_Lang,
            variables: {
            name: name,
            },
            }).then((data) => {
            this.ChangesDone = "language Hass Been Added Successfuly.";
            this.check = false;
            }).catch((error) => {
            this.RestErrors();
            this.NameValidation = 'This language already Exsist !';
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
