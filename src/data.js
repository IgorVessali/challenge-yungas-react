import peoples from "./people.json";
import regions from "./regions.json";

//Scroll through people's data and search for the state-based region, add the region to the person
const Data = () => {
  return peoples.map(function (people) {
    var ret = regions.find(function (region) {
      return region.state === people.location.state;
    });
    people.location = {...ret, ...people.location} 
    return people;
  });
}
export default Data