<template>
  <div class="menu-edit">
    <!-- 引入并通过 is-edit -->
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from "./component/createoredit";
export default {
  name: "adEdit",
  components: {
    CreateOrEdit,
  },
};
</script>

<style lang="scss" scoped></style>
