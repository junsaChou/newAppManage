<template>
  <div class="header-bar clear-fix">
    <FoldSideMenu />
    <BreadCrumbs />
    <div class="header-right clear-fix">
      <FullScreen />
      <!-- <LangSelect />
      <GitHubLink /> -->
      <UserAvatar />
    </div>
  </div>
</template>

<script>
import FoldSideMenu from '../../../components/FoldSideMenu'
import BreadCrumbs from '../../../components/BreadCrumbs'
import FullScreen from '../../../components/FullScreen'
// import LangSelect from '../../../components/LangSelect'
// import GitHubLink from '../../../components/GitHubLink'
import UserAvatar from '../../../components/UserAvatar'

export default {
  components: {
    FoldSideMenu,
    BreadCrumbs,
    FullScreen,
    // LangSelect,
    // GitHubLink,
    UserAvatar
  }
}
</script>

<style lang="less">
  .header-bar {
    height: 32px;
    padding: 16px 20px;
    .header-right {
      float: right;
      min-width: 220px;
      max-width: 300px;
    }
    .avatar-wrap{
      overflow: hidden;
    }
    .avatar-name{
      float: right;
      padding-left: 10px;
      min-width: 80px;
      max-width: 220px;
      line-height: 40px;
    }
  }
</style>
