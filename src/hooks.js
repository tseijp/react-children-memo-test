import * as React from "react";
import { useEvent } from "reev/react";

const color = () => "#" + ((Math.random() * (1 << 24)) << 0).toString(16);

export const useIsSwitch = () => {
  const i = React.useRef(0);
  i.current++;
  return !(i.current % 2);
};

export const useForceUpdate = () => {
  const update = React.useState(0)[1];
  return React.useRef(() => update(Math.random())).current;
};

export const useRefUpdate = () => {
  const update = useForceUpdate();
  const self = useEvent({
    scale: `scale: 0.9`,
    border: `border: 0.5rem solid ${color()}`,
    background: `background: ${color()}`,
    ref(target) {
      if (target) {
        self.target = target;
        self.mount();
      } else self.clean();
    },
    mount() {
      const size = Math.max(self.target.clientWidth, self.target.clientHeight);
      const scale = (size - 5) / size;
      self.target.style.cssText += self.background;
      self.scale = `scale: ${((scale * 100) << 0) / 100}`;
      self.target.addEventListener("click", update);
      self.target.addEventListener("mouseenter", self.mouseenter);
      self.target.addEventListener("mouseleave", self.mouseleave);
    },
    clean() {
      if (self.listener) self.listener();
      self.target.removeEventListener("click", update);
      self.target.removeEventListener("mouseenter", self.mouseenter);
      self.target.removeEventListener("mouseleave", self.mouseleave);
    },
    mouseenter(e) {
      e.stopPropagation();
      self.target.style.cssText += self.scale;
    },
    mouseleave(e) {
      e.stopPropagation();
      self.target.style.cssText += `scale: 1`;
    },
    render() {
      if (!self.target) return;
      self.target.style.cssText += self.border;
      self.delay(() => (self.target.style.cssText += "border: none"));
    },
    delay(callback) {
      const timeout = window.setTimeout(callback, 2000);
      if (self.listener) self.listener();
      self.listener = () => void window.clearTimeout(timeout);
    }
  });

  self.render();

  return self.ref;
};
