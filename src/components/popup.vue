<template>
  <div>
    <!-- 弹出层 -->
    <van-popup
      :value="value"
      @input="off"
      position="bottom"
      :style="{ height: '80%', paddingTop: '35px' }"
      closeable
      close-icon-position="top-left"
    >
      <van-cell title="我的频道">
        <template slot="default">
          <div>
            <van-button round type="danger" plain size="mini" v-if="!edit" @click="edit=true">编辑</van-button>
            <van-button round type="danger" plain size="mini" v-if="edit" @click="edit=false">完成</van-button>
          </div>
        </template>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item v-for="(item, index) in channels" :key="item.id" :text="item.name" class="iconbox">
          <template slot="icon">
            <div>
              <van-icon name="cross" class="close" v-if="edit" @click="del(index)" />
            </div>
          </template>
        </van-grid-item>
      </van-grid>

      <van-cell title="推荐频道" />
      <van-grid :gutter="10">
        <van-grid-item v-for="item in allChannels" :key="item.id" :text="item.name" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { apiGetAllChannels } from "../api/channels";
export default {
  data() {
    return {
      allChannels: [],
      edit: false
    };
  },
  props: ["value", "channels"],
  methods: {
    // 把 van-popup 传来的值传给 home
    off(value) {
      this.$emit("input", value);
    },

    // 获取全部频道数据
    async getAllChannels() {
      let res = await apiGetAllChannels();
      let wd = this.channels.map(item => {
        return item.id;
      });
      this.allChannels = res.channels.filter(item => {
        return wd.indexOf(item.id) === -1;
      });
    },

    // 删除频道
    del(i) {
      let user = this.$store.state.user
      if (user) {
        console.log('已登录')
      } else {
        console.log(i)
        this.channels.splice(i, 1)
        window.localStorage.setItem('channels',JSON.stringify(this.channels))
      }
    }
  },

  created() {
    this.getAllChannels();
    console.log(this.channels);
    
  }
};
</script>

<style lang="less" scoped>
.iconbox {
  position: relative;

  .close {
    position: absolute;
    top: -15px;
    right: -39px;
  }
}
</style>