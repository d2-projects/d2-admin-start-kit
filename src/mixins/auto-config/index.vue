<script>
export default {
  name: 'componentAllConfig',
  components: {
    inputPage: () => import('./components/wd-input'),
    textareaPage: () => import('./components/wd-textarea'),
    textPage: () => import('./components/wd-text'),
    radioPage: () => import('./components/wd-radio'),
    checkboxPage: () => import('./components/wd-checkbox'),
    selectPage: () => import('./components/wd-select'),
    staticTextPage: () => import('./components/wd-staticText'),
    splitLinePage: () => import('./components/wd-split'),
    cascaderPage: () => import('./components/wd-cascader'),
    autocompletePage: () => import('./components/wd-autocomplete.vue'),
    switchPage: () => import('./components/wd-switch'),
    uploadPage: () => import('./components/wd-upload.vue'),
    buttonPage: () => import('./components/wd-button')
  }
}
</script>
