interface template {
   original_link: string
   short_link: string

}

export const linkData: template = {
   original_link: '',
   short_link: ''
}

let arr: object[] = []

export const shortenLink = async function (url: string) {
   try {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
      const data = await res.json()

      if (!data.ok) throw new Error(data.error)

      linkData.original_link = data.result.original_link
      linkData.short_link = data.result.short_link

      arr.push(linkData)
      localStorage.setItem('links', JSON.stringify(arr))

      return data.result
   } catch (err) {
      throw err
   }
}

export const getLocalStorage = function () {
   const data: any = localStorage.getItem('links')

   if (data) arr = JSON.parse(data)

   return JSON.parse(data)
}

console.log(arr);