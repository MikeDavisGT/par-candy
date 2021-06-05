export const DataModel = {

  getEvents: function () {

    if (DataModel.model.events == null) {
      alert("go");
      let promise = fetch('/api/events');
      let promise2 = promise.then(response => {
        console.log("new request...");
        if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
        } else {
          response.json().then(jresult => {
            DataModel.model.events = jresult;
            alert(DataModel.model.events["4779ad1e-8043-422f-82c9-d71942cd7cb7"].Name);
            //return model.events;
          })
        }
      });
    } //else {
      //console.log(" using cached result!!!");
      //return model.events;
    //}
    return DataModel.model.events;

  },

  model: {
    events: null
  }
  
}
