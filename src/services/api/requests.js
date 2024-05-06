import { instance } from ".";

const getData = async (path) => 
(await instance.get(path)).data;

export { getData };
 