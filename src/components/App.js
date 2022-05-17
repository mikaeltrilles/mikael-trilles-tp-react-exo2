//*A l’aide d’un petit formulaire contenant une liste déroulante (Italy, France, Germany) donnez la possibilité à l’utilisateur de savoir combien d’universités sont référencées dans le pays choisi.


import React, { Component } from 'react';
import FetchUniversities from '../services/FetchUniversities';



class App extends Component {

  //* Je déclare un state pour stocker les données de l'api
  state = {
    universities: [],
  }

  //* Je récupère le pays choisi dans le select
  handleChangeSelect = (select) => {
    const country = select.target.value;
    console.log('Pays select : '+ country);
    FetchUniversities(country)
      .then(data => {
        this.setState({
          universities: data
        })
      }
    )
  }

  //* Je controle l'input a chaque changement de valeur et je recherche la chaine de caractere saisi est contenu dans le nom de l'université
  handleChangeInput = (input) => {
    const search = input.target.value;
    console.log('Recherche : '+ search);
    const universities = this.state.universities.filter(university => university.name.toLowerCase().includes(search.toLowerCase()));
    this.setState({
      universities: universities
    })
    console.log(this.universities);
  }

  //* J'appelle la fonction FetchUniversities pour récupérer les données de l'api
  componentDidMount() {
    
  }








  //* Je crée un select pour choisir le pays entre : France, Italy, Germany 
  render() {
    return (
      <>
      <div className="App">
        <select onChange={this.handleChangeSelect}>
          <option value="">Sélectionnez un Pays</option>
          <option value="France">France</option>
          <option value="Italy">Italie</option>
          <option value="Germany">Allemagne</option>
        </select>
        <h1>{this.state.universities.length} Université(s) de trouvée(s)</h1>
      </div>

      {/* je crée un input pour rechercher une université et je controle toujours le nombre de résultat */}
      <div>
      <input type="text" placeholder="Rechercher une université" onChange={this.handleChangeInput} />
      <h1>{this.state.universities.length} Université(s) de trouvée(s)</h1>
      {/* J'affiche un bouton pour voir les resultat de la recherche si il y en a moins de 50 */}
      {(this.state.universities.length < 50 && this.state.universities.length > 0) && <button>Voir les résultats</button>}



      </div>
      </>
    );
  }
}
export default App;
