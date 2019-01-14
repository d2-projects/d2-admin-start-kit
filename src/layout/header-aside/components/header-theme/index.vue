<template>
  <div>
    <Tooltip
      effect="dark"
      content="主题"
      placement="bottom">
      <Button
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text"
        @click="dialogVisible = true">
        <d2-icon
          name="magic"
          style="font-size: 16px"/>
      </Button>
    </Tooltip>
    <Dialog
      title="主题"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <ThemeList style="margin-top: -25px;"/>
    </Dialog>
  </div>
</template>

<script>
import { Tooltip, Dialog, Button } from 'element-ui'
import ThemeList from './components/d2-theme-list'
export default {
  components: {
    Tooltip,
    Dialog,
    Button,
    ThemeList
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
