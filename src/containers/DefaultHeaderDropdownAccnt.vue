<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
     <span style="    background-color: rgb(41, 2, 255);
    color: rgb(255, 255, 255);
    font-weight: bold;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    line-height: 30px;
    text-transform:uppercase;
    display: block;
    border: none;
    font-size: 18px;">{{UserLetter()}}</span> 
    </template>\
    <template slot="dropdown">
    
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item @click="$router.push('/user/profile')"><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="logout()"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  methods:{
    logout(){
      this.$logout();
    },
    UserLetter(){
      if(this.$readCookie("username") != null){
        var lettt = this.$readCookie("username");
        return lettt[0];
      }
      
    }
  }
}
</script>
<style>
.avatarLett{
  color:#fff;
  font-weight: bold;
  padding:5px;
  border-radius: 50%;
}
</style>