import { request } from "./client"

export const HeroAPI = {
    get: () => request("hero") 
};

