class View {
   _form = document.querySelector('.shortener-container');
   _textInput = document.querySelector('.input-link');
   _errorMessage = document.querySelector('.error-message');
   _linksContainer = document.querySelector('.shortened-links');
   _copyBtn = document?.querySelectorAll('.btn--copy')

   inputValue() {
      return this._textInput.value
   }
   submitEvent(handler: { (): Promise<void>; (): void; }) {
      this._form.addEventListener('submit', function (e: HTMLFormElement) {
         e.preventDefault()
         handler()
      })
   }
   disableButton(e) {
      e.target.textContent = 'Copied!'
      e.target.classList.add('copied')
      e.target.style.pointerEvents = 'none'
   }
   copyEvent() {
      this._linksContainer.addEventListener('click', function (e) {
         if (e.target.classList.contains('btn--copy')) {
            const link = e.target.parentElement.querySelector('a')

            navigator.clipboard.writeText(link.textContent)

            this.disableButton(e)
         }
      }.bind(this))
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
      this._textInput.classList?.remove('error')
      this._errorMessage.textContent = ''
      obj.map(data => {
         this.generateMarkup(data)
      })
   }
   renderError(message: string) {
      this._textInput.classList.add('error')
      this._errorMessage.textContent = message
   }
}
export default new View()