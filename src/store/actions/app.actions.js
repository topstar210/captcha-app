import { 
    SET_TOKEN 
} from "../types/app.types";

export const setUserInfo  = (uData) => dispatch =>
{
    dispatch({
        type: SET_TOKEN,
        payload: uData
    })
}

