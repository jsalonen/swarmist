import { observable } from "mobx";

const serviceStore = observable({
  name: "",
  publish: [],
  image: ""
});

export default serviceStore;
