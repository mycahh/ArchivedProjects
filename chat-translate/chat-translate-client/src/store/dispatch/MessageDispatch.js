import types from "../types"

export function getMessagesByIdRoom(dispatch, data) {
    dispatch({
        type: types.LOAD_MESSAGES,
        data
    })
}

export function addMessage(dispatch, data) {
    dispatch({
        type: types.MESSAGE_ADDED,
        data
    })
}