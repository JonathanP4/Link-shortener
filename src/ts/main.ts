import * as shorten from "./shortener"
import view from "./view"

const shortenLinkControl = async function () {
   try {
      // Get text input value
      const url: string = view.inputValue()

      // Return API response
      const short = await shorten.shortenLink(url)

      // Show markup
      view.insertMarkup([short])
   } catch (err) {
      const errorMessage: string = err.message.replaceAll('.', ',').split(',')[0]
      view.renderError(errorMessage)
   }
}

const getStorageData = function () {
   const data: any = shorten.getLocalStorage()

   if (!data) return

   view.insertMarkup(data)
}
getStorageData()

const init = function () {
   view.submitEvent(shortenLinkControl)
   view.copyEvent()
   view.toggleMobileMenu()
}
init()