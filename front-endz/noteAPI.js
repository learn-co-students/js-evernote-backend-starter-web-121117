class NoteAPI{

  static createNote(noteJSON){
    return fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(noteJSON)
    }).then(res => res.json())
  }
  static fetchNotes(){
    return fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
  }
  static deleteNote(id){
    return fetch (`http://localhost:3000/api/v1/notes/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
    .then(json => console.log(json))
  }
  static editNote(noteJSON,id){
    return fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(noteJSON)
    }).then(res => res.json())

  }
}
