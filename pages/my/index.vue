<template>
  <div class="my">
    <div class="van-hairline--bottom shortcut" flex="cross:center">
      <div v-for="(items, index) in shortcut" :key="index" class="align-center">
        <div aspectratio>
          <div class="img_wrapper" aspectratio-content>
            <van-image :src="`${items.img}`" class="img" lazy-load>
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
        </div>
        <div class="title">
          {{ items.title }}
        </div>
      </div>
    </div>
    <template v-for="(row, index) in rows">
      <van-cell
        :key="index"
        :value="row.count"
        value-class="rows-value"
        class="rows"
        is-link
        flex="cross:center"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="title"><icon-font :icon-class="row.icon" class="left-icon" />{{ row.title }}</span>
        </template>
        <icon-font
          slot="right-icon"
          class="right-icon"
          icon-class="arrow-right"
        />
      </van-cell>
    </template>
    <div v-for="(row, index) in playlist" :key="index" class="playlist">
      <van-collapse v-model="activeNames[index]">
        <van-collapse-item :name="index" class="collapse-items">
          <div slot="title" class="ground-title">
            <icon-font class="left-icon" icon-class="arrow-right" />{{ row.name }}
          </div>
          <van-cell v-for="(items, each) in row.list" :key="each" @click="$router.push({path: 'play/detail', query: {id: items.id}})" class="cells" is-link>
            <template slot="title">
              <div flex="main:center cross:center box:first">
                <div class="img_wrapper" aspectratio>
                  <div aspectratio-content>
                    <van-image :src="`${items.coverImgUrl}`" class="img" lazy-load>
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </div>
                </div>
                <div class="content">
                  <div class="name">
                    {{ items.name }}
                  </div>
                  <div class="number">
                    {{ items.trackCount }}首<template v-if="playlist[index].type === 'collect'">
                      , by {{ items.creator.nickname }}
                    </template>
                  </div>
                </div>
              </div>
            </template>
            <span
              slot="right-icon"
            />
          </van-cell>
          <icon-font
            slot="right-icon"
            class="right-icon"
            icon-class="more"
          />
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { Cookie } from '@/utils/storage'
import * as tools from '@/utils/tools'
export default {
  data () {
    return {
      activeNames: {
        0: [0],
        1: [1]
      }
    }
  },
  async asyncData ({ req, res, error, params, $axios }) {
    let data = {
      shortcut: [
        { title: '最新电音', img: require('@/assets/images/my/fm.png') },
        { title: '私藏推荐', img: require('@/assets/images/my/collect.png') },
        { title: '亲子频道', img: require('@/assets/images/my/baby.png') },
        { title: '古典专区', img: require('@/assets/images/my/classic.png') }
      ],
      rows: [
        { title: '本地音乐', icon: 'my_music', count: 0 },
        { title: '最新播放', icon: 'recentlyPlayed', count: 0 },
        { title: '我的电台', icon: 'broadcasting', count: 0 },
        { title: '我的收藏', icon: 'collect', count: 0 },
        { title: 'Sati空间', icon: 'sati', count: 0 }
      ],
      playlist: [
        {
          type: 'create',
          name: '我创建的歌单({0})',
          list: []
        },
        {
          type: 'collect',
          name: '我收藏的歌单({0})',
          list: []
        }
      ]
    }
    try {
      let counts = await $axios.post('userSubcount', { uid: Cookie.get('userId', req) })
      let { playlist } = await $axios.post('userPlaylist', { uid: Cookie.get('userId', req) })
      // 统计
      data.rows[2].count = counts.djRadioCount
      // 歌单
      let createList = playlist.filter(items => items.subscribed === false)
      data.playlist[0].list = createList
      data.playlist[0].name = tools.stringFormat(data.playlist[0].name, counts.createdPlaylistCount + 1) // + 1 为了加上“我喜欢的音乐”， 这个歌单是不能删除的
      let collectList = playlist.filter(items => items.subscribed === true)
      data.playlist[1].list = collectList
      data.playlist[1].name = tools.stringFormat(data.playlist[1].name, counts.subPlaylistCount)
      return data
    } catch (res) {
      return data
    }
  }
}
</script>

<style lang="less">
  .my {
    .shortcut {
      .align-center {
        padding: 0 60px;
      }
      padding: 60px 0;
      .img_wrapper {
        width: 122px;
        height: 122px;
        margin: 0 auto;
      }
      [aspectratio] {
        aspect-ratio: '122:122';
      }
      .title {
        font-size: 36px;
        color: #979798;
        margin-top: 32px;
      }
    }
    .rows {
      padding: 42px 28px 42px 59px;
      line-height: 1.2;
      .title {
        font-size: 50px;
      }
      .left-icon {
        font-size: 60px;
        color: @font-red-color;
        margin: 0 73px 0 0;
      }
      .right-icon {
        font-size: 50px;
        opacity: 0.8;
      }
      .rows-value span {
        font-size: 42px;
      }
    }
    .playlist {
      .left-icon {
        margin: 0 32px 0 32px;
        display: inline-block;
        transition: transform 0.2s ease-in;
      }
      .right-icon {
        padding: 0 40px 0 40px;
        line-height: 1;
      }
      .van-collapse-item__title--expanded {
        .left-icon {
          transform: rotate(90deg)
        }
      }
      [aspectratio] {
        aspect-ratio: '162:162';
      }
      .collapse-items {
        .van-cell__title {
          line-height: 1.2;
        }
        .ground-title {
          font-size: 36px;
          line-height: 1.2;
        }
        padding: 0 0;
        [role="button"] {
          padding: 28px 0;
          color: #747475;
        }
        .van-collapse-item__title {
          background: #EEEFF0;
        }
        .van-collapse-item__wrapper {
          background-color: white;
        }
        .van-collapse-item__content {
          padding: 0;
        }
        .cells {
          padding: 9px 20px 9px 20px;
        }
      }
      .img_wrapper {
        width: 162px;
        height: 162px;
        img {
          border-radius: 18px;
        }
      }
      .content {
        padding: 0 0 0 35px;
      }
      .name {
        font-size: 48px;
        line-height: 1.2;
        .lineClamp(1);
      }
      .number {
        line-height: 1.2;
        margin: 20px 0 0 0;
        font-size: 36px;
        color: @font-secondary-color;
      }
    }
  }
</style>
