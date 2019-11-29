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
        <van-grid-item v-for="item in channels" :key="item.id" :text="item.name" class="iconbox">
          <template slot="icon">
            <div>
              <van-icon name="cross" class="close" v-if="edit" />
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
      channels: [],
      allChannels: [],
      edit: false
    };
  },
  props: ["value"],
  methods: {
    off(value) {
      this.$emit("input", value);
    },
    async getAllChannels() {
      let res = await apiGetAllChannels();
      console.log(this.allChannels);
      let wd = this.channels.map(item => {
        return item.id;
      });
      this.allChannels = res.channels.filter(item => {
        return wd.indexOf(item.id) === -1;
      });
    }
  },
  created() {
    this.channels = JSON.parse(window.localStorage.getItem("channels"));
    this.getAllChannels();
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