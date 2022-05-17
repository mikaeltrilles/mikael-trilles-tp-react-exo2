//* L’exercice consiste à utiliser l’api universities.hipolabs.com que vous pouvez tester à l’url suivante: http://universities.hipolabs.com/search . 
//* L’api renvoie un tableau d’objets contenant les informations suivantes:


export default async function FetchUniversities(country) {
  const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
  const data = await response.json();
  return data;
}