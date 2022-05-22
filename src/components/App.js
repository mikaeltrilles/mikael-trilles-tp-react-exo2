//*A l’aide d’un petit formulaire contenant une liste déroulante (Italy, France, Germany) donnez la possibilité à l’utilisateur de savoir combien d’universités sont référencées dans le pays choisi.

import React, { Component } from "react";
import FetchUniversities from "../services/FetchUniversities";


class App extends Component {
  //* Je déclare un state pour stocker les données de l'api
  state = {
    universities: [],
  };



  //* Je récupère le pays choisi dans le select
  handleChangeSelect = (selectValue) => {
    const countrySelect = "country=" + selectValue.target.value;
    selectValue.preventDefault();
    console.log("Pays select : " + countrySelect);
    FetchUniversities(countrySelect).then((data) => {
      this.setState({
        universities: data,
      });
    });
  };

  //* Je controle l'input a chaque changement de valeur et je recherche la chaine de caractere saisi est contenu dans le nom de l'université
  handleChangeInput = (inputValue) => {
    const search = "name=" + inputValue.target.value;
    console.log("Recherche : " + search);
    FetchUniversities(search).then((data) => {
      this.setState({
        universities: data,
      });
      const universities = this.state.universities.filter((elmentTab) =>
        elmentTab.name.toLowerCase().includes(search.toLowerCase())
      );

    });
  };

  //* J'envoi la ville et le pays pour le fetch
  handleOnClickButton = (e) => {
    e.preventDefault();
    let togg1 = document.getElementById("togg1");
    let d1 = document.getElementById("d1");
    togg1.addEventListener("click", () => {
      if (getComputedStyle(d1).display != "none") {
        d1.style.display = "none";
      } else {
        d1.style.display = "block";
      }
    })


    // console.log((click.target.value))
    // console.log(this.handleOnClickButton);
    return d1;
  };




  //* Je crée un select pour choisir le pays entre : France, Italy, Germany
  render() {
    return (
      <>
        <div className="App">
          <select onChange={this.handleChangeSelect} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            <option value="">Sélectionnez un Pays</option>
            <option value="France">France</option>ﬂ
            <option value="Italy">Italie</option>
            <option value="Germany">Allemagne</option>
          </select>

        </div>
        <div>
          <input
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            type="text"
            placeholder="Rechercher une université"
            onChange={this.handleChangeInput}
          />
          {/* si le resultat est surpeieur a 0 alors H1 est ecrit en vert sinon en rouge */}
          {this.state.universities.length > 0 ? (
            <h1 className="text-success">{this.state.universities.length} Université(s) de trouvée(s)</h1>
          ) : (
            <h1 className="text-danger">{this.state.universities.length} Université(s) de trouvée(s)</h1>
          )}
          {(this.state.universities.length < 50 &&
            this.state.universities.length > 0) && (
              <button
                id="togg1"
                className="btn btn-secondary"
                value="voir" onClick={this.handleOnClickButton}
                display >
                Voir les résultats
              </button>
            )}
          {console.log(this.handleOnClickButton.value)}

          {/*Si le resultat sur le fecth est compris entre 1 et 50 et que il y a un click sur le bouton alors on affiche lle tableau des resultats */}

          {(true) &&   (this.state.universities.length < 50 &&
            this.state.universities.length > 0) && (
           
            <div id="d1" className="table-responsive" style={
              { display: "none" }
            } >
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Web</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.universities.map((university, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{university.name}</td>
                      <td>{university.country}</td>
                      <td><a href={university.web_pages[0]}>{university.web_pages[0]}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }


}
export default App;