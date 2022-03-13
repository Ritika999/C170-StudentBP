AFRAME.registerComponent("create-markers", {
  
  init: async function() {

    var mainScene = document.querySelector("#main-scene");

    //get the dishes collection from firestore database
    var dishes = await this.getDishes();
   
    dishes.map(dish => {
      var marker = document.createElement("a-marker");   
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", dish.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });

      //set the markerhandler component
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      // Adding 3D model to scene
     

      // Ingredients Container
     
      // Dish title background plane
      
      // Dish title
      
      // Ingredients List
      var ingredients = document.createElement("a-entity");
      ingredients.setAttribute("id", `ingredients-${dish.id}`);
      ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
      ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
      ingredients.setAttribute("text", {
        font: "monoid",
        color: "black",
        width: 2,
        align: "left",
        value: `${dish.ingredients.join("\n\n")}`
      });
      mainPlane.appendChild(ingredients);
    });
  },
  //function to get the dishes collection from firestore database
  getDishes: async function() {
    return await firebase
      .firestore()
      .collection("dishes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
