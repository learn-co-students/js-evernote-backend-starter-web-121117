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
}
