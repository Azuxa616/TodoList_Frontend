  <template >
  <div class="my-account-page">
    <div class="page-content">
      <AccountInfoForm/>
    </div>
</div>
</template>

<script setup lang="ts">
  import AccountInfoForm from "@/components/AccountInfo_Form.vue";
  import {onMounted, ref} from "vue";
  import router from "@/router";

  onMounted(() => {

  })

  function goBack() {
      router.push('/home');
  }
</script>
<style  scoped>
  .my-account-page {
    background-color: #ffffff;
    width: 98%;
    margin-left: 1%;
  }

</style>