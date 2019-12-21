<template>
  <div class="upload-image">
    <el-upload
      :http-request="onUpload"
      drag
      :action="action"
      multiple
      list-type="picture"
      :file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    action: {
      type: String,
      default: "smms"
    },
    headers: {
      type: Object,
      default() {
        return { "Content-Type": "text/html" };
      }
    },
    multiple: { type: Boolean, default: false },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    name: { type: String, default: "smfile" },
    limit: { type: Number, default: 5 },
    maxsize: { type: Number, default: 5 }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      const isLtMaxsize = file.size / 1024 / 1024 < this.maxsize;
      if (!isLtMaxsize) {
        this.$message.error(`上传头像图片大小不能超过 ${this.maxsize}MB!`);
      }
      return isLtMaxsize;
    },
    onSuccess(response, file, fileList) {
      console.log(response);
    },
    onError(response, file, fileList) {},
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    onUpload(item) {
      let this_ = this;
      let formData = new FormData();
      formData.append(this.name, item.file);
      this.$api.picture[this.action](formData, {}).then(
        res => {
          console.log(res);
          if (res.data.success) {
            this_.$message(res.data.data.url);
            this_.$emit("upload_image", res.data.data)
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.upload-image {
  text-align: center;
}
</style>