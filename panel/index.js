const { read, pkgName } = require_('utils.js');
const DesignWidths = require_('design-width.js');

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
      createToggleAllButton();
      createDeviceList();
    }
  ]
}

function createDeviceList() {
  const existed = document.getElementById('__deviceList');
  if (existed) {
    existed.parentElement.removeChild(existed);
  }
  const inspector = document.querySelector('ui-panel-frame#inspector');
  if (!inspector) {
    Editor.log(`Can not find inspector, exit`);
    return;
  }
  const select = document.createElement('ui-select');
  select.id = '__deviceList'
  DesignWidths.forEach(width => {
    const opt = document.createElement('option');
    opt.textContent = width;
    opt.value = width;
    select.appendChild(opt);
  });

  inspector.appendChild(select);
  inspector.shadowRoot.prepend(select);
  select.addEventListener('change', (e) => {
    const designWidth = e.target.value;
    Editor.log(`Setting design width: ${designWidth}`);
    cc.director.getScene().children.find(s => s.name === 'Canvas').emit('set_design_width', {width: designWidth});
  });
}

function createToggleAllButton() {
  const existed = document.getElementById('__toggleSectionsButton')
  if (existed) {
    existed.parentElement.removeChild(existed);
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

function require_(relativePath) {
  return Editor.require(`packages://cc-ext/${relativePath}`);
}
