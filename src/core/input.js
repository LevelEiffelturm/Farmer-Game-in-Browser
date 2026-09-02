const MOVEMENT = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

export class Input {
  constructor() {
    this.keys = {};
    this.actionPressed = false;

    document.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;
    });

    document.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;

      if (MOVEMENT[event.code]) {
        this.actionPressed = false;
      }
    });
  }

  isPressed(key) {
    return this.keys[key] === true;
  }

  getMovement() {
    for (const key in MOVEMENT) {
      if (this.isPressed(key)) {
        return MOVEMENT[key];
      }
    }

    return null;
  }

  isAttackPressed() {
    return this.isPressed("ShiftLeft") || this.isPressed("ShiftRight");
  }

  canPerformAction() {
    return !this.actionPressed;
  }

  lockAction() {
    this.actionPressed = true;
  }
}
