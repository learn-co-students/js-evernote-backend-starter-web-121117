const Note = (function(){
  const allNotes = []
  return class Note{
    constructor({title, body, id}){
      this.title = title
      this.body = body
      this.id = id
      allNotes.push(this)
    }

    static findNote(id){
      return allNotes.find(function(note){
        return note.id === id
      })
    }

    renderPreview(){
      let shortBody = this.body.slice(0,30)
      let title = this.title
      const previewDiv = document.createElement('div')
      previewDiv.id = `previewDiv-${this.id}`
      previewDiv.innerHTML = `
      <b>${title}</b>
      <p>${shortBody}</p>
      <a href="#" onclick="App.showDatFullness(this)" data-id='${this.id}'>Show</a>
      <a href="#" onclick="App.delete(this)" data-id='${this.id}'>Delete</a>
      `
      return previewDiv
    }

    renderDatFullness(){
      let fullBody = this.body
      let title = this.title

      let fullness = `
      <h2>${title}</h2>
      <p>${fullBody}</p>`

      return fullness
    }
  }
})()
