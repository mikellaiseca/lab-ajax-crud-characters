const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    event.preventDefault()

    charactersAPI
      .getFullList()
      .then(response => {
        let text = ''
        response.data.forEach(eachCharacter => text +=
          `<div class="character-info">
        <div class="name"><u>${eachCharacter.name}</u></div>
        <div class="occupation">${eachCharacter.occupation}</div>
        <div class="cartoon">${eachCharacter.cartoon}</div>
        <div class="weapon">${eachCharacter.weapon}</div>
      </div>`)
        document.querySelector('.characters-container').innerHTML = text
      })
      .catch(err => console.log(err))


  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    event.preventDefault()

    const characterId = document.querySelector('#fetch-just-one').value

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        const character = response.data
        let text = `<u>${character.name} (${character.id})</u><br>Is a cartoon?: ${character.cartoon}<br>Profesion: ${character.occupation}<br>Arma: ${character.weapon}<br>`
        document.querySelector('.character-info').innerHTML = text
      })
      .catch(err => console.log(err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    event.preventDefault()

    const characterId = document.querySelector('#delete-just-one').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(() => console.log('DELETED!'))
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form .field input')

    const characterId = inputs[0].value

    const characterInfo = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].checked,
      cartoon: inputs[4].checked
    }

    charactersAPI
      .updateOneRegister(characterId, characterInfo)
      .then(response => {
        document.querySelector('#edit-character-form').reset()
        console.log('UPDATED')
      })
      .catch(err => console.log(err))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form .field input')

    const newCharacter = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(newCharacter)
      .then(response => {
        document.querySelector('#new-character-form').reset()
        console.log('CREATED')

      })
      .catch(err => console.log(err))
  });
});
