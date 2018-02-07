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
      let id = parseInt(element.dataset.id)
      let note = Note.findNote(id)
      document.getElementById('show-note').innerHTML = `
      <h1>full post</h1>
      <h2>${note.title}</h2>
      <p>${note.body}</p>`
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

  }
})()
