<template>
  <div>
    <van-sticky>
      <form class="form" action="/">
        <van-search
          v-model="value"
          left-icon
          input-align="center"
          :placeholder="icon"
          background="#3296FA"
          shape="round"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </van-sticky>

    <van-row class="channels">
      <div class="tab">
        <van-tabs v-model="active" swipeable sticky @click="onClick">
          <van-tab v-for="(item,index) in channels" :key="index" :title="item.name">
            active {{ active }}
            <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
              <van-list
                v-model="item.loading"
                :finished="item.finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <van-cell v-for="item in item.aList" :key="item.art_id" :title="item.title">
                  <template slot="label">
                    <van-grid v-if="item.cover.type > 0" :border="false" :column-num="3">
                      <van-grid-item
                        v-for="(imgitem,imgindex) in item.cover.images"
                        :key="imgindex"
                      >
                        <van-image :src="imgitem" />
                      </van-grid-item>
                    </van-grid>
                    <div>
                      <span class="mr">{{item.aut_name}}</span>
                      <span class="mr">{{item.comm_count}} 评论</span>
                      <span class="mr">{{item.pubdate}}</span>
                    </div>
                  </template>
                </van-cell>
              </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </div>
      <div class="menu">
        <van-icon name="wap-nav" />
      </div>
    </van-row>
  </div>
</template>

<script>
import { apiGetChannels, apiGetAllChannels } from "@/api/channels.js";
import apiGetArticles from "../../api/articles";

export default {
  data() {
    return {
      value: "",
      icon: "\ue600 搜索",
      active: "",
      channels: []
    };
  },
  methods: {
    onSearch() {
      console.log(1);
    },
    onCancel() {
      console.log(2);
    },
    onRefresh() {
      console.log("下拉");
      let channelList = this.channels[this.active];
      // 重置当前频道下的所有数据
      channelList.loading = false;
      channelList.finished = false;
      channelList.aList = [];
      channelList.timestamp = null;
      channelList.isLoading = false;
      // 重新请求数据
      this.onLoad();
    },
    async onLoad() {
      let channelId = this.channels[this.active].id;
      let channelList = this.channels[this.active];
      let timestamp = channelList.timestamp
        ? channelList.timestamp
        : Date.now();
      let res = await apiGetArticles({ channelId, timestamp });
      if (res.results.length === 0) {
        channelList.finished = true;
      }
      channelList.aList = [...channelList.aList, ...res.results];
      channelList.timestamp = res.pre_timestamp;
      console.log(channelList);

      channelList.loading = false;

      // // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    },
    async getChannels() {
      let res = await apiGetChannels();
      this.channels = res.channels;
      this.channels.forEach(item => {
        this.$set(item, "loading", false);
        this.$set(item, "finished", false);
        this.$set(item, "isLoading", false);
        this.$set(item, "aList", []);
        this.$set(item, "timestamp", null);
      });
    },
    async onClick() {
      this.onLoad();
    }
  },
  created() {
    this.getChannels();
    apiGetAllChannels();
  }
};
</script>

<style lang="less" scoped>
// 搜索框
.form {
  /deep/.van-search__content.van-search__content--round {
    background-color: #5babfb;

    .van-field__control.van-field__control--center {
      font-family: iconfont;

      &::-webkit-input-placeholder {
        color: #fff;
      }
    }
  }
}

// 频道列表
.channels {
  /deep/ .van-tabs__wrap {
    width: 92%;
    position: fixed;
    top: 54px;
    z-index: 1;
  }

  .van-tab__pane {
    margin-top: 44px;
  }

  .van-cell {
    .mr {
      margin-right: 10px;
    }
  }

  .menu {
    position: fixed;
    top: 54px;
    right: 0;
    width: 8%;
    height: 44px;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
  }
}
</style>
