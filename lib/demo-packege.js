'use babel';

import DemoPackegeView from './demo-packege-view';
import { CompositeDisposable } from 'atom';

export default {

  demoPackegeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoPackegeView = new DemoPackegeView(state.demoPackegeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoPackegeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-packege:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoPackegeView.destroy();
  },

  serialize() {
    return {
      demoPackegeViewState: this.demoPackegeView.serialize()
    };
  },

  toggle() {
    console.log('DemoPackege was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
