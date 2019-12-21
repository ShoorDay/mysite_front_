<template>
  <el-select
    v-model="selected"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="添加标签"
    clearable
    @change="change"
  >
    <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id"></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      selected: []
    };
  },
  methods: {
    change() {
      console.log(this.selected);
      if (typeof this.selected.slice(-1)[0] == "string") {
        const this_ = this;
        const name = this.selected.slice(-1)[0];
        this.$api.blog
          .tagExistsOrCreate(
            { name: name },
            {
              params: {
                owner: this.$store.state.user.user_id,
                name: name
              }
            }
          )
          .then(
            res => {
              this_.selected.pop();
              this_.selected.push(res.data.id);
              this_.tags.push(res.data);
            },
            err => {
              if (err.status == "201") {
                console.log(err);
                this_.tags.push(err.data);
                this_.selected.pop();
                this_.selected.push(err.data.id);
              }
            }
          );
      }
    }
  },
  created() {
    let this_ = this;
    this.$api.blog
      .tagList({ params: { owner: this.$store.state.user.user_id } })
      .then(res => {
        this_.tags = res.data.results;
      });
  }
};
</script>

<style>
</style>