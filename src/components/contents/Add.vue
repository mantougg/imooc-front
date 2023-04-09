<template>
  <div>
    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <!--<div class="fly-none">没有权限</div>-->
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <form action="" method="post">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <div class="layui-col-md3">
                      <label class="layui-form-label">所在专栏</label>
                      <div class="layui-input-block" @click="() => { this.isSelect = !this.isSelect }">
                        <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect }">
                          <div class="layui-select-title">
                            <input type="text" placeholder="请选择" v-model="catalogs[cataIndex].text" class="layui-input layui-unselect"/>
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd v-for="(item, index) in catalogs" :key="`catlog${index}`" :class="{ 'layui-this': index === cataIndex }" @click="chooseCatalog(item, index)">
                              {{ item.text }}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div class="layui-col-md9">
                      <label for="L_title" class="layui-form-label">标题</label>
                      <div class="layui-input-block">
                        <input type="text" id="L_title" name="title" required lay-verify="required" autocomplete="off" class="layui-input">
                        <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                      </div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" @click="() => { this.isSelect_fav = !this.isSelect_fav }" style="width: 190px;">
                        <div class="layui-unselect layui-form-select" :class="{ 'layui-form-selected': isSelect_fav }">
                          <div class="layui-select-title">
                            <input type="text" placeholder="请选择" v-model="favList[favIndex]" class="layui-input layui-unselect"/>
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd v-for="(item, index) in favList" :key="`favList${index}`" :class="{ 'layui-this': index === favIndex }" @click="chooseFav(item, index)">
                              {{ item }}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label">人类验证</label>
                    <div class="layui-input-inline">
                      <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">1+1=?</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" lay-filter="*" lay-submit>立即发布</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [{
        text: '请选择',
        value: ''
      }, {
        text: '提问',
        value: 'ask'
      }, {
        text: '分享',
        value: 'share'
      }, {
        text: '讨论',
        value: 'discuss'
      }, {
        text: '建议',
        value: 'advise'
      }],
      favList: [20, 30, 50, 60, 80]
    }
  },
  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
