class View {
   _form = document.querySelector('.shortener-container');
   _textInput = document.querySelector('.input-link');
   _errorMessage = document.querySelector('.error-message');
   _linksContainer = document.querySelector('.shortened-links');

   inputValue() {
      return this._textInput.value
   }
   submitEvent(handler: { (): Promise<void>; (): void; }) {
      this._form.addEventListener('submit', function (e: HTMLFormElement) {
         e.preventDefault()
         handler()
      })
   }
   generateMarkup(obj: object | any) {
      const markup = `
      <div class="link__short">
         <div>
            <span>${obj.original_link}</span>
         </div>
         <div>
            <a href="${obj.short_link}">${obj.short_link}</a>
            <button class="btn--copy">Copy</button>
         </div>
      </div>`;
      this._linksContainer.insertAdjacentHTML('beforeend', markup)
      return markup

   }
   insertMarkup(obj: object[]) {
      obj.map(data => {
         console.log(data);
         this.generateMarkup(data)
      })
   }
   renderError(message: string) {
      this._textInput.classList.add('error')
      this._errorMessage.textContent = message
   }
}
export default new View()