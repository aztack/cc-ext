'use strict';
/**
 * Package Entry
 * @see https://docs.cocos.com/creator/manual/zh/extension/your-first-extension.html
 */
module.exports = {
  load() {
    Editor.log(`Loading Package "cc-ext" from ${__dirname}`);
  },
  unload() {
    Editor.log('Unloading Package "cc-ext"');
  },
  /**
   * Package Message Handlers
   * @see https://docs.cocos.com/creator/manual/zh/extension/entry-point.html#ipc-消息注册
   */
  messages: {
    ['cc-ext:init']() {
      Editor.Ipc.sendToPanel('cc-ext', 'inject');
    }
  }
};