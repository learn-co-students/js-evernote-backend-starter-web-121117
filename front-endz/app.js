const App = (function(){
  return class App{
    static init(){
      console.log('Working NOTez')
      this.renderNotes()
      document.getElementById('note-form').addEventListener('submit', this.handleSubmit)
    }

    static handleSubmit(event){
      event.preventDefault()
      const noteTitle = document.getElementById('note-title').value
      const noteBody = document.getElementById('note-body').value
      const sidebar = document.getElementById('sidebar')
      NoteAPI.createNote({title: noteTitle, body: noteBody})
      .then(res => {
        let newNote =  new Note({title: res.title, body: res.body, id: res.id})
        sidebar.prepend(newNote.renderPreview())
      })
    }

    static showDatFullness(element){
      console.log(element)
      let id = parseInt(element.dataset.id)
      let note = Note.findNote(id)
      document.getElementById('show-note').innerHTML = `
      <h1>full post</h1>
      <h2>${note.title}</h2>
      <p>${note.body}</p>
      <a href='#' onclick='App.edit(this)' data-id='${id}'>Edit</a>`
    }
    static renderNotes(){
      NoteAPI.fetchNotes()
      .then(notes => {
        notes.forEach(function(note){
          let newNote = new Note(note)
          let noteDiv = newNote.renderPreview()
          sidebar.prepend(noteDiv)

        })
      })
    }
    static delete(element){
      let id = parseInt(element.dataset.id)
      let note = Note.findNote(id)
      document.getElementById(`previewDiv-${id}`).remove()
      NoteAPI.deleteNote(id)
    }

    static showEditedFullness(note){
      document.getElementById('show-note').innerHTML = `
      <h1>full post</h1>
      <h2>${note.title}</h2>
      <p>${note.body}</p>
      <a href='#' onclick='App.edit(this)' data-id='${note.id}'>Edit</a>`
    }

    static edit(element){
      let id = parseInt(element.dataset.id)
      let note = Note.findNote(id)
      let divShow = document.getElementById('show-note')
      divShow.innerHTML = `
      <form id="edit-note-form" action="index.html" method="post">
        <input type="text" id='edit-title' value="${note.title}"></br>
        <input type="text" id='edit-body' value="${note.body}"></br>
        <input type="submit" value="Edit Note">
      </form>
      `
      divShow.addEventListener('submit',function(e){
        e.preventDefault()
        let editedTitle = document.getElementById('edit-title').value
        let editedBody = document.getElementById('edit-body').value
        NoteAPI.editNote({title: editedTitle, body: editedBody},id)
        .then(json => {
          note.title = editedTitle
          note.body = editedBody
          App.showEditedFullness(note)
          document.getElementById('sidebar').innerHTML = ""
          App.renderNotes()
        })

      })
    }

  }
})()
