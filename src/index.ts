declare const Levenshtein: any;

class App {
  private el: any;
  private out: HTMLElement;
  private outText = '';
  private wrapper: any;

  constructor(colors) {
    this.el = document.getElementById('type');
    this.out = document.getElementById('out');
    for (const color in colors) {
      this[color] = colors[color];
    }
    this.initView();
  }
  handleClick({ keyCode }) {
    this.outText = `La propiedad '[PROP]' no existe<br>quisiste decir '[SUGGEST]'`;
    if (keyCode === 13) {
      const value = this.el.value.trim();
      this.wrapper[value];
    }
  }
  initView() {
    this.el.focus();
    this.el.onkeypress = this.handleClick.bind(this);
    const context = this;

    this.wrapper = new Proxy(this, {
      get(obj, property: any) {
        context.out.style.display = 'block';
        if (property in obj) {
          context.out.innerHTML = obj[property];
          return obj[property];
        }
        const suggestion = Object.keys(obj).find((key) => Levenshtein.get(key, property) < 3);
        if (suggestion === undefined) {
          context.out.innerHTML = 'El comando no existe';
        } else {
          context.out.innerHTML = context.outText.replace(/\[PROP\]/g, property).replace(/\[SUGGEST\]/g, suggestion);
        }
        return obj[property];
      },
    });
  }
}

new App({
  nombre: 'Herman Andres Figueroa',
  experiencia: '8 años',
  tecnologias: 'Angular, React, VanillaJs',
  ubicacion: 'Caldas, Colombia',
  educacion: 'SENA, Ingenieria de Sistemas',
  expectativa: '1000 USD',
  correo: 'heanfig@gmail.com',
  telefono: '3137071964',
  celular: '3137071964',
  github: 'github.com/heanfig',
});
