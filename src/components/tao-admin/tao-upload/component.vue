<!--
 * @Description: 上传组件 单张多张集合
 * @Author: zjx
 * @Date: 2019-07-04 11:01:17
 * @LastEditTime: 2019-10-11 20:16:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-upload class="upload-demo"
               ref="upload"
               action="''"
               :show-file-list="showFileList"
               :http-request="doUpload"
               :before-remove="beforeRemove"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :limit="limit"
               :disabled="disabled"
               :file-list="fileList"
               :list-type="listType"
               :on-success="handleAvatarSuccess"
               :multiple="multiple">
      <template v-if="['picture', 'text'].includes(listType)">
        <el-button size="mini"
                   plain>点击上传</el-button>
      </template>

      <template v-else>
        <a :href="domainaddr+singleImgPath"
           v-show="uploadFileType === 'file'">预览</a>
        <img v-if="singleImgPath"
             :src="domainaddr + singleImgPath"
             class="img-size-avatar" />
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </template>
      <el-dialog :visible.sync="dialogVisible"
                 append-to-body>
        <img class="img-size-avatar"
             :src="dialogImageUrl" />
      </el-dialog>
      <div class="el-upload__tip"
           v-show="showUpload"
           slot="tip">
        选取好文件再上传
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'tao-upload',
  props: {
    uploadType: {
      type: String,
      default: 'img'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: null
    },
    listType: {
      type: String,
      default: 'text'
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      uploadFileType: 'png',
      dialogImageUrl: '',
      dialogVisible: false,
      domainaddr: process.env.VUE_APP_UPLOAD_URL,
      showUpBtn: true
    }
  },
  computed: {
    uploadData: {
      get () {
        return this.value
      },
      set (val) { }
    },
    singleImgPath: {
      get () {
        if (this.value !== null) {
          return this.value.length !== 0
            ? this.multiple
              ? undefined
              : this.value[0].path
            : undefined
        } else {
          return undefined
        }
      },
      set (val) { }
    },
    fileList () {
      if (this.value !== null) {
        return this.value.map(item => {
          // 取得文件名称
          const name = item.path.split('/')[3]
          const temp = {
            name: name,
            url: this.domainaddr + item.path
          }
          return temp
        })
      }
      return []
    },
    showUpload () {
      // 暂时先隐藏提示
      if (this.limit !== null) {
        return this.uploadData.length < this.limit
      } else {
        return false
      }
    }
  },
  methods: {
    doUpload (data, type) {
      let fileFormData = new FormData()
      fileFormData.append('files', data.file, data.fileName)
      if (this.uploadType !== 'video') {
        this.$api.upload(fileFormData).then(res => {
          const type = res.path.split('.')[res.path.split('.').length - 1]
          if (!['jpg', 'png', 'jpeg', 'gif', 'JPG', 'bmp'].includes(type)) {
            this.uploadFileType = 'file'
          }

          console.log(res.path.split('.'))
          this.singleImgPath = res.path
          if (this.multiple) {
            this.uploadData.push(res)
            this.$emit('input', this.uploadData)
          } else {
            this.$emit('input', [res])
          }
          console.log('updata', this.uploadData)
        })
      } else {
        this.$api.uploadVideo(fileFormData).then(res => {
          this.uploadData.push(res)
          this.$emit('input', this.uploadData)
        })
      }
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove (file, fileList) {
      const newData = this.uploadData.map(item => {
        if (item) {
          const name = item.path.split('/')[3]
          if (file.name !== name) {
            return item
          }
        }
      })
      this.$emit(
        'input',
        newData.filter(item => item)
      )
    },
    handleAvatarSuccess (res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw)
    },
    handlePreview (file) {
      let url = file.url ? file.url : URL.createObjectURL(file.raw)
      if (
        ['jpg', 'png', 'jpeg', 'gif', 'JPG', 'bmp'].includes(
          file.name.split('.')[1]
        )
      ) {
        this.dialogImageUrl = url
        this.dialogVisible = true
      } else {
        window.location.href = url
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.img-size-avatar {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
}
</style>
