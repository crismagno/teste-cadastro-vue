<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { userKey, baseApiURL } from "../../config/global";

export default {
    components: {
        
    },

    methods: {
      async validateToken() {
        this.validatingToken = true;

        const json = localStorage.getItem(userKey);
        const userData = JSON.parse(json);
        this.$store.commit("setUser", null);

        if (!userData) {
            this.validatingToken = false;
            this.$router.push({ name: "auth" });
            return;
        }

        const res = await axios.post(`${baseApiURL}/validateToken`, userData);

        if (res.data) {
            this.$store.commit("setUser", userData);
        } else {
            localStorage.removeItem(userKey);
            this.$router.push({ name: "auth" });
        }

        this.validatingToken = false;
    },

  },

  created() {
    this.validateToken();  
    
  }
}
</script>

<style>

    .content {
        grid-area: content;
        padding: 15px;
    }

</style>
