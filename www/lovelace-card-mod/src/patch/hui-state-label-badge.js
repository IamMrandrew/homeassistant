import {fireEvent} from "card-tools/src/event.js";
import { applyToElement } from "../card-mod";

customElements.whenDefined('hui-state-label-badge').then(() => {
    const HuiStateLabelBadge = customElements.get('hui-state-label-badge');
    if(HuiStateLabelBadge.prototype.cardmod_patched) return;
    HuiStateLabelBadge.prototype.cardmod_patched = true;

    const oldFirstUpdated = HuiStateLabelBadge.prototype.firstUpdated;
    HuiStateLabelBadge.prototype.firstUpdated = function(changedProperties) {
      if(oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
      const config = this._config;
      if(!config) return;

      let entity_ids = config.entity_ids;

      if(config.class)
        this.classList.add(config.class);

      const apply = () => applyToElement(this, "badge", config.style, {config}, config.entity_ids);

      apply();
    }

  fireEvent('ll-rebuild', {});
});
