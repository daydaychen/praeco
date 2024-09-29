<template>
  <div>
    <h1>Templates</h1>

    <el-button type="primary" plain @click="$router.push('/template/add')">
      <Icon icon="file" transform="left-4" />
      Add template
    </el-button>

    <el-table :data="templates" class="m-n-sm" style="width: 100%">
      <el-table-column label="Templates">
        <template #default="scope">
          <Icon icon="file-alt" style="padding-right: 4px" />
          <router-link :to="`/templates/${encodeURIComponent(scope.row.val)}`">
            {{ scope.row.val }}
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  computed: {
    templates() {
      return Object.keys(this.$store.state.configs.templates)
        .filter(val => !val.includes('/'))
        .map(val => ({
          val
        }));
    }
  }
};
</script>

<style>
table.vgt-table {
  font-size: inherit;
}

.vgt-table th.sorting:hover:after {
  border-bottom-color: #89afd8;
}

.vgt-table th.sorting:after {
  border-bottom: 6px solid #157ce7;
}
</style>
