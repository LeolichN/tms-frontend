<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="title"
    :type="type"
    :visible.sync="isVisible"
    :width="width"
    top="50px"
  >
    <el-form ref="form" :model="user" :rules="rules" label-position="right" label-width="100px">
      <el-form-item :label="$t('table.user.account')" prop="account">
        <el-input v-model="user.account" :readonly="type === 'add' ? false : 'readonly'" />
      </el-form-item>
      <el-form-item :label="$t('table.user.name')" prop="name">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item v-show="type === 'add'" :label="$t('table.user.password')" prop="password">
        <el-tooltip
          :content="$t('tips.defaultPassword')"
          class="item"
          effect="dark"
          placement="top-start"
        >
          <el-input type="password" value="123456" />
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="$t('table.user.avatar')" prop="avatar">
        <imgUpload
          ref="imgFileRef"
          :accept="accept"
          :accept-size="2*1024*1024"
          :auto-upload="true"
          :data="user.avatar"
          :file-list="imgFileList"
          :show-file-list="false"
          list-type="picture-card"
          @setId="setIdAndSubmit"
        >
          <i class="el-icon-plus" />
        </imgUpload>
      </el-form-item>
      <el-form-item :label="$t('table.user.orgId')" prop="orgId">
        <treeselect
          v-model="user.orgId"
          :clear-value-text="$t('common.clear')"
          :load-options="loadListOptions"
          :multiple="false"
          :options="orgList"
          :searchable="true"
          placeholder=" "
          style="width:100%"
        />
      </el-form-item>
      <el-form-item :label="$t('table.user.stationId')" prop="orgId">
        <el-select
          v-model="user.stationId"
          :loading="remoteStationLoading"
          :multiple="false"
          filterable
          placeholder="请输入关键词"
        >
          <el-option
            v-for="item in stationList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.user.email')" prop="email">
        <el-input v-model="user.email" />
      </el-form-item>
      <el-form-item :label="$t('table.user.mobile')" prop="mobile">
        <el-input v-model="user.mobile" />
      </el-form-item>
      <el-form-item :label="$t('table.user.sex')" prop="sex">
        <el-select v-model="user.sex.code" placeholder style="width:100%" value>
          <el-option
            v-for="(item, key, index) in enums.Sex"
            :key="index"
            :label="item"
            :value="key"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.user.status')" prop="status">
        <el-radio-group v-model="user.status">
          <el-radio :label="true">{{ $t('common.status.valid') }}</el-radio>
          <el-radio :label="false">{{ $t('common.status.invalid') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('table.user.workDescribe')" prop="workDescribe">
        <el-input v-model="user.workDescribe" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain type="warning" @click="isVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button plain type="primary" @click="submitForm">{{ $t('common.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { validMobile } from '@/utils/my-validate'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import imgUpload from '@/components/tms/imgUpload'
import userApi from '@/api/User.js'
import stationApi from '@/api/Station.js'

export default {
  name: 'UserEdit',
  components: { Treeselect, imgUpload },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      accept: 'image/jpeg, image/gif, image/png',
      remoteStationLoading: false,
      user: this.initUser(),
      screenWidth: 0,
      width: this.initWidth(),
      orgList: [],
      stationList: [],
      imgFileList: [],
      imgFileData: {
        bizId: '',
        bizType: 'USER_AVATAR'
      },
      // 图片文件总数
      imgFileTotal: 0,
      // 上传成功数
      successNum: 0,
      rules: {
        username: [
          {
            required: true,
            message: this.$t('rules.require'),
            trigger: 'blur'
          },
          {
            min: 4,
            max: 10,
            message: this.$t('rules.range4to10'),
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (!this.user.userId) {
                this.$get(`system/user/check/${value}`).then(response => {
                  const res = response.data
                  if (!res.data) {
                    callback(this.$t('rules.usernameExist'))
                  } else {
                    callback()
                  }
                })
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        email: {
          type: 'email',
          message: this.$t('rules.email'),
          trigger: 'blur'
        },
        mobile: {
          validator: (rule, value, callback) => {
            if (value !== '' && !validMobile(value)) {
              callback(this.$t('rules.mobile'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },
        roleId: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'change'
        },
        sex: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'change'
        },
        status: {
          required: true,
          message: this.$t('rules.require'),
          trigger: 'blur'
        }
      }
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.dialogVisible
      },
      set() {
        this.close()
        this.reset()
      }
    },
    enums() {
      return this.$store.state.common.enums
    },
    title() {
      return this.type === 'add'
        ? this.$t('common.add')
        : this.$t('common.edit')
    }
  },
  watch: {
    // 监听deptId
    'user.orgId': 'orgSelect'
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.width = this.initWidth()
      })()
    }
  },
  methods: {
    myAvatar(avatar) {
      if (!avatar) {
        return require(`@/assets/avatar/default.jpg`)
      } else {
        if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
          return avatar
        } else {
          return require(`@/assets/avatar/${avatar}`)
        }
      }
    },
    initUser() {
      return {
        id: '',
        account: '',
        name: '',
        orgId: null,
        stationId: null,
        email: '',
        mobile: '',
        sex: {
          code: 'N'
        },
        status: true,
        avatar: '',
        workDescribe: '',
        password: '123456'
      }
    },
    initWidth() {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth < 991) {
        return '90%'
      } else if (this.screenWidth < 1400) {
        return '45%'
      } else {
        return '800px'
      }
    },

    loadListOptions({ callback }) {
      callback()
    },
    orgSelect(node) {
      this.loadStation(node)
    },
    loadStation(orgId) {
      if (orgId) {
        stationApi.page({ orgId: orgId, status: true }).then(response => {
          const res = response.data
          this.stationList = res.data.records
        })
      } else {
        this.stationList = []
      }
    },
    setIdAndSubmit(bizId, url) {
      const vm = this
      vm.successNum += 1
      vm.imgFileData.bizId = bizId
      vm.user.avatar = url
      vm.user.id = bizId

      if (vm.successNum === vm.imgFileTotal) {
        vm.$store.state.hasLoading = false
      }
    },
    setUser(val, orgs) {
      const vm = this
      if (val) {
        vm.user = { ...val }
      }
      vm.orgList = orgs
      vm.imgFileData.bizId = vm.user['id']
      vm.$nextTick(() => {
        vm.$refs.imgFileRef.init({
          bizId: vm.user['id'],
          bizType: vm.imgFileData.bizType,
          imageUrl: vm.myAvatar(vm.user['avatar']),
          isSingle: true,
          isDetail: false
        })
      })
    },
    close() {
      this.$emit('close')
    },
    reset() {
      // 先清除校验，再清除表单，不然有奇怪的bug
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
      this.user = this.initUser()
      this.imgFileData.bizId = ''
      this.$refs.imgFileRef.init({
        bizId: '',
        bizType: '',
        imageUrl: '',
        isSingle: true,
        isDetail: false
      })
    },
    submitForm() {
      const vm = this
      this.$refs.form.validate(valid => {
        if (valid) {
          vm.editSubmit()
        } else {
          return false
        }
      })
    },
    editSubmit() {
      const vm = this
      if (vm.type === 'add') {
        vm.save()
      } else {
        vm.update()
      }
    },
    save() {
      const vm = this
      userApi.save(this.user).then(response => {
        const res = response.data
        if (res.isSuccess) {
          vm.isVisible = false
          vm.$message({
            message: vm.$t('tips.createSuccess'),
            type: 'success'
          })
          vm.$emit('success')
        }
      })
    },
    update() {
      userApi.update(this.user).then(response => {
        const res = response.data
        if (res.isSuccess) {
          this.isVisible = false
          this.$message({
            message: this.$t('tips.updateSuccess'),
            type: 'success'
          })
          this.$emit('success')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
