import { ApiData } from "./config";
import * as Clipboard from "../../node_modules/clipboard/dist/clipboard"

class View {
   _form = document.querySelector('.shortener-container');
   _textInput = document.querySelector('.input-link');
   _errorMessage = document.querySelector('.error-message');
   _linksContainer = document.querySelector('.shortened-links');
   _copyBtn = document?.querySelectorAll('.btn--copy')
   _bars = document.querySelector('.bars')
   _mobileNav = document.querySelector('.mobile-nav__container')
   i = 0

   inputValue() {
      return this._textInput.value
   }
   submitEvent(handler: { (): Promise<void>; (): void; }) {
      this._form.addEventListener('submit', function (e: HTMLFormElement) {
         e.preventDefault()
         handler()
      })
   }
   changeButton(evt) {
      const targetEl = evt.target
      targetEl.textContent = 'Copied!'
      targetEl.classList.add('copied');
      targetEl.style.pointerEvents = 'none'
      this.timeout(targetEl)
   }
   toggleMobileMenu() {
      this._bars.addEventListener('click', function (e) {
         this._mobileNav.classList.toggle('hide')
      }.bind(this))
   }
   timeout(targetEl) {
      setTimeout(() => {
         targetEl.textContent = 'Copy'
         targetEl.classList.remove('copied');
         targetEl.style.pointerEvents = 'initial'
      }, 3000)
   }
   copyEvent() {
      new Clipboard('.btn--copy')

      this._linksContainer.addEventListener('click', function (evt) {
         if (evt.target.classList.contains('btn--copy')) {
            this.changeButton(evt)
         }
      }.bind(this))
   }
   generateMarkup(obj: ApiData) {
      let j = this.i++
      const markup = `
      <div class="link__short">
         <div>
            <input type="text" disabled value="${obj.original_link}"></input>
         </div>
         <div>
            <span href="${obj.short_link}" target="blank" id="short_link${j}">${obj.short_link}</span>
            <button class="btn--copy" data-clipboard-action="copy" data-clipboard-target="#short_link${j}">Copy</button>
         </div>
      </div>`;
      this._linksContainer.insertAdjacentHTML('afterbegin', markup)
      return markup

   }
   insertMarkup(obj: ApiData[]) {
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