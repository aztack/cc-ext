const { read, pkgName } = require_('utils.js');

const vm = (el) => {
  return new Vue({
    el,
    name: 'cc-ext-panel',
    template: read('panel/panel.html'),
    data () {
      return {
      }
    },
    created() {
        window.ccExt = this;
    },
    compiled(){

    },
    methods: {
      $t: $t
    }
  })
};

function $t(key) {
  return Editor.T("cc-ext." + key);
}

Editor.Panel.extend({
  style: read('panel/style.css'),
  template: read('panel/index.html'),
  $: {
    root: '#cc-ext-panel'
  },
  ready () {
    this.vm = vm(this.$root);
  },
  messages: {
    inject(sender, text) {
      extensions.inspector[0](sender);
    }
  }
});

const extensions = {
  inspector: [
    function (sender) {
      if (document.getElementById('__toggleSectionsButton')) {
        Editor.log(`Found button, exit`);
        return;
      }
      const inspector = document.querySelector('ui-panel-frame#inspector');
      if (!inspector) {
        Editor.log(`Can not find inspector, exit`);
        return;
      }
      const btn = document.createElement('ui-button');
      btn.id = '__toggleSectionsButton'
      btn.innerText = $t('collapseExpandAllButton');
      inspector.appendChild(btn);
      inspector.shadowRoot.prepend(btn);
      btn.onclick = () => {
        const sections = document.querySelectorAll('ui-panel-frame#inspector::shadow ui-section .header');
        Array.from(sections).forEach(it =>it.click());
      };
    }
  ]
}

function require_(relativePath) {
  return Editor.require(`packages://cc-ext/${relativePath}`);
}
