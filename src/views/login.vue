<template>
<div class="app flex-row align-items-center">
    <div class="container">
        <b-row class="justify-content-center">
            <b-col md="8">
                <b-card-group>
                    <b-card no-body class="p-4">
                        <b-card-body>
                            <b-form>
                                <h1>Login</h1>
                                <p class="text-muted">Sign In to your account</p>
                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input type="text" v-model="username" class="form-control" placeholder="Username" autocomplete="username email" />
                                </b-input-group>
                                <b-alert v-if="userError.length > 0" show variant="danger">{{userError}}</b-alert>
                                <b-input-group class="mb-4">
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input type="password" v-model="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                                </b-input-group>
                                <b-alert v-if="passError.length > 0" show variant="danger">{{passError}}</b-alert>
                                <b-row>
                                    <b-col cols="6">
                                        <b-button @click="Login" variant="primary" class="px-4">Login</b-button>
                                    </b-col>
                                    <b-col cols="6" class="text-right">
                                        <b-button variant="link" class="px-0">Forgot password?</b-button>
                                    </b-col>
                                    <b-col cols="12">
                                        <br><br>
                                        <b-alert v-if="error.length > 0" show variant="success">Done !</b-alert>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-card-body>
                    </b-card>
                    <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                        <b-card-body class="text-center">
                            <div>
                                <h2>DashBoard</h2>
                                <p>Here We Can Control Of Our Site Database</p>
                            </div>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
export default {
    name: 'login',
    data() {
        return {
            username: "",
            password: "",
            users: [],
            userError: "",
            passError: "",
            error: ""
        }
    },
    apollo: {
        users: {
            query: gql `query CheckUsers($username:String!){
            users(where:{username:$username}){
                id
                username
                password
                role
                genreTypes
            }
            }
            `,
            variables() {
                return {
                    username: this.username,
                }
            },
        },
    },
    methods: {
        Login() {
          this.RestErrors();
            if ((this.users.length == 0)) {
                this.userError = "Username Not Founded.";
            } else if (this.username.length > 0 && this.password.length > 0) {
                if (this.users[0].password != this.password) {
                    this.passError = "Your Password Is Incorrect."
                } else {
                    this.error = "Welcome " + this.username;
                    this.store.commit('UpdateUser', this.users[0].id)
                    this.$createCookie("userId", this.users[0].id, 1);
                    this.store.commit('UpdateRole', this.users[0].role)
                    this.$createCookie("userRole", this.users[0].role, 1);
                    this.$createCookie("username", this.users[0].username, 1);

                    this.store.commit('UpdategenreTypese', this.users[0].genreTypes)
                    this.$createCookie("genreTypes", this.users[0].genreTypes, 1);
                     window.location.href =  "/";
                    // this.$router.push('/');
                }
            } else {
                if (!(this.username.length > 0)) {
                    this.userError = "Please Fill UserName Field.";
                } else if (!(this.password.length > 0)) {
                    this.passError = "Please Fill Passwrod Field.";
                }
            }
        },
        RestErrors() {
            this.passError = "";
            this.userError = "";
            this.error = "";
        },
    }

}
</script>
