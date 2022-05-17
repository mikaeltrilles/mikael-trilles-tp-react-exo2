//*A l’aide d’un petit formulaire contenant une liste déroulante (Italy, France, Germany) donnez la possibilité à l’utilisateur de savoir combien d’universités sont référencées dans le pays choisi.

import React, { Component } from "react";
import FetchUniversities from "../services/FetchUniversities";

class App extends Component {
  //* Je déclare un state pour stocker les données de l'api
  state = {
    universities: [],
  };
  //* Je récupère le pays choisi dans le select
  handleChangeSelect = (select) => {
    const countrySelect = "";
    if (select == false){
      const countrySelect = "country=null";
    }else{
      const countrySelect = "country=" + select.target.value;
    }
    console.log("Pays select : " + countrySelect);
    FetchUniversities(countrySelect).then((data) => {
      this.setState({
        universities: data,
      });
    });
  };

  //* Je controle l'input a chaque changement de valeur et je recherche la chaine de caractere saisi est contenu dans le nom de l'université
  handleChangeInput = (input) => {
    const search = "name=" + input.target.value;
    console.log("Recherche : " + search);
    FetchUniversities(search).then((data) => {
      this.setState({
        universities: data,
      });
      const universities = this.state.universities.filter((elmentTab) =>
        elmentTab.name.toLowerCase().includes(search.toLowerCase())
      );
      // return const copy_state = { ...this.state, universities: universities };
    });

  };



  //* Je controler le click sur le bouton afficher
  // handleOnClickButton = (clickB) => {
  //   const univTab = this.state.data.map((element) => {
    // return (<div>
    //     <h1>{element.name}</h1>
    //     <h2>{element.country}</h2>
    //     <h4>{element.web}</h4>
    //     </div>)
  //       }
  //     )}
   
  // }


  //* Je crée un select pour choisir le pays entre : France, Italy, Germany
  render() {
    return (
      <>
        <div className="App">
          <select onChange={this.handleChangeSelect}>
            <option value="null">Sélectionnez un Pays</option>
            <option value="France">France</option>
            <option value="Italy">Italie</option>
            <option value="Germany">Allemagne</option>
          </select>
          <h1>{this.state.universities.length} Université(s) de trouvée(s)</h1>
        </div>
        <div>
          <input type="text" placeholder="Rechercher une université" onChange={this.handleChangeInput} />
          <h1>{this.state.universities.length} Université(s) de trouvée(s)</h1>
          {(this.state.universities.length < 50 && this.state.universities.length > 0) && <button onClick={this.handleOnClickButton}>Voir les résultats</button>}
        </div>
      </>
    )
  }
}

export default App;


