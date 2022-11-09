import Storage from "../../utils/Storage";

import { 
    SET_TOKEN 
} from "../types/app.types";

const initialState = {
    token    : '',
    uData    : {}
  }

export function appState(state = initialState, action) 
{
    switch (action.type) {
        case SET_TOKEN:
            Storage.set('c_token',action.payload.token);
            return {
                ...state, 
                token       : action.payload.token, 
                uData    : {
                    ...action.payload.uData
                }
            }
        default:
            return { ...state };
    }
}
