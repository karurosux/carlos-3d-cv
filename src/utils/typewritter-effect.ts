export class Typewritter {
  isTyping = false;
  speed = 30;
  i = 0;
  private text = "";

  constructor(private setTextCallback: (txt: string) => void) {}

  type(text: string) {
    this.i = 0;
    this.text = text;
    this.typewritter();
  }

  clear() {
    this.i = 0;
    this.text = "";
    this.setTextCallback(this.text);
  }

  skip() {
    this.i = this.text.length + 1;
  }

  private typewritter() {
    if (this.i < this.text.length) {
      this.isTyping = true;
      this.setTextCallback(this.text.substring(0, this.i));
      this.i++;
      setTimeout(() => this.typewritter(), this.speed);
    } else {
      this.isTyping = false;
      this.setTextCallback(this.text);
    }
  }
}
