<template>
  <div>
    <div class="toolbar">
      <el-tooltip
        class="item"
        effect="dark"
        content="粗体(ctrl+b)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-zitijiacu"
          @click="clicks('bold')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="斜体(ctrl+i)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-zitixieti"
          @click="clicks('italic')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="上标"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-zitishangbiao"
          @click="clicks('superscript')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="下标"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-zitixiabiao"
          @click="clicks('subscript')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="代码(ctrl+shift+`)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-zitidaima"
          @click="clicks('code')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="引用(ctrl+q)"
        placement="bottom-start"
      >
        <button class="iconfont icon-yinyong" @click="clicks('quote')"></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="链接(ctrl+l)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-charulianjie"
          @click="clicks('link')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="图片链接(ctrl+l)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-tupian"
          @click="clicks('imageLink')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="上传图片(ctrl+l)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-ic_image_upload"
          @click="uploadVisible = true"
        ></button> </el-tooltip
      >|
      <a href="https://segmentfault.com/markdown" target="_blank">
        <el-tooltip
          class="item"
          effect="dark"
          content="了解Markdown"
          placement="bottom-start"
        >
          <button class="iconfont icon-logo-markdown"></button>
        </el-tooltip>
      </a>
      <el-tooltip
        class="item"
        effect="dark"
        content="预览(ctrl+/)"
        placement="bottom-start"
      >
        <button
          class="iconfont icon-zitiyulan"
          @click="$emit('shift')"
        ></button>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="保存(ctrl+s)"
        placement="bottom-start"
      >
        <button class="iconfont icon-baocun" @click="$emit('save')"></button>
      </el-tooltip>
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="uploadVisible" :fullscreen="true">
        <span>这是一段信息</span>
        <div>
          <upload-image
            @upload_image="$emit('upload_image', $event)"
          ></upload-image>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadVisible = false">取 消</el-button>
          <el-button type="primary" @click="uploadVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import UploadImage from "@/components/editor/UploadImage.vue";

export default {
  components: { UploadImage },
  data() {
    return {
      uploadVisible: false,
      linkVisible: false
    };
  },
  methods: {
    clicks(action) {
      this.$emit("insert", action);
    },
    addImageLink() {
      this.$emit("iamge_link", this.$refs.image_link.form);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/style/editor/button.styl';

.toolbar {
  border-bottom-style: dashed;
  border-block-end-color: inherit;
}
</style>
